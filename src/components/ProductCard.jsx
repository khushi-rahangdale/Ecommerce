import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product.id}`}>
        <img src={product.img} className="card-img-top" alt={product.name} />
      </Link>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="fw-bold">₹{product.price}</p>

        <button
          className="btn btn-primary mt-auto"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
