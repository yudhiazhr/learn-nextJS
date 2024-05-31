"use client";

import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ListCategories = () => {
  
  /* Call a context */
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(ProductContext);

  return (
    <>
      <h1>Categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`bg-white p-4 text-black rounded-full ${
              selectedCategory === category ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default ListCategories;
