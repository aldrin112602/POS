import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Clock,
  Download,
  RefreshCw,
  ShoppingBag,
  Calendar,
  ArrowUpDown,
  X,
  ChevronLeft,
  Eye,
  CreditCard,
  Upload,
  AlertTriangle,
  Check
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Breadcrumbs configuration
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Purchase History',
    href: '/purchase-history',
  },
];

// Product image placeholder
const productImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZ4jQpcHMyvKfj71K7Xe2LJz06MWbZLGWwA&s";

// Mock order data
const mockOrders = [
  {
    id: "ORD-12345",
    date: "2025-04-10T14:23:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 650.00,
    pointsEarned: 65,
    items: [
      { 
        id: 1, 
        name: "Signature Milk Tea", 
        variant: "Large, 100% Sugar, Less Ice", 
        price: 150.00, 
        quantity: 2,
        image: productImageUrl
      },
      { 
        id: 2, 
        name: "Red Velvet Cake", 
        variant: "Slice", 
        price: 180.00, 
        quantity: 1,
        image: productImageUrl
      },
      { 
        id: 3, 
        name: "Iced Americano", 
        variant: "Medium, No Sugar", 
        price: 170.00, 
        quantity: 1,
        image: productImageUrl
      }
    ],
    address: "123 Main Street, Apt 4B, Manila",
    paymentMethod: "Credit Card (Visa •••• 1234)",
    deliveryFee: 50.00,
    subtotal: 600.00,
    discount: 0,
    trackingInfo: {
      courier: "FastDelivery",
      trackingNumber: "FD789456123",
      estimatedDelivery: "Delivered on Apr 10, 2025 at 3:45 PM",
      status: "Delivered",
      timeline: [
        { status: "Order Placed", time: "Apr 10, 2025 - 14:23", completed: true },
        { status: "Payment Confirmed", time: "Apr 10, 2025 - 14:25", completed: true },
        { status: "Processing", time: "Apr 10, 2025 - 14:30", completed: true },
        { status: "Out for Delivery", time: "Apr 10, 2025 - 15:15", completed: true },
        { status: "Delivered", time: "Apr 10, 2025 - 15:45", completed: true }
      ]
    }
  },
  {
    id: "ORD-12344",
    date: "2025-04-05T10:15:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 450.00,
    pointsEarned: 45,
    items: [
      { 
        id: 1, 
        name: "Matcha Latte", 
        variant: "Medium, 50% Sugar", 
        price: 160.00, 
        quantity: 1,
        image: productImageUrl
      },
      { 
        id: 2, 
        name: "Blueberry Cheesecake", 
        variant: "Slice", 
        price: 220.00, 
        quantity: 1,
        image: productImageUrl
      },
      { 
        id: 3, 
        name: "Chocolate Chip Cookie", 
        variant: "Regular", 
        price: 70.00, 
        quantity: 1,
        image: productImageUrl
      }
    ],
    address: "123 Main Street, Apt 4B, Manila",
    paymentMethod: "GCash",
    paymentProof: "https://i.pinimg.com/736x/e7/9d/d1/e79dd102b35213f815291e0fb4bd12df.jpg", // GCash receipt
    deliveryFee: 50.00,
    subtotal: 450.00,
    discount: 50.00,
    trackingInfo: {
      courier: "FastDelivery",
      trackingNumber: "FD789456122",
      estimatedDelivery: "Delivered on Apr 5, 2025 at 11:20 AM",
      status: "Delivered",
      timeline: [
        { status: "Order Placed", time: "Apr 5, 2025 - 10:15", completed: true },
        { status: "Payment Proof Uploaded", time: "Apr 5, 2025 - 10:16", completed: true },
        { status: "Payment Confirmed", time: "Apr 5, 2025 - 10:17", completed: true },
        { status: "Processing", time: "Apr 5, 2025 - 10:25", completed: true },
        { status: "Out for Delivery", time: "Apr 5, 2025 - 10:45", completed: true },
        { status: "Delivered", time: "Apr 5, 2025 - 11:20", completed: true }
      ]
    }
  },
  {
    id: "ORD-12343",
    date: "2025-04-01T16:30:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 870.00,
    pointsEarned: 87,
    items: [
      { 
        id: 1, 
        name: "Cold Brew Coffee", 
        variant: "Large, No Sugar", 
        price: 180.00, 
        quantity: 2,
        image: productImageUrl
      },
      { 
        id: 2, 
        name: "Avocado Toast", 
        variant: "With Egg", 
        price: 250.00, 
        quantity: 1,
        image: productImageUrl
      },
      { 
        id: 3, 
        name: "Fresh Fruit Parfait", 
        variant: "Regular", 
        price: 210.00, 
        quantity: 1,
        image: productImageUrl
      }
    ],
    address: "123 Main Street, Apt 4B, Manila",
    paymentMethod: "PayPal",
    paypalTransactionId: "PP9876543210",
    deliveryFee: 50.00,
    subtotal: 820.00,
    discount: 0,
    trackingInfo: {
      courier: "FastDelivery",
      trackingNumber: "FD789456121",
      estimatedDelivery: "Delivered on Apr 1, 2025 at 5:15 PM",
      status: "Delivered",
      timeline: [
        { status: "Order Placed", time: "Apr 1, 2025 - 16:30", completed: true },
        { status: "PayPal Payment Initiated", time: "Apr 1, 2025 - 16:31", completed: true },
        { status: "Payment Confirmed", time: "Apr 1, 2025 - 16:32", completed: true },
        { status: "Processing", time: "Apr 1, 2025 - 16:40", completed: true },
        { status: "Out for Delivery", time: "Apr 1, 2025 - 17:00", completed: true },
        { status: "Delivered", time: "Apr 1, 2025 - 17:15", completed: true }
      ]
    }
  },
  {
    id: "ORD-12342",
    date: "2025-03-28T09:45:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 520.00,
    pointsEarned: 52,
    items: [
      { 
        id: 1, 
        name: "Cappuccino", 
        variant: "Medium, Extra Shot", 
        price: 160.00, 
        quantity: 1,
        image: productImageUrl
      },
      { 
        id: 2, 
        name: "Ham & Cheese Croissant", 
        variant: "Warmed", 
        price: 180.00, 
        quantity: 2,
        image: productImageUrl
      }
    ],
    address: "456 Park Avenue, Unit 7C, Makati",
    paymentMethod: "Credit Card (Mastercard •••• 5678)",
    deliveryFee: 0.00, // Free delivery
    subtotal: 520.00,
    discount: 0,
    trackingInfo: {
      courier: "FastDelivery",
      trackingNumber: "FD789456120",
      estimatedDelivery: "Delivered on Mar 28, 2025 at 10:30 AM",
      status: "Delivered",
      timeline: [
        { status: "Order Placed", time: "Mar 28, 2025 - 09:45", completed: true },
        { status: "Payment Confirmed", time: "Mar 28, 2025 - 09:47", completed: true },
        { status: "Processing", time: "Mar 28, 2025 - 09:55", completed: true },
        { status: "Out for Delivery", time: "Mar 28, 2025 - 10:15", completed: true },
        { status: "Delivered", time: "Mar 28, 2025 - 10:30", completed: true }
      ]
    }
  },
  {
    id: "ORD-12341",
    date: "2025-03-25T14:00:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 1250.00,
    pointsEarned: 125,
    items: [
      { 
        id: 1, 
        name: "Coffee Bean Gift Set", 
        variant: "Premium Selection", 
        price: 850.00, 
        quantity: 1,
        image: productImageUrl
      },
      { 
        id: 2, 
        name: "Ceramic Pour-Over Set", 
        variant: "White", 
        price: 400.00, 
        quantity: 1,
        image: productImageUrl
      }
    ],
    address: "456 Park Avenue, Unit 7C, Makati",
    paymentMethod: "Credit Card (Visa •••• 1234)",
    deliveryFee: 0.00, // Free delivery
    subtotal: 1250.00,
    discount: 0,
    trackingInfo: {
      courier: "Premium Logistics",
      trackingNumber: "PL123456789",
      estimatedDelivery: "Delivered on Mar 25, 2025 at 5:30 PM",
      status: "Delivered",
      timeline: [
        { status: "Order Placed", time: "Mar 25, 2025 - 14:00", completed: true },
        { status: "Payment Confirmed", time: "Mar 25, 2025 - 14:05", completed: true },
        { status: "Processing", time: "Mar 25, 2025 - 14:30", completed: true },
        { status: "Out for Delivery", time: "Mar 25, 2025 - 16:45", completed: true },
        { status: "Delivered", time: "Mar 25, 2025 - 17:30", completed: true }
      ]
    }
  },
  {
    id: "ORD-12340",
    date: "2025-03-20T18:15:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 380.00,
    pointsEarned: 38,
    items: [
      { 
        id: 1, 
        name: "Iced Caramel Macchiato", 
        variant: "Large, Extra Caramel", 
        price: 190.00, 
        quantity: 2,
        image: productImageUrl
      }
    ],
    address: "789 Seaside Blvd, Unit 12D, Pasay",
    paymentMethod: "Cash on Delivery",
    deliveryFee: 50.00,
    subtotal: 330.00,
    discount: 0,
    trackingInfo: {
      courier: "FastDelivery",
      trackingNumber: "FD789456119",
      estimatedDelivery: "Delivered on Mar 20, 2025 at 7:00 PM",
      status: "Delivered",
      timeline: [
        { status: "Order Placed", time: "Mar 20, 2025 - 18:15", completed: true },
        { status: "Payment Pending (COD)", time: "Mar 20, 2025 - 18:15", completed: true },
        { status: "Processing", time: "Mar 20, 2025 - 18:20", completed: true },
        { status: "Out for Delivery", time: "Mar 20, 2025 - 18:45", completed: true },
        { status: "Delivered", time: "Mar 20, 2025 - 19:00", completed: true },
        { status: "Payment Confirmed", time: "Mar 20, 2025 - 19:00", completed: true }
      ]
    }
  },
  {
    id: "ORD-12339",
    date: "2025-03-19T13:45:00",
    status: "Processing",
    paymentStatus: "Pending",
    total: 430.00,
    pointsEarned: 0, // Points not yet earned
    items: [
      { 
        id: 1, 
        name: "Caramel Frappuccino", 
        variant: "Large, Extra Whip", 
        price: 210.00, 
        quantity: 1,
        image: productImageUrl
      },
      {
        id: 2,
        name: "Glazed Donut",
        variant: "Regular",
        price: 70.00,
        quantity: 2,
        image: productImageUrl
      },
      {
        id: 3,
        name: "Chocolate Muffin",
        variant: "Regular",
        price: 80.00,
        quantity: 1,
        image: productImageUrl
      }
    ],
    address: "789 Seaside Blvd, Unit 12D, Pasay",
    paymentMethod: "GCash",
    // paymentStatus: "Awaiting Payment Proof",
    deliveryFee: 50.00,
    subtotal: 380.00,
    discount: 0,
    trackingInfo: {
      courier: "FastDelivery",
      trackingNumber: "Pending",
      estimatedDelivery: "Estimated delivery on Apr 13, 2025",
      status: "Processing",
      timeline: [
        { status: "Order Placed", time: "Mar 19, 2025 - 13:45", completed: true },
        { status: "Awaiting Payment Proof", time: "Mar 19, 2025 - 13:45", completed: true },
        { status: "Processing", time: "Pending", completed: false },
        { status: "Out for Delivery", time: "Pending", completed: false },
        { status: "Delivered", time: "Pending", completed: false }
      ]
    }
  }
];

// Payment methods
const paymentMethods = [
  { id: 'credit_card', name: 'Credit/Debit Card', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'gcash', name: 'GCash', icon: <img src="https://play-lh.googleusercontent.com/QNP0Aj2hyumAmYiWVAsJtY2LLTQnzHxdW7-DpwFUFNkPJjgRxi-BXg7A4yI6tgYKMeU" className="h-4 w-4" alt="GCash" /> },
  { id: 'paypal', name: 'PayPal', icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtHhR_wvf104ZuFuSOgZnqDsjHzCKrg8qOcw&s" className="h-4 w-4" alt="PayPal" /> },
  { id: 'cod', name: 'Cash on Delivery', icon: <ShoppingBag className="h-4 w-4" /> }
];

export default function PurchaseHistory() {
  // State for UI
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTimeframe, setFilterTimeframe] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('items');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadPending, setUploadPending] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Apply effects
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Filter and sort orders
  const filteredOrders = mockOrders.filter(order => {
    // Search filter
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Status filter
    if (filterStatus !== 'all' && order.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    
    // Timeframe filter
    if (filterTimeframe !== 'all') {
      const orderDate = new Date(order.date);
      const now = new Date();
      
      if (filterTimeframe === 'last30days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        if (orderDate < thirtyDaysAgo) return false;
      } else if (filterTimeframe === 'last3months') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        if (orderDate < threeMonthsAgo) return false;
      } else if (filterTimeframe === 'last6months') {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        if (orderDate < sixMonthsAgo) return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterTimeframe('all');
    setSortOrder('newest');
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Open order detail modal
  const openOrderDetail = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
    setActiveTab('items');
  };
  
  // Calculate total items in an order
  const getTotalItems = (order: typeof mockOrders[0]) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Handle file change for receipt upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadPending(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploadPending(false);
      setUploadSuccess(true);
      
      // Close modal after success
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setSelectedFile(null);
      }, 2000);
    }, 1500);
  };
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Purchase History" />
      <div className={`flex h-full flex-1 flex-col gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800 transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Purchase History</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and track all your past orders</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>
        
        {/* Filters and Search */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID or product name..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-purple-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  <Filter className="h-4 w-4" />
                  <span>Status: {filterStatus === 'all' ? 'All' : filterStatus}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterStatus('all')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('processing')}>Processing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('shipped')}>Shipped</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('delivered')}>Delivered</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('cancelled')}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Timeframe Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Timeframe: {
                    filterTimeframe === 'all' ? 'All Time' :
                    filterTimeframe === 'last30days' ? 'Last 30 Days' :
                    filterTimeframe === 'last3months' ? 'Last 3 Months' :
                    'Last 6 Months'
                  }</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterTimeframe('all')}>All Time</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTimeframe('last30days')}>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTimeframe('last3months')}>Last 3 Months</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterTimeframe('last6months')}>Last 6 Months</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Sort Order */}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOrder('newest')}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder('oldest')}>Oldest First</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Reset Filters */}
              <button 
                onClick={resetFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          
          {/* Active filters display */}
          {(searchTerm || filterStatus !== 'all' || filterTimeframe !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="ml-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Status: {filterStatus}
                  <button onClick={() => setFilterStatus('all')} className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filterTimeframe !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Timeframe: {
                    filterTimeframe === 'last30days' ? 'Last 30 Days' :
                    filterTimeframe === 'last3months' ? 'Last 3 Months' :
                    'Last 6 Months'
                  }
                  <button onClick={() => setFilterTimeframe('all')} className="ml-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Orders Table */}
        <div className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
          {filteredOrders.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <div 
                  key={order.id}
                  className="cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  onClick={() => openOrderDetail(order)}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">{order.id}</h3>
                        {order.status === 'Processing' && (
                          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            {order.status}
                          </span>
                        )}
                        {order.status === 'Delivered' && (
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {order.status}
                          </span>
                        )}
                        {order.status === 'Shipped' && (
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {order.status}
                          </span>
                        )}
                        {order.status === 'Cancelled' && (
                          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            {order.status}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDate(order.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ShoppingBag className="h-3.5 w-3.5" />
                          {getTotalItems(order)} {getTotalItems(order) === 1 ? 'item' : 'items'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-400" />
                          {order.pointsEarned} points earned
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">₱{order.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.paymentStatus === 'Paid' ? (
                            <span className="text-green-600 dark:text-green-400">Paid</span>
                          ) : (
                            <span className="text-yellow-600 dark:text-yellow-400">{order.paymentStatus}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No orders found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter settings.</p>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                <RefreshCw className="h-4 w-4" />
                Reset filters
              </button>
            </div>
          )}
        </div>
        
        {/* Order Detail Modal */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-xl">
                <div className="flex items-center gap-2 mt-5">
                  <span>Order {selectedOrder?.id}</span>
                  {selectedOrder?.status === 'Processing' && (
                    <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      {selectedOrder?.status}
                    </span>
                  )}
                  {selectedOrder?.status === 'Delivered' && (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {selectedOrder?.status}
                    </span>
                  )}
                </div>
                <span className="text-base font-normal">
                  {selectedOrder && formatDate(selectedOrder.date)}
                </span>
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                {selectedOrder?.paymentStatus === 'Paid' ? (
                  <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Check className="h-4 w-4" />
                    Payment completed
                  </span>
                ) : selectedOrder?.paymentStatus === 'Pending' ? (
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      {selectedOrder?.paymentStatus}
                    </span>
                    {selectedOrder?.paymentMethod === 'GCash' && (selectedOrder?.paymentStatus as string) === 'Awaiting Payment Proof' && (
                      <button
                        onClick={() => {
                          setShowUploadModal(true);
                        }}
                        className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
                      >
                        <Upload className="h-3 w-3" />
                        Upload Payment Proof
                      </button>
                    )}
                  </div>
                ) : (
                  <span>{selectedOrder?.paymentStatus}</span>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="items">Order Items</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="details">Order Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="items" className="mt-4 space-y-4">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedOrder?.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-right font-medium text-gray-900 dark:text-white">
                              ₱{item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.variant}
                          </p>
                          <div className="mt-auto flex justify-between">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Subtotal: ₱{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">₱{selectedOrder?.subtotal.toFixed(2)}</span>
                  </div>
                  {(selectedOrder?.discount ?? 0) > 0 && (
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Discount</span>
                      <span className="font-medium text-green-600 dark:text-green-400">-₱{selectedOrder?.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedOrder?.deliveryFee ?? 0 > 0 ? `₱${(selectedOrder?.deliveryFee ?? 0).toFixed(2)}` : 'Free'}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">₱{selectedOrder?.total.toFixed(2)}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tracking" className="mt-4 space-y-4">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Delivery Status</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedOrder?.trackingInfo.estimatedDelivery}
                      </p>
                    </div>
                    {selectedOrder?.trackingInfo.courier && selectedOrder?.trackingInfo.trackingNumber !== 'Pending' && (
                      <div className="mt-2 text-right sm:mt-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedOrder?.trackingInfo.courier}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          #{selectedOrder?.trackingInfo.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <div className="relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      
                      {/* Timeline events */}
                      <div className="space-y-6">
                        {selectedOrder?.trackingInfo.timeline.map((event, index) => (
                          <div key={index} className="relative flex gap-4">
                            <div className={`relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                              event.completed 
                                ? 'bg-green-100 text-green-600 ring-4 ring-white dark:bg-green-900/30 dark:text-green-400 dark:ring-gray-800' 
                                : 'bg-gray-100 text-gray-400 ring-4 ring-white dark:bg-gray-800 dark:ring-gray-800'
                            }`}>
                              {event.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                              )}
                            </div>
                            <div className="flex-1 py-0.5">
                              <h5 className={`text-sm font-medium ${
                                event.completed
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {event.status}
                              </h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {event.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white">Shipping Address</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {selectedOrder?.address}
                  </p>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white">Payment Method</h4>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    {selectedOrder?.paymentMethod.includes('Credit Card') && <CreditCard className="h-4 w-4" />}
                    {selectedOrder?.paymentMethod.includes('GCash') && <img src="https://play-lh.googleusercontent.com/QNP0Aj2hyumAmYiWVAsJtY2LLTQnzHxdW7-DpwFUFNkPJjgRxi-BXg7A4yI6tgYKMeU" className="h-4 w-4" alt="GCash" />}
                    {selectedOrder?.paymentMethod.includes('PayPal') && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtHhR_wvf104ZuFuSOgZnqDsjHzCKrg8qOcw&s" className="h-4 w-4" alt="PayPal" />}
                    {selectedOrder?.paymentMethod.includes('Cash on Delivery') && <ShoppingBag className="h-4 w-4" />}
                    {selectedOrder?.paymentMethod}
                  </div>
                  
                  {selectedOrder?.paypalTransactionId && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Transaction ID: {selectedOrder.paypalTransactionId}
                    </p>
                  )}
                  
                  {selectedOrder?.paymentProof && (
                    <div className="mt-3">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                        Payment Proof:
                      </p>
                      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <img
                          src={selectedOrder.paymentProof}
                          alt="Payment proof"
                          className="h-auto max-w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white">Additional Information</h4>
                  <div className="mt-3 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-amber-400" />
                    {selectedOrder?.pointsEarned} points earned from this purchase
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsOrderDetailOpen(false)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to list
              </button>
              
              <div className="flex gap-2">
                <button
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <Eye className="h-4 w-4" />
                  View Invoice
                </button>
                <button
                  className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  <Download className="h-4 w-4" />
                  Download Invoice
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Payment Proof Upload Modal */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Payment Proof</DialogTitle>
              <DialogDescription>
                Upload a screenshot or image of your payment receipt for verification.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              {!uploadSuccess ? (
                <>
                  <div className="flex justify-center">
                    <div className="relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800/50 dark:hover:bg-gray-700/50">
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                        {selectedFile ? (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            File selected: {selectedFile.name}
                          </p>
                        ) : (
                          <>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG or PDF (MAX. 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        className="absolute h-full w-full cursor-pointer opacity-0" 
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, application/pdf"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={!selectedFile || uploadPending}
                      className={`inline-flex items-center gap-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 ${
                        !selectedFile || uploadPending
                          ? 'cursor-not-allowed opacity-50'
                          : 'hover:bg-purple-700 dark:hover:bg-purple-600'
                      }`}
                    >
                      {uploadPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload Receipt
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Payment proof uploaded</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your payment proof has been successfully uploaded and will be verified soon.
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}