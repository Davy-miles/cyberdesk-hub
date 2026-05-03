// ============================================================
// EDGE FUNCTION: discord-callback
// ------------------------------------------------------------
// Discord redireciona o usuário para esta função após o login.
// Aqui nós:
//   1. Pegamos o "code" da URL
//   2. Trocamos esse code por um access_token (na API do Discord)
//   3. Buscamos os dados do usuário (id, username)
//   4. Usamos o BOT TOKEN para adicionar o user ao servidor
//   5. Redirecionamos o user de volta para o site (/verify/success)
// ============================================================

import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Função utilitária: redireciona o usuário (HTTP 302) para uma rota do site
  const redirect = (origin: string, path: string) =>
    new Response(null, { status: 302, headers: { Location: `${origin}${path}` } });

  // O Discord chama esta URL com ?code=XXX&state=YYY
  const reqUrl = new URL(req.url);
  const code = reqUrl.searchParams.get("code");
  const state = reqUrl.searchParams.get("state") ?? "/verify/success";

  // Origem do site (pegamos do header "referer" se existir, senão fallback)
  // Como a função roda em supabase.co, precisamos saber a URL real do site.
  // O state guarda o path; para a origem, usamos o env CLIENT_ORIGIN ou referer.
  const siteOrigin = Deno.env.get("SITE_ORIGIN")
    ?? req.headers.get("referer")?.split("/").slice(0, 3).join("/")
    ?? "https://id-preview--30ecd34f-8769-4737-9a72-0049c334e9ed.lovable.app";

  if (!code) {
    return redirect(siteOrigin, "/verify/error?reason=missing_code");
  }

  try {
    // === Lê todos os secrets necessários ===
    const clientId = Deno.env.get("DISCORD_CLIENT_ID");
    const clientSecret = Deno.env.get("DISCORD_CLIENT_SECRET");
    const botToken = Deno.env.get("DISCORD_BOT_TOKEN");
    const guildId = Deno.env.get("DISCORD_GUILD_ID");

    if (!clientId || !clientSecret || !botToken || !guildId) {
      throw new Error("Secrets do Discord faltando");
    }

    // A redirect_uri AQUI deve ser idêntica à usada no auth-start
    const redirectUri = `${reqUrl.origin}/functions/v1/discord-callback`;

    // === PASSO 1: trocar o code por access_token ===
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error("Token exchange failed:", errBody);
      return redirect(siteOrigin, "/verify/error?reason=token_exchange");
    }

    const tokenData = await tokenRes.json() as {
      access_token: string;
      token_type: string;
    };

    // === PASSO 2: pegar dados do usuário ===
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      return redirect(siteOrigin, "/verify/error?reason=user_fetch");
    }

    const user = await userRes.json() as { id: string; username: string };

    // === PASSO 3: adicionar o user ao servidor (guild) ===
    // Endpoint PUT /guilds/{guild_id}/members/{user_id}
    // Precisa: bot dentro do servidor + permissão CREATE_INSTANT_INVITE
    const joinRes = await fetch(
      `https://discord.com/api/guilds/${guildId}/members/${user.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: tokenData.access_token }),
      },
    );

    // 201 = adicionado agora | 204 = já estava no servidor
    if (joinRes.status !== 201 && joinRes.status !== 204) {
      const errBody = await joinRes.text();
      console.error("Guild join failed:", joinRes.status, errBody);
      return redirect(siteOrigin, `/verify/error?reason=join_failed&status=${joinRes.status}`);
    }

    // === SUCESSO! Redireciona para a página de sucesso com username ===
    return redirect(
      siteOrigin,
      `${state}?u=${encodeURIComponent(user.username)}`,
    );
  } catch (error) {
    console.error("Callback error:", error);
    return redirect(siteOrigin, "/verify/error?reason=server_error");
  }
});
