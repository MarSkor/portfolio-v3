// import { base44 } from '@/api/base44Client';
import ScrollReveal from "@/components/ui/ScrollReveal";

const TYPE_LABELS = {
  reading: "Reading",
  listening: "Listening",
  obsessing: "Obsessing over",
  fueling: "Fueling on",
};

const About = () => {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <ScrollReveal>
          <p className="label-meta mb-4">About</p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
            The person behind the pixels
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7" delay={80}>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm Alex — a front-end developer who fell in love with the web
                the moment I realized you could make a button feel like a real,
                physical thing. For the past six years I've been obsessing over
                the space where engineering meets aesthetics: the millisecond of
                a transition, the weight of a typeface, the relief of a layout
                that finally breathes.
              </p>
              <p>
                My approach is simple —{" "}
                <span className="text-foreground">systems with a soul.</span> I
                believe great interfaces are invisible until they delight you. I
                sweat the details most people scroll past, because those are the
                ones your fingers remember.
              </p>
              <p>
                When I'm not pushing pixels, I'm probably sketching type,
                rearranging my desk for the third time this week, or trying to
                explain to someone why a 1px border matters more than they
                think.
              </p>
            </div>
          </ScrollReveal>

          {/* <ScrollReveal className="lg:col-span-5" delay={160}>
            <div className="border border-border bg-card p-8 lg:p-10">
              <p className="label-meta mb-8">Currently</p>
              {items.length === 0 ? (
                <div className="space-y-6">
                  {Object.entries(TYPE_LABELS).map(([type, label]) => (
                    <div key={type} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Status: {label}
                      </p>
                      <p className="mt-2 text-base text-foreground">—</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Status: {item.label || TYPE_LABELS[item.type] || item.type}
                      </p>
                      <p className="mt-2 text-base text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal> */}
        </div>
      </div>
    </section>
  );
};

export default About;
