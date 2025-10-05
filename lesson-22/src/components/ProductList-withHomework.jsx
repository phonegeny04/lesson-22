import React from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { getProducts, getUniqueCategories } from './data';

function ProductList() {
    const location = useLocation();
    // Повідомлення про успіх (отримане з useNavigate/state після додавання продукту)
    const message = location.state?.msg; 

    const [searchParams, setSearchParams] = useSearchParams();

    // 1. ЧИТАННЯ ПАРАМЕТРІВ
    const categoryFilter = searchParams.get('category') || 'all';
    const sortOrder = searchParams.get('sort') || 'none';
    const currentSearchTerm = searchParams.get('search') || ''; // <-- Читаємо параметр 'search'

    const availableCategories = getUniqueCategories();
    const allProducts = getProducts();

    // --- ФУНКЦІЇ КЕРУВАННЯ QUERY-ПАРАМЕТРАМИ ---

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

    const setSearchFilter = (searchTerm) => {
        const newParams = new URLSearchParams(searchParams);

        if (searchTerm) {
            newParams.set('search', searchTerm);
        } else {
            newParams.delete('search');
        }
        setSearchParams(newParams);
    };
    
    const clearFilters = () => {
        // Очищає всі параметри, включаючи пошук, сортування та категорію
        setSearchParams({}); 
    };

    // --- ЛОГІКА ФІЛЬТРАЦІЇ ТА СОРТУВАННЯ ---
    
    let filteredProducts = allProducts.filter(product => {
        // Фільтр 1: Категорія
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

        // Фільтр 2: Пошук за назвою (без урахування регістру)
        const matchesSearch = product.name
            .toLowerCase()
            .includes(currentSearchTerm.toLowerCase());

        return matchesCategory && matchesSearch; // Комбінована фільтрація
    });

    let sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price;
        if (sortOrder === 'price_desc') return b.price - a.price;
        // Тут буде місце для name_asc/desc у ДЗ
        return 0;
    });

    return (
        <div className="container">
            {message && <div className="message success">{message}</div>}
            <h1>Каталог Продуктів ({sortedProducts.length})</h1>

            {/* БЛОК ПОШУКУ */}
            <div className="search-control">
                <input 
                    type="text" 
                    placeholder="Пошук за назвою..."
                    value={currentSearchTerm} 
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
                {currentSearchTerm && (
                    <button className="btn-secondary" onClick={() => setSearchFilter('')}>
                        Скинути пошук
                    </button>
                )}
            </div>

            {/* КОНТРОЛЬ ФІЛЬТРІВ ТА СОРТУВАННЯ */}
            <div className="filter-controls">
                <h3>Категорія:</h3>
                <div className="filter-group">
                    {availableCategories.map(cat => (
                        <button
                            key={cat}
                            className={`btn-filter ${categoryFilter === cat ? 'active' : ''}`}
                            onClick={() => setCategoryFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                    
                    <h3>Сортування:</h3>
                    <div className="filter-group">
                        <button
                            className={`btn-filter ${sortOrder === 'none' ? 'active' : ''}`}
                            onClick={() => setSortOrderFilter('none')}
                        >
                            За замовчуванням
                        </button>
                        <button
                            className={`btn-filter ${sortOrder === 'price_asc' ? 'active' : ''}`}
                            onClick={() => setSortOrderFilter('price_asc')}
                        >
                            Ціна (від ⬆️)
                        </button>
                        <button
                            className={`btn-filter ${sortOrder === 'price_desc' ? 'active' : ''}`}
                            onClick={() => setSortOrderFilter('price_desc')}
                        >
                            Ціна (до ⬇️)
                        </button>
                    </div>
                    
                    <button className="btn-secondary" onClick={clearFilters}>Очистити все</button>
                </div>
            </div>
            
            {/* КАРТКИ ПРОДУКТІВ */}
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