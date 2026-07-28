"use client";
import { List, LayoutGrid, Rows3, type LucideIcon } from "lucide-react";

export type WorkView = "list" | "grid" | "index";

interface ViewOption {
  id: WorkView;
  label: string;
  icon: LucideIcon;
  hideOnMobile?: boolean;
}


const VIEWS: ViewOption[]  = [
  { id: "list", label: "List view", icon: List, hideOnMobile: true },
  { id: "grid", label: "Grid view", icon: LayoutGrid },
  { id: "index", label: "Index view", icon: Rows3 },
];

interface ViewSwitcherProps {
  view: WorkView;
  onChange: (view: WorkView) => void;
}


const ViewSwitcher = ({ view, onChange }: ViewSwitcherProps) => {
  return (
    <div className="flex items-center gap-1 border border-border p-1">
      {VIEWS.map(({ id, label, icon: Icon, hideOnMobile }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={label}
          title={label}
          className={`flex h-8 w-8 items-center justify-center transition-colors cursor-pointer ${
            hideOnMobile ? "hidden md:flex" : "flex"
          } ${
            view === id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
