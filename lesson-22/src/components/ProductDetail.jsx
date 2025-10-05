import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductBySku } from './data';

function ProductDetail() {
  const { sku } = useParams(); // Отримуємо SKU з динамічного роуту
  const navigate = useNavigate();
  const product = getProductBySku(sku);

  if (!product) {
    return (
      <div className="container">
        <h2>Продукт не знайдено</h2>
        <p>На жаль, продукту з SKU "{sku}" не існує.</p>
        <button className="btn-primary" onClick={() => navigate('/products')}>
          До каталогу
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn-secondary" onClick={() => navigate(-1)}>
        &larr; Назад
      </button>
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="price">{product.price.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' })}</p>
          <p>{product.description}</p>
          <p className="sku">SKU: {product.sku}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;