// src/data.js

const IMAGES = [
  'https://placehold.co/400x300/FF5733/ffffff?text=Product+A',
  'https://placehold.co/400x300/33FF57/ffffff?text=Product+B',
  'https://placehold.co/400x300/3357FF/ffffff?text=Product+C',
  'https://placehold.co/400x300/FF33DA/ffffff?text=Product+D',
  'https://placehold.co/400x300/FF8D33/ffffff?text=Product+E',
  'https://placehold.co/400x300/33FFF3/ffffff?text=Product+F',
  'https://placehold.co/400x300/A033FF/ffffff?text=Product+G',
  'https://placehold.co/400x300/FF3333/ffffff?text=Product+H',
];

export const initialProducts = [
    { sku: 'LAP001', name: 'EliteBook X1 Carbon', category: 'Laptops', price: 1200, description: 'Легкий та потужний ультрабук для професіоналів.', image: IMAGES[0] },
    { sku: 'SMT002', name: 'Galaxy Watch 5', category: 'Smartwatches', price: 299, description: 'Смарт-годинник з моніторингом здоров\'я та GPS.', image: IMAGES[1] },
    { sku: 'PHN003', name: 'iPhone 14 Pro', category: 'Smartphones', price: 1099, description: 'Флагманський смартфон з покращеною камерою.', image: IMAGES[2] },
    { sku: 'AUD004', name: 'Sony WH-1000XM5', category: 'Audio', price: 349, description: 'Навушники з активним шумозаглушенням.', image: IMAGES[3] },
    { sku: 'LAP005', name: 'MacBook Air M2', category: 'Laptops', price: 1150, description: 'Тонкий та швидкий ноутбук на чіпі M2.', image: IMAGES[4] },
    { sku: 'PHN006', name: 'Google Pixel 7', category: 'Smartphones', price: 799, description: 'Смартфон з чистим Android та відмінною камерою.', image: IMAGES[5] },
    { sku: 'AUD007', name: 'JBL Flip 6', category: 'Audio', price: 129, description: 'Портативна водонепроникна Bluetooth-колонка.', image: IMAGES[6] },
    { sku: 'SMT008', name: 'Apple Watch SE', category: 'Smartwatches', price: 249, description: 'Доступний смарт-годинник від Apple.', image: IMAGES[7] },
];

let products = [...initialProducts]; // Робимо копію, щоб можна було додавати

export const getProducts = () => products;

export const getProductBySku = (sku) => products.find(p => p.sku === sku);

export const addProduct = (product) => {
    // В реальності тут була б валідація та збереження в БД
    const newProduct = { 
        ...product, 
        sku: `NEW${String(products.length + 1).padStart(3, '0')}`, // Генеруємо новий SKU
        image: IMAGES[Math.floor(Math.random() * IMAGES.length)] // Випадкова картинка
    };
    products.push(newProduct);
    return newProduct;
};

export const getUniqueCategories = () => {
    const categories = products.map(p => p.category);
    return ['all', ...new Set(categories)]; // 'all' + унікальні категорії
};

// --- Симуляція автентифікації ---
export const Auth = {
    login: (username, password) => {
        // Проста імітація: будь-який username з паролем 'password'
        if (password === 'password') {
            localStorage.setItem('token', `fake-jwt-${username}`);
            localStorage.setItem('user', username);
            return true;
        }
        return false;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },
    getUser: () => {
        return localStorage.getItem('user');
    }
};