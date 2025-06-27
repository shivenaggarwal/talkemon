import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-xl border-2 border-amber-200 p-3 w-full flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-orange-50/50 hover:bg-gradient-to-r hover:from-amber-100/70 hover:to-orange-100/70 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden gap-x-2 shadow-md">
          {data.user.image ? (
            <Avatar className="border-2 border-amber-300 ring-2 ring-amber-200/50">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3 border-2 border-amber-300 ring-2 ring-amber-200/50"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full font-semibold text-amber-900 tracking-tight">
              {data.user.name}
            </p>
            <p className="text-xs truncate w-full text-amber-700/80 font-medium">
              {data.user.email}
            </p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0 text-amber-600" />
        </DrawerTrigger>
        <DrawerContent className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 border-t-2 border-amber-200 backdrop-blur-sm">
          <DrawerHeader className="bg-gradient-to-br from-cream-100 to-orange-50 border-b-2 border-amber-200">
            <DrawerTitle className="text-amber-900 font-bold tracking-wide font-serif">
              {data.user.name}
            </DrawerTitle>
            <DrawerDescription className="text-amber-700 font-medium">
              {data.user.email}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="space-y-3 p-6">
            <Button
              variant="outline"
              onClick={() => {}}
              className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-12 font-medium tracking-tight"
            >
              <CreditCardIcon className="size-4 text-amber-600" />
              <span>Billing</span>
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-12 font-medium tracking-tight"
            >
              <LogOutIcon className="size-4 text-amber-600" />
              <span>Logout</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-xl border-2 border-amber-200 p-3 w-full flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-orange-50/50 hover:bg-gradient-to-r hover:from-amber-100/70 hover:to-orange-100/70 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden gap-x-2 shadow-md">
        {data.user.image ? (
          <Avatar className="border-2 border-amber-300 ring-2 ring-amber-200/50">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3 border-2 border-amber-300 ring-2 ring-amber-200/50"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full font-semibold text-amber-900 tracking-tight">
            {data.user.name}
          </p>
          <p className="text-xs truncate w-full text-amber-700/80 font-medium">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-amber-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        className="w-72 bg-gradient-to-br from-amber-50/95 to-orange-50/95 border-2 border-amber-200 shadow-xl backdrop-blur-sm rounded-xl"
      >
        <DropdownMenuLabel className="bg-gradient-to-br from-cream-100 to-orange-50 border-b-2 border-amber-200 rounded-t-lg">
          <div className="flex flex-col gap-1 p-2">
            <span className="font-bold truncate text-amber-900 tracking-wide font-serif">
              {data.user.name}
            </span>
            <span className="text-sm font-medium text-amber-700 truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <div className="p-2 space-y-1">
          <DropdownMenuItem className="cursor-pointer flex items-center justify-between rounded-lg bg-amber-50/50 border border-amber-200/50 text-amber-800 hover:bg-amber-100 hover:border-amber-300 transition-all duration-300 p-3 font-medium tracking-tight">
            <span>Billing</span>
            <CreditCardIcon className="size-4 text-amber-600" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className="cursor-pointer flex items-center justify-between rounded-lg bg-amber-50/50 border border-amber-200/50 text-amber-800 hover:bg-amber-100 hover:border-amber-300 transition-all duration-300 p-3 font-medium tracking-tight"
          >
            <span>LogOut</span>
            <LogOutIcon className="size-4 text-amber-600" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
