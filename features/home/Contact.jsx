"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "./ContactForm";
import { FiMail, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import { Mail } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: FiGithub },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FiLinkedin },
  { label: "X", href: "https://x.com", icon: FiTwitter },
];

const Contact = () => {
  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — info */}
          <div>
            <ScrollReveal>
              <p className="label-meta mb-4">Contact</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Let's make something that feels right.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-8">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                I'm open to freelance work, full-time roles, and the occasional
                interesting conversation. The best way to reach me is email — I
                reply within a day or two.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200} className="mt-10">
              <a
                href="mailto:hello@alexrivera.dev"
                className="link-underline inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                <Mail className="h-6 w-6 text-accent md:h-8 md:w-8" />
                hello@alexrivera.dev
              </a>
            </ScrollReveal>

            <ScrollReveal delay={280} className="mt-12">
              <div className="flex flex-wrap gap-6">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-11 items-center gap-2 border border-border px-5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — form */}
          <ScrollReveal delay={360}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
