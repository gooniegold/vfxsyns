"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/constants";
import type { ComponentProps, ReactNode } from 'react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'NAVIGATION',
		links: [
			{ title: 'Home', href: '/' },
			{ title: 'Portfolio', href: '/portfolio' },
			{ title: 'Shop/Packs', href: '/shop' },
			{ title: 'Contact', href: '/contact' },
		],
	},
	{
		label: 'COMPANY',
		links: [
			{ title: 'About VFXSYN', href: '/#about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
      { title: 'License Portal', href: '/license' },
      { title: 'Admin Control', href: '/vfxsyn-control' },
		],
	},
	{
		label: 'SOCIALS',
		links: [
			{ title: 'Instagram', href: INSTAGRAM_URL, icon: Instagram },
			{ title: 'YouTube', href: '#', icon: Youtube },
			{ title: 'Twitter', href: '#', icon: Twitter },
		],
	},
];

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function Footer() {
	return (
		<footer className="relative z-[10] flex w-full flex-col items-center justify-center border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-16 lg:py-20">
			<div className="mx-auto w-full max-w-[1400px]">
                <div className="grid w-full gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-10">
                    <AnimatedContainer className="space-y-4 md:col-span-2 xl:col-span-1">
                        <p className="font-display text-[1.75rem] tracking-[0.06em] text-[var(--text-primary)]">
                            VFXSYN
                        </p>
                        <p className="font-mono mt-2 text-[10px] leading-relaxed tracking-[0.2em] text-[var(--text-secondary)]">
                            Atlanta · post · shop
                        </p>
                        <p className="text-[var(--text-secondary)] font-mono mt-8 text-[9px] tracking-[0.2em] opacity-60">
                            © {new Date().getFullYear()} VFXSYN. All rights reserved.
                        </p>
                    </AnimatedContainer>

                    <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0 lg:ml-auto">
                        {footerLinks.map((section, index) => (
                            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                                <div className="mb-10 md:mb-0">
                                    <h3 className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-secondary)] opacity-80">{section.label}</h3>
                                    <ul className="text-muted-foreground mt-6 space-y-4 text-sm font-body">
                                        {section.links.map((link) => (
                                            <li key={link.title}>
                                                <Link
                                                    href={link.href}
                                                    data-cursor="hover"
                                                    className="hover:text-[var(--accent-bright)] inline-flex items-center text-[var(--text-primary)] transition-all duration-300"
                                                >
                                                    {link.icon && <link.icon className="me-2 size-4 text-[var(--accent)] opacity-80" />}
                                                    {link.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedContainer>
                        ))}
                    </div>
                </div>
            </div>
		</footer>
	);
}
