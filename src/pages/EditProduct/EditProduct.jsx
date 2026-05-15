import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    existingProduct();
  }, [id]);

  const existingProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8081/products/${id}`);
      if (!response.ok) {
        throw new Error("No product exist with such id");
      }
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setQuantity(data.quantity);
      setCategory(data.category);
      setActive(data.active);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = {
        name,
        description,
        price,
        quantity,
        category,
        active,
      };
      const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="outer-form-container">
      <p>Edit Product</p>
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
export default EditProduct;
