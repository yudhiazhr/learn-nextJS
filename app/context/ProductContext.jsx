"use client";

import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const base_url = "https://fakestoreapi.com/products";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalPrice, setTotalPrice] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [countCategory, setCountCategory] = useState({})

  /* Fetching data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(base_url);
        const productsData = await res.json();
        setProducts(productsData);
        setFilteredProducts(productsData);

        const resp = await fetch(base_url + "/categories");
        const categoriesData = await resp.json();
        setCategories(["all", ...categoriesData]);

        /* all prices from productsData */
        const prices = productsData.map((product) => product.price);
        console.log(prices);


        /* total price */
        const totalPrice = prices.reduce((a, b) => a + b, 0).toFixed(2);
        console.log("Total price:", totalPrice);


        /* average price */
        const averagePrice = (totalPrice / productsData.length).toFixed(2);
        console.log("Average price:", averagePrice);

        /* filter and count a category */
        const counts = 
        {
          "men's clothing": productsData.filter(
            (product) => product.category === "men's clothing"
          ).length,
          jewelery: productsData.filter(
            (product) => product.category === "jewelery"
          ).length,
          electronics: productsData.filter(
            (product) => product.category === "electronics"
          ).length,
          "women's clothing": productsData.filter(
            (product) => product.category === "women's clothing"
          ).length,
        };
        console.log(counts)

        setTotalPrice(totalPrice);
        setAveragePrice(averagePrice);
        setCountCategory(counts);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /* Filter/Sorting */
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  /* Add new product */
  const addProduct = async (newProductData) => {
    try {
      const res = await fetch(base_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (res.ok) {
        const addedProduct = await res.json();
        setProducts([...products, addedProduct]);

        if (
          selectedCategory === "all" ||
          selectedCategory === addedProduct.category
        ) {
          setFilteredProducts([...filteredProducts]);
        }

        console.log("Product added successfully:", addedProduct);
      } else {
        console.error("Failed to add product!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  /* Delete Product */
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${base_url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const deleteProduct = products.filter((product) => product.id !== id);
        setProducts(deleteProduct);
        const updatedFilteredProducts = filteredProducts.filter(
          (product) => product.id !== id
        );
        setFilteredProducts(updatedFilteredProducts);
        console.log("Product deleted successfully!");
      } else {
        console.error("Failed to delete product!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  /* Update Product */
  const updateProduct = async (updatedProduct, id) => {
    try {
      const res = await fetch(`${base_url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        const updatedProductData = await res.json();

        // Update the products state with the updated product
        const updatedProducts = products.map((product) =>
          product.id === id ? updatedProductData : product
        );
        setProducts(updatedProducts);

        // Update filteredProducts
        const updatedFilteredProducts = filteredProducts.map((product) =>
          product.id === id ? updatedProductData : product
        );
        setFilteredProducts(updatedFilteredProducts);

        console.log("Product updated successfully:", updatedProductData);
      } else {
        console.error("Failed to update product!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        addProduct,
        deleteProduct,
        updateProduct,
        averagePrice,
        totalPrice,
        countCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
