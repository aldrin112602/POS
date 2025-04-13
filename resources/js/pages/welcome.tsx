import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid, ShoppingCart, Gift, History, Heart, Bell, Star, ArrowRight
} from 'lucide-react';

import Cartify from '../../images/cartify.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        { title: 'Dashboard', icon: <LayoutGrid className="h-6 w-6" />, description: "View all your store metrics at a glance" },
        { title: 'Browse Products', icon: <ShoppingCart className="h-6 w-6" />, description: "Explore our catalog of products" },
        { title: 'Loyalty Points', icon: <Gift className="h-6 w-6" />, description: "Earn and redeem customer rewards" },
        { title: 'Purchase History', icon: <History className="h-6 w-6" />, description: "Track all your past orders" },
        { title: 'Wishlist', icon: <Heart className="h-6 w-6" />, description: "Save items for later purchase" },
        { title: 'Promotions', icon: <Gift className="h-6 w-6" />, description: "Discover current deals and offers" },
        { title: 'Notifications', icon: <Bell className="h-6 w-6" />, description: "Stay updated with alerts" },
        { title: 'Rate Experience', icon: <Star className="h-6 w-6" />, description: "Share your feedback with us" },
    ];

    return (
        <>
            <Head title="Welcome to Cartify">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-[#FDFDFC] to-[#F8F8F6] text-[#1b1b18] dark:from-[#0a0a0a] dark:to-[#121212] dark:text-[#EDEDEC]">
                {/* Header Navigation */}
                <header className="w-full border-b border-gray-100 dark:border-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={Cartify} alt="Cartify Logo" className="h-10 w-auto" />
                                <span className="ml-3 text-xl font-semibold">Cartify</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-[#1b1b18] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#343430] dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#FFFFFF]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg px-5 py-2 text-sm font-medium transition-colors hover:bg-[#F0F0EE] dark:hover:bg-[#1a1a1a]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-[#1b1b18] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#343430] dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#FFFFFF]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-16 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Welcome to <span className="text-blue-600 dark:text-blue-400">Cartify</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                                Explore features designed to give your customers a seamless shopping experience.
                                Take control of your e-commerce journey with our powerful dashboard.
                            </p>
                            <div className="mt-10 flex justify-center gap-4">
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="#features"
                                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Explore Features
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 bg-white dark:bg-[#0f0f0f]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                                Powerful tools to manage your store and delight your customers
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-[#1a1a1a] hover:border-blue-200 dark:hover:border-blue-900"
                                >
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        {feature.icon}
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-blue-600 dark:bg-blue-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Ready to transform your shopping experience?
                                </h2>
                                <p className="mt-4 text-lg text-blue-100">
                                    Join thousands of merchants who trust Cartify for their e-commerce needs.
                                </p>
                            </div>
                            <div>
                                <Link
                                    href={auth.user ? route('dashboard') : route('register')}
                                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
                                >
                                    {auth.user ? 'Go to Dashboard' : 'Sign up for free'}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white py-12 dark:bg-[#0a0a0a]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                © {new Date().getFullYear()} Cartify. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}