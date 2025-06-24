"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "@/modules/dashboard/ui/components/dashboard-command";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 py-3 items-center border-b-2 border-amber-200 bg-gradient-to-br from-cream-100 to-orange-50 backdrop-blur-sm shadow-lg">
        <Button
          className="size-9 bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
          variant="outline"
          onClick={toggleSidebar}
        >
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4 text-amber-600" />
          ) : (
            <PanelLeftCloseIcon className="size-4 text-amber-600" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon className="text-amber-600" />
          <span className="text-amber-800 font-medium tracking-tight">
            Search
          </span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border-2 border-amber-300 bg-amber-100/80 px-1.5 font-mono text-[10px] font-medium text-amber-700 shadow-sm">
            <span className="text-xs">⌘K</span>
          </kbd>
        </Button>
      </nav>
    </>
  );
};
