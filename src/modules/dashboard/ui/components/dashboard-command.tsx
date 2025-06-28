import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  // CommandEmpty,
} from "@/components/ui/command";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { CalendarIcon, UserIcon, SearchIcon, Loader2Icon } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const trpc = useTRPC();

  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  );

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  );

  const isLoading = meetings.isLoading || agents.isLoading;
  const hasResults =
    (meetings.data?.items.length ?? 0) > 0 ||
    (agents.data?.items.length ?? 0) > 0;

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
      className="max-w-2xl border-2 border-amber-200 shadow-xl bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b-2 border-amber-200/60 bg-gradient-to-r from-amber-50/80 to-orange-50/80">
        <SearchIcon className="size-5 text-amber-600 flex-shrink-0" />
        <CommandInput
          placeholder="Search meetings, agents, or anything..."
          value={search}
          onValueChange={(value) => setSearch(value)}
          className="border-0 bg-transparent px-0 py-0 text-base placeholder:text-amber-600/70 text-amber-900 font-medium focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {isLoading && (
          <Loader2Icon className="size-5 text-amber-600 animate-spin flex-shrink-0" />
        )}
      </div>

      <CommandList className="max-h-[400px] overflow-y-auto bg-gradient-to-br from-amber-50/60 to-orange-50/60">
        {/* No Results State */}
        {!isLoading && !hasResults && search && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="size-16 rounded-xl bg-gradient-to-br from-amber-100/90 to-orange-100/90 border-2 border-amber-200/50 flex items-center justify-center mb-6 shadow-md">
              <SearchIcon className="size-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-amber-900 text-lg mb-2 font-serif tracking-wide">
              No results found
            </h3>
            <p className="text-sm text-amber-700/80 font-medium">
              Try searching for something else or check your spelling
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !search && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="size-16 rounded-xl bg-gradient-to-br from-amber-200/90 to-orange-200/90 border-2 border-amber-300/50 flex items-center justify-center mb-6 shadow-md">
              <SearchIcon className="size-6 text-amber-700" />
            </div>
            <h3 className="font-bold text-amber-900 text-lg mb-2 font-serif tracking-wide">
              Quick Search
            </h3>
            <p className="text-sm text-amber-700/80 font-medium">
              Start typing to find meetings and agents
            </p>
          </div>
        )}

        {/* Meetings Group */}
        {(meetings.data?.items.length ?? 0) > 0 && (
          <CommandGroup>
            <div className="flex items-center gap-3 px-6 py-3 text-xs font-bold text-amber-800 uppercase tracking-wider bg-gradient-to-r from-amber-100/80 to-orange-100/80 border-b border-amber-200/30">
              <CalendarIcon className="size-4 text-amber-600" />
              Meetings ({meetings.data?.items.length})
            </div>
            {meetings.data?.items.map((meeting) => (
              <CommandItem
                key={meeting.id}
                onSelect={() => {
                  router.push(`/meetings/${meeting.id}`);
                  setOpen(false);
                }}
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gradient-to-r hover:from-amber-100/60 hover:to-orange-100/60 hover:shadow-md transition-all duration-300 group border-b border-amber-200/20 last:border-b-0"
              >
                <div className="size-10 rounded-xl bg-gradient-to-br from-amber-100/90 to-orange-100/90 border-2 border-amber-200/50 flex items-center justify-center flex-shrink-0 group-hover:border-amber-300/70 group-hover:shadow-lg transition-all duration-300">
                  <CalendarIcon className="size-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-amber-900 text-base truncate tracking-wide font-serif">
                    {meeting.name}
                  </p>
                  <p className="text-sm text-amber-700/80 font-medium">
                    Meeting
                  </p>
                </div>
                <div className="text-sm text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                  Open →
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Agents Group */}
        {(agents.data?.items.length ?? 0) > 0 && (
          <CommandGroup>
            <div className="flex items-center gap-3 px-6 py-3 text-xs font-bold text-amber-800 uppercase tracking-wider bg-gradient-to-r from-amber-100/80 to-orange-100/80 border-b border-amber-200/30">
              <UserIcon className="size-4 text-amber-600" />
              Agents ({agents.data?.items.length})
            </div>
            {agents.data?.items.map((agent) => (
              <CommandItem
                key={agent.id}
                onSelect={() => {
                  router.push(`/agents/${agent.id}`);
                  setOpen(false);
                }}
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gradient-to-r hover:from-amber-100/60 hover:to-orange-100/60 hover:shadow-md transition-all duration-300 group border-b border-amber-200/20 last:border-b-0"
              >
                <div className="relative">
                  <GeneratedAvatar
                    seed={agent.name}
                    variant="botttsNeutral"
                    className="size-10 rounded-xl border-2 border-amber-200/50 group-hover:border-amber-300/70 group-hover:shadow-lg transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 size-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-amber-50 shadow-sm"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-amber-900 text-base truncate tracking-wide font-serif">
                    {agent.name}
                  </p>
                  <p className="text-sm text-amber-700/80 font-medium">Agent</p>
                </div>
                <div className="text-sm text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                  Open →
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2Icon className="size-6 text-amber-600 animate-spin" />
          </div>
        )}
      </CommandList>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-3 border-t-2 border-amber-200/60 bg-gradient-to-r from-amber-100/60 to-orange-100/60">
        <div className="flex items-center gap-4 text-xs text-amber-700/80 font-medium">
          <div className="flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-lg border border-amber-300/50 bg-amber-100/80 px-1.5 font-mono text-[10px] font-medium text-amber-800 shadow-sm">
              ⌘K
            </kbd>
            <span>to search</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-lg border border-amber-300/50 bg-amber-100/80 px-1.5 font-mono text-[10px] font-medium text-amber-800 shadow-sm">
              ↵
            </kbd>
            <span>to select</span>
          </div>
        </div>
        <div className="text-xs text-amber-700/80 font-medium">
          ESC to close
        </div>
      </div>
    </CommandResponsiveDialog>
  );
};
