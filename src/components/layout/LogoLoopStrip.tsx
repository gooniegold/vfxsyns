"use client";

import type { ReactNode } from "react";
import { Instagram, Youtube } from "lucide-react";
import LogoLoop from "@/components/react-bits/LogoLoop";
import ShinyText from "@/components/react-bits/ShinyText";
import { INSTAGRAM_URL } from "@/lib/constants";

function SoundCloudGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1.175 11.65c-.154 0-.28.125-.322.276l-.45 3.26a.32.32 0 00.32.37h1.82V11.65h-1.37zm3.82-1.755c-.154 0-.28.125-.322.276l-1.22 5.015a.32.32 0 00.312.4H6.7V9.895H4.995zm3.68-2.015c-.154 0-.28.125-.322.276L7.98 15.16a.32.32 0 00.312.4h1.805V7.88H8.675zm3.855-1.15c-.154 0-.28.12-.32.27l-1.52 9.005a.32.32 0 00.31.395h1.805V6.73h-1.275zm3.685.015c-.11 0-.205.08-.235.185L14.12 16.16c-.06.16.06.32.235.32h1.63l.995-8.99c.03-.14-.085-.265-.23-.265h-1.255zm3.73 2.54c-.05 0-.095.035-.105.09l-.89 6.44c-.015.095.06.18.155.18h1.235l.71-6.43a.11.11 0 00-.11-.12h-1zm1.705.045c-.035 0-.065.025-.07.06l-.62 4.48c-.01.065.04.12.105.12h1.055l.49-4.45a.07.07 0 00-.07-.075h-.89zm1.41.01c-.025 0-.05.02-.05.045l-.445 3.22a.05.05 0 00.05.055h.86l.355-3.25a.045.045 0 00-.045-.05h-.825zm.93-.005h-.775c-.015 0-.03.015-.03.03l-.315 2.28a.03.03 0 00.03.035h.68l.22-2.29a.025.025 0 00-.025-.03z" />
    </svg>
  );
}

function DiscordGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.369A19.791 19.791 0 0016.885 3.1a.117.117 0 00-.124 0c-.21.147-.41.3-.602.456a18.068 18.068 0 00-5.256 0 12.48 12.48 0 00-.604-.456.121.121 0 00-.124 0 19.748 19.748 0 00-3.432 1.269.107.107 0 00-.054.078c-2.185 3.242-2.785 6.406-2.795 6.524.534.39 1.051.748 1.53 1.07a.124.124 0 00.148-.024c.8-1.102 1.702-2.135 2.677-3.079a.12.12 0 00-.042-.195 12.7 12.7 0 01-1.804-.855.121.121 0 01-.049-.162c.12-.18.244-.363.372-.544a.117.117 0 01.124-.046c2.728 1.24 5.686 1.24 8.376 0a.117.117 0 01.126.045c.128.18.252.365.372.545a.12.12 0 01-.048.161 11.97 11.97 0 01-1.804.855.12.12 0 00-.041.196c.985.955 1.88 1.99 2.675 3.078a.12.12 0 00.149.025c.48-.323.995-.681 1.53-1.07-.03-.118-.612-2.269-2.68-6.524a.106.106 0 00-.053-.078zM8.667 14.843c-.87 0-1.58-.795-1.58-1.768 0-.974.702-1.77 1.58-1.77.885 0 1.595.8 1.58 1.77 0 .973-.702 1.768-1.58 1.768zm6.666 0c-.87 0-1.58-.795-1.58-1.768 0-.974.702-1.77 1.58-1.77.885 0 1.595.8 1.58 1.77 0 .973-.695 1.768-1.58 1.768z" />
    </svg>
  );
}

function Chip({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] transition duration-[250ms] hover:scale-105 hover:text-[var(--gold)] hover:[filter:drop-shadow(0_0_8px_#B8BEC7)]">
      <Icon className="h-7 w-7 shrink-0" />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{label}</span>
    </span>
  );
}

export function LogoLoopStrip() {
  return (
    <section
      data-home-bg="logoLoop"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-12 md:py-[48px]"
      aria-label="Social links"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="mb-10 text-center font-mono text-[9px] uppercase tracking-[0.2em] md:text-left">
          <ShinyText speed={3} className="font-mono text-[9px] uppercase tracking-[0.2em]">
            FIND ME ON
          </ShinyText>
        </p>
        <LogoLoop
          logoHeight={36}
          gap={56}
          speed={90}
          fadeOut
          fadeOutColor="var(--bg-elevated)"
          scaleOnHover
          ariaLabel="Social platforms"
          logos={[
            {
              node: (
                <Chip
                  icon={Instagram}
                  label={<ShinyText speed={3} className="font-mono text-[11px] uppercase tracking-[0.2em]">@vfxsyn</ShinyText>}
                />
              ),
              href: INSTAGRAM_URL,
              ariaLabel: "Instagram @vfxsyn",
            },
            {
              node: <Chip icon={Youtube} label="@vfxsyn2" />,
              href: "https://www.youtube.com/@vfxsyn2",
              ariaLabel: "YouTube @vfxsyn2",
            },
            {
              node: <Chip icon={SoundCloudGlyph} label="vfxsyn" />,
              href: "https://soundcloud.com/vfxsyn",
              ariaLabel: "SoundCloud vfxsyn",
            },
            {
              node: <Chip icon={DiscordGlyph} label="vfxsyn" />,
              ariaLabel: "Discord vfxsyn",
            },
          ]}
        />
      </div>
    </section>
  );
}
