import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell, BellDot, LayoutGrid, Map, Option, Pen, UserPen } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Evènements',
        href: '/event',
        icon: Option,
    },

    {
        title: 'Invités',
        href: '/guest',
        icon: UserPen,
    },

    {
        title: 'Place',
        href: '/guest-seat',
        icon: Map,
    },

    {
        title: 'Assignement',
        href: '/assignment',
        icon: Pen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Notification Réçu',
        href: route('notification.receive.index'),
        icon: Bell,
    },

    {
        title: 'Notification Envoyer',
        href: route('notification.send.index'),
        icon: BellDot,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
