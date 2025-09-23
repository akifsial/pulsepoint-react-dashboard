import { FC, useEffect, useState } from "react";
import { ChevronDown, ChevronDownCircle, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import navLogo from "@assets/media/website/nav-logo.svg";
import {
  useCategory,
  useGetBlogsCategory,
  useGetCategories,
} from "@src/hooks/useWebsite";
import { useQueryClient } from "@tanstack/react-query";
import LoginOrSignupModal from "@components/Model/LoginOrSignupModal";
import friendPlus from "@assets/media/svgs/dashboard-svgs/friend-login.svg";
import LoginModal from "@components/Model/LoginModal";
import he from "he";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// interface UtilityRowProps {
//   setCurrentPage: Dispatch<SetStateAction<number>>;
// }
const UtilityRow: FC = ({setCurrentPage}) => {
  const [query, setQuery] = useState("");
  const { data } = useCategory();
  const { data: CategoryData } = useGetCategories();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | number | null>(null);

  const navigate = useNavigate();

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const token = JSON.parse(localStorage.getItem("token"));
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;

  const queryClient = useQueryClient();

  const [loginModal, setLoginModal] = useState(false);

  const handleLogout = () => {
    queryClient.clear();
    // disconnectSocket();
    localStorage.clear();

    // if (userRole == "PATIENT" ) {
    //   navigate("/login");
    // } else if(userRole=="CARE_PROVIDER") {
    //   navigate("/admin/login");
    // }

    if (userRole == "ADMIN") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveMenu("home");
    } else if (location.pathname === "/about-us") {
      setActiveMenu("about us");
    } else if (location.pathname === "/help-center") {
      setActiveMenu("help");
    }
    // agar category hai
    else if (location.pathname.includes("/category")) {
      const params = new URLSearchParams(location.search);
      const id = params.get("id");
      if (id) setActiveMenu(Number(id));
    }
  }, [location.pathname, location.search]);

  const handleCategory = (id: string, name, slug) => {
    // console.log("asdasdasda", name);
    
    setActiveCategoryId(id);
    navigate(`/web/category?id=${id}&category=${slug}`);
    setCurrentPage(1);
  };

  const handleClick = () => {
    if (userRole == "PATIENT") {
      return navigate("/patient/web/");
    }
    if (userRole == "CARE_PROVIDER") {
      return navigate("/care-provider/web/");
    }
    navigate("/");
  };

  const handleLogin = () => {
    localStorage.clear();
    navigate("/login");
  };

  const allowedCategories = [
    "Facilities",
    "Health &amp; Wellness",
    "Technology Guides",
    "Travel &amp; Leisure",
    "Lifestyle",
    "Financial Advice",
  ];

  // console.log("dddddddddddddd",CategoryData?.data?.data)

  return (
    <>
      <div className="mx-auto w-full border-b border-b-[#11111133] max-w-screen-xl px-4 py-4 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Logo — left side */}
          <p
            onClick={handleClick}
            className=" cursor-pointer flex h-10 w-auto sm:h-[42px]"
          >
            <img src={navLogo} alt="TopSeniorSpot" className="h-full w-auto" />
          </p>

          {/* Desktop Navigation */}
          {/* <nav className="hidden lg:flex overflow-scroll items-center space-x-8">
          {data?.records?.map((item) => (
            <div key={item?.name} className="relative group">
              <p
                onClick={() => handleCategory(item?.id)}
                className={`flex items-center cursor-pointer text-sm font-medium transition-colors ${
                  isActiveLink(item?.url_key)
                    ? "text-blue-500 "
                    : "text-gray-700 hover:text-blue-500 hover:underline"
                }`}
              >
                {item?.name}
               
              </p>
            </div>
          ))}
        </nav> */}

          {/* Right-hand group */}
          <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            {/* Search bar */}

            {/* Login button */}
            {/* changes here */}
            {token && userRole !== "ADMIN" ? (
              <button
                type="button"
                className="cursor-pointer h-12 min-w-[200px] rounded-lg bg-[#2DB2FD] px-6 font-geist text-base font-semibold text-white transition-colors duration-150 active:scale-95 sm:w-[131px]"
                onClick={() => navigate("/login")}
              >
                My Account
              </button>
            ) : (
              ""
            )}

            {token && userRole !== "ADMIN" ? (
              <button
                type="button"
                className="cursor-pointer h-12 w-full rounded-lg bg-[#111111] px-6 font-geist text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1a1a1a] active:scale-95 sm:w-[131px]"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : !token && userRole !== "ADMIN" ? (
              <button
                type="button"
                className="cursor-pointer flex justify-center items-center gap-2 h-12 w-full rounded-lg bg-[#111111] px-6 font-geist text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1a1a1a] active:scale-95 sm:w-[131px]"
                onClick={() => navigate("/login")}
              >
                <img className="w-[24px] h-[24px]" src={friendPlus} alt="" />
                Login
              </button>
            ) : (
              ""
            )}

            {userRole == "ADMIN" ? (
              <button
                type="button"
                className="cursor-pointer flex justify-center items-center gap-2 h-12 w-full rounded-lg bg-[#111111] px-6 font-geist text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1a1a1a] active:scale-95 sm:w-[131px]"
                onClick={() => handleLogin()}
              >
                <img className="w-[24px] h-[24px]" src={friendPlus} alt="" />
                Login
              </button>
            ) : (
              ""
            )}
          </div>

          {/* Desktop Navigation */}

          <LoginModal
            // onSignup={() => navigate("/signup")}
            // onLogin={() => navigate("/login")}
            setShowModal={setLoginModal}
            onClose={() => setLoginModal(false)}
            isOpen={loginModal}
          />
        </div>
        {/* <div className="w-full border-t border-[#11111133]" /> */}
      </div>

      {/* <nav className="hidden mx-auto lg:flex justify-center mt-5 overflow-scroll items-center space-x-8">
        {data?.records?.map((item) => (
          <div key={item?.name} className="relative group">
            <p
              onClick={() => handleCategory(item?.id)}
              className={`flex items-center cursor-pointer text-sm font-medium transition-colors ${
                isActiveLink(item?.url_key)
                  ? "text-blue-500 "
                  : "text-gray-700 hover:text-blue-500 hover:underline"
              }`}
            >
              {item?.name}
            </p>
          </div>
        ))}
      </nav> */}

      {/* <nav className="flex lg:block hidden justify-center p-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-between gap-6">
          <>
            <li className="relative group cursor-pointer">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 text-black cursor-pointer hover:text-blue-600 font-normal text-[16px]"
              >
                HOME
              </button>
            </li>

            <li className="relative group cursor-pointer">
              <button
                onClick={() => navigate("/about-us")}
                className="flex items-center gap-1 text-black cursor-pointer hover:text-blue-600 font-normal text-[16px]"
              >
                ABOUT US
              </button>
            </li>

            {CategoryData?.data?.map((cat) => (
              <li key={cat.name} className="relative group cursor-pointer">
                <button className="flex items-center gap-1 text-black cursor-pointer font-normal text-[16px] hover:text-blue-600">
                  <span
                    onClick={() => {
                      handleCategory(cat?.id, cat?.name);
                    }}
                  >
                    {" "}
                    {cat.name.toUpperCase()}
                  </span>
                  {cat.children && cat.children.length > 0 && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </button>

                {cat.children && cat.children.length > 0 && (
                  <ul
                    className="
          absolute z-[999999] left-0 w-48 bg-white rounded-lg shadow-lg
          opacity-0 scale-95 translate-y-2
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
          transform transition-all duration-300 ease-in-out
          pointer-events-none group-hover:pointer-events-auto
        "
                  >
                    {cat.children.map((sub) => (
                      <li
                        key={sub?.name}
                        className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          handleCategory(sub?.id, sub?.name);
                        }}
                      >
                        {sub?.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="relative group cursor-pointer">
              <button
                onClick={() => navigate("/help-center")}
                className="flex font-normal text-[16px] items-center gap-1 text-black cursor-pointer hover:text-blue-600"
              >
                HELP CENTER
              </button>
            </li>
          </>
        </ul>
      </nav> */}

      <nav className="overflow-x-auto p-4 mx-auto max-w-7xl lg:block hidden">
        <ul className="flex gap-6 w-max">
          <>
            <li className="flex-shrink-0 relative group cursor-pointer">
              <button
                onClick={() => navigate("/")}
                className={`relative pb-1 cursor-pointer ${
                  activeMenu === "home"
                    ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                    : "text-black hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                }`}
              >
                HOME
              </button>
            </li>

            <li className="flex-shrink-0 relative group cursor-pointer">
              <button
                onClick={() => {
                  navigate("/about-us");
                }}
                className={`relative pb-1 cursor-pointer ${
                  activeMenu === "about us"
                    ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                    : "text-black hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                }`}
              >
                ABOUT US
              </button>
            </li>

            {/* {CategoryData?.data?.data?.map((cat) => (
              <li
                key={cat?.name}
                className="flex-shrink-0 relative group cursor-pointer"
              >
                <button className="flex cursor-pointer items-center gap-1 text-black font-normal text-[16px] hover:text-blue-600">
                  <span
                    onClick={() => {
                      handleCategory(cat?.id, cat?.name, cat?.slug);
                      setActiveMenu(cat?.id); // ✅ category id ko active set karo
                    }}
                    className={`relative pb-1 cursor-pointer ${
                      activeMenu === cat.id
                        ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                        : "text-black hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                    }`}
                  >
                    {he.decode(cat.name).toUpperCase()}
                  </span>

                  {cat.children && cat.children.length > 0 && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </button>

                {cat.children && cat.children.length > 0 && (
                  <ul
                    className="absolute z-[999999] left-0 w-48 bg-white rounded-lg shadow-lg
              opacity-0 scale-95 translate-y-2
              group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
              transform transition-all duration-300 ease-in-out
              pointer-events-none group-hover:pointer-events-auto"
                  >
                    {cat.children.map((sub) => (
                      <li
                        key={sub?.name}
                        className="px-4 cursor-pointer py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          handleCategory(sub?.id, sub?.name);
                        }}
                      >
                        {sub?.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))} */}

            {CategoryData?.data?.data
              ?.filter((cat) => allowedCategories.includes(cat?.name)) // ✅ only keep these
              .map((cat) => (
                <li
                  key={cat?.name}
                  className="flex-shrink-0 relative group cursor-pointer"
                >
                  <button className="flex cursor-pointer items-center gap-1 text-black font-normal text-[16px] hover:text-blue-600">
                    <span
                      onClick={() => {
                        handleCategory(cat?.id, cat?.name, cat?.slug);
                        setActiveMenu(cat?.id);
                      }}
                      className={`relative pb-1 cursor-pointer ${
                        activeMenu === cat.id
                          ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                          : "text-black hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                      }`}
                    >
                      {he.decode(cat.name).toUpperCase()}
                    </span>

                    {cat.children && cat.children.length > 0 && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </button>

                  {cat.children && cat.children.length > 0 && (
                    <ul
                      className="absolute z-[999999] left-0 w-48 bg-white rounded-lg shadow-lg
          opacity-0 scale-95 translate-y-2
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
          transform transition-all duration-300 ease-in-out
          pointer-events-none group-hover:pointer-events-auto"
                    >
                      {cat.children.map((sub) => (
                        <li
                          key={sub?.name}
                          className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            handleCategory(sub?.id, sub?.name);
                          }}
                        >
                          {sub?.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

            <li className="flex-shrink-0 relative group cursor-pointer">
              <button
                onClick={() => navigate("/help-center")}
                className={`relative pb-1 cursor-pointer ${
                  activeMenu === "help"
                    ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                    : "text-black hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300"
                }`}
              >
                HELP CENTER
              </button>
            </li>
          </>
        </ul>
      </nav>
    </>
  );
};

export default UtilityRow;
