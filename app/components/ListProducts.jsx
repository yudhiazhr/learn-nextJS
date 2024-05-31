import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductContext } from "../context/ProductContext";

const ProductList = () => {

  /* call a context form product context */
  const { filteredProducts, deleteProduct, updateProduct, categories } = useContext(
    ProductContext
  );

  /* state */
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleUpdateProduct = async (e) => {

    /* make it not refresh the page */
    e.preventDefault()

    /* call function updateProduct with parameter formData and id a single product from product context */
    await updateProduct(formData, formData.id);
    setIsEditPopupVisible(false);
  };

  /* a function to open pop up with a value of product in the form */
  const openEditPopup = (product) => {
    setFormData(product);
    setIsEditPopupVisible(true);
  };

  return (
    <>
      <p>Products</p>
      <div className="grid gap-12 w-full ">
        {filteredProducts.map((data, index) => (
          <div key={index} className="flex flex-col gap-2 justify-between items-center mb-4">
            <Link href={`/products/${data.id}`}>
              <Image
                src={data.image}
                width="500"
                height="500"
                priority
                className="w-[320px] h-[320px]"
                alt={data.image}
              />
            </Link>
            <h1>{data.category}</h1>
            <p className="text-center">{data.title}</p>
            <h2>$ {data.price}</h2>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEditPopup(data)} 
                
                // Open edit popup with product data
                className="bg-white p-2 text-black rounded-full w-24"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(data.id)}
                className="bg-white p-2 text-black rounded-full w-24"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pop up Component */}
      {isEditPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 h-[75dvh] w-[75dvw] rounded-lg">
            <h2 className="text-xl mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                className="p-2 border rounded text-black"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Price"
                className="p-2 border rounded text-black"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                className="p-2 border rounded text-black"
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Image URL"
                className="p-2 border rounded text-black"
              />
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setIsEditPopupVisible(false)}
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

export default ProductList;
