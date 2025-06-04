// 'use client';

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { SearchIcon, MapPinIcon, CalendarIcon, ArrowRightIcon } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import CitySearch from "@/components/CitySearch";
// import DatePicker from "@/components/DatePicker";
// import PageLayout from "@/components/shared/PageLayout";
// import Link from "next/link";

// export default function Home() {
//   const router = useRouter();
//   const [pickupLocation, setPickupLocation] = useState('');
//   const [dropLocation, setDropLocation] = useState('');
//   const [travelDate, setTravelDate] = useState<Date | null>(null);
//   const [locationError, setLocationError] = useState('');
//   const [formError, setFormError] = useState('');

//   const handlePickupSelect = (city: string) => {
//     setPickupLocation(city);
//     validateLocations(city, dropLocation);
//     setFormError('');
//   };

//   const handleDropSelect = (city: string) => {
//     setDropLocation(city);
//     validateLocations(pickupLocation, city);
//     setFormError('');
//   };

//   const validateLocations = (pickup: string, drop: string) => {
//     if (pickup && drop && pickup.toLowerCase() === drop.toLowerCase()) {
//       setLocationError('Pickup and drop location cannot be the same.');
//     } else {
//       setLocationError('');
//     }
//   };

//   const handleSearch = () => {
//     if (!pickupLocation || !dropLocation) {
//       setFormError('Please enter both pickup and drop locations');
//       return false;
//     }

//     if (!travelDate) {
//       setFormError('Please select a travel date');
//       return false;
//     }

//     if (locationError) {
//       setFormError('Please fix the location error before searching');
//       return false;
//     }

//     const dateParam = travelDate ? travelDate.toISOString().split('T')[0] : '';
//     const searchParams = new URLSearchParams();
//     searchParams.append('pickup', pickupLocation);
//     searchParams.append('drop', dropLocation);
//     searchParams.append('date', dateParam);
    
//     return true;
//   };

//   return (
//     <PageLayout>
//       {/* Hero Banner */}
//       <div className="relative">
//         <div className="w-full h-[70vh] relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-indigo-900/90 z-10"></div>
//           <Image 
//             src="/images/highway-illustration.png" 
//             alt="Highway with cars" 
//             fill
//             className="object-cover opacity-70"
//             priority
//           />
//           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center leading-tight">
//               <span className="block">Travel Together,</span>
//               <span className="block text-purple-300">Save Together</span>
//             </h1>
//             <p className="text-lg md:text-xl max-w-2xl text-center mb-8 text-gray-300">
//               Find companions for your journey and share costs while reducing your carbon footprint
//             </p>
//             <button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full py-3 px-8 font-semibold text-lg shadow-xl transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Booking Form */}
//       <div className="px-4 py-8 -mt-24 z-30 relative">
//         <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl mx-auto p-6 md:p-8 border border-gray-800">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
//             <h2 className="text-2xl font-bold text-gray-100">Find Your Perfect Ride</h2>
//             <div className="flex gap-2">
//               <button className="bg-purple-600 text-white rounded-full py-2 px-6 font-medium hover:bg-purple-700 transition">
//                 Find a ride
//               </button>
//               <button className="border border-purple-500 text-purple-400 bg-transparent rounded-full py-2 px-6 font-medium hover:bg-gray-800 transition">
//                 Offer a ride
//               </button>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <CitySearch
//               placeholder="From where?"
//               value={pickupLocation}
//               onChange={setPickupLocation}
//               onSelect={handlePickupSelect}
//               id="pickup-location"
//               className="transition-all"
//             />
//             <div>
//               <CitySearch
//                 placeholder="To where?"
//                 value={dropLocation}
//                 onChange={setDropLocation}
//                 onSelect={handleDropSelect}
//                 id="drop-location"
//                 className="transition-all"
//               />
//               {locationError && (
//                 <p className="text-red-400 text-xs mt-1">{locationError}</p>
//               )}
//             </div>
//             <DatePicker
//               selectedDate={travelDate}
//               onChange={(date) => {
//                 setTravelDate(date);
//                 setFormError('');
//               }}
//               className="transition-all"
//             />
//           </div>
          
//           {formError && (
//             <p className="text-red-400 text-sm mt-3 text-center">{formError}</p>
//           )}
          
//           <div onClick={(e) => {
//             if (!handleSearch()) {
//               e.preventDefault();
//             }
//           }}>
//             <Link href={pickupLocation && dropLocation && travelDate ? 
//               `/rides?pickup=${encodeURIComponent(pickupLocation)}&drop=${encodeURIComponent(dropLocation)}&date=${travelDate.toISOString().split('T')[0]}` : 
//               "#"
//             }>
//               <button 
//                 className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3.5 w-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-[1.02]"
//                 disabled={!!locationError}
//               >
//                 <SearchIcon className="h-5 w-5 mr-2" />
//                 <span className="font-medium">Find Rides</span>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-16">
//         {[{
//           img: "coin",
//           title: "Affordable Rides",
//           desc: "Find rides at prices that won't break the bank. Split costs and travel for less."
//         }, {
//           img: "trust",
//           title: "Verified Companions",
//           desc: "We verify profiles and reviews so you can travel with confidence and peace of mind."
//         }, {
//           img: "lightening",
//           title: "Quick & Easy Booking",
//           desc: "Book your next ride in minutes with our simple, user-friendly process."
//         }].map((feature, i) => (
//           <div key={i} className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-800">
//             <div className="flex flex-col items-center mb-4">
//               <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-3 rounded-full mb-4">
//                 <Image src={`/images/${feature.img}.png`} alt={feature.title} width={40} height={40} className="opacity-90" />
//               </div>
//               <h3 className="text-lg font-semibold text-purple-300 text-center">{feature.title}</h3>
//             </div>
//             <p className="text-gray-400 text-center">{feature.desc}</p>
//           </div>
//         ))}
//       </div>

//       {/* Safety Section */}
//       <div className="py-16 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="w-full md:w-1/2">
//               <Image 
//                 src="/images/safety.svg" 
//                 alt="Safety icons" 
//                 width={500} 
//                 height={400} 
//                 className="object-contain"
//               />
//             </div>
//             <div className="w-full md:w-1/2">
//               <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
//                 <div className="text-4xl mb-4">🛡️</div>
//                 <h3 className="font-bold text-2xl mb-4 text-purple-300">Your Safety is Our Priority</h3>
//                 <p className="text-gray-300 mb-6 leading-relaxed">
//                   We verify all user profiles and enable secure in-app payments and communications. Our community guidelines help ensure respectful interactions between all travelers.
//                 </p>
//                 <button className="bg-purple-600 text-white rounded-full px-6 py-2.5 font-medium hover:bg-purple-700 transition shadow-md">Learn about our safety features</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Driver Section */}
//       <div className="py-16 bg-gradient-to-br from-gray-800 to-indigo-900 text-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row-reverse items-center gap-8">
//             <div className="w-full md:w-1/2">
//               <Image 
//                 src="/images/carPassengers.svg" 
//                 alt="Car passengers" 
//                 width={500} 
//                 height={400} 
//                 className="object-contain drop-shadow-2xl"
//               />
//             </div>
//             <div className="w-full md:w-1/2">
//               <h3 className="font-bold text-3xl mb-4 text-purple-300">Got empty seats in your car?</h3>
//               <p className="text-gray-300 mb-6 text-lg">
//                 Turn your empty seats into extra income and enjoyable company. Share your ride and help create a greener planet.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-purple-600 text-white rounded-full px-6 py-3 font-semibold shadow-xl hover:bg-purple-700 transition flex items-center justify-center">
//                   <span>Offer a ride</span>
//                   <ArrowRightIcon className="ml-2 h-4 w-4" />
//                 </button>
//                 <Link href="/how-it-works">
//   <button className="border border-purple-400 text-purple-300 bg-transparent rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition">
//     Learn how it works
//   </button>
// </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Popular Routes */}
//       <div className="py-12 bg-gray-950">
//         <div className="max-w-6xl mx-auto px-4">
//           <h3 className="font-semibold text-xl mb-6 text-purple-300">Popular Routes</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {["Delhi → Jaipur", "Mumbai → Pune", "Bengaluru → Chennai", "Delhi → Agra", 
//               "Kolkata → Siliguri", "Pune → Mumbai", "Delhi → Manali", "Chennai → Pondicherry"].map((route, i) => (
//               <a key={i} href="#" className="bg-gray-900 hover:bg-gray-800 rounded-xl py-4 px-4 text-center flex flex-col items-center justify-center transition-all duration-300 border border-gray-800 shadow-sm hover:shadow-md group">
//                 <MapPinIcon className="h-5 w-5 text-purple-400 mb-2" />
//                 <span className="text-gray-300 font-medium group-hover:text-purple-300 transition-colors">{route}</span>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
      
//     </PageLayout>
//   );
// }


'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SearchIcon, MapPinIcon, CalendarIcon, ArrowRightIcon, FilterIcon, TrendingUpIcon, AlertTriangleIcon, BellIcon, CarIcon, ChevronsUpDownIcon, CreditCardIcon, StarIcon, UserIcon} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CitySearch from "@/components/CitySearch";
import DatePicker from "@/components/DatePicker" ;
import PageLayout from "@/components/shared/PageLayout";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


export default function Home() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [locationError, setLocationError] = useState('');
  const [formError, setFormError] = useState('');
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [activeTab, setActiveTab] = useState('find');
  const [passengerCount, setPassengerCount] = useState(1);
  const [isMapView, setIsMapView] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "50% off on your first ride!", isNew: true },
    { id: 2, text: "New route added: Mumbai to Goa", isNew: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Load recent searches from local storage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Animation sequence
    setTimeout(() => setAnimateHero(true), 100);
  }, []);

  const handlePickupSelect = (city: string) => {
    setPickupLocation(city);
    validateLocations(city, dropLocation);
    setFormError('');
  };

  const handleDropSelect = (city: string) => {
    setDropLocation(city);
    validateLocations(pickupLocation, city);
    setFormError('');
  };

  const validateLocations = (pickup: string, drop: string) => {
    if (pickup && drop && pickup.toLowerCase() === drop.toLowerCase()) {
      setLocationError('Pickup and drop location cannot be the same.');
    } else {
      setLocationError('');
    }
  };

  const saveSearch = () => {
    if (pickupLocation && dropLocation && travelDate) {
      const newSearch = {
        id: Date.now(),
        pickup: pickupLocation,
        drop: dropLocation,
        date: travelDate.toISOString(),
        passengers: passengerCount
      };
      
      const updated = [newSearch, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleSearch = () => {
    if (!pickupLocation || !dropLocation) {
      setFormError('Please enter both pickup and drop locations');
      return false;
    }

    if (!travelDate) {
      setFormError('Please select a travel date');
      return false;
    }

    if (locationError) {
      setFormError('Please fix the location error before searching');
      return false;
    }

    saveSearch();
    
    return true;
  };

  const useRecentSearch = (search: any) => {
    setPickupLocation(search.pickup);
    setDropLocation(search.drop);
    setTravelDate(new Date(search.date));
    setPassengerCount(search.passengers || 1);
    setShowRecentSearches(false);
  };

  const swapLocations = () => {
    setPickupLocation(dropLocation);
    setDropLocation(pickupLocation);
    setLocationError('');
  };

  return (
    <PageLayout>
      {/* Notification Bell */}
      <div className="fixed top-20 right-4 z-50">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <BellIcon className="h-5 w-5 text-purple-400" />
            {notifications.some(n => n.isNew) && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
              >
                <div className="p-2 border-b border-gray-700 flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-300">Notifications</h4>
                  <button className="text-xs text-purple-400 hover:text-purple-300">Mark all read</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${notification.isNew ? 'bg-gray-700/50' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        {notification.isNew && (
                          <span className="h-2 w-2 mt-1.5 bg-red-500 rounded-full"></span>
                        )}
                        <p className="text-sm text-gray-300">{notification.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <button className="text-xs text-purple-400 hover:text-purple-300">View all</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Banner */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-indigo-900/90 z-10"></div>
          <Image 
            src="/images/highway-illustration.png" 
            alt="Highway with cars" 
            fill
            className="object-cover opacity-70"
            priority
          />
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: animateHero ? 0 : 20, opacity: animateHero ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center leading-tight">
              <span className="block">Travel Together,</span>
              <span className="block text-purple-300">Save Together</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-center mb-8 text-gray-300">
              Find companions for your journey and share costs while reducing your carbon footprint
            </p>
            <motion.button 
              className="bg-purple-600 text-white hover:bg-purple-700 rounded-full py-3 px-8 font-semibold text-lg shadow-xl transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Booking Form */}
      <motion.div 
        className="px-4 py-8 -mt-24 z-30 relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl mx-auto p-6 md:p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-100">Find Your Perfect Ride</h2>
            <div className="flex gap-2">
              <button 
                className={`py-2 px-6 font-medium rounded-full transition ${activeTab === 'find' ? 'bg-purple-600 text-white' : 'border border-purple-500 text-purple-400 bg-transparent hover:bg-gray-800'}`}
                onClick={() => setActiveTab('find')}
              >
                Find a ride
              </button>
              <button 
                className={`py-2 px-6 font-medium rounded-full transition ${activeTab === 'offer' ? 'bg-purple-600 text-white' : 'border border-purple-500 text-purple-400 bg-transparent hover:bg-gray-800'}`}
                onClick={() => setActiveTab('offer')}
              >
                Offer a ride
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Search History Button */}
            {recentSearches.length > 0 && (
              <button 
                className="absolute right-0 -top-30 text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                onClick={() => setShowRecentSearches(!showRecentSearches)}
              >
                <CalendarIcon className="h-3.5 w-3.5" />
                Recent searches
              </button>
            )}
            
            {/* Recent Searches Dropdown */}
            <AnimatePresence>
              {showRecentSearches && (
                <motion.div 
                  className="absolute top-0 right-0 left-0 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700 mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-2 border-b border-gray-700">
                    <p className="text-sm text-gray-400">Recent searches</p>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {recentSearches.map(search => (
                      <div 
                        key={search.id}
                        className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0"
                        onClick={() => useRecentSearch(search)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-200">
                              {search.pickup} → {search.drop}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(search.date).toLocaleDateString()} • {search.passengers || 1} passenger{(search.passengers || 1) !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <button className="text-purple-400 hover:text-purple-300">
                            <SearchIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              <div className="relative">
                <CitySearch
                  placeholder="From where?"
                  value={pickupLocation}
                  onChange={setPickupLocation}
                  onSelect={handlePickupSelect}
                  id="pickup-location"
                  className="transition-all"
                />
                
                {/* Swap Button */}
                <button 
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gray-800 p-1.5 rounded-full border border-gray-700 hover:bg-indigo-900 transition-colors z-10"
                  onClick={swapLocations}
                  title="Swap locations"
                >
                  <ChevronsUpDownIcon className="h-4 w-4 text-purple-400" />
                </button>
              </div>
              
              <div>
                <CitySearch
                  placeholder="To where?"
                  value={dropLocation}
                  onChange={setDropLocation}
                  onSelect={handleDropSelect}
                  id="drop-location"
                  className="transition-all"
                />
                {locationError && (
                  <p className="text-red-400 text-xs mt-1">{locationError}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <DatePicker
                  selectedDate={travelDate}
                  onChange={(date) => {
                    setTravelDate(date);
                    setFormError('');
                  }}
                  className="transition-all"
                />
                
                <div className="relative">
                  <label htmlFor="passenger-count" className="sr-only">Passengers</label>
                  <div className="flex items-center h-full">
                    <select
                      id="passenger-count"
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                      className="w-full h-full bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent px-3 py-2 appearance-none"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} passenger{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <UserIcon className="absolute right-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Filters (collapsed by default) */}
            <motion.div 
              className="mt-4"
              initial="closed"
              animate="closed"
              variants={{
                open: { height: 'auto', opacity: 1, marginTop: 16 },
                closed: { height: 0, opacity: 0, marginTop: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Price range</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      step="100" 
                      defaultValue="2500" 
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>₹5000+</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Departure time</label>
                  <div className="grid grid-cols-4 gap-1">
                    {["Morning", "Afternoon", "Evening", "Night"].map((time, i) => (
                      <button 
                        key={i}
                        className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm text-gray-300"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {["AC", "WiFi", "Pet Friendly", "Women Only"].map((amenity, i) => (
                      <div key={i} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`amenity-${i}`}
                          className="rounded-sm bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`amenity-${i}`} className="ml-1.5 text-sm text-gray-300">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Toggle for Advanced Filters */}
            <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm flex items-center">
              <FilterIcon className="h-3.5 w-3.5 mr-1.5" />
              Advanced filters
            </button>
          </div>
          
          {formError && (
            <p className="text-red-400 text-sm mt-3 text-center">{formError}</p>
          )}
          
          {/* Map/List View Toggle */}
          <div className="mt-3 mb-3 flex justify-center">
            <div className="bg-gray-800 rounded-full p-1 flex text-sm">
              <button 
                className={`px-4 py-1 rounded-full transition ${!isMapView ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                onClick={() => setIsMapView(false)}
              >
                List View
              </button>
              <button 
                className={`px-4 py-1 rounded-full transition ${isMapView ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                onClick={() => setIsMapView(true)}
              >
                Map View
              </button>
            </div>
          </div>
          
          <div onClick={(e) => {
            if (!handleSearch()) {
              e.preventDefault();
            }
          }}>
            <Link href={pickupLocation && dropLocation && travelDate ? 
              `/rides?pickup=${encodeURIComponent(pickupLocation)}&drop=${encodeURIComponent(dropLocation)}&date=${travelDate.toISOString().split('T')[0]}&passengers=${passengerCount}` : 
              "#"
            }>
              <motion.button 
                className="mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3.5 w-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg"
                disabled={!!locationError}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SearchIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">Find Rides</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Recommended Trips */}
      <div className="mt-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-purple-300">Recommended Trips</h3>
            <div className="flex items-center text-purple-400 text-sm">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              Trending now
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                from: "Delhi",
                to: "Jaipur",
                date: "Tomorrow",
                price: "450",
                savings: "30%",
                seats: 4,
                driver: "Rajesh K."
              },
              {
                from: "Mumbai",
                to: "Pune",
                date: "This weekend",
                price: "350",
                savings: "25%",
                seats: 2,
                driver: "Priya M."
              },
              {
                from: "Bangalore",
                to: "Chennai",
                date: "Next week",
                price: "600",
                savings: "20%",
                seats: 3,
                driver: "Arun S."
              }
            ].map((trip, i) => (
              <motion.div 
                key={i}
                className="bg-gradient-to-br from-gray-900 to-indigo-900/70 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-purple-700 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-lg font-bold text-white">{trip.from} → {trip.to}</div>
                      <div className="text-sm text-gray-400">{trip.date}</div>
                    </div>
                    <div className="bg-purple-900/60 px-2 py-1 rounded text-xs font-semibold text-purple-300">
                      Save {trip.savings}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 w-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs">
                        {trip.driver[0]}
                      </div>
                      <span className="text-sm text-gray-300">{trip.driver}</span>
                      <div className="text-yellow-500 text-xs flex items-center">
                        <StarIcon className="h-3 w-3 mr-0.5" />4.8
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-gray-400 text-xs">
                        <UserIcon className="h-3 w-3 mr-0.5" />
                        {trip.seats}
                      </div>
                      <div className="text-lg font-bold text-white">₹{trip.price}</div>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-16">
        {[{
          img: "coin",
          title: "Affordable Rides",
          desc: "Find rides at prices that won't break the bank. Split costs and travel for less."
        }, {
          img: "trust",
          title: "Verified Companions",
          desc: "We verify profiles and reviews so you can travel with confidence and peace of mind."
        }, {
          img: "lightening",
          title: "Quick & Easy Booking",
          desc: "Book your next ride in minutes with our simple, user-friendly process."
        }].map((feature, i) => (
          <motion.div 
            key={i} 
            className="bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center mb-4">
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-3 rounded-full mb-4">
                <Image src={`/images/${feature.img}.png`} alt={feature.title} width={40} height={40} className="opacity-90" />
              </div>
              <h3 className="text-lg font-semibold text-purple-300 text-center">{feature.title}</h3>
            </div>
            <p className="text-gray-400 text-center">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Rewards & Loyalty Program */}
      <div className="py-12 bg-gradient-to-br from-purple-900/40 to-indigo-900/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <motion.div 
                className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/40 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Join Our Loyalty Program</h3>
                <div className="flex gap-6 mb-6">
                  <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-3 w-full">
                    <CreditCardIcon className="h-8 w-8 text-purple-400 mb-2" />
                    <span className="text-xl font-bold text-white">1500</span>
                    <span className="text-xs text-gray-400">Points earned</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-3 w-full">
                    <CarIcon className="h-8 w-8 text-purple-400 mb-2" />
                    <span className="text-xl font-bold text-white">25%</span>
                    <span className="text-xs text-gray-400">Next ride discount</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Earn points with every ride, redeem for discounts, and enjoy 
                  exclusive perks as you level up your membership status.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 px-6 font-medium transition-colors">
                  Join Rewards Program
                </button>
              </motion.div>
            </div>
            
            <div className="w-full md:w-1/2">
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {[
                  { icon: "💰", title: "Earn Points", desc: "Get 100 points for every ₹100 spent" },
                  { icon: "🎁", title: "Free Rides", desc: "Redeem 2000 points for a free ride" },
                  { icon: "⭐", title: "Priority Support", desc: "Gold members get 24/7 priority assistance" },
                  { icon: "🔔", title: "Exclusive Deals", desc: "Early access to sales and special offers" }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="text-lg font-medium text-purple-300 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Section - Enhanced with Visual Elements */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src="/images/safety.svg" 
                  alt="Safety icons" 
                  width={500} 
                  height={400} 
                  className="object-contain"
                />
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div 
                className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-2xl mb-4 text-purple-300">Your Safety is Our Priority</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We verify all user profiles and enable secure in-app payments and communications. Our community guidelines help ensure respectful interactions between all travelers.
                </p>
                
                {/* Safety Features */}
                <div className="space-y-4 mb-6">
                  {[
                    { icon: "🔍", title: "ID Verification", desc: "All users pass a verification process" },
                    { icon: "📱", title: "Real-time Tracking", desc: "Share your journey with trusted contacts" },
                    { icon: "🚨", title: "24/7 Support", desc: "Emergency assistance whenever you need" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-gray-700 rounded-full p-2 text-lg">{feature.icon}</div>
                      <div>
                        <h4 className="font-medium text-purple-300">{feature.title}</h4>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="/safety">
                  <button className="bg-purple-600 text-white rounded-full px-6 py-2.5 font-medium hover:bg-purple-700 transition shadow-md">
                    Learn about our safety features
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Social Proof */}
      <div className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2 text-purple-300">What Our Users Say</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of happy travelers who share rides every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                location: "Delhi",
                rating: 5,
                text: "I was skeptical at first, but after my first ride, I was convinced! Saved 40% on my commute and made a new friend.",
                date: "2 weeks ago",
                trips: 12
              },
              {
                name: "Rahul Verma",
                location: "Mumbai",
                rating: 5,
                text: "As a driver, I've been able to offset my fuel costs completely. The verification process made me feel secure about who I'm traveling with.",
                date: "1 month ago",
                trips: 28
              },
              {
                name: "Ananya Patel",
                location: "Bangalore",
                rating: 4,
                text: "Great experience overall! The app is intuitive and finding rides is super easy. Customer support was helpful when I needed assistance.",
                date: "3 days ago",
                trips: 5
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, j) => (
                      <StarIcon key={j} className={`h-4 w-4 ${j < testimonial.rating ? 'text-yellow-500' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{testimonial.date}</span>
                  <span>{testimonial.trips} trips completed</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="text-purple-400 hover:text-purple-300 font-medium">
              Read more testimonials →
            </button>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="py-16 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative h-[500px]"
              >
                <div className="absolute top-0 left-10 w-56 h-auto transform -rotate-6">
                  <Image
                    src="/images/app-screen1.png"
                    alt="Mobile app screenshot"
                    width={280}
                    height={560}
                    className="rounded-3xl shadow-2xl border border-gray-700"
                  />
                </div>
                <div className="absolute top-20 right-10 w-56 h-auto transform rotate-6 z-10">
                  <Image
                    src="/images/app-screen2.png"
                    alt="Mobile app screenshot"
                    width={280}
                    height={560}
                    className="rounded-3xl shadow-2xl border border-gray-700"
                  />
                </div>
              </motion.div>
            </div>

            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold mb-4 text-white">Take RideShare Wherever You Go</h3>
                <p className="text-gray-300 mb-8">
                  Download our mobile app to book rides on the go, get real-time notifications, and track your driver's location. Available for iOS and Android.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-3 hover:bg-gray-900 transition">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M17.5,3H16.493C15.145,3,14,4.145,14,5.493V6.5C14,7.878,15.122,9,16.5,9H17.5C18.878,9,20,7.878,20,6.5V5.493C20,4.145,18.855,3,17.5,3Z"/>
                      <path d="M6.5,3H7.507C8.855,3,10,4.145,10,5.493V6.5C10,7.878,8.878,9,7.5,9H6.5C5.122,9,4,7.878,4,6.5V5.493C4,4.145,5.145,3,6.5,3Z"/>
                      <path d="M17.5,15H16.493C15.145,15,14,16.145,14,17.493V18.5C14,19.878,15.122,21,16.5,21H17.5C18.878,21,20,19.878,20,18.5V17.493C20,16.145,18.855,15,17.5,15Z"/>
                      <path d="M6.5,15H7.507C8.855,15,10,16.145,10,17.493V18.5C10,19.878,8.878,21,7.5,21H6.5C5.122,21,4,19.878,4,18.5V17.493C4,16.145,5.145,15,6.5,15Z"/>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="text-lg font-semibold">App Store</span>
                    </div>
                  </button>
                  
                  <button className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-3 hover:bg-gray-900 transition">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path d="M3.18,18.5c1.07,1.87,1.61,2.5,2.82,2.5H18c1.21,0,1.75-0.63,2.82-2.5l3-5.5c0.71-1.23,0.8-2.26,0-3.5l-3-5.5 C19.75,2.13,19.21,1.5,18,1.5H6c-1.21,0-1.75,0.63-2.82,2.5l-3,5.5c-0.8,1.24-0.71,2.27,0,3.5L3.18,18.5z"/>
                      <path fill="#FFF" d="M15.05,12l-3-5.5H9l4.05,7L9,19.5h3.05l3-5.5C15.44,13.34,15.44,12.66,15.05,12z"/>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-lg font-semibold">Google Play</span>
                    </div>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`h-10 w-10 rounded-full border-2 border-gray-900 bg-gradient-to-br from-purple-${600 - i * 100} to-indigo-${600 - i * 100}`}></div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-white">10k+ Downloads</div>
                    <div className="text-sm text-gray-400">Join our growing community</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Activity Map */}
      <div className="py-16 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/map-background.png"
            alt="Map background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2 text-purple-300">Live Activity</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See rides happening in real-time across India
            </p>
          </div>
          
          <div className="h-[400px] bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0">
              <Image
                src="/images/india-map.png"
                alt="Map of India with ride activity"
                fill
                className="object-contain opacity-60"
              />
            </div>
            
            {/* Activity indicators */}
            {[
              { top: "20%", left: "30%", size: "lg", pulse: "slow" }, // Delhi
              { top: "60%", left: "20%", size: "md", pulse: "medium" }, // Mumbai
              { top: "70%", left: "50%", size: "lg", pulse: "fast" }, // Bangalore
              { top: "40%", left: "80%", size: "sm", pulse: "medium" }, // Kolkata
              { top: "65%", left: "60%", size: "md", pulse: "slow" }, // Hyderabad
              { top: "30%", left: "40%", size: "sm", pulse: "fast" }, // Jaipur
              { top: "75%", left: "30%", size: "lg", pulse: "medium" }, // Chennai
            ].map((indicator, i) => (
              <div 
                key={i}
                className={`absolute rounded-full bg-purple-500 
                  ${indicator.size === 'lg' ? 'h-4 w-4' : indicator.size === 'md' ? 'h-3 w-3' : 'h-2 w-2'}
                  ${indicator.pulse === 'fast' ? 'animate-ping-fast' : indicator.pulse === 'medium' ? 'animate-ping-medium' : 'animate-ping-slow'}`}
                style={{ top: indicator.top, left: indicator.left }}
              />
            ))}
            
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400">Currently Active</div>
                  <div className="text-xl font-bold text-white">1,247 Rides</div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-white">230k+</div>
                    <div className="text-xs text-gray-400">Monthly Users</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">12M+</div>
                    <div className="text-xs text-gray-400">Kms Shared</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">45k+</div>
                    <div className="text-xs text-gray-400">CO₂ Saved (kg)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Section - Enhanced */}
      <div className="py-16 bg-gradient-to-br from-gray-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src="/images/carPassengers.svg" 
                  alt="Car passengers" 
                  width={500} 
                  height={400} 
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-bold text-3xl mb-4 text-purple-300">Got empty seats in your car?</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Turn your empty seats into extra income and enjoyable company. Share your ride and help create a greener planet.
                </p>
                
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Earn Extra Income", desc: "Cover your fuel costs and more by sharing your ride" },
                    { title: "Meet New People", desc: "Connect with like-minded travelers on your route" },
                    { title: "Reduce Carbon Footprint", desc: "Fewer cars on the road means less pollution" }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-purple-700/50 rounded-full p-1 mt-0.5">
                        <svg className="h-4 w-4 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{benefit.title}</h4>
                        <p className="text-sm text-gray-300">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-purple-600 text-white rounded-full px-6 py-3 font-semibold shadow-xl hover:bg-purple-700 transition flex items-center justify-center">
                    <span>Offer a ride</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </button>
                  <Link href="/how-it-works">
                    <button className="border border-purple-400 text-purple-300 bg-transparent rounded-full px-6 py-3 font-semibold hover:bg-gray-800/50 transition">
                      Learn how it works
                    </button>
                  </Link>
                </div>
                
                <div className="mt-6 p-3 bg-purple-900/30 border border-purple-800/30 rounded-lg flex items-center">
                  <div className="bg-purple-600/20 rounded-full p-2 mr-3">
                    <AlertTriangleIcon className="h-5 w-5 text-purple-300" />
                  </div>
                  <p className="text-sm text-gray-300">
                    Drivers earn an average of ₹8,000 per month sharing their daily commute
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Personalized Recommendations */}
      <div className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-purple-900/30 px-4 py-1 rounded-full text-purple-400 text-sm font-medium mb-4">
              AI-POWERED
            </div>
            <h3 className="text-2xl font-bold mb-2 text-purple-300">Personalized For You</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI learns your preferences to suggest the perfect rides and companions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold mb-4 text-white">Smart Matching</h4>
              <p className="text-gray-400 mb-6">
                Our algorithm matches you with compatible travel companions based on your preferences, 
                ratings, and travel history, ensuring enjoyable journeys every time.
              </p>
              <div className="grid grid-cols-4 gap-3">
                {["Music", "Conversation", "Pets", "Smoking"].map((pref, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-sm font-medium text-purple-300 mb-1">{pref}</div>
                    <div className="text-xs text-gray-400">Preference</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-4 text-white">Dynamic Pricing</h4>
              <p className="text-gray-400 mb-6">
                Get the best rates with our AI-powered pricing that adjusts based on demand, 
                traffic conditions, and historical data for your route.
              </p>
              <div className="h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="w-4/5 h-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="absolute top-full mt-1 left-0 text-xs text-gray-400">Low</div>
                  <div className="absolute top-full mt-1 right-0 text-xs text-gray-400">High</div>
                  <div className="absolute top-0 left-1/3 transform -translate-x-1/2 -translate-y-full bg-purple-600 text-white px-2 py-1 rounded text-xs">
                    Current Price
                  </div>
                  <div className="absolute top-0 left-1/3 w-2 h-10 bg-white rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Popular Routes - Enhanced */}
      <div className="py-12 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-xl text-purple-300">Popular Routes</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300">View all routes</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { from: "Delhi", to: "Jaipur", price: "₹450", time: "4h" },
              { from: "Mumbai", to: "Pune", price: "₹350", time: "2.5h" },
              { from: "Bengaluru", to: "Chennai", price: "₹600", time: "5h" },
              { from: "Delhi", to: "Agra", price: "₹350", time: "3h" },
              { from: "Kolkata", to: "Siliguri", price: "₹800", time: "8h" },
              { from: "Pune", to: "Mumbai", price: "₹350", time: "2.5h" },
              { from: "Delhi", to: "Manali", price: "₹1200", time: "12h" },
              { from: "Chennai", to: "Pondicherry", price: "₹400", time: "3h" }
            ].map((route, i) => (
              <motion.a 
                key={i} 
                href="#" 
                className="bg-gray-900 hover:bg-gray-800 rounded-xl py-4 px-4 flex flex-col items-center justify-center transition-all duration-300 border border-gray-800 shadow-sm hover:shadow-md group"
                whileHover={{ y: -5, borderColor: "#9333ea" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300 font-medium group-hover:text-purple-300 transition-colors">
                    {route.from} → {route.to}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full text-xs text-gray-500 mt-2">
                  <span>{route.price}</span>
                  <span>~{route.time}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// Add these styles to your global CSS file for the animations
// @keyframes ping-slow { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }
// @keyframes ping-medium { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }
// @keyframes ping-fast { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }
// .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
// .animate-ping-medium { animation: ping-medium 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
// .animate-ping-fast { animation: ping-fast 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
