import React from "react";
import ScrollReveal from "./ScrollReveal";

const PageHeading = ({ label, title, description, children }) => {
  return (
    <section className="border-b border-border py-18 md:py-20">
      <div className="container-x">
        <ScrollReveal>
          <p className="label-meta mb-4">{label}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          {children && <div className="mt-8">{children}</div>}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PageHeading;
