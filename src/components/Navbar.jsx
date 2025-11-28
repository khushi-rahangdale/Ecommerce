import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { cart, isLoggedIn, logoutUser } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <>
      <style>
        {`
          .navbar {
            background: linear-gradient(135deg,#f5f7ff,#e0e7ff);
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
          }
          .navbar:hover {
            box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          }

          .brand-name {
            font-weight: 700;
            font-size: 1.5rem;
            background: linear-gradient(135deg,#667eea,#764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /*  Menu Item ki Effects */
          .menu-item {
            font-weight: 500;
            font-size: 16px;
            padding: 8px 14px !important;
            margin: 0 6px;
            color: #444 !important;
            border-radius: 8px;
            transition: all 0.3s ease-in-out;
            position: relative;
          }

          .menu-item:hover {
            transform: scale(1.05);
            background: linear-gradient(135deg,#667eea,#764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* Underline animation */
          .menu-item::after {
            content: "";
            position: absolute;
            left: 12px;
            bottom: 2px;
            width: 0%;
            height: 2px;
            background: linear-gradient(135deg,#667eea,#764ba2);
            transition: width 0.3s ease;
          }

          .menu-item:hover::after {
            width: 60%;
          }

          /* Buttons */
          .btn-gradient {
            background: linear-gradient(135deg,#667eea,#764ba2);
            color: white;
            font-weight: 600;
            padding: 8px 18px;
            border-radius: 50px;
          }

          .btn-cart {
            border-radius: 50px;
            transition: 0.3s;
          }

          .btn-cart:hover {
            background: linear-gradient(135deg,#667eea,#764ba2);
            color: white !important;
          }

          /* Black Cart Badge */
          .cart-badge {
            background: #000 !important;
            color: #fff !important;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 50%;
            font-size: 12px;
          }

          .search-input {
            width: 220px;
            transition: 0.3s;
          }
          .search-input:focus {
            width: 320px;
            box-shadow: 0 4px 12px rgba(102,126,234,0.3);
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3">

        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
          <img
            src={logo}
            alt="ShopWithAs Logo"
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
            className="me-2"
          />
          <span className="brand-name">ShopWithAs</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Menu Items  */}
          <ul className="navbar-nav me-auto ms-4">
            <li className="nav-item"><Link className="nav-link menu-item" to="/?cat=men">Men</Link></li>
            <li className="nav-item"><Link className="nav-link menu-item" to="/?cat=women">Women</Link></li>
            <li className="nav-item"><Link className="nav-link menu-item" to="/?cat=kids">Kids</Link></li>
            <li className="nav-item"><Link className="nav-link menu-item" to="/?cat=electronics">Electronics</Link></li>
            <li className="nav-item"><Link className="nav-link menu-item" to="/?cat=home">Home & Living</Link></li>
          </ul>

          {/* Search  bar ka code*/}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control rounded-pill px-3 search-input"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* Cart */}
          <Link
            to="/cart"
            className="btn btn-outline-primary btn-cart me-3 d-flex align-items-center position-relative"
          >
            <i className="bi bi-cart3 me-2 fs-5"></i>
            Cart
            {totalQty > 0 && (
              <span className="cart-badge position-absolute top-0 start-100 translate-middle">
                {totalQty}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className="btn btn-gradient d-flex align-items-center px-4">
              <i className="bi bi-person-circle me-2 fs-5"></i> Login
            </Link>
          ) : (
            <button onClick={logoutUser} className="btn btn-outline-danger d-flex align-items-center px-4">
              <i className="bi bi-box-arrow-right me-2 fs-5"></i> Logout
            </button>
          )}

        </div>
      </nav>
    </>
  );
}