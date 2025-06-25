"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filter";
import { AgentSearchFilter } from "@/modules/agents/ui/components/agent-search-filter";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4 bg-gradient-to-br from-amber-50/30 to-orange-50/30">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-xl text-amber-900 drop-shadow-sm tracking-wide font-serif">
            My Agents
          </h5>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
            className="bg-gradient-to-r from-amber-400 to-orange-400 border-2 border-amber-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-10 px-4"
          >
            <PlusIcon className="size-4 text-white" />
            <span className="font-medium tracking-tight">New Agent</span>
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <AgentSearchFilter />
            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
