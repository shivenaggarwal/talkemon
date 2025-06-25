import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-2 border-amber-200 rounded-xl p-10 shadow-lg backdrop-blur-sm">
        <div className="p-3 rounded-full bg-gradient-to-br from-red-50/50 to-red-100/50 border-2 border-red-200 shadow-md ring-2 ring-red-200/30">
          <AlertCircleIcon className="size-6 text-red-500" />
        </div>
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-semibold text-amber-900 tracking-tight">
            {title}
          </h6>
          <p className="text-sm text-amber-700/80">{description}</p>
        </div>
      </div>
    </div>
  );
};
