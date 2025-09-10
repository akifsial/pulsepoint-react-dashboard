import { FC, useState } from "react";
import { ChevronDown, ChevronDownCircle, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import navLogo from "@assets/media/website/nav-logo.svg";
import { useCategory } from "@src/hooks/useWebsite";
import { useQueryClient } from "@tanstack/react-query";
import LoginOrSignupModal from "@components/Model/LoginOrSignupModal";
import friendPlus from "@assets/media/svgs/dashboard-svgs/friend-login.svg";
import LoginModal from "@components/Model/LoginModal";

import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const UtilityRow: FC = () => {
  const [query, setQuery] = useState("");
  const { data } = useCategory();

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

  const handleCategory = (id: string) => {
    navigate(`/web/category?id=${id}`);
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
                onClick={() => setLoginModal(true)}
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

      <nav className="flex lg:block hidden justify-center p-4 shadow-md">
        <ul className="flex justify-center gap-6">
          <>
            <li className="relative group cursor-pointer">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 text-black cursor-pointer hover:text-blue-600 font-normal text-[14px]"
              >
                HOME
              </button>
            </li>

            <li className="relative group cursor-pointer">
              <button
                onClick={() => navigate("/about-us")}
                className="flex items-center gap-1 text-black cursor-pointer hover:text-blue-600 font-normal text-[14px]"
              >
                ABOUT US
              </button>
            </li>

            {/*  */}
            {data?.records?.map((cat) => (
              <li key={cat.name} className="relative group cursor-pointer">
                {/* Main Category Button */}
                <button className="flex items-center gap-1 text-black cursor-pointer font-normal text-[14px] hover:text-blue-600">
                  <span onClick={() => handleCategory(cat?.id)}>
                    {" "}
                    {cat.name.toUpperCase()}
                  </span>
                  {cat.children && cat.children.length > 0 && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </button>

                {/* Subcategories (dropdown) with animation */}
                {cat.children && cat.children.length > 0 && (
                  <ul
                    className="
          absolute left-0 w-48 bg-white rounded-lg shadow-lg
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
                        onClick={() => handleCategory(sub?.id)}
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
                className="flex font-normal text-[14px] items-center gap-1 text-black cursor-pointer hover:text-blue-600"
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
