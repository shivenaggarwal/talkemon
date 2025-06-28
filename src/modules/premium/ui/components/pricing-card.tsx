import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CircleCheckIcon } from "lucide-react";

const pricingCardVariants = cva(
  "rounded-xl border-2 p-6 py-8 w-full h-[480px] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-amber-50/90 to-orange-50/90 border-amber-200 text-amber-900",
        highlighted:
          "bg-gradient-to-br from-amber-600 to-orange-600 border-amber-500 text-white shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const pricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "fill-amber-600 text-amber-50",
      highlighted: "fill-amber-100 text-amber-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryTextVariants = cva("", {
  variants: {
    variant: {
      default: "text-amber-700/80",
      highlighted: "text-amber-100/90",
    },
  },
});

const pricingCardBadgeVariants = cva(
  "text-amber-800 text-xs font-medium p-2 border border-amber-300/50 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-amber-100/80",
        highlighted: "bg-amber-200 text-amber-900 border-amber-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({
  variant,
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
}: Props) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), className)}>
      {/* Header Section */}
      <div className="flex flex-col gap-y-3 mb-6">
        <div className="flex items-center gap-x-2">
          <h6 className="font-bold text-xl tracking-wide font-serif">
            {title}
          </h6>
          {badge ? (
            <Badge
              className={cn(
                pricingCardBadgeVariants({ variant }),
                "rounded-lg"
              )}
            >
              {badge}
            </Badge>
          ) : null}
        </div>
        {description && (
          <p
            className={cn(
              "text-sm font-medium min-h-[40px]",
              pricingCardSecondaryTextVariants({ variant })
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Price Section */}
      <div className="flex items-end gap-x-1 mb-6">
        <h4 className="text-4xl font-bold tracking-tight">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(price)}
        </h4>
        <span
          className={cn(
            "text-lg font-medium",
            pricingCardSecondaryTextVariants({ variant })
          )}
        >
          {priceSuffix}
        </span>
      </div>

      {/* Features Section - Takes remaining space */}
      <div className="flex flex-col gap-y-4 flex-1">
        <p className="font-bold uppercase tracking-wide text-sm">Features</p>
        <ul className="flex flex-col gap-y-3 flex-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-start gap-x-3 font-medium text-sm",
                pricingCardSecondaryTextVariants({ variant })
              )}
            >
              <CircleCheckIcon
                className={cn(
                  pricingCardIconVariants({ variant }),
                  "mt-0.5 flex-shrink-0"
                )}
              />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Separator */}
      <Separator
        className={cn(
          "my-6",
          variant === "highlighted" ? "bg-amber-300/30" : "bg-amber-300/50"
        )}
      />

      {/* Button Section */}
      <Button
        className={cn(
          "w-full h-12 font-medium tracking-tight rounded-xl transition-all duration-300",
          variant === "highlighted"
            ? "bg-amber-100 text-amber-900 hover:bg-amber-200 hover:shadow-lg border-2 border-amber-200 hover:border-amber-300"
            : "bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg"
        )}
        size="lg"
        variant="outline"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};
