import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { fetchProducts } from '../api/client'; // adjust path if needed

const TOKEN = "<token>"; // <-- Replace with your real token

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts(TOKEN);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-9 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl about md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;