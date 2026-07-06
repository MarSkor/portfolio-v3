const BlogTagsFilter = ({ tags, onTagChange, activeTag }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onTagChange(null)}
        className={`cursor-pointer border px-3 py-1 font-mono text-[11px] uppercase tracking-wider leading-none transition-all duration-300 ${
          activeTag === null
            ? "border-foreground bg-foreground text-background"
            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(activeTag === tag ? null : tag)}
          className={`cursor-pointer border px-4 py-2 font-mono text-[11px] uppercase tracking-wider  leading-none  transition-all duration-300 ${
            activeTag === tag
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default BlogTagsFilter;
