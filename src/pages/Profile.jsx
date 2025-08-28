import React, { useState } from 'react';
import { User, Package, Heart, Settings, Edit3, Save, X, Camera, MapPin, Phone, Mail, Calendar, Award, Leaf } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+233 544 123 456',
    address: '123 Organic Street, Natural City, NC 12345',
    joinDate: 'March 2023',
    skinType: 'Sensitive',
    preferences: ['Fragrance-Free', 'Vegan', 'Cruelty-Free']
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

//   const orders = [
//     {
//       id: '#ORD-001',
//       date: 'Dec 15, 2024',
//       status: 'Delivered',
//       total: '$67.97',
//       items: ['Pure Shea Butter', 'Avocado Body Oil'],
//       statusColor: 'text-green-600 bg-green-100'
//     },
//     {
//       id: '#ORD-002',
//       date: 'Nov 28, 2024',
//       status: 'Processing',
//       total: '$43.98',
//       items: ['Organic Herbal Shampoo', 'Gentle Body Wash'],
//       statusColor: 'text-blue-600 bg-blue-100'
//     },
//     {
//       id: '#ORD-003',
//       date: 'Nov 10, 2024',
//       status: 'Delivered',
//       total: '$24.99',
//       items: ['Pure Shea Butter'],
//       statusColor: 'text-green-600 bg-green-100'
//     }
//   ];

  const favorites = [
    {
      name: 'Pure Shea Butter',
      price: '$24.99',
      image: 'https://images.pexels.com/photos/6621392/pexels-photo-6621392.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Avocado Body Oil',
      price: '$32.99',
      image: 'https://images.pexels.com/photos/6621464/pexels-photo-6621464.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-5 w-5" /> },
    // { id: 'orders', label: 'Orders', icon: <Package className="h-5 w-5" /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <>
    <Navbar />
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and track your organic beauty journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                {/* <div className="relative inline-block">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div> */}
                <h3 className="text-xl font-bold text-gray-900 mt-4">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.email}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Eco Warrior</span>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {activeTab === 'overview' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Account Overview</h2>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-2" />
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={tempData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={tempData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={tempData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 inline mr-2" />
                          Address
                        </label>
                        {isEditing ? (
                          <textarea
                            value={tempData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.address}</p>
                        )}
                      </div>

                      <div>
                        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Member Since
                        </label> */}
                        {/* <p className="text-gray-900 font-medium">{profileData.joinDate}</p> */}
                      </div>

                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Leaf className="h-4 w-4 inline mr-2" />
                          Skin Type
                        </label>
                        {isEditing ? (
                          <select
                            value={tempData.skinType}
                            onChange={(e) => handleInputChange('skinType', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                          >
                            <option value="Normal">Normal</option>
                            <option value="Dry">Dry</option>
                            <option value="Oily">Oily</option>
                            <option value="Combination">Combination</option>
                            <option value="Sensitive">Sensitive</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.skinType}</p>
                        )}
                      </div> */}
                    </div>
                  </div>
{/* 
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Product Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.preferences.map((pref, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div> */}
                </div>
              )}

              {/* {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{order.total}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Favorite Products</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-green-600 font-bold text-lg">{product.price}</p>
                        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h2>
                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-600" defaultChecked />
                          <span className="ml-3 text-gray-700">Email notifications for new products</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-600" defaultChecked />
                          <span className="ml-3 text-gray-700">Order status updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-600" />
                          <span className="ml-3 text-gray-700">Marketing emails and promotions</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-600" defaultChecked />
                          <span className="ml-3 text-gray-700">Make my profile public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-600" />
                          <span className="ml-3 text-gray-700">Share my reviews publicly</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                          Change Password
                        </button>
                        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Profile;