import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div
                className={`flex h-full flex-1 flex-col gap-6  bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-all duration-500 ease-in-out dark:from-gray-900 dark:to-indigo-950 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <h1 className="mb-2 text-3xl font-bold text-indigo-800 transition-all duration-300 dark:text-indigo-300">Welcome Back Aldrin!</h1>

                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    {/* Stats Cards */}
                    <div className="relative aspect-video transform overflow-hidden rounded-xl border-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-20 backdrop-blur-sm"></div>
                        <div className="relative z-10 p-6">
                            <h2 className="text-lg font-semibold">Total Loyalty Points</h2>
                            <p className="mt-3 text-4xl font-bold">1,250</p>
                            <div className="mt-4 text-sm opacity-80">+125 points this month</div>
                        </div>
                    </div>

                    <div className="relative aspect-video transform overflow-hidden rounded-xl border-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-20 backdrop-blur-sm"></div>
                        <div className="relative z-10 p-6">
                            <h2 className="text-lg font-semibold">This Month's Purchases</h2>
                            <p className="mt-3 text-4xl font-bold">₱4,560.00</p>
                            <div className="mt-4 text-sm opacity-80">12 transactions</div>
                        </div>
                    </div>

                    <div className="relative aspect-video transform overflow-hidden rounded-xl border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-20 backdrop-blur-sm"></div>
                        <div className="relative z-10 p-6">
                            <h2 className="text-lg font-semibold">Wishlist Items</h2>
                            <p className="mt-3 text-4xl font-bold">6</p>
                            <div className="mt-4 text-sm opacity-80">2 new items added</div>
                        </div>
                    </div>
                </div>

                {/* Purchases and Recommendations Section */}
                <div className="relative flex-1 overflow-hidden rounded-xl border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:min-h-min dark:bg-gray-800/60">
                    <div className="space-y-6 p-6">
                        <h2 className="border-b border-gray-200 pb-3 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">
                            Recent Purchases
                        </h2>
                        <div className="space-y-3">
                            {/* Replace with real data dynamically */}
                            <div className="flex items-center justify-between rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="font-medium">Milk Tea (Large) x2</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">₱240</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="font-medium">Red Velvet Cake Slice</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">₱120</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg p-3 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="font-medium">Chocolate Croissant</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">₱95</span>
                            </div>
                        </div>

                        <h2 className="mt-8 border-b border-gray-200 pb-3 text-xl font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-200">
                            Recommended for You
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <div className="transform rounded-xl border-0 bg-gradient-to-r from-blue-100 to-indigo-100 p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-gray-700 dark:to-indigo-900">
                                <h3 className="font-medium text-indigo-800 dark:text-indigo-300">Iced Americano</h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Based on your coffee purchases</p>
                            </div>
                            <div className="transform rounded-xl border-0 bg-gradient-to-r from-pink-100 to-rose-100 p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-gray-700 dark:to-rose-900">
                                <h3 className="font-medium text-rose-800 dark:text-rose-300">Strawberry Latte</h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Frequently bought with Red Velvet</p>
                            </div>
                            <div className="transform rounded-xl border-0 bg-gradient-to-r from-amber-100 to-orange-100 p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-gray-700 dark:to-amber-900">
                                <h3 className="font-medium text-amber-800 dark:text-amber-300">S'mores Bar</h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Customer favorite this week</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
