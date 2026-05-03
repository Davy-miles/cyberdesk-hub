import { useEffect, useMemo, useState } from "react";

type DiscordInviteResponse = {
  guild?: {
    id?: string;
    name?: string;
    icon?: string | null;
    description?: string | null;
  };
  approximate_member_count?: number;
  approximate_presence_count?: number;
};

type DiscordWidgetResponse = {
  channels?: Array<{ id: string; name: string }>;
};

export type DiscordStatsState = {
  loading: boolean;
  error: string | null;
  memberCount: number | null;
  onlineCount: number | null;
  channelCount: number | null;
  guildName: string;
  guildIconUrl: string;
  inviteUrl: string;
};

const INVITE_CODE = (import.meta.env.VITE_DISCORD_INVITE_CODE as string | undefined) ?? "cyberworld";
const GUILD_ID = (import.meta.env.VITE_DISCORD_GUILD_ID as string | undefined) ?? "";
const FALLBACK_GUILD_NAME = "Cyber World";
const FALLBACK_ICON = "/logo.svg";

const toGuildIconUrl = (guildId?: string, iconHash?: string | null) => {
  if (!guildId || !iconHash) return FALLBACK_ICON;
  return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.png?size=256`;
};

export const useDiscordStats = (): DiscordStatsState => {
  const [state, setState] = useState<DiscordStatsState>({
    loading: true,
    error: null,
    memberCount: null,
    onlineCount: null,
    channelCount: null,
    guildName: FALLBACK_GUILD_NAME,
    guildIconUrl: FALLBACK_ICON,
    inviteUrl: `https://discord.gg/${INVITE_CODE}`,
  });

  const inviteUrl = useMemo(() => `https://discord.gg/${INVITE_CODE}`, []);

  useEffect(() => {
    const ac = new AbortController();

    const fetchDiscordStats = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const inviteRes = await fetch(
          `https://discord.com/api/v10/invites/${encodeURIComponent(INVITE_CODE)}?with_counts=true`,
          { signal: ac.signal }
        );

        if (!inviteRes.ok) {
          throw new Error("Nao foi possivel carregar os dados do convite Discord.");
        }

        const inviteData = (await inviteRes.json()) as DiscordInviteResponse;
        const guildId = inviteData.guild?.id ?? GUILD_ID;
        const guildName = inviteData.guild?.name ?? FALLBACK_GUILD_NAME;
        const guildIconUrl = toGuildIconUrl(guildId, inviteData.guild?.icon ?? null);

        let channelCount: number | null = null;
        if (guildId) {
          const widgetRes = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
            signal: ac.signal,
          });

          if (widgetRes.ok) {
            const widgetData = (await widgetRes.json()) as DiscordWidgetResponse;
            channelCount = widgetData.channels?.length ?? null;
          }
        }

        setState({
          loading: false,
          error: null,
          memberCount: inviteData.approximate_member_count ?? null,
          onlineCount: inviteData.approximate_presence_count ?? null,
          channelCount,
          guildName,
          guildIconUrl,
          inviteUrl,
        });
      } catch (err) {
        if (ac.signal.aborted) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Erro ao carregar dados do Discord.",
          inviteUrl,
        }));
      }
    };

    void fetchDiscordStats();
    const id = window.setInterval(fetchDiscordStats, 60_000);

    return () => {
      ac.abort();
      window.clearInterval(id);
    };
  }, [inviteUrl]);

  return state;
};
