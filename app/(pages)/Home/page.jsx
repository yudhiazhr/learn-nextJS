"use client";
import ListCategories from "@/app/components/ListCategories";
import ProductList from "@/app/components/ListProducts";
import { ProductContext } from "@/app/context/ProductContext";
import { useContext, useState } from "react";

const Home = () => {

  /* all state */
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  /* call product context */
  const { categories, addProduct } = useContext(ProductContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* function submit for all input data at form */
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
    };

    /* function addProduct for call API with method POST from ProductContext */
    addProduct(newProduct);

    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
    setIsPopupVisible(false);
  };

  return (
    <>
      <section className="h-[80dvh] pt-8">
        <div className="px-8 flex flex-col gap-8">
          <div className="flex justify-between">
            <button
              className="bg-white p-2 text-black rounded-full w-24"
              onClick={() => setIsPopupVisible(true)}
            >
              Tambah
            </button>
          </div>

          <ListCategories />
          <ProductList />
        </div>
      </section>

      {/* Pop up form */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 h-[75dvh] w-[75dvw] rounded-lg">
            <h2 className="text-xl mb-4">Add New Product</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="p-2 border rounded text-black"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="p-2 border rounded text-black"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="p-2 border rounded text-black"
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="p-2 border rounded text-black"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="p-2 border rounded text-black"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setIsPopupVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
