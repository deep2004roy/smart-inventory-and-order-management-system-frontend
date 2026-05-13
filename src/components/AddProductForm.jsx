import "./AddProductForm.css";
import { useState } from "react";
function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price,
      quantity,
      category,
      active,
    };
    try {
      const response = await fetch("http://localhost:8081/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      console.log("Saved product: ", data);
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setActive(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
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
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor="active">Active:</label>
        <input
          type="checkbox"
          name="active"
          id="active"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddProductForm;
