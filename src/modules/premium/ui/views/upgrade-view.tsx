"use client";

import { authClient } from "@/lib/auth-client";
import { PricingCard } from "@/modules/premium/ui/components/pricing-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const UpgradeView = () => {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions()
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-cream-50/30">
      <div className="container mx-auto py-8 px-4 md:px-8 flex flex-col gap-y-12">
        {/* Hero Section */}
        <div className="flex flex-col gap-y-12 items-center">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100/80 to-orange-100/80 border-2 border-amber-200 rounded-full px-6 py-2 shadow-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-amber-800 tracking-tight">
                Current Plan Status
              </span>
            </div>

            <h1 className="font-bold text-3xl md:text-5xl text-amber-900 tracking-tight font-serif leading-tight">
              You are on the{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-extrabold">
                {currentSubscription?.name ?? "Free"}
              </span>{" "}
              plan
            </h1>

            <p className="text-lg md:text-xl text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
              Choose the perfect plan to unlock premium features and take your
              experience to the next level
            </p>
          </div>

          {/* Pricing Cards Container */}
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => {
                const isCurrentProduct = currentSubscription?.id === product.id;
                const isPremium = !!currentSubscription;

                let buttonText = "Upgrade";
                let onClick = () =>
                  authClient.checkout({ products: [product.id] });

                if (isCurrentProduct) {
                  buttonText = "Manage";
                  onClick = () => authClient.customer.portal();
                } else if (isPremium) {
                  buttonText = "Change Plan";
                  onClick = () => authClient.customer.portal();
                }

                return (
                  <div
                    key={product.id}
                    className={`relative ${
                      product.metadata.variant === "highlighted"
                        ? "transform lg:-translate-y-4"
                        : ""
                    }`}
                  >
                    {product.metadata.variant === "highlighted" && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-amber-400">
                          ✨ Most Popular
                        </div>
                      </div>
                    )}

                    {isCurrentProduct && (
                      <div className="absolute -top-3 -right-3 z-10">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-400">
                          <span className="text-lg">✓</span>
                        </div>
                      </div>
                    )}

                    <PricingCard
                      buttonText={buttonText}
                      onClick={onClick}
                      variant={
                        product.metadata.variant === "highlighted"
                          ? "highlighted"
                          : "default"
                      }
                      title={product.name}
                      price={
                        product.prices[0].amountType === "fixed"
                          ? product.prices[0].priceAmount / 100
                          : 0
                      }
                      description={product.description}
                      priceSuffix={`/${product.prices[0].recurringInterval}`}
                      features={product.benefits.map(
                        (benefit) => benefit.description
                      )}
                      badge={(product.metadata.badge as string) || null}
                      className={
                        isCurrentProduct
                          ? "ring-4 ring-emerald-200/50 border-emerald-300"
                          : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA Section */}
          {/* <div className="text-center space-y-4 mt-12">
            <div className="bg-gradient-to-r from-amber-100/60 to-orange-100/60 border-2 border-amber-200/60 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm">
              <h3 className="font-bold text-xl text-amber-900 mb-2 font-serif">
                Need help choosing?
              </h3>
              <p className="text-amber-700/80 font-medium mb-4">
                Our team is here to help you find the perfect plan for your
                needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-2 bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl font-medium tracking-tight">
                  Contact Support
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl font-medium tracking-tight border-2 border-amber-500">
                  View FAQ
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-cream-50/30">
      <div className="container mx-auto py-16 px-4 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-amber-900 font-serif">
              Loading Plans
            </h3>
            <p className="text-amber-700/80 font-medium">
              This may take a few seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UpgradeViewError = () => {
  return (
    <div className="w-full bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-cream-50/30">
      <div className="container mx-auto py-16 px-4 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">⚠️</span>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-2xl text-amber-900 font-serif">
              Something went wrong
            </h3>
            <p className="text-amber-700/80 font-medium">
              We couldn&apos;t load the pricing plans. Please try again later.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl font-medium tracking-tight border-2 border-amber-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
