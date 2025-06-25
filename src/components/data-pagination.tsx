import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-amber-700/80">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sm rounded-lg font-medium tracking-tight disabled:bg-amber-50/30 disabled:border-amber-200/50 disabled:text-amber-600/50"
        >
          Previous
        </Button>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-sm rounded-lg font-medium tracking-tight disabled:bg-amber-50/30 disabled:border-amber-200/50 disabled:text-amber-600/50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
