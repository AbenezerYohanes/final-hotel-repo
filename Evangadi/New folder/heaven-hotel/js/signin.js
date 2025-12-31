// Sign In & Sign Up functionality for Heaven Hotel

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            // Remove active class from all buttons and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            document.getElementById(`${tab}-form`).classList.add('active');
        });
    });
    
    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Sign In Form Submission
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate sign in (in real app, this would connect to backend)
        console.log('Sign in attempt:', { email, password });
        
        // For demo purposes, show success message
        alert('Sign in successful! Welcome to Heaven Hotel.');
        
        // Redirect to home page
        window.location.href = '../index.html';
    });
    
    // Sign Up Form Submission
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('signup-firstname').value;
        const lastName = document.getElementById('signup-lastname').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const termsAgree = document.getElementById('terms-agree').checked;
        
        // Validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        if (!termsAgree) {
            alert('Please agree to the terms and conditions');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Simulate sign up (in real app, this would connect to backend)
        console.log('Sign up data:', {
            firstName,
            lastName,
            email,
            phone,
            password
        });
        
        // Store user data in localStorage (for demo purposes)
        const userData = {
            firstName,
            lastName,
            email,
            phone,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('heavenHotelUser', JSON.stringify(userData));
        
        // Show success message
        alert('Account created successfully! Welcome to Heaven Hotel.');
        
        // Redirect to home page
        window.location.href = '../index.html';
    });
    
    // Check if user is already logged in
    const checkAuthStatus = () => {
        const user = localStorage.getItem('heavenHotelUser');
        if (user) {
            const userData = JSON.parse(user);
            console.log('User logged in:', userData);
            // You could update UI to show user is logged in
        }
    };
    
    checkAuthStatus();
});
