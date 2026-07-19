import ScrollReveal from "@/components/ui/ScrollReveal";
import PortableText from "@/components/ui/PortableText";
import { getAboutContent } from "@/lib/sanity";
import TextTicker from "./TextTicker";

// const MILESTONES = [
//   {
//     version: "v1.0.0",
//     note: "Wrote first line of code, had no idea what I was doing.",
//   },
//   {
//     version: "v2.0.0",
//     note: "Learned React. Refused to shut up about it.",
//   },
//   {
//     version: "v3.0.0",
//     note: "Started caring more about the 1px border than the deadline.",
//   },
// ];

// const PRINCIPLES = [
//   "I sweat the 1px border.",
//   "If it's not accessible, it's not finished.",
//   "Delight lives in the details people almost miss.",
//   "Ship it, then make it feel alive.",
// ];

const PRINCIPLES = [
  "I sweat the 1px border.",
  "Accessible by default.",
  "Simple tools, thoughtful execution.",
  "Make the web feel alive.",
];

const About = async () => {
  const about = await getAboutContent();

  if (!about) return null;

  const { headingMain, headingAccent, bio, currentlyItems } = about;

  return (
    <>
      <section id="about" className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-monograph px-6 lg:px-10">
          <ScrollReveal>
            <p className="label-meta mb-6">About</p>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold leading-tight text-foreground ">
              {headingMain}{" "}
              {headingAccent && (
                <span className="text-accent italic">{headingAccent}</span>
              )}
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <ScrollReveal
              delay={120}
              className="lg:border-r lg:border-border lg:pr-12"
            >
              {currentlyItems?.length > 0 && (
                <div className="mb-16">
                  <p className="label-meta mb-6">Currently</p>
                  <ul className="space-y-6">
                    {currentlyItems.map((item, i) => (
                      <li key={i}>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                          {item.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* <div className="border border-border/50 p-6">
                <p className="label-meta mb-6 text-xs">Principles</p>
                <TextTicker items={PRINCIPLES} duration={5000} />
              </div> */}
            </ScrollReveal>

            {bio && (
              <ScrollReveal delay={200}>
                <div className="[&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-muted-foreground md:[&_p]:text-xl">
                  <PortableText value={bio} />
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
