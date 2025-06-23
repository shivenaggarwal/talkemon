"use client";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    },
]

export const DashboardSidebar = () => {
    const pathName = usePathname()

    return(
        <Sidebar className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm border-0 shadow-2xl">
            <SidebarHeader className="flex justify-center items-center w-full text-amber-900 bg-gradient-to-br from-cream-100 to-orange-50 border-b-2 border-amber-200 p-0">
                <Link href="/" className="flex items-center gap-3 py-6 hover:scale-[1.02] transition-all duration-300 max-w-fit">
                    <Image src="/logo.svg" height={48} width={48} alt="talkemon" className="filter drop-shadow-lg"/>
                    <p className="text-3xl font-bold font-serif tracking-wide text-amber-900 drop-shadow-sm">Talkemon</p>
                </Link>
            </SidebarHeader>
            
            <div className="px-6 py-4">
                {/* <Separator className="bg-gradient-to-r from-transparent via-amber-300/80 to-transparent h-0.5 shadow-sm"/> */}
            </div>
            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-3">
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-14 rounded-xl transition-all duration-300 border-2 bg-amber-50/50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] shadow-md font-medium",
                                        pathName === item.href && "bg-gradient-to-r from-amber-400 to-orange-400 border-amber-400 shadow-xl scale-[1.02] text-white font-semibold hover:from-amber-500 hover:to-orange-500"
                                    )}
                                    isActive = {pathName === item.href}
                                    >
                                        <Link href={item.href} className="flex items-center gap-4 px-4">
                                        <item.icon className={cn(
                                            "size-5 transition-colors duration-300",
                                            pathName === item.href ? "text-white" : "text-amber-600"
                                        )}/>
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-3 py-6">
                <Separator className="bg-gradient-to-r from-transparent via-amber-300/80 to-transparent h-0.5 shadow-sm"/>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-3">
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-14 rounded-xl transition-all duration-300 border-2 bg-amber-50/50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] shadow-md font-medium",
                                        pathName === item.href && "bg-gradient-to-r from-amber-400 to-orange-400 border-amber-400 shadow-xl scale-[1.02] text-white font-semibold hover:from-amber-500 hover:to-orange-500"
                                    )}
                                    isActive = {pathName === item.href}
                                    >
                                        <Link href={item.href} className="flex items-center gap-4 px-4">
                                        <item.icon className={cn(
                                            "size-5 transition-colors duration-300",
                                            pathName === item.href ? "text-white" : "text-amber-600"
                                        )}/>
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-6 bg-gradient-to-br from-cream-100 to-orange-50 border-t-2 border-amber-200">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}
