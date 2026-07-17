"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "./ContactForm";
import { Mail } from "lucide-react";
import { XLogo, GithubLogo } from "@/components/icons/BrandIcons";

const SOCIALS = [
  { label: "GitHub.com", href: "https://github.com/MarSkor", icon: GithubLogo },
  { label: "X.com", href: "https://x.com/martinedev_", icon: XLogo },
];

const Contact = () => {
  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <article>
            <ScrollReveal>
              <p className="label-meta mb-4">Contact</p>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-tight text-foreground">
                Let&apos;s make something that feels right.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-8">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                I&apos;m open to freelance work, full-time roles, and the
                occasional interesting conversation. The best way to reach me is
                email - I reply within a day or two.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200} className="mt-10">
              <a
                href="mailto:martinesskor@gmail.com"
                className="link-underline inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl"
              >
                <Mail className="h-6 w-6 text-accent md:h-8 md:w-8" />
                martinesskor@gmail.com
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
          </article>

          <ScrollReveal delay={360}>
            <div className="border border-border bg-card p-8 md:p-10">
              <p className="label-meta mb-6">Send a message</p>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
