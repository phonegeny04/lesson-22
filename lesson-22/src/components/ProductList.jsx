import React from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { getProducts, getUniqueCategories } from './data';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  // Отримуємо повідомлення зі state (наприклад, після додавання продукту)
  const message = location.state?.msg;

  // 1. Читання параметрів з URL
  const categoryFilter = searchParams.get('category') || 'all';
  const sortOrder = searchParams.get('sort') || 'none'; // 'price_asc', 'price_desc', 'none'

  // Отримуємо всі продукти та категорії
  const allProducts = getProducts();
  const uniqueCategories = getUniqueCategories();

  // --- Логіка Фільтрації ---
  let filteredProducts = allProducts.filter(product => 
    categoryFilter === 'all' || product.category === categoryFilter
  );

  // --- Логіка Сортування ---
  let sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price_asc') {
      return a.price - b.price;
    }
    if (sortOrder === 'price_desc') {
      return b.price - a.price;
    }
    return 0; // Без сортування
  });

  // --- Функції Керування Query-параметрами ---

  const setCategoryFilter = (newCategory) => {
    const newParams = new URLSearchParams(searchParams); 
    if (newCategory === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', newCategory);
    }
    setSearchParams(newParams);
  };
  
  const setSortOrderFilter = (order) => {
    const newParams = new URLSearchParams(searchParams); 
    if (order === 'none') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', order);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({}); // Очищуємо всі параметри
  };

  return (
    <div className="container">
      <h1>Каталог Продуктів</h1>
      
      {message && <div className="message success">{message}</div>}

      <div className="filter-sort-section">
        <h3>Фільтр за Категорією:</h3>
        <div className="filter-controls">
          {uniqueCategories.map(cat => (
            <button 
              key={cat}
              className={categoryFilter === cat ? 'active-filter' : 'btn-secondary'}
              onClick={() => setCategoryFilter(cat)}>
              {cat === 'all' ? 'Всі' : cat}
            </button>
          ))}
        </div>
        
        <h3>Сортування:</h3>
        <div className="filter-controls">
          <button 
            className={sortOrder === 'price_asc' ? 'active-filter' : 'btn-secondary'}
            onClick={() => setSortOrderFilter('price_asc')}>Ціна (від меншої)
          </button>
          <button 
            className={sortOrder === 'price_desc' ? 'active-filter' : 'btn-secondary'}
            onClick={() => setSortOrderFilter('price_desc')}>Ціна (від більшої)
          </button>
          <button 
            className={sortOrder === 'none' ? 'active-filter' : 'btn-secondary'}
            onClick={() => setSortOrderFilter('none')}>Без сортування
          </button>
          <button className="btn-danger" onClick={clearFilters}>Очистити все</button>
        </div>
      </div>

      <p>Поточні параметри в URL: 
        <code>category={categoryFilter}</code>, 
        <code>sort={sortOrder}</code>
      </p>
      
      <div className="product-grid">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <Link to={`/products/${product.sku}`} key={product.sku} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-card-body">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="sku">SKU: {product.sku}</p>
                <p className="price">{product.price.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' })}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Продуктів за такими критеріями не знайдено.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;