import { FC } from "react";
import { ArrowBigRight, ArrowRight, ChevronRight } from "lucide-react"; // npm install lucide-react
import { useCategory, useGetCategories } from "@src/hooks/useWebsite";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import he from "he";

interface Category {
  id: number;
  name: string;
  active?: boolean;
}

const categories: Category[] = [
  { id: 1, name: "Activities" },
  { id: 2, name: "Costs" },
  { id: 3, name: "Exercises" },
  { id: 4, name: "Facilities", active: true },
  { id: 5, name: "Financial Advice" },
  { id: 6, name: "Gadgets" },
  { id: 7, name: "Health & Wellness" },
  { id: 8, name: "Homes" },
  { id: 9, name: "Independent Living" },
  { id: 10, name: "Lifestyle" },
  { id: 11, name: "Meals" },
  { id: 12, name: "Technology Guides" },
  { id: 13, name: "Travel & Leisure" },
];

const CategorySidebar: FC = ({ setCategoryName }) => {
  const { data } = useCategory();

  const { data: CategoryData } = useGetCategories();

  // console.log("*&788888", CategoryData);

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;

  const navigate = useNavigate();

  const handleCategory = (cat) => {
    
    if (userRole == "PATIENT") {
      navigate(`/patient/web/category?id=${cat?.id}&category=${cat.slug}`);
    }
    if (userRole == "CARE_PROVIDER") {
      navigate(
        `/care-provider/web/category?id=${cat?.id}&category=${cat.slug}`
      );
    }

    navigate(`/web/category?id=${cat?.id}&category=${cat.slug}`);
  };

  return (
    <div className="w-full rounded-2xl md:mt-0 mt-10 bg-white shadow p-4">
      {/* Heading */}
      <h2 className="text-[20px] font-normal text-[#020202] mb-2">
        Categories
      </h2>
      <hr className="mb-4 border-gray-200" />

      {/* Category List */}
      <ul className="space-y-2">
        {CategoryData?.data?.data?.map((cat) => (
          <li
            onClick={() => handleCategory(cat)}
            key={cat?.id}
            className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer 
            transition-colors duration-200 ${
              cat?.id == id
                ? "text-sky-500 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{he.decode(cat?.name)}</span>
            <ArrowRight
              size={18}
              className={cat.active ? "text-sky-500" : "text-gray-400"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
