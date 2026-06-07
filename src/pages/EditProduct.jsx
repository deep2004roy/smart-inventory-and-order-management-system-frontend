import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { categories } from "../constants/categories";
function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (id) existingProduct();
  }, [id]);

  const existingProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setQuantity(response.data.quantity);
      setCategory(response.data.category);
      setActive(response.data.active);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product details");
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await api.put(`/products/${id}`, formData);
      toast.success("Product updated successfully");
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-lg font-medium text-slate-600">
            Loading product...
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Edit Product</h1>
            <p className="mt-2 text-slate-500">
              Update product details, stock information and image.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              {/*name */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none
                  transition focus:border-indigo-500
                  focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              {/*category */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {/*price */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              {/*quantity */}
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                {quantity > 0 ? (
                  <p className="mt-2 text-sm text-green-600">In Stock</p>
                ) : (
                  <p className="mt-2 text-sm text-red-600">Out of Stock</p>
                )}
              </div>
              {/*description */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              {/*active */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="h-5 w-5 accent-indigo-600"
                />
                <label className="font-medium text-slate-700">
                  Product Active
                </label>
              </div>
              {/*image upload */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-slate-700">
                  Replace Image
                </label>
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block w-full cursor-pointer rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-700 hover:border-indigo-500"
                  />
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-48 w-48 rounded-xl border object-cover shadow-md transition hover:scale-105"
                    />
                  ) : (
                    imageUrl && (
                      <img
                        src={`http://localhost:8081/uploads/${imageUrl}`}
                        alt={name}
                        className="h-48 w-48 rounded-xl border object-cover shadow-md
                        transition hover:scale-105"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
            {/*buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-lg px-6 py-3 font-medium text-white transition ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProduct;
