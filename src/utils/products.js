// utils/products.js
export const productList = [
    { emoji: "🍎", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍌", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍇", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🥕", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🥦", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍕", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍔", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍣", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍰", price: (Math.random() * 10).toFixed(2) },
    { emoji: "🍪", price: (Math.random() * 10).toFixed(2) },
];

export const generateRandomProducts = (count) => {
    const products = [];
    const productListCopy = [...productList];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * productListCopy.length);
        products.push(productListCopy[randomIndex]);
        productListCopy.splice(randomIndex, 1); // Remove the selected product to avoid duplicates
    }

    return products;
};

export const generateCustomers = () => {
    return [
        {
            name: "Alice",
            products: generateRandomProducts(3), // Each customer gets a random set of 3 products
        },
        {
            name: "Bob",
            products: generateRandomProducts(3),
        },
        {
            name: "Charlie",
            products: generateRandomProducts(3),
        },
    ];
};
