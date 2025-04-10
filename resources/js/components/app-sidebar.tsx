import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell, BookOpen, Folder, Gift, Heart, History, LayoutGrid, ShoppingCart, Star, Mail, Phone } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Browse Products',
        href: '/browse-products',
        icon: ShoppingCart,
    },
    {
        title: 'Loyalty Points',
        href: '/loyalty-points',
        icon: Gift,
    },
    {
        title: 'Purchase History',
        href: '/purchase-history',
        icon: History,
    },
    {
        title: 'Wishlist',
        href: '/wishlist',
        icon: Heart,
    },
    {
        title: 'Promotions',
        href: '/promotions',
        icon: Gift,
    },
    {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
    },
    {
        title: 'Rate Experience',
        href: '/rate-experience',
        icon: Star,
    },
];
const footerNavItems: NavItem[] = [
    {
        title: 'Email Us',
        href: 'mailto:caballeroaldrin02@gmail.com',
        icon: Mail,
    },
    {
        title: 'Call Us',
        href: 'tel:+639512793354',
        icon: Phone,
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
