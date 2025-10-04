// Main JavaScript for BIO CHEM Website

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');

    if (searchToggle && searchInput) {
        // Toggle search input visibility
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (searchInput.style.display === 'none' || !searchInput.style.display) {
                // Show search input with animation
                searchInput.style.display = 'block';
                searchInput.style.width = '0';
                searchInput.focus();
                // Animate width
                setTimeout(() => {
                    searchInput.style.width = '200px';
                    searchInput.style.padding = '0.375rem 0.75rem';
                }, 10);
            } else {
                // Hide search input if it's empty, otherwise perform search
                if (!searchInput.value.trim()) {
                    searchInput.style.width = '0';
                    searchInput.style.padding = '0.375rem 0';
                    setTimeout(() => {
                        searchInput.style.display = 'none';
                    }, 300);
                } else {
                    performSearch(searchInput.value.trim());
                }
            }
        });

        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (searchInput.value.trim()) {
                    performSearch(searchInput.value.trim());
                }
            });
        }

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && e.target !== searchToggle) {
                if (searchInput.style.display === 'block' && !searchInput.value) {
                    searchInput.style.width = '0';
                    searchInput.style.padding = '0.375rem 0';
                    setTimeout(() => {
                        searchInput.style.display = 'none';
                    }, 300);
                }
            }
        });

        // Handle Escape key to close search
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.style.width = '0';
                searchInput.style.padding = '0.375rem 0';
                setTimeout(() => {
                    searchInput.style.display = 'none';
                    searchInput.value = '';
                }, 300);
            }
        });
    }

    // Function to perform search
    function performSearch(query) {
        // Store the search query in sessionStorage
        sessionStorage.setItem('searchQuery', query);
        
        // If not already on the products page, navigate there
        if (!window.location.pathname.endsWith('products.html')) {
            window.location.href = 'products.html';
        } else {
            // If already on products page, filter products
            filterProducts(query);
        }
    }

    // Function to filter products based on search query
    function filterProducts(query) {
        const productCards = document.querySelectorAll('.product-card');
        const searchLower = query.toLowerCase();
        let hasResults = false;

        productCards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent?.toLowerCase() || '';
            const description = card.querySelector('.card-text')?.textContent?.toLowerCase() || '';
            
            if (title.includes(searchLower) || description.includes(searchLower)) {
                card.style.display = '';
                hasResults = true;
                // Add highlight to matching text
                if (searchLower) {
                    highlightText(card, searchLower);
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Show no results message if no products match
        const noResults = document.getElementById('noResults');
        if (!hasResults) {
            if (!noResults) {
                const container = document.querySelector('.container.py-5');
                const noResultsDiv = document.createElement('div');
                noResultsDiv.id = 'noResults';
                noResultsDiv.className = 'alert alert-warning';
                noResultsDiv.textContent = `No products found matching "${query}".`;
                container.appendChild(noResultsDiv);
            } else {
                noResults.textContent = `No products found matching "${query}".`;
                noResults.style.display = 'block';
            }
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    }

    // Helper function to highlight search terms
    function highlightText(element, searchTerm) {
        const text = element.textContent;
        const highlightedText = text.replace(
            new RegExp(searchTerm, 'gi'),
            match => `<span class="bg-warning">${match}</span>`
        );
        element.innerHTML = highlightedText;
    }
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inquiry modal functionality
    document.querySelectorAll('.inquire-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            document.getElementById('productName').textContent = productName;
            
            // Set up email and Viber links with product info
            const emailLink = document.getElementById('emailInquiry');
            const viberLink = document.getElementById('viberInquiry');
            
            // Email with subject and body
            const emailSubject = `Inquiry about ${productName}`;
            const emailBody = `Hello,%0D%0A%0D%0AI am interested in the ${productName}. Please provide more information.`;
            emailLink.href = `mailto:info@biochem.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody).replace(/%20/g, '%20')}`;
            
            // Viber with pre-filled message
            const viberMessage = `Hello, I'm interested in ${productName}. Please send me more details.`;
            viberLink.href = `viber://forward?text=${encodeURIComponent(viberMessage)}`;
            
            // Update click handlers to open in new tab
            emailLink.onclick = function(e) {
                e.preventDefault();
                window.open(this.href, '_blank');
            };
            
            viberLink.onclick = function(e) {
                e.preventDefault();
                window.open(this.href, '_blank');
            };
            
            // Show the modal
            const inquiryModal = new bootstrap.Modal(document.getElementById('inquiryModal'));
            inquiryModal.show();
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements with the 'fade-in' class when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Add active class to current nav item
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    const menuLength = navLinks.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (navLinks[i].href === currentLocation) {
            navLinks[i].classList.add('active');
            navLinks[i].setAttribute('aria-current', 'page');
        }
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Function to show a toast notification
function showToast(message, type = 'success') {
    const toastContainer = document.createElement('div');
    toastContainer.className = `toast align-items-center text-white bg-${type} border-0`;
    toastContainer.setAttribute('role', 'alert');
    toastContainer.setAttribute('aria-live', 'assertive');
    toastContainer.setAttribute('aria-atomic', 'true');
    
    toastContainer.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(toastContainer);
    const toast = new bootstrap.Toast(toastContainer);
    toast.show();
    
    // Remove the toast after it's hidden
    toastContainer.addEventListener('hidden.bs.toast', function() {
        document.body.removeChild(toastContainer);
    });
}
