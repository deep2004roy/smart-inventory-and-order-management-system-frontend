import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { categories } from "../constants/categories";
function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name required";
    }

    if (!category.trim()) {
      newErrors.category = "Category required";
    }

    if (quantity <= 0) {
      newErrors.quantity = "Quantity required";
    }

    if (price <= 0) {
      newErrors.price = "Price must be positive";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("active", active);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await api.post("/products", formData);
      toast.success("Product added successfully");

      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setActive(false);
      setImage(null);
      setErrors({});
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-175 rounded-lg bg-white p-8 shadow-xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-800">
            Add Product
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 md:w-1/2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category:
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition
              focus:border-indigo-500 focus:ring-2
              focus:ring-indigo-200"
              rows="4"
            />
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 md:w-1/2">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price:
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                )}
                {quantity > 0 ? (
                  <p className="mt-2 text-sm text-green-600">In Stock</p>
                ) : (
                  <p className="mt-2 text-sm text-red-600">Out of Stock</p>
                )}
              </div>
            </div>
            <div className="mb-5 flex items-center gap-3">
              <label
                htmlFor="active"
                className="text-sm font-medium text-slate-700"
              >
                Active:
              </label>
              <input
                type="checkbox"
                name="active"
                id="active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300
                accent-indigo-600"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="block w-full rounded-md border  border-dashed border-gray-300 p-4 text-sm text-gray-700 cursor-pointer hover:border-indigo-500"
              />
              {image && (
                <p className="mt-2 text-sm text-slate-500">
                  Selected: {image.name}
                </p>
              )}
              {image && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-slate-600">
                    Image Preview
                  </p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-40 h-40 rounded-lg border object-cover shadow-md"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-md py-3 px-8 text-white transition duration-200
                font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
