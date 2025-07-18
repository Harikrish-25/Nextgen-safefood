import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'snacks', name: 'Healthy Snacks' },
    { id: 'beverages', name: 'Natural Beverages' },
    { id: 'supplements', name: 'Supplements' },
    { id: 'organic', name: 'Organic Foods' },
  ];

  const products = [
    {
      id: 1,
      name: 'Organic Trail Mix',
      category: 'snacks',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 124,
      tags: ['Preservative-Free', 'Organic', 'Gluten-Free'],
      description: 'A delicious blend of nuts, seeds, and dried fruits',
    },
    {
      id: 2,
      name: 'Green Smoothie Powder',
      category: 'supplements',
      price: 24.99,
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 89,
      tags: ['Preservative-Free', 'Vegan', 'Superfood'],
      description: 'Nutrient-packed green powder for daily wellness',
    },
    {
      id: 3,
      name: 'Herbal Tea Blend',
      category: 'beverages',
      price: 18.99,
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 156,
      tags: ['Preservative-Free', 'Organic', 'Caffeine-Free'],
      description: 'Calming herbal blend for relaxation and wellness',
    },
    {
      id: 4,
      name: 'Quinoa Protein Bars',
      category: 'snacks',
      price: 16.99,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 203,
      tags: ['Preservative-Free', 'High-Protein', 'Gluten-Free'],
      description: 'Protein-packed bars made with quinoa and natural ingredients',
    },
    {
      id: 5,
      name: 'Cold-Pressed Juice',
      category: 'beverages',
      price: 8.99,
      image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 87,
      tags: ['Preservative-Free', 'Fresh', 'Vitamin-Rich'],
      description: 'Fresh cold-pressed juice with no added sugars',
    },
    {
      id: 6,
      name: 'Organic Granola',
      category: 'organic',
      price: 14.99,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 178,
      tags: ['Preservative-Free', 'Organic', 'Whole Grain'],
      description: 'Crunchy granola made with organic oats and honey',
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const convertToINR = (usdPrice: number) => (usdPrice * 83).toFixed(2);

  // Add to cart using localStorage
  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart'); // Redirect to cart page after adding
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Healthy Products</h1>
          <p className="text-lg text-gray-500">Discover our range of preservative-free, natural products</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300'; }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {product.tags[0]}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(1).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">₹{convertToINR(product.price)}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleAddToCart(product);
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;