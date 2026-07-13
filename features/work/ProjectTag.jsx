export const TechBadge = ({ children, className = "" }) => (
  <span
    className={`
     border border-foreground/10 px-4 py-2 bg-muted/30 font-mono text-[11px] uppercase tracking-normal text-foreground/90 transition-colors leading-none
      ${className}
    `}
  >
    <span className="translate-y-[0.5px]">{children}</span>
  </span>
);

const TechStack = ({ tags, className = "" }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tech) => (
        <TechBadge key={tech}>{tech}</TechBadge>
      ))}
    </div>
  );
};

export default TechStack;
