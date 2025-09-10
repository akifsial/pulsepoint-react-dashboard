import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import TopBar from "./TopBar";
import { useCategory } from "@src/hooks/useWebsite";
// Navigation types
interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: NavigationItem[];
}

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}


const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { data } = useCategory();
  const navigate = useNavigate();

  const navigationItems: NavigationItem[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    {
      label: "Facilities",
      href: "/facilities",
      hasDropdown: true,
      subItems: [
        { label: "Independent Living", href: "/facilities/independent-living" },
        { label: "Assisted Living", href: "/facilities/assisted-living" },
        { label: "Memory Care", href: "/facilities/memory-care" },
        { label: "Skilled Nursing", href: "/facilities/skilled-nursing" },
      ],
    },
    {
      label: "Health",
      href: "/health",
      hasDropdown: true,
      subItems: [
        { label: "Health Tips", href: "/health/tips" },
        { label: "Medical Resources", href: "/health/resources" },
        { label: "Wellness Programs", href: "/health/wellness" },
      ],
    },
    {
      label: "Financial Advice",
      href: "/financial-advice",
      hasDropdown: true,
      subItems: [
        { label: "Retirement Planning", href: "/financial-advice/retirement" },
        { label: "Insurance Guide", href: "/financial-advice/insurance" },
        { label: "Benefits", href: "/financial-advice/benefits" },
      ],
    },
    {
      label: "Technology Guides",
      href: "/technology-guides",
      hasDropdown: true,
      subItems: [
        {
          label: "Getting Started",
          href: "/technology-guides/getting-started",
        },
        { label: "Digital Safety", href: "/technology-guides/safety" },
        { label: "Apps & Tools", href: "/technology-guides/apps" },
      ],
    },
    { label: "Travel & Leisure", href: "/travel-leisure" },
    { label: "Lifestyle", href: "/lifestyle" },
    { label: "Help Center", href: "/help-center" },
  ];

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;


  const handleCategory = (id) => {
    if (userRole == "PATIENT") {
      navigate(`/patient/web/category?id=${id}`);
    }
    if (userRole == "CARE_PROVIDER") {
      navigate(`/care-provider/web/category?id=${id}`);
    }
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      <TopBar />

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div  className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TS</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  TopSenior<span className="text-blue-500">Spot</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex overflow-scroll items-center space-x-8">
              {data?.records?.map((item) => (
                <div key={item?.name} className="relative group">
                  <p
                    // to={item?.url_key}
                    onClick={()=>(handleCategory(item?.id))}
                    className={`flex items-center  text-sm font-medium transition-colors ${
                      isActiveLink(item?.url_key)
                        ? "text-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {item?.name}
                    {/* {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )} */}
                  </p>

                  {/* Dropdown Menu */}
                  {/* {item.hasDropdown && item.subItems && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              ))}
            </nav>

            {/* Search and Login */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search City, State, or Zip"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <button className="bg-black curor-pointer text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 pt-2 pb-3 space-y-1 bg-white">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search City, State, or Zip"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* Mobile Navigation */}
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${
                      isActiveLink(item.href)
                        ? "text-blue-500 bg-blue-50"
                        : "text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-500"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Login */}
              <button className="w-full mt-4 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Login
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
