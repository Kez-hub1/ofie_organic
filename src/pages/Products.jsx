import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import shea from '../assets/shea.png';
import image1 from '../assets/image1.jpg';
import image3 from '../assets/image3.jpg';

const Products = () => {
  // const [cartItems, setCartItems] = useState({});
  const products = [
    {
      id: 1,
      name: "Pure Shea Butter",
      price: 24.99,
      image: shea,
      description: "Raw, unrefined shea butter sourced directly from Ghana. Rich in vitamins A and E, perfect for moisturizing and healing dry skin.",
      rating: 4.9,
      reviews: 156,
      category: "Skincare",
      // isOnSale: true,
      isNew: false
    },
    {
      id: 2,
      name: "Organic Herbal Shampoo",
      price: 18.99,
      image: image1,
      description: "Gentle, sulfate-free shampoo infused with organic herbs and essential oils. Cleanses without stripping natural oils.",
      rating: 4.8,
      reviews: 89,
      category: "Hair Care",
      // isOnSale: false,
      // isNew: true
    },
    {
      id: 3,
      name: "Avocado Body Oil",
      price: 32.99,
      image: image3,
      description: "Luxurious body oil made from premium avocado oil. Deeply nourishes and repairs damaged skin with essential fatty acids.",
      rating: 4.9,
      reviews: 203,
      category: "Body Care",
      // isOnSale: false,
      // isNew: true,
    },
    {
      id: 4,
      name: "Gentle Body Wash",
      price: 21.99,
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      rating: 4.7,
      reviews: 134,
      category: "Body Care",
      // isOnSale: true,
      // isNew: false
    },
    
  ];

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);

  };
  //  const addToCart = async (itemId, size) => {
  //   if (!TOKEN ) {
  //     toast.error("SIGN IN TO ADD TO CART");
  //     return;
  //   }
    // const storedUserId = localStorage.getItem("USER_ID");

  //   let cartData = structuredClone(cartItems);

  //   if (cartData[itemId]) {
  //     if (cartData[itemId][size]) {
  //       cartData[itemId][size] += 1;
  //     } else {
  //       cartData[itemId][size] = 1;
  //     }
  //   } else {
  //     cartData[itemId] = {};
  //     cartData[itemId][size] = 1;
  //   }

  //   setCartItems(cartData);
  // };
  // const getAllProducts = async () => {
  //   try {
  //     const response = await apiClient.get(
  //       "the continuation of the url from backend",
  //       {
  //         headers: {
  //           Authorization: Bearer ${localStorage.getItem("TOKEN")}, //Do this if she added authorization for getting the products
  //         },
  //       }
  //     );
      // console.log(response.data); //this here will show in the console you can then check the structure of the data grom the backend using that and know how to render it in ur UI
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-9 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our collection of organic beauty products, carefully crafted 
              with natural ingredients for your skin and hair care needs.
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;