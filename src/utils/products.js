const emojis = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍑", "🍍", "🥭", "🍅", "🥑"];

const generateRandomPrice = () => {
    return (Math.random() * 10).toFixed(2);
};

const generateProducts = () => {
    return emojis.map((emoji) => ({
        emoji,
        price: generateRandomPrice(),
    }));
};

export const generateCustomers = () => {
    const customers = [];
    for (let i = 0; i < 5; i++) {
        customers.push({
            name: `Customer ${i + 1}`,
            products: generateProducts(),
        });
    }
    return customers;
};
