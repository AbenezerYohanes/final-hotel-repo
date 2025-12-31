// Room data
const rooms = [
    {
        id: 1,
        name: "Deluxe Room",
        type: "deluxe",
        price: 299,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Elegant room with king-size bed, modern amenities, and city view. Perfect for business travelers.",
        features: ["King Bed", "City View", "WiFi", "Mini Bar", "Safe"],
        badge: "Popular"
    },
    {
        id: 2,
        name: "Executive Suite",
        type: "suite",
        price: 499,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Spacious suite with separate living area, premium amenities, and stunning views.",
        features: ["King Bed", "Living Area", "Premium View", "Jacuzzi", "Butler Service"],
        badge: "Luxury"
    },
    {
        id: 3,
        name: "Penthouse Suite",
        type: "penthouse",
        price: 899,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Ultimate luxury experience with panoramic views, private terrace, and exclusive services.",
        features: ["King Bed", "Private Terrace", "Panoramic View", "Private Pool", "Chef Service"],
        badge: "VIP"
    },
    {
        id: 4,
        name: "Ocean View Deluxe",
        type: "deluxe",
        price: 399,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Beautiful room with breathtaking ocean views and premium amenities.",
        features: ["King Bed", "Ocean View", "Balcony", "Premium WiFi", "Coffee Machine"],
        badge: "Ocean View"
    },
    {
        id: 5,
        name: "Family Suite",
        type: "suite",
        price: 599,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Spacious suite perfect for families with separate bedrooms and living area.",
        features: ["2 Bedrooms", "Living Area", "Kitchenette", "Kids Area", "Cribs Available"],
        badge: "Family"
    },
    {
        id: 6,
        name: "Presidential Suite",
        type: "penthouse",
        price: 1299,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "The pinnacle of luxury with private elevator, personal butler, and exclusive amenities.",
        features: ["3 Bedrooms", "Private Elevator", "Dining Room", "Wine Cellar", "Personal Butler"],
        badge: "Presidential"
    }
];

// DOM elements
const roomsGrid = document.getElementById('rooms-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sort-price');
const modal = document.getElementById('booking-modal');
const closeModal = document.querySelector('.close');
const bookingForm = document.getElementById('booking-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayRooms(rooms);
    setupEventListeners();
});

// Display rooms
function displayRooms(roomsToDisplay) {
    roomsGrid.innerHTML = '';
    
    roomsToDisplay.forEach(room => {
        const roomCard = createRoomCard(room);
        roomsGrid.appendChild(roomCard);
    });
}

// Create room card
function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = 'room-card';
    card.dataset.type = room.type;
    
    card.innerHTML = `
        <div class="room-image">
            <img src="${room.image}" alt="${room.name}">
            ${room.badge ? `<span class="room-badge">${room.badge}</span>` : ''}
        </div>
        <div class="room-info">
            <h3>${room.name}</h3>
            <p class="room-description">${room.description}</p>
            <div class="room-features">
                ${room.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="room-price">$${room.price}/night</div>
            <button class="book-btn" onclick="openBookingModal(${room.id})">Book Now</button>
        </div>
    `;
    
    return card;
}

// Filter rooms
function filterRooms(type) {
    let filteredRooms = rooms;
    
    if (type !== 'all') {
        filteredRooms = rooms.filter(room => room.type === type);
    }
    
    // Sort rooms
    const sortOrder = sortSelect.value;
    filteredRooms.sort((a, b) => {
        return sortOrder === 'low' ? a.price - b.price : b.price - a.price;
    });
    
    displayRooms(filteredRooms);
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterRooms(button.dataset.filter);
        });
    });
    
    // Sort dropdown
    sortSelect.addEventListener('change', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterRooms(activeFilter);
    });
    
    // Modal close
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Booking form
    bookingForm.addEventListener('submit', handleBooking);
    
    // Date inputs
    document.getElementById('check-in').addEventListener('change', calculateTotal);
    document.getElementById('check-out').addEventListener('change', calculateTotal);
}

// Open booking modal
function openBookingModal(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    document.getElementById('selected-room-name').textContent = room.name;
    document.getElementById('selected-room-price').textContent = `$${room.price}/night`;
    
    // Set minimum date for check-in
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').setAttribute('min', today);
    
    modal.style.display = 'block';
}

// Calculate total price
function calculateTotal() {
    const checkIn = new Date(document.getElementById('check-in').value);
    const checkOut = new Date(document.getElementById('check-out').value);
    const priceText = document.getElementById('selected-room-price').textContent;
    const pricePerNight = parseInt(priceText.match(/\d+/)[0]);
    
    if (checkIn && checkOut && checkOut > checkIn) {
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * pricePerNight;
        document.getElementById('total-price').textContent = `$${totalPrice}`;
    } else {
        document.getElementById('total-price').textContent = '$0';
    }
}

// Handle booking
function handleBooking(e) {
    e.preventDefault();
    
    const formData = {
        room: document.getElementById('selected-room-name').textContent,
        checkIn: document.getElementById('check-in').value,
        checkOut: document.getElementById('check-out').value,
        guests: document.getElementById('guests').value,
        totalPrice: document.getElementById('total-price').textContent
    };
    
    // Store booking data in localStorage
    localStorage.setItem('bookingData', JSON.stringify(formData));
    
    // Redirect to payment page
    window.location.href = 'payment.html';
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
