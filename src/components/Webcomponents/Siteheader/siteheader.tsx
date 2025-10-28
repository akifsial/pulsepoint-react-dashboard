import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { siteHeaderLinks } from "@components/web-components/site-header/site-header-links";
import siteLogo from "@assets/media/svgs/top-senior-spot-logo.svg";
import { PrimaryButton } from "@components/Sharedcomponents/Buttons/Commonbutton/commonbutton";
import "./SiteHeader.css";

const SiteHeader: React.FC = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1023);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (type: string) => {
    setIsOpenDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <header className=" bg-white shadow-sm mb-6">
      <div className="flex items-center justify-between  py-5  default_container">
        <Link to="/" className="flex items-center gap-2 site_logo">
          <img
            src={siteLogo}
            alt="Site Logo"
            className=" lg:w-[195px] md:w-[140px] sm:w-[130px] w-[120px]"
          />
        </Link>

        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={27} className="cursor-pointer" />
            ) : (
              <Menu size={27} className="cursor-pointer" />
            )}
          </button>
        ) : (
          <nav className="flex gap-6">
            {siteHeaderLinks.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <button
                    className="flex w-full justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleDropdown(item.linkName)}
                  >
                    {item.linkName}
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="flex w-full justify-between items-center py-2 cursor-pointer"
                    onClick={() => setMenuOpen(false)} 
                  >
                    {item.linkName}
                  </Link>
                )}

                <AnimatePresence>
                  {item.hasDropdown && isOpenDropdown === item.linkName && (
                    <motion.ul
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.4 }}
                      className="pl-4"
                    >
                      {item.dropdownOptions?.map((option) => (
                        <li key={option.id}>
                          <Link
                            to={option.path}
                            className="block py-1 text-sm"
                            onClick={() => setMenuOpen(false)} 
                          >
                            {option.linkName}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        )}

        {!isMobile && (
          <div className="flex gap-4">
            <PrimaryButton
              btnClass="w-full bg-[var(--primary-color)] text-white px-8 py-2"
              showImg={false}
              btnText="Login"
            />
            <PrimaryButton
              btnClass="w-full bg-[var(--primary-color)] text-white  px-8 py-2"
              showImg={false}
              btnText="Signup"
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-3/4 h-screen bg-gray-100 shadow-lg z-50"
          >
            <div className="flex flex-col gap-2 px-4 py-2">
              {siteHeaderLinks.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.path}
                    className="flex w-full justify-between items-center py-2 cursor-pointer"
                    onClick={() =>
                      item.hasDropdown && toggleDropdown(item.linkName)
                    }
                  >
                    {item.linkName}
                    {item.hasDropdown && <ChevronDown size={16} />}
                  </Link>
                  <AnimatePresence>
                    {item.hasDropdown && isOpenDropdown === item.linkName && (
                      <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.4 }}
                        className="pl-4"
                      >
                        {item.dropdownOptions?.map((option) => (
                          <li key={option.id}>
                            <Link
                              to={option.path}
                              className="block py-1 text-sm"
                            >
                              {option.linkName}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="mt-2">
                <PrimaryButton
                  btnClass="w-full  bg-[var(--primary-color)] text-white px-7 py-2 mb-3"
                  showImg={false}
                  btnText="Login"
                />
                <PrimaryButton
                  btnClass="w-full  bg-[var(--primary-color)] text-white px-7 py-2 "
                  showImg={false}
                  btnText="Signup"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
