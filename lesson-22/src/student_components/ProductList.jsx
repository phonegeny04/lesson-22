import React from 'react';
// [ЗАВДАННЯ 2.1]: Імпортуйте useSearchParams
import { useLocation, Link } from 'react-router-dom';
import { getProducts, getUniqueCategories } from '../data';

function ProductList() {
    const location = useLocation();
    const message = location.state?.msg;

    // [ЗАВДАННЯ 2.2]: Ініціалізуйте useSearchParams
    const [searchParams, setSearchParams] = [null, null]; // ЗАМІНИТИ

    // [ЗАВДАННЯ 2.3]: Отримайте значення параметрів 'category' та 'sort'
    const categoryFilter = 'all'; // ЗАМІНИТИ
    const sortOrder = 'none';     // ЗАМІНИТИ

    const availableCategories = getUniqueCategories();
    const allProducts = getProducts();

    // --- ЛОГІКА ФІЛЬТРАЦІЇ (ГОТОВА) ---
    let filteredProducts = allProducts.filter(product => 
        categoryFilter === 'all' || product.category === categoryFilter
    );

    // --- ЛОГІКА СОРТУВАННЯ (ГОТОВА) ---
    let sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price;
        if (sortOrder === 'price_desc') return b.price - a.price;
        return 0;
    });

    // --- ФУНКЦІЇ КЕРУВАННЯ QUERY-ПАРАМЕТРАМИ ---

    const setCategoryFilter = (newCategory) => {
        // [ЗАВДАННЯ 3.1]: Створіть mutable копію newParams
        const newParams = new URLSearchParams(searchParams);

        if (newCategory === 'all') {
            // [ЗАВДАННЯ 3.2]: Очистіть параметр 'category'
            // newParams.delete('category');
        } else {
            // [ЗАВДАННЯ 3.3]: Встановіть нове значення
            // newParams.set('category', newCategory);
        }
        
        // [ЗАВДАННЯ 3.4]: Оновіть URL (setSearchParams(newParams))
    };

    const setSortOrderFilter = (order) => {
        // [ЗАВДАННЯ 3.5]: Реалізуйте повну логіку для 'sort'
        // (Створення копії, перевірка 'none' та оновлення URL)
    };

    const clearFilters = () => {
        // [ЗАВДАННЯ 3.6]: Очистіть всі параметри URL
    };

    // ... (JSX фільтрів та карток)
    return (
        <div className="container">
            {message && <div className="message success">{message}</div>}
            <h1>Каталог Продуктів ({sortedProducts.length})</h1>
            
            {/* Фільтри та сортування (JSX ГОТОВИЙ, викликає функції вище) */}
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
                    <button className="btn-secondary" onClick={clearFilters}>Очистити все</button>
                </div>
                {/* ... (JSX для Сортування) */}
            </div>
            
            <div className="product-grid">
                {/* ... (JSX для карток) */}
            </div>
        </div>
    );
}
export default ProductList;