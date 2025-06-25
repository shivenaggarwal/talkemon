import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filter";
import { SearchIcon } from "lucide-react";

export const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();
  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-amber-50/30 border-2 border-amber-200 text-amber-900 placeholder:text-amber-600/70 focus:border-amber-400 focus:ring-amber-300/50 transition-all duration-300 rounded-lg shadow-sm w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => {
          setFilters({ search: e.target.value });
        }}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-amber-600/70" />
    </div>
  );
};
