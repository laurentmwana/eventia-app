import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Map, Option, Pen, User2, UserPen } from 'lucide-react';
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
        title: 'Utilisateur',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: User2,
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
