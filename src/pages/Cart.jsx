import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart, total } = useContext(CartContext);

  if (cart.length === 0)
    return (
      <div className="container py-5 text-center">
        <h3 className="text-muted">Your cart is empty.</h3>
      </div>
    );

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="cart-card p-3 mb-4 d-flex align-items-center shadow-sm rounded-3"
        >
          {/* Product Image */}
          <img
            src={item.img}
            className="rounded cart-img"
            alt={item.name}
          />

          {/* Product Info */}
          <div className="ms-4 flex-grow-1">
            <h5 className="fw-bold m-0">{item.name}</h5>
            <p className="text-primary fw-semibold mt-1">₹{item.price}</p>
          </div>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center me-4">
            <button
              className="qty-btn"
              onClick={() => updateQty(item.id, item.qty > 1 ? item.qty - 1 : 1)}
            >
            -
            </button>

            <span className="qty-number">{item.qty}</span>

            <button
              className="qty-btn"
              onClick={() => updateQty(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            className="btn btn-danger rounded-pill px-4"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Cart k Total k  */}
      <div className="text-end mt-4">
        <h3 className="fw-bold">Total: ₹{total}</h3>
        <button className="btn btn-gradient btn-lg mt-3 px-5">Checkout</button>
      </div>

      <style>{`
        .cart-card {
          background: #ffffff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cart-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .cart-img {
          width: 110px;
          height: 110px;
          object-fit: cover;
          border-radius: 12px;
        }
        .qty-btn {
          background: #eee;
          border: none;
          font-size: 20px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .qty-btn:hover {
          background: linear-gradient(135deg,#667eea,#764ba2);
          color: white;
        }
        .qty-number {
          padding: 0 15px;
          font-weight: 600;
          font-size: 18px;
        }
        .btn-gradient {
          background: linear-gradient(135deg,#667eea,#764ba2);
          color: #fff;
          border: none;
          transition: 0.3s ease;
        }
        .btn-gradient:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 18px rgba(102, 126, 234, 0.4);
        }
      `}</style>
    </div>
  );
}
