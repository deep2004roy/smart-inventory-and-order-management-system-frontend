import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name required";
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
      const response = await api.post("/products", formData);
      toast.success("Product added successfully");

      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setActive(false);
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="outer-form-container">
        <p>Add Product</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p>{errors.name}</p>}
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p>{errors.price}</p>}
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {errors.quantity && <p>{errors.quantity}</p>}
          <label htmlFor="active">Active:</label>
          <input
            type="checkbox"
            name="active"
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
