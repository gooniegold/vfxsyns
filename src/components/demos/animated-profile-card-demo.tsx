"use client";

import { IdentityCardBody, RevealCardContainer } from "@/components/ui/animated-profile-card";
import { ABOUT_ME_PHOTO } from "@/lib/portfolio-media";
import { Instagram, Twitter } from "lucide-react";

const profile = {
  avatarUrl: ABOUT_ME_PHOTO,
  avatarText: "SYN",
  fullName: "VFXSYN",
  place: "Atlanta, GA",
  // The Egypt writing requested
  about: "𓁹 𓊽 𓋹 𓎬 𓏊 𓀤 𓃻 𓆣 𓆗 𓉡 𓊗 𓋴 𓍝 𓎡 𓏛",
  socials: [
    {
      id: "ig",
      url: "https://instagram.com/vfxsyn",
      label: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      id: "tw",
      url: "https://twitter.com/vfxsyn",
      label: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
    },
  ],
};

export default function ProfileCardDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <RevealCardContainer
        accent="var(--accent)"
        textOnAccent="#0f172a"
        mutedOnAccent="#475569"
        base={
          <IdentityCardBody {...profile} scheme="plain" displayAvatar={false} />
        }
        overlay={
          <IdentityCardBody
            {...profile}
            scheme="accented"
            displayAvatar={true}
            cardCss={{ backgroundColor: "var(--accent)" }}
          />
        }
      />
    </div>
  );
}
