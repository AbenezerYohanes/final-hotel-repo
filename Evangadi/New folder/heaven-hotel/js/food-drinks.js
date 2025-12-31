// Menu data
const menuItems = [
    {
        id: 1,
        name: "Grilled Salmon",
        type: "food",
        price: 35,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Fresh Atlantic salmon grilled to perfection with lemon butter sauce",
        category: "Main Course"
    },
    {
        id: 2,
        name: "Wagyu Steak",
        type: "food",
        price: 85,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Premium A5 Wagyu beef with truffle mashed potatoes and seasonal vegetables",
        category: "Main Course"
    },
    {
        id: 3,
        name: "Caesar Salad",
        type: "food",
        price: 18,
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Crisp romaine lettuce with parmesan cheese and house-made croutons",
        category: "Appetizer"
    },
    {
        id: 4,
        name: "Heaven Cocktail",
        type: "drinks",
        price: 16,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Signature cocktail with premium vodka, elderflower, and fresh berries",
        category: "Cocktail"
    },
    {
        id: 5,
        name: "Wine Selection",
        type: "drinks",
        price: 45,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Curated selection of premium wines from our cellar",
        category: "Wine"
    },
    {
        id: 6,
        name: "Chocolate Lava Cake",
        type: "food",
        price: 12,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Warm chocolate cake with molten center and vanilla ice cream",
        category: "Dessert"
    },
    {
        id: 7,
        name: "Fresh Juice",
        type: "drinks",
        price: 8,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Freshly squeezed orange, apple, or mixed berry juice",
        category: "Beverage"
    },
    {
        id: 8,
        name: "Lobster Bisque",
        type: "food",
        price: 28,
        image: "https://images.unsplash.com/photo-1559847844-d134d5e3886b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Rich and creamy lobster soup with cognac and fresh herbs",
        category: "Soup"
    }
];

// DOM elements
const menuGrid = document.getElementById('menu-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
    setupEventListeners();
});

// Display menu items
function displayMenuItems(itemsToDisplay) {
    menuGrid.innerHTML = '';
    
    itemsToDisplay.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });
}

// Create menu card
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.type = item.type;
    
    card.innerHTML = `
        <div class="menu-image">
            <img src="${item.image}" alt="${item.name}">
            <span class="menu-category">${item.category}</span>
        </div>
        <div class="menu-info">
            <h3>${item.name}</h3>
            <p class="menu-description">${item.description}</p>
            <div class="menu-price">$${item.price}</div>
            <button class="order-btn" onclick="addToCart(${item.id})">Add to Order</button>
        </div>
    `;
    
    return card;
}

// Filter menu items
function filterMenuItems(type) {
    let filteredItems = menuItems;
    
    if (type !== 'all') {
        filteredItems = menuItems.filter(item => item.type === type);
    }
    
    displayMenuItems(filteredItems);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterMenuItems(button.dataset.filter);
        });
    });
}

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;
    
    let cart = JSON.parse(localStorage.getItem('foodCart')) || [];
    cart.push(item);
    localStorage.setItem('foodCart', JSON.stringify(cart));
    
    // Show confirmation
    alert(`${item.name} added to your order!`);
}

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});
