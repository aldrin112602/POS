import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid, ShoppingCart, Gift, History, Heart, Bell, Star
} from 'lucide-react';

import Cartify from '../../images/cartify.png';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        { title: 'Dashboard', icon: <LayoutGrid className="h-6 w-6" /> },
        { title: 'Browse Products', icon: <ShoppingCart className="h-6 w-6" /> },
        { title: 'Loyalty Points', icon: <Gift className="h-6 w-6" /> },
        { title: 'Purchase History', icon: <History className="h-6 w-6" /> },
        { title: 'Wishlist', icon: <Heart className="h-6 w-6" /> },
        { title: 'Promotions', icon: <Gift className="h-6 w-6" /> },
        { title: 'Notifications', icon: <Bell className="h-6 w-6" /> },
        { title: 'Rate Experience', icon: <Star className="h-6 w-6" /> },
    ];

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full max-w-4xl flex-col items-center justify-center text-center space-y-8">
                    <h1 className="text-3xl font-semibold">Welcome to Cartify!</h1>
                    <img src={Cartify} alt="Cartify Logo" className='mx-auto max-w-25' />
                    <p className="text-base text-gray-600 dark:text-gray-400">Explore features designed to give your customers a seamless shopping experience.</p>

                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#1a1a1a]">
                                <div className="mb-2 text-primary">{feature.icon}</div>
                                <span className="text-sm font-medium">{feature.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

