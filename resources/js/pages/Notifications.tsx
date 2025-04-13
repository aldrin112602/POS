import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Archive, Bell, CheckCircle, CreditCard, Gift, MoreVertical, ShoppingBag, Tag, Trash2, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wishlist',
        href: '/wishlist',
    },
];

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'Order Shipped',
            message: 'Your order #38294 has been shipped and is on its way!',
            date: 'Today, 9:42 AM',
            read: false,
            icon: <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
        },
        {
            id: 2,
            type: 'promotion',
            title: 'Weekend Flash Sale',
            message: "Don't miss out on our weekend flash sale! 25% off select electronics.",
            date: 'Today, 8:15 AM',
            read: false,
            icon: <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
        },
        {
            id: 3,
            type: 'order',
            title: 'Order Delivered',
            message: 'Your order #37651 has been delivered. Enjoy your purchase!',
            date: 'Yesterday, 2:30 PM',
            read: true,
            icon: <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />,
        },
        {
            id: 4,
            type: 'payment',
            title: 'Payment Successful',
            message: 'Your payment of $149.99 for order #38294 has been processed successfully.',
            date: 'Yesterday, 10:18 AM',
            read: true,
            icon: <CreditCard className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
        },
        {
            id: 5,
            type: 'system',
            title: 'Account Security Alert',
            message: 'A new login was detected on your account from a new device. Please verify it was you.',
            date: 'Apr 11, 2025',
            read: true,
            icon: <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />,
        },
        {
            id: 6,
            type: 'promotion',
            title: 'New Rewards Available',
            message: "You've earned enough loyalty points to claim a reward! Check out your options now.",
            date: 'Apr 10, 2025',
            read: true,
            icon: <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
        },
    ]);

    const [activeFilter, setActiveFilter] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)));
        setDropdownOpen(null);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
        setDropdownOpen(null);
    };

    const deleteAllRead = () => {
        setNotifications(notifications.filter((notification) => !notification.read));
    };

    const toggleDropdown = (id: number) => {
        setDropdownOpen((prevState) => (prevState === id ? null : id));
    };

    const filterNotifications = () => {
        if (activeFilter === 'all') return notifications;
        if (activeFilter === 'unread') return notifications.filter((notification) => !notification.read);
        return notifications.filter((notification) => notification.type === activeFilter);
    };

    const filteredNotifications = filterNotifications();
    const unreadCount = notifications.filter((notification) => !notification.read).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications | Cartify" />

            <div
                className={`flex h-full flex-1 flex-col gap-6 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 transition-all duration-500 ease-in-out dark:from-gray-900 dark:to-purple-950 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="w-full">
                    <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">Notifications</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Stay updated with your orders, promotions, and account activity
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark All Read
                                </button>
                            )}
                            <button
                                onClick={deleteAllRead}
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Clear Read
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'all'
                                    ? 'bg-blue-600 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveFilter('unread')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'unread'
                                    ? 'bg-blue-600 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Unread {unreadCount > 0 && `(${unreadCount})`}
                        </button>
                        <button
                            onClick={() => setActiveFilter('order')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'order'
                                    ? 'bg-blue-600 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveFilter('promotion')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'promotion'
                                    ? 'bg-blue-600 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Promotions
                        </button>
                        <button
                            onClick={() => setActiveFilter('payment')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'payment'
                                    ? 'bg-blue-600 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Payments
                        </button>
                        <button
                            onClick={() => setActiveFilter('system')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'system'
                                    ? 'bg-blue-600 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            System
                        </button>
                    </div>

                    {filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                            {filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`relative overflow-hidden rounded-lg border ${
                                        notification.read
                                            ? 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
                                            : 'border-l-4 border-blue-500 bg-white shadow-sm dark:border-blue-600 dark:bg-gray-900'
                                    }`}
                                >
                                    <div className="flex p-4">
                                        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                            {notification.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3
                                                        className={`text-base font-medium ${
                                                            notification.read
                                                                ? 'text-gray-900 dark:text-gray-100'
                                                                : 'font-semibold text-gray-900 dark:text-white'
                                                        }`}
                                                    >
                                                        {notification.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                                                </div>
                                                <div className="relative flex items-center space-x-2">
                                                    <span className="text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                        {notification.date}
                                                    </span>
                                                    <button
                                                        onClick={() => toggleDropdown(notification.id)}
                                                        className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    >
                                                        <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                    </button>

                                                    {dropdownOpen === notification.id && (
                                                        <div className="ring-opacity-5 absolute right-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black dark:bg-gray-800 dark:ring-gray-700 mr-7 mt-6">
                                                            {!notification.read && (
                                                                <button
                                                                    onClick={() => markAsRead(notification.id)}
                                                                    className="flex w-full items-center px-4 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                                >
                                                                    <CheckCircle className="mr-3 h-4 w-4" />
                                                                    Mark as read
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteNotification(notification.id)}
                                                                className="flex w-full items-center px-4 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                            >
                                                                <Trash2 className="mr-3 h-4 w-4" />
                                                                Delete
                                                            </button>
                                                            <button className="flex w-full items-center px-4 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                                                <Archive className="mr-3 h-4 w-4" />
                                                                Archive
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-16 flex flex-col items-center">
                            <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                                <Bell className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">No notifications found</h3>
                            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                                {activeFilter === 'all'
                                    ? "You don't have any notifications at the moment."
                                    : `You don't have any ${activeFilter === 'unread' ? 'unread' : activeFilter} notifications.`}
                            </p>
                            {activeFilter !== 'all' && (
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    View All Notifications
                                </button>
                            )}
                        </div>
                    )}

                    {filteredNotifications.length > 0 && (
                        <div className="mt-8 text-center">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                Load more notifications
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
