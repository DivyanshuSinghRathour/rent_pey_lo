import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "./heroSlides";
import { features } from "./features";
import { featuredProducts } from "./featured_products";


const RentpeyloHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userName, setUserName] = useState('');

  const scrollRef = useRef(null);
  const itemWidth = 320 + 16;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('rentpeylo_user_name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
           {/* logo */}
            <div className="flex items-center space-x-6">
              <span
                style={{
                  fontFamily: '"Freckle Face", "Freckle Face Fallback", cursive',
                  fontSize: '28px',
                  lineHeight: '42px',
                  color: '#ff5555',
                  fontWeight: 'bold',
                }}
              >
                RentPeylo
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414A4 4 0 1012 13.414l4.243 4.243a1 1 0 001.414-1.414z" />
                </svg>
                <span>Select Location</span>
              </div>
            </div>

            {/* Middle Section: Search Bar */}
            <div className="flex-1 mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products ..."
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-3 top-2.5 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17.65 17.65A8 8 0 1116.24 4.59a8 8 0 011.41 13.06z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-700">
              <button className="hover:text-blue-700">Welcome, {userName ? userName : 'User'}!</button>
              <svg
                className="w-6 h-6 text-gray-600 hover:text-blue-700 cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.34 5.34A1 1 0 007 20h10a1 1 0 001-.78L20 13H7z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Slider  */}
      <section className="relative h-72 md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
              }`}
          >
            <div className="w-full h-fit">
              <div className="aspect-[11/4] inset-0 flex items-center justify-center text-center text-white p-2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        ))}


        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute shadow left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-opacity-40 text-black p-2 rounded-full backdrop-blur-sm transition duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute shadow right-4 top-1/2 transform -translate-y-1/2 bg-white/50 bg-opacity-20 hover:bg-opacity-40 text-black p-2 rounded-full backdrop-blur-sm transition duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition duration-300 ${index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Moving and Stop on Hover Line */}
      <section className="py-4 bg-blue-50 border-y border-blue-100">
        <style>{`
    .marquee-container {
      position: relative;
      overflow: hidden;
    }
    .animate-marquee {
      display: flex;
      animation: marquee 20s linear infinite;
      white-space: nowrap;
      will-change: transform;
      transition: animation-duration 0.5s ease; /* Smooth transition for animation duration */
    }
    /* Change animation duration on hover to slow down */
    .marquee-container:hover .animate-marquee {
      animation-duration: 40s; /* Slower speed on hover */
    }
    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .fade-left,
    .fade-right {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 5rem;
      pointer-events: none;
      z-index: 10;
    }
    .fade-left {
      left: 0;
      background: linear-gradient(to right, #e0e7ff, transparent);
    }
    .fade-right {
      right: 0;
      background: linear-gradient(to left, #e0e7ff, transparent);
    }
  `}</style>

        <div className="marquee-container">
          <div className="flex animate-marquee whitespace-nowrap">
            {features.concat(features).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 mx-5 text-blue-900">
                <div className="bg-gradient-to-tr from-violet-400 to-purple-800 border flex justify-center items-center rounded-full p-2">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <span className="font-semibold">{feature.title}</span>
              </div>
            ))}
          </div>
          <div className="fade-left" />
          <div className="fade-right" />
        </div>
      </section>

      {/* Exlore the categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 underline">
            Explore our categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-yellow-50 hover:shadow-lg border border-transparent hover:border-yellow-200">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sofa h-12 w-12 text-amber-600"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"></path><path d="M4 18v2"></path><path d="M20 18v2"></path><path d="M12 4v9"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-10">Rent Furniture</h3>
              <p className="text-gray-600 text-sm">Cozy up with stylish sofas, tables, and more!</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-blue-50 hover:shadow-lg border border-transparent hover:border-blue-200">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refrigerator h-12 w-12 text-blue-600"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"></path><path d="M5 10h14"></path><path d="M15 7v6"></path></svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-10">Rent Appliances</h3>
              <p className="text-gray-600 text-sm">Power up with fridges, ovens, and cool gadgets!</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-purple-50 hover:shadow-lg border border-transparent hover:border-purple-200">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-orange-50 to-blue-50 flex items-center justify-center">
              <div className="mb-2 flex flex-row items-center gap-2 rounded-full bg-gradient-to-r from-amber-50 to-blue-100 p-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sofa h-12 w-12 text-amber-600"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"></path><path d="M4 18v2"></path><path d="M20 18v2"></path><path d="M12 4v9"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refrigerator h-12 w-12 text-blue-600"><path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"></path><path d="M5 10h14"></path><path d="M15 7v6"></path></svg></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-10">Rent Packages</h3>
              <p className="text-gray-600 text-sm">Get the best of both worlds with bundled deals!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-6 bg-[#f3f7fb]">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="underline">Hot Deals</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-5"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
            </h2>
          </div>

          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute shadow left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-opacity-40 text-black p-2 rounded-full backdrop-blur-sm transition duration-300 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute shadow right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-opacity-40 text-black p-2 rounded-full backdrop-blur-sm transition duration-300 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Product List */}
            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-hidden px-8"
            >
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[320px] bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="h-100 flex items-center justify-center text-gray-700 text-sm">
                    Image not added yet!
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-sm text-gray-900 leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">Rent</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="line-through text-sm text-gray-400">
                          ₹{product.originalPrice}
                        </span>
                        <span className="text-sm text-gray-800">N/A</span>
                        <span className="text-sm text-gray-500">/month</span>
                      </div>
                      <div className="text-sm text-white bg-green-700 px-3 py-1 rounded-md font-semibold">
                        100.00% OFF
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Rent in Just 3 Step */}
      <section className="py-6 bg-white">
        <div className="max-w-8xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Rent in just 3 easy steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col relative shadow-grey-700 ">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-blue-800 font-semibold text-lg">Explore & Rent</h3>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Find what you need, and we’ll make it happen!</span>
                <span className="text-6xl font-bold text-gray-200 leading-none mt-10">01</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col relative shadow-grey-700 ">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-blue-800 font-semibold text-lg">Verify & Book Slot</h3>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Complete KYC, Select Delivery Slot.</span>
                <span className="text-6xl font-bold text-gray-200 leading-none mt-10">02</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col relative shadow-grey-700 ">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-blue-800 font-semibold text-lg">Swift Delivery</h3>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Free delivery to your doorstep in just 72 hours.</span>
                <span className="text-6xl font-bold text-gray-200 leading-none mt-10">03</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 p-6">
        <div className="mx-auto grid max-w-8xl gap-4">

          <div className="my-10 flex justify-between">

            <div className="space-y-2">
              <span
                style={{
                  fontFamily: '"Freckle Face", "Freckle Face Fallback", cursive',
                  fontSize: '28px',
                  lineHeight: '42px',
                  color: '#ff5555',
                  fontWeight: 'bold',
                }}
              >
                RentPeylo
              </span>

              <p className="text-muted-foreground font-medium">Premium Style, Affordable Rent</p>
              <p className="text-muted-foreground text-sm">RentPeylo is a platform for renting furnitures.</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-muted-foreground text-base font-bold">Company</h4>
              <ul className="text-muted-foreground space-y-1 text-base">
                <li><a href="/faq">FAQs</a></li>
                <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-muted-foreground text-base font-bold">Contact</h4>
              <ul className="text-muted-foreground space-y-1 text-base">
                <li><a href="mailto:support@rentpeylo.com">Email — support@rentpeylo.com</a></li>
                <li><a href="tel:1800-120-9870">Call — 1800-120-9870</a></li>
                <p>Mon to Sat 9 AM to 7 PM</p>
              </ul>
            </div>

          </div>

          <div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full bg-muted-foreground/30"></div>

          <div className="flex justify-between">
            <p className="text-muted-foreground text-sm">Copyright © 2025 RentPeylo. All rights reserved.</p>
            <p className="text-muted-foreground text-sm">Mumbai, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentpeyloHomepage;