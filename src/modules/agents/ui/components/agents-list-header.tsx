"use client";

import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon />
            New Agent
          </Button>
        </div>
      </div>
    </>
  );
};
