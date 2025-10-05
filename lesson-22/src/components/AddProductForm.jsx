import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, getUniqueCategories } from './data';

function AddProductForm() {
    const navigate = useNavigate();
    const categories = getUniqueCategories().filter(cat => cat !== 'all'); // Для вибору категорій
    
    const [formData, setFormData] = useState({
        name: '',
        category: categories[0] || '', // Дефолтна категорія
        price: '',
        description: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(''); // Очистити помилку при зміні поля
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Проста валідація
        if (!formData.name || !formData.category || !formData.price || !formData.description) {
            setError('Будь ласка, заповніть усі поля.');
            return;
        }
        if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            setError('Ціна повинна бути позитивним числом.');
            return;
        }

        const newProduct = {
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            description: formData.description,
        };

        addProduct(newProduct);
        
        // Очищення форми
        setFormData({
            name: '',
            category: categories[0] || '',
            price: '',
            description: '',
        });

        // Використовуємо useNavigate для переходу та передачі повідомлення
        navigate('/products', { 
            state: { msg: `Продукт "${newProduct.name}" успішно додано!` } 
        });
    };

    return (
        <div className="container">
            <h1>Додати Новий Продукт</h1>
            {error && <div className="message error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Назва продукту:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Категорія:</label>
                    <select 
                        id="category" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Ціна:</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        step="0.01" 
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Опис:</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-success">Додати Продукт</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Скасувати</button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm