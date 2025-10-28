import CategoryCard from "@components/Website/Home/categorycard";
import { useCategory } from "@src/hooks/usewebsite";
import React from "react";

function CategoriesTab({categoryTitle,className="bg-white"}) {
  const { data: categories, isLoading, isError } = useCategory();

  return (
    <section className={`${className} py-[40px]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="md:text-[36px] text-[25px] font-bold md:mb-[22px] mb-[25px] ">
          {categoryTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories?.records?.map((category: any, index) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesTab;
