import { products } from "../services/products";
import ProductCard from "../components/ProductCard";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import bannerImg from "../assets/banner.jpg"; // Make sure this file exists in src/assets

export default function Home() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat")?.toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery);
      const matchesCategory = categoryQuery ? p.category === categoryQuery : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryQuery]);

  useEffect(() => {
    const cards = document.querySelectorAll(".product-card-anim");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 120);
    });
  }, [filteredProducts]);

  return (
    <>
      <style>{`
        /* Banner Section */
        .banner-section {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 40px;
        }
        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .banner-section:hover .banner-img {
          transform: scale(1.05);
        }
        .banner-content {
          position: absolute;
          top: 55%; /* slightly lower */
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #fff;
        }
        .banner-content h1 {
          font-size: 48px;
          font-weight: 800;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          margin-bottom: 15px;
        }
        .banner-content p {
          font-size: 20px;
          margin-bottom: 25px;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.4);
        }
        .banner-btn {
          background: linear-gradient(135deg,#ff416c,#ff4b2b);
          color: #fff;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .banner-btn:hover {
          transform: scale(1.05);
        }

        /* Product cards animation */
        .product-card-anim { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-in-out; }
        .product-card-anim.show { opacity: 1; transform: translateY(0); }
        .card-hover { transition: transform 0.35s ease, box-shadow 0.35s ease; border-radius: 14px; }
        .card-hover:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 18px 35px rgba(0,0,0,0.18); }

        .section-title { font-size: 30px; font-weight: 800; text-align: center; margin-bottom: 30px; color: #222; }
        .no-result { text-align: center; font-size: 22px; margin-top: 40px; color: #777; }
      `}</style>

      <div className="container py-5">

        {/* Banner Section - show only on default home page */}
        {!categoryQuery && !searchQuery && (
          <div className="banner-section">
            <img src={bannerImg} alt="Banner" className="banner-img" />
            <div className="banner-content">
             
              <p></p>
              <button
                className="banner-btn"
                onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
              >
                Shop Now
              </button>
            </div>
          </div>
        )}

        {/* Products Section */}
        <h2 className="section-title">Our Products</h2>

        {filteredProducts.length === 0 && (
          <div className="no-result">
            No products found
            {categoryQuery && ` in ${categoryQuery}`}
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3 product-card-anim"
            >
              <div className="card-hover">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
