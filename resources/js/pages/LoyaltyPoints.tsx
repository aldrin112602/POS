import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
  Gift, 
  ShoppingBag, 
  TrendingUp, 
  Coffee, 
  Truck, 
  Cake, 
  Award,
  Zap,
  AlertCircle,
  Check,
  ChevronRight
} from 'lucide-react';

import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Loyalty Points',
        href: '/loyalty-points',
    },
];

// Mock user data
const mockUser = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    loyaltyPoints: 750,
    loyaltyTier: 'Gold',
    pointsToNextTier: 250,
    memberSince: 'June 2024'
};

// Mock transaction history
const mockTransactions = [
    { id: 1, date: '2025-04-10', description: 'Purchase: Signature Milk Tea', pointsEarned: 12, pointsSpent: 0, balance: 750 },
    { id: 2, date: '2025-04-05', description: 'Redeemed: Free Shipping', pointsEarned: 0, pointsSpent: 50, balance: 738 },
    { id: 3, date: '2025-04-01', description: 'Purchase: Red Velvet Cake', pointsEarned: 18, pointsSpent: 0, balance: 788 },
    { id: 4, date: '2025-03-25', description: 'Birthday Bonus', pointsEarned: 100, pointsSpent: 0, balance: 770 },
    { id: 5, date: '2025-03-20', description: 'Purchase: Iced Americano', pointsEarned: 11, pointsSpent: 0, balance: 670 },
    { id: 6, date: '2025-03-15', description: 'Redeemed: Free Pastry', pointsEarned: 0, pointsSpent: 200, balance: 659 },
    { id: 7, date: '2025-03-10', description: 'Referral Bonus: Mark Smith', pointsEarned: 50, pointsSpent: 0, balance: 859 }
];

// Loyalty tiers
const loyaltyTiers = [
    { name: 'Bronze', threshold: 0, benefits: ['Earn 10 points per ₱100 spent', 'Birthday gift'] },
    { name: 'Silver', threshold: 500, benefits: ['Earn 12 points per ₱100 spent', 'Birthday gift', '5% discount on beverages'] },
    { name: 'Gold', threshold: 1000, benefits: ['Earn 15 points per ₱100 spent', 'Birthday gift', '10% discount on beverages', 'Free shipping on orders over ₱500'] },
    { name: 'Platinum', threshold: 2000, benefits: ['Earn 20 points per ₱100 spent', 'Birthday gift', '15% discount on all products', 'Free shipping on all orders', 'Exclusive early access to new products'] }
];

// Redemption options
const redemptionOptions = [
    { id: 1, name: 'Free Shipping Voucher', points: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s', description: 'Free shipping on your next order with no minimum purchase required' },
    { id: 2, name: 'Free Signature Drink', points: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s', description: 'Redeem any signature drink from our menu for free' },
    { id: 3, name: 'Free Pastry', points: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s', description: 'Choose any pastry from our bakery case' },
    { id: 4, name: '₱100 Discount', points: 250, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s', description: 'Get ₱100 off your next purchase of ₱500 or more' },
    { id: 5, name: 'Exclusive Merchandise', points: 500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s', description: 'Redeem for a branded tumbler or coffee mug' },
    { id: 6, name: 'Private Coffee Tasting', points: 1000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s', description: 'Exclusive coffee tasting session with our master barista' }
];

// Earning opportunities
const earningOpportunities = [
    { icon: <ShoppingBag className="h-5 w-5" />, title: 'Make a Purchase', description: 'Earn 10-20 points for every ₱100 spent, depending on your tier' },
    { icon: <Coffee className="h-5 w-5" />, title: 'Try New Products', description: 'Earn 50 bonus points when you try our featured product of the month' },
    { icon: <Award className="h-5 w-5" />, title: 'Refer a Friend', description: 'Get 50 points when your friend makes their first purchase using your code' },
    { icon: <Zap className="h-5 w-5" />, title: 'Complete Challenges', description: 'Earn bonus points by completing special challenges like visiting 3 days in a row' }
];

export default function LoyaltyPoints() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedRedemption, setSelectedRedemption] = useState<null | typeof redemptionOptions[0]>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [redeemSuccess, setRedeemSuccess] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Find user's current tier
    const currentTier = loyaltyTiers.find(tier => tier.name === mockUser.loyaltyTier);
    
    // Find next tier
    const currentTierIndex = loyaltyTiers.findIndex(tier => tier.name === mockUser.loyaltyTier);
    const nextTier = currentTierIndex < loyaltyTiers.length - 1 ? loyaltyTiers[currentTierIndex + 1] : null;

    // Calculate progress percentage for tier progress bar
    const calculateProgressPercentage = () => {
        if (!nextTier) return 100; // Already at max tier
        
        const currentThreshold = currentTier ? currentTier.threshold : 0;
        const nextThreshold = nextTier.threshold;
        const range = nextThreshold - currentThreshold;
        const progress = mockUser.loyaltyPoints - currentThreshold;
        
        return Math.min(Math.round((progress / range) * 100), 100);
    };

    // Handle redemption
    const handleRedeem = (option: typeof redemptionOptions[0]) => {
        if (mockUser.loyaltyPoints >= option.points) {
            setSelectedRedemption(option);
            setShowConfirmation(true);
        }
    };

    // Confirm redemption
    const confirmRedemption = () => {
        setShowConfirmation(false);
        setRedeemSuccess(true);
        
        // After 3 seconds, hide success message
        setTimeout(() => {
            setRedeemSuccess(false);
            setSelectedRedemption(null);
        }, 3000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Loyalty Points" />
            <div className={`flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">Loyalty Program</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Earn rewards with every purchase</p>
                    </div>
                    
                    <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Your Points</span>
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{mockUser.loyaltyPoints}</span>
                        </div>
                        <div className="mx-4 h-12 w-px bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Tier</span>
                            <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">{mockUser.loyaltyTier}</span>
                        </div>
                    </div>
                </header>
                
                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                            activeTab === 'overview'
                                ? 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        <TrendingUp className="h-4 w-4" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('redeem')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                            activeTab === 'redeem'
                                ? 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        <Gift className="h-4 w-4" />
                        Redeem Rewards
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                            activeTab === 'history'
                                ? 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Transaction History
                    </button>
                </div>
                
                {/* Tab Content */}
                <div className="flex-1">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Current Status Card */}
                            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Your Loyalty Status</h2>
                                
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Current Tier</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-lg font-bold ${
                                                mockUser.loyaltyTier === 'Bronze' ? 'text-amber-700 dark:text-amber-500' :
                                                mockUser.loyaltyTier === 'Silver' ? 'text-gray-500 dark:text-gray-400' :
                                                mockUser.loyaltyTier === 'Gold' ? 'text-amber-500 dark:text-amber-400' :
                                                'text-indigo-600 dark:text-indigo-400'
                                            }`}>
                                                {mockUser.loyaltyTier}
                                            </span>
                                            <Award className={`h-5 w-5 ${
                                                mockUser.loyaltyTier === 'Bronze' ? 'text-amber-700 dark:text-amber-500' :
                                                mockUser.loyaltyTier === 'Silver' ? 'text-gray-500 dark:text-gray-400' :
                                                mockUser.loyaltyTier === 'Gold' ? 'text-amber-500 dark:text-amber-400' :
                                                'text-indigo-600 dark:text-indigo-400'
                                            }`} />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
                                        <p className="text-gray-700 dark:text-gray-300">{mockUser.memberSince}</p>
                                    </div>
                                </div>
                                
                                {nextTier ? (
                                    <div className="mb-8">
                                        <div className="mb-2 flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Progress to {nextTier.name}</span>
                                            <span className="font-medium text-purple-600 dark:text-purple-400">
                                                {mockUser.pointsToNextTier} points needed
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div 
                                                className="h-2 rounded-full bg-purple-600 dark:bg-purple-400" 
                                                style={{ width: `${calculateProgressPercentage()}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-8 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
                                        <div className="flex items-center gap-2">
                                            <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            <p className="font-medium text-purple-600 dark:text-purple-400">
                                                Congratulations! You've reached our highest tier level.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                <h3 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Your Current Benefits</h3>
                                <ul className="space-y-2">
                                    {currentTier?.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Check className="h-4 w-4 text-green-500" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* How to Earn Points */}
                            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Ways to Earn Points</h2>
                                
                                <div className="space-y-4">
                                    {earningOpportunities.map((opportunity, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                                                {opportunity.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800 dark:text-white">{opportunity.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-6 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/30">
                                    <h3 className="mb-2 font-medium text-indigo-700 dark:text-indigo-400">Loyalty Tier Benefits</h3>
                                    
                                    <div className="space-y-4">
                                        {loyaltyTiers.map((tier, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className={`h-4 w-4 rounded-full ${
                                                    tier.name === 'Bronze' ? 'bg-amber-700 dark:bg-amber-600' : 
                                                    tier.name === 'Silver' ? 'bg-gray-400 dark:bg-gray-300' : 
                                                    tier.name === 'Gold' ? 'bg-amber-400 dark:bg-amber-300' : 
                                                    'bg-indigo-500 dark:bg-indigo-400'
                                                }`}></div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {tier.name} ({tier.threshold}+ points)
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="ml-auto flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                                                        View Benefits
                                                        <ChevronRight className="h-3 w-3" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-64">
                                                        <DropdownMenuLabel>{tier.name} Tier Benefits</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        {tier.benefits.map((benefit, i) => (
                                                            <DropdownMenuItem key={i} className="flex items-center gap-2">
                                                                <Check className="h-3 w-3 text-green-500" />
                                                                <span className="text-sm">{benefit}</span>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Redeem Tab */}
                    {activeTab === 'redeem' && (
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Available Rewards</h2>
                                <div className="rounded-lg bg-purple-100 px-4 py-2 dark:bg-purple-900/30">
                                    <span className="font-medium text-purple-700 dark:text-purple-400">Your Points: {mockUser.loyaltyPoints}</span>
                                </div>
                            </div>
                            
                            {/* Success Message */}
                            {redeemSuccess && (
                                <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    <div className="flex items-center gap-2">
                                        <Check className="h-5 w-5" />
                                        <p>
                                            <span className="font-medium">{selectedRedemption?.name}</span> has been successfully redeemed! 
                                            Check your email for your voucher code.
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Redemption Confirmation Modal */}
                            {showConfirmation && selectedRedemption && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Confirm Redemption</h3>
                                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                                            Are you sure you want to redeem <span className="font-medium text-purple-600 dark:text-purple-400">{selectedRedemption.name}</span> for <span className="font-medium text-purple-600 dark:text-purple-400">{selectedRedemption.points} points</span>?
                                        </p>
                                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                                            Your new balance will be {mockUser.loyaltyPoints - selectedRedemption.points} points.
                                        </p>
                                        <div className="flex justify-end gap-4">
                                            <button 
                                                onClick={() => setShowConfirmation(false)}
                                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={confirmRedemption}
                                                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                                            >
                                                Confirm Redemption
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Redemption Options */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {redemptionOptions.map(option => (
                                    <div key={option.id} className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
                                        <div className="h-36 overflow-hidden">
                                            <img src={option.image} alt={option.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h3 className="font-medium text-gray-800 dark:text-white">{option.name}</h3>
                                                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                                    {option.points} points
                                                </span>
                                            </div>
                                            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                                            
                                            {mockUser.loyaltyPoints >= option.points ? (
                                                <button 
                                                    onClick={() => handleRedeem(option)}
                                                    className="w-full rounded-lg bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                                                >
                                                    Redeem Now
                                                </button>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <AlertCircle className="h-3 w-3" />
                                                        <span>You need {option.points - mockUser.loyaltyPoints} more points</span>
                                                    </div>
                                                    <button 
                                                        disabled
                                                        className="w-full cursor-not-allowed rounded-lg bg-gray-300 py-2 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                                                    >
                                                        Redeem Now
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* History Tab */}
                    {activeTab === 'history' && (
                        <div>
                            <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Points Transaction History</h2>
                            
                            <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-gray-800">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Points Earned
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Points Spent
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Balance
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {mockTransactions.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(transaction.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                    {transaction.description}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    {transaction.pointsEarned > 0 ? (
                                                        <span className="text-green-600 dark:text-green-400">+{transaction.pointsEarned}</span>
                                                    ) : (
                                                        <span>-</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    {transaction.pointsSpent > 0 ? (
                                                        <span className="text-red-600 dark:text-red-400">-{transaction.pointsSpent}</span>
                                                    ) : (
                                                        <span>-</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                    {transaction.balance}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}