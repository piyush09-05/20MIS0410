import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rating'); // Default sorting by rating
  const [selectedCompany, setSelectedCompany] = useState('FLP'); // Selected company filter
  const [selectedCategory, setSelectedCategory] = useState('Computer'); // Selected category filter
  const [topN, setTopN] = useState(5); // Default top N products

  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        const response = await axios.get("http://localhost:3000/companies/categories/products",{
          params:{sortBy, companyname:selectedCompany, categoryname:selectedCategory, topN}
        }
       
      );
        setProducts(response.data.paginatedProducts);
        console.log(products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, selectedCompany, selectedCategory, topN]); // Fetch products whenever filters or sortBy change

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTopNChange = (event) => {
    setTopN(event.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="filters-container">
        <div className="filter">
          <label htmlFor="company">Company:</label>
          <select id="company" value={selectedCompany} onChange={handleCompanyChange}>
            <option value="">All</option>
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
            <option value="SNP">SNP</option>
            <option value="MYN">MYN</option>
            <option value="AZO">AZO</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="Phone">Phone</option>
            <option value="Computer">Computer</option>
            <option value="TV">TV</option>
            {/* Add more categories here */}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="topN">Top N:</label>
          <input type="number" id="topN" value={topN} onChange={handleTopNChange} min="1" />
        </div>
        <div className="filter">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>
      {products.map(product => (
        <div key={product.productId} className="product">
          <div className="product-info">
            <h2>{product.productName}</h2>
            <p className="price">Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p className="availability">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
