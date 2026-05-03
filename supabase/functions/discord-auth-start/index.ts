// ============================================================
// EDGE FUNCTION: discord-auth-start
// ------------------------------------------------------------
// Esta função roda no servidor (Deno) e gera a URL de
// autenticação do Discord. O frontend chama essa função e
// redireciona o usuário para essa URL.
//
// Fluxo OAuth2 simplificado:
//   1. Usuário clica em "Verificar com Discord"
//   2. Frontend chama esta função → recebe URL do Discord
//   3. Usuário faz login no Discord
//   4. Discord redireciona para discord-callback (a outra função)
//   5. discord-callback troca o "code" por um access_token,
//      pega os dados do user e adiciona ao servidor
// ============================================================

import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// O scope "identify" = ler nome/avatar do usuário.
// O scope "guilds.join" = permissão para o bot adicionar o usuário no servidor.
const SCOPES = "identify guilds.join";

Deno.serve((req) => {
  // Preflight CORS (navegador testa antes de chamar de verdade)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Lê secrets configurados em Lovable Cloud
    const clientId = Deno.env.get("DISCORD_CLIENT_ID");
    if (!clientId) throw new Error("DISCORD_CLIENT_ID não configurado");

    // O frontend manda a URL atual para sabermos para onde voltar depois
    const url = new URL(req.url);
    const returnTo = url.searchParams.get("return_to") ?? "/verify/success";

    // A URL de callback DEVE bater exatamente com a configurada no Discord
    const redirectUri = `${url.origin}/functions/v1/discord-callback`;

    // Monta a URL oficial de autorização do Discord
    const authUrl = new URL("https://discord.com/oauth2/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", SCOPES);
    // "state" = passamos a URL de retorno aqui para usar no callback
    authUrl.searchParams.set("state", returnTo);

    return new Response(
      JSON.stringify({ url: authUrl.toString() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
