import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowUpDown, CheckIcon, Filter, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Browse Products',
        href: '/products',
    },
];

// Mock product data
const mockProducts = [
    {
        id: 1,
        name: 'Signature Milk Tea',
        price: 120,
        category: 'Drinks',
        rating: 4.8,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Our classic milk tea with premium tea leaves and creamy milk.',
    },
    {
        id: 2,
        name: 'Red Velvet Cake',
        price: 180,
        category: 'Desserts',
        rating: 4.6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Rich and velvety red cake with cream cheese frosting.',
    },
    {
        id: 3,
        name: 'Chocolate Croissant',
        price: 95,
        category: 'Pastries',
        rating: 4.5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Buttery, flaky croissant filled with rich chocolate.',
    },
    {
        id: 4,
        name: 'Iced Americano',
        price: 110,
        category: 'Drinks',
        rating: 4.3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Smooth espresso shots with cold water and ice.',
    },
    {
        id: 5,
        name: 'Strawberry Latte',
        price: 150,
        category: 'Drinks',
        rating: 4.7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Creamy milk with fresh strawberry puree and a hint of vanilla.',
    },
    {
        id: 6,
        name: "S'mores Bar",
        price: 135,
        category: 'Desserts',
        rating: 4.9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Graham cracker base with chocolate and toasted marshmallow.',
    },
    {
        id: 7,
        name: 'Matcha Green Tea',
        price: 140,
        category: 'Drinks',
        rating: 4.4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Premium Japanese matcha whisked to perfection.',
    },
    {
        id: 8,
        name: 'Cinnamon Roll',
        price: 125,
        category: 'Pastries',
        rating: 4.6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s',
        description: 'Soft, fluffy roll with cinnamon and cream cheese glaze.',
    },
];

export default function BrowseProducts() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Filter and sort products based on current criteria
        let filteredProducts = [...mockProducts];

        // Apply category filter
        if (category !== 'All') {
            filteredProducts = filteredProducts.filter((product) => product.category === category);
        }

        // Apply search filter
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'price-low') {
                return a.price - b.price;
            } else if (sortBy === 'price-high') {
                return b.price - a.price;
            } else if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

        setProducts(filteredProducts);
    }, [searchTerm, category, sortBy]);

    // Get unique categories
    const categories = ['All', ...new Set(mockProducts.map((product) => product.category))];

    // Sort options
    const sortOptions = [
        { value: 'name', label: 'Name (A-Z)' },
        { value: 'price-low', label: 'Price (Low to High)' },
        { value: 'price-high', label: 'Price (High to Low)' },
        { value: 'rating', label: 'Highest Rated' },
    ];

    // Get the current sort option label
    const currentSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || 'Sort by';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Browse Products" />
            <div
                className={`flex h-full flex-1 flex-col gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-all duration-500 ease-in-out dark:from-gray-900 dark:to-indigo-950 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">Browse Products</h1>

                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        {/* Category Filter - Using DropdownMenu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span>{category}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {categories.map((cat) => (
                                    <DropdownMenuItem key={cat} onClick={() => setCategory(cat)} className="flex justify-between">
                                        {cat}
                                        {category === cat && <CheckIcon className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Sort Options - Using DropdownMenu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                                <span>{currentSortLabel}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {sortOptions.map((option) => (
                                    <DropdownMenuItem key={option.value} onClick={() => setSortBy(option.value)} className="flex justify-between">
                                        {option.label}
                                        {sortBy === option.value && <CheckIcon className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Results Count */}
                <div className="text-gray-600 dark:text-gray-400">
                    Showing {products.length} of {mockProducts.length} products
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative flex transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium shadow dark:bg-gray-900">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span>{product.rating}</span>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <div className="flex justify-between">
                                        <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                            {product.category}
                                        </span>
                                    </div>

                                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.description}</p>

                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₱{product.price}</span>
                                        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-40 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/60">
                        <p className="text-gray-500 dark:text-gray-400">No products found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
