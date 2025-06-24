import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/30 to-orange-50/30 p-8 rounded-xl border-2 border-amber-200/50 shadow-sm backdrop-blur-sm">
      <div className="p-4 rounded-full bg-gradient-to-br from-amber-100/50 to-orange-100/50 border-2 border-amber-200 shadow-md ring-2 ring-amber-200/30 mb-6">
        <Image
          src="/logo.svg"
          alt="Empty"
          width={240}
          height={240}
          className="opacity-80"
        />
      </div>
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-semibold text-amber-900 tracking-tight">
          {title}
        </h6>
        <p className="text-sm text-amber-700/80">{description}</p>
      </div>
    </div>
  );
};
