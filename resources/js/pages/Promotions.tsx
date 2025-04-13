import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, CheckCircle, Clipboard, Clock, Gift, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promotions',
        href: '/promotions',
    },
];

export default function Promotions() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const promotions = [
        {
            id: 1,
            title: 'Spring Sale',
            description: 'Get 20% off on all spring collection items',
            code: 'SPRING20',
            validUntil: 'May 15, 2025',
            daysLeft: 32,
            category: 'sale',
            badge: 'Featured',
        },
        {
            id: 2,
            title: 'New Customer Discount',
            description: 'First-time customers receive 15% off their first purchase',
            code: 'WELCOME15',
            validUntil: 'Dec 31, 2025',
            daysLeft: 262,
            category: 'discount',
            badge: null,
        },
        {
            id: 3,
            title: 'Free Shipping',
            description: 'Free shipping on all orders over $50',
            code: 'FREESHIP50',
            validUntil: 'Apr 30, 2025',
            daysLeft: 17,
            category: 'shipping',
            badge: 'Limited Time',
        },
        {
            id: 4,
            title: 'Loyalty Member Bonus',
            description: 'Loyalty members get additional 10% off',
            code: 'LOYAL10',
            validUntil: 'Jun 30, 2025',
            daysLeft: 78,
            category: 'loyalty',
            badge: 'Members Only',
        },
        {
            id: 5,
            title: 'Weekend Flash Sale',
            description: '25% off select electronics this weekend only',
            code: 'FLASH25',
            validUntil: 'Apr 21, 2025',
            daysLeft: 8,
            category: 'sale',
            badge: 'Ends Soon',
        },
    ];

    const copyToClipboard = (code: string | null) => {
        if (typeof code === 'string') {
            navigator.clipboard.writeText(code);
        }
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const filterPromotions = () => {
        if (activeFilter === 'all') return promotions;
        return promotions.filter((promo) => promo.category === activeFilter);
    };

    const filteredPromotions = filterPromotions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Promotions | Cartify" />

            <div
                className={`h-full bg-gradient-to-br from-purple-50 to-indigo-50 p-6 transition-all duration-500 ease-in-out dark:from-gray-900 dark:to-purple-950 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-purple-800 dark:text-purple-300 sm:text-3xl">Current Promotions</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Discover our latest deals and discounts</p>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'all'
                                    ? 'bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            All Promotions
                        </button>
                        <button
                            onClick={() => setActiveFilter('sale')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'sale'
                                    ? 'bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Sales
                        </button>
                        <button
                            onClick={() => setActiveFilter('discount')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'discount'
                                    ? 'bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Discounts
                        </button>
                        <button
                            onClick={() => setActiveFilter('shipping')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'shipping'
                                    ? 'bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Shipping
                        </button>
                        <button
                            onClick={() => setActiveFilter('loyalty')}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                activeFilter === 'loyalty'
                                    ? 'bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Loyalty
                        </button>
                    </div>

                    <div className="space-y-4">
                        {filteredPromotions.map((promo) => (
                            <div
                                key={promo.id}
                                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    <div className="flex items-center justify-center bg-blue-100 p-6 lg:w-16 dark:bg-blue-900">
                                        <Gift className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="mb-4 lg:mb-0">
                                            <div className="flex items-center">
                                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{promo.title}</h2>
                                                {promo.badge && (
                                                    <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                        {promo.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{promo.description}</p>
                                            <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center">
                                                    <Calendar className="mr-1 h-4 w-4" />
                                                    Valid until {promo.validUntil}
                                                </div>
                                                <div className="ml-4 flex items-center">
                                                    <Clock className="mr-1 h-4 w-4" />
                                                    {promo.daysLeft} days left
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="relative mr-4 rounded-md bg-gray-100 px-4 py-2 font-mono text-sm font-medium dark:bg-gray-800">
                                                {promo.code}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(promo.code)}
                                                className="inline-flex items-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                                            >
                                                {copiedCode === promo.code ? (
                                                    <>
                                                        <CheckCircle className="mr-1.5 h-4 w-4" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clipboard className="mr-1.5 h-4 w-4" />
                                                        Copy Code
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPromotions.length === 0 && (
                        <div className="mt-16 flex flex-col items-center">
                            <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                                <Tag className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">No promotions found</h3>
                            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">There are currently no promotions in this category.</p>
                            <button
                                onClick={() => setActiveFilter('all')}
                                className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                View All Promotions
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
