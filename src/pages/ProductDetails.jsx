import { useParams } from "react-router-dom";
import { products } from "../services/products";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="container py-5">Product not found.</div>;

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">

        {/* Product Image */}
        <div className="col-md-6 text-center">
          <div className="product-img-container position-relative">
            <img
              src={product.img}
              className="img-fluid rounded shadow-lg product-img"
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">{product.name}</h1>
          <h3 className="text-primary mb-3">₹{product.price}</h3>
          <p className="mb-4 text-muted">{product.desc}</p>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center mb-4">
            <span className="me-3 fw-semibold">Quantity:</span>
            <button
              className="btn btn-outline-secondary rounded-circle me-2"
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              -
            </button>
            <span className="px-3 fw-bold">{qty}</span>
            <button
              className="btn btn-outline-secondary rounded-circle ms-2"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn btn-gradient btn-lg px-5 py-2 fw-bold"
            onClick={() => addToCart({ ...product, qty })}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Inline styles */}
      <style>{`
        .product-img-container {
          overflow: hidden;
          border-radius: 15px;
        }
        .product-img {
          transition: transform 0.3s ease;
        }
        .product-img:hover {
          transform: scale(1.05);
        }
        .btn-gradient {
          background: linear-gradient(135deg,#667eea,#764ba2);
          color: white;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-gradient:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
      `}</style>
    </div>
  );
}
