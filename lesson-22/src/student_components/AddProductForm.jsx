import React, { useState } from 'react';
// [ЗАВДАННЯ 1.1]: Імпортуйте useNavigate
import { addProduct, getUniqueCategories } from '../data';

function AddProductForm() {
    // [ЗАВДАННЯ 1.2]: Ініціалізуйте useNavigate
    const navigate = null; // ЗАМІНИТИ null НА ВИКЛИК useNavigate()

    const categories = getUniqueCategories().filter(cat => cat !== 'all');
    const [formData, setFormData] = useState({ 
        name: '', price: 0, category: categories[0] || '', description: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.price || !formData.description) {
            setError("Будь ласка, заповніть всі поля.");
            return;
        }

        const newProduct = { ...formData, price: Number(formData.price) };
        addProduct(newProduct);

        // [ЗАВДАННЯ 1.3]: Виконайте навігацію на '/products'
        // Використайте state, щоб передати повідомлення про успіх
        // navigate('/products', { /* ... */ });
        
        console.log(`Продукт ${newProduct.name} додано. Редірект.`);
    };

    return (
        <div className="container">
            <h1>Додати новий продукт</h1>
            {error && <div className="message error">{error}</div>}
            <form onSubmit={handleSubmit} className="product-form">
                {/* ... (JSX форми) */}
            </form>
        </div>
    );
}
export default AddProductForm;