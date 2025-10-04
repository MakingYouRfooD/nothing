// Product Details Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Product data - in a real app, this would come from a database
    const products = {
        'wd2000': {
            id: 'wd2000',
            name: 'WD-2000 Wheat Dryer',
            category: 'Wheat Dryer',
            price: 'Contact for Pricing',
            description: 'The WD-2000 is a high-capacity wheat dryer designed for optimal performance and energy efficiency. Perfect for medium to large-scale farming operations.',
            features: [
                'Advanced temperature control system',
                'Energy-efficient heating elements',
                'Uniform drying technology',
                'Easy-to-use control panel',
                'Low maintenance design',
                'Built-in safety features'
            ],
            specifications: {
                'Model': 'WD-2000',
                'Type': 'Wheat Dryer',
                'Capacity': '2000 kg/h',
                'Power': '15 kW',
                'Moisture Removal': '5-8% per hour',
                'Dimensions': '3.2m x 2.1m x 2.5m',
                'Weight': '1200 kg',
                'Voltage': '380V, 3-phase, 50Hz',
                'Warranty': '2 years'
            },
            images: [
                'https://via.placeholder.com/800x600?text=WD-2000+Front+View',
                'https://via.placeholder.com/800x600?text=WD-2000+Side+View',
                'https://via.placeholder.com/800x600?text=WD-2000+Control+Panel'
            ],
            related: ['wd3000', 'cd2500']
        },
        'wd3000': {
            id: 'wd3000',
            name: 'WD-3000 Pro Wheat Dryer',
            category: 'Wheat Dryer',
            price: 'Contact for Pricing',
            description: 'Professional-grade wheat dryer with automated controls and advanced features for large-scale farming operations.',
            features: [
                'Fully automated control system',
                'Energy recovery system',
                'Precision moisture sensors',
                'Remote monitoring capability',
                'Self-cleaning filters',
                'Advanced safety systems'
            ],
            specifications: {
                'Model': 'WD-3000 Pro',
                'Type': 'Wheat Dryer',
                'Capacity': '3000 kg/h',
                'Power': '22 kW',
                'Moisture Removal': '6-9% per hour',
                'Dimensions': '3.8m x 2.4m x 2.8m',
                'Weight': '1600 kg',
                'Voltage': '380V, 3-phase, 50Hz',
                'Warranty': '3 years'
            },
            images: [
                'https://via.placeholder.com/800x600?text=WD-3000+Front+View',
                'https://via.placeholder.com/800x600?text=WD-3000+Side+View',
                'https://via.placeholder.com/800x600?text=WD-3000+Control+Panel'
            ],
            related: ['wd2000', 'cd3000']
        },
        'cd2500': {
            id: 'cd2500',
            name: 'CD-2500 Corn Dryer',
            category: 'Corn Dryer',
            price: 'Contact for Pricing',
            description: 'Efficient corn drying solution with uniform heat distribution technology, designed specifically for corn kernels.',
            features: [
                'Uniform heat distribution',
                'Dual heating system',
                'Large capacity hopper',
                'Easy-to-clean design',
                'Low energy consumption',
                'Durable construction'
            ],
            specifications: {
                'Model': 'CD-2500',
                'Type': 'Corn Dryer',
                'Capacity': '2500 kg/h',
                'Power': '18 kW',
                'Moisture Removal': '4-7% per hour',
                'Dimensions': '3.5m x 2.2m x 2.7m',
                'Weight': '1400 kg',
                'Voltage': '380V, 3-phase, 50Hz',
                'Warranty': '2 years'
            },
            images: [
                'https://via.placeholder.com/800x600?text=CD-2500+Front+View',
                'https://via.placeholder.com/800x600?text=CD-2500+Side+View',
                'https://via.placeholder.com/800x600?text=CD-2500+Control+Panel'
            ],
            related: ['cd3000', 'wd2000']
        },
        'cd3000': {
            id: 'cd3000',
            name: 'CD-3000 Pro Corn Dryer',
            category: 'Corn Dryer',
            price: 'Contact for Pricing',
            description: 'Advanced corn drying system with smart controls and high-capacity processing for commercial farming operations.',
            features: [
                'Smart control system with touchscreen',
                'Energy recovery system',
                'Automatic moisture adjustment',
                'Remote monitoring and control',
                'Self-diagnostic system',
                'High-efficiency burner'
            ],
            specifications: {
                'Model': 'CD-3000 Pro',
                'Type': 'Corn Dryer',
                'Capacity': '3500 kg/h',
                'Power': '25 kW',
                'Moisture Removal': '5-8% per hour',
                'Dimensions': '4.0m x 2.5m x 3.0m',
                'Weight': '1800 kg',
                'Voltage': '380V, 3-phase, 50Hz',
                'Warranty': '3 years'
            },
            images: [
                'https://via.placeholder.com/800x600?text=CD-3000+Front+View',
                'https://via.placeholder.com/800x600?text=CD-3000+Side+View',
                'https://via.placeholder.com/800x600?text=CD-3000+Control+Panel'
            ],
            related: ['cd2500', 'wd3000']
        }
    };

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    // Initialize modal for inquiry
    const inquiryModal = new bootstrap.Modal(document.getElementById('inquiryModal'));
    const productNameElement = document.getElementById('productName');
    const emailInquiry = document.getElementById('emailInquiry');
    const viberInquiry = document.getElementById('viberInquiry');
    
    // Function to load product details
    function loadProductDetails(productId) {
        const product = products[productId];
        if (!product) {
            document.getElementById('productDetails').innerHTML = `
                <div class="alert alert-danger">
                    <h4>Product Not Found</h4>
                    <p>The requested product could not be found. Please check the URL or return to the <a href="products.html">products page</a>.</p>
                </div>
            `;
            return;
        }

        // Generate HTML for product images
        const mainImage = product.images[0];
        const thumbnails = product.images.map((image, index) => `
            <div class="col-4">
                <img src="${image}" class="img-thumbnail ${index === 0 ? 'active' : ''}" alt="${product.name} - View ${index + 1}" onclick="changeMainImage(this, '${image}')" style="cursor: pointer;">
            </div>
        `).join('');

        // Generate HTML for specifications table
        const specsTable = Object.entries(product.specifications).map(([key, value]) => `
            <tr>
                <th>${key}</th>
                <td>${value}</td>
            </tr>
        `).join('');

        // Generate HTML for features list
        const featuresList = product.features.map(feature => `
            <li class="mb-2"><i class="fas fa-check text-success me-2"></i>${feature}</li>
        `).join('');

        // Set the page title
        document.title = `${product.name} - BIO CHEM`;

        // Set the product details HTML
        document.getElementById('productDetails').innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <div class="product-gallery">
                        <div class="mb-3">
                            <img id="mainProductImage" src="${mainImage}" alt="${product.name}" class="img-fluid rounded shadow">
                        </div>
                        <div class="row g-2">
                            ${thumbnails}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h1 class="mb-3">${product.name}</h1>
                    <p class="lead text-muted">${product.category}</p>
                    <div class="d-flex align-items-center mb-4">
                        <h3 class="mb-0 me-3">${product.price}</h3>
                    </div>
                    <p class="mb-4">${product.description}</p>
                    
                    <h4 class="mt-4 mb-3">Key Features</h4>
                    <ul class="list-unstyled">
                        ${featuresList}
                    </ul>
                    
                    <div class="d-grid gap-2 d-md-flex mt-4">
                        <button class="btn btn-success btn-lg px-4 me-md-2 inquire-btn" data-product="${product.name}">
                            <i class="fas fa-envelope me-2"></i>Inquire Now
                        </button>
                        <a href="products.html" class="btn btn-outline-secondary btn-lg px-4">
                            <i class="fas fa-arrow-left me-2"></i>Back to Products
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="row mt-5">
                <div class="col-12">
                    <h3 class="mb-4">Technical Specifications</h3>
                    <div class="table-responsive">
                        <table class="table table-bordered specs-table">
                            <tbody>
                                ${specsTable}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        // Load related products
        loadRelatedProducts(product.related);
    }

    // Function to change the main product image
    window.changeMainImage = function(element, newImage) {
        document.getElementById('mainProductImage').src = newImage;
        // Update active thumbnail
        document.querySelectorAll('.img-thumbnail').forEach(thumb => {
            thumb.classList.remove('border', 'border-success');
        });
        element.classList.add('border', 'border-success');
    };

    // Function to load related products
    function loadRelatedProducts(relatedIds) {
        const relatedProductsContainer = document.getElementById('relatedProducts');
        if (!relatedProductsContainer) return;

        const relatedProducts = relatedIds.map(id => products[id]).filter(Boolean);
        
        if (relatedProducts.length === 0) {
            relatedProductsContainer.innerHTML = '<p class="text-center">No related products found.</p>';
            return;
        }

        const relatedProductsHTML = relatedProducts.map(product => `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card h-100 product-card">
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h3 class="h5 card-title">${product.name}</h3>
                        <p class="card-text">${product.description.substring(0, 100)}...</p>
                        <div class="d-grid gap-2">
                            <a href="product-details.html?product=${product.id}" class="btn btn-outline-success">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        relatedProductsContainer.innerHTML = relatedProductsHTML;
    }

    // Handle inquiry buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.inquire-btn')) {
            const button = e.target.closest('.inquire-btn');
            const productName = button.getAttribute('data-product');
            
            productNameElement.textContent = productName;
            
            // Set up email and Viber links with product name
            const emailSubject = encodeURIComponent(`Inquiry about ${productName}`);
            const emailBody = encodeURIComponent(`Hello BIO CHEM,\n\nI am interested in the ${productName}. Could you please provide more information?\n\nThank you.`);
            
            emailInquiry.href = `mailto:info@biochem.com?subject=${emailSubject}&body=${emailBody}`;
            viberInquiry.href = `viber://chat?number=+1234567890&text=${encodeURIComponent(`Hello, I'm interested in the ${productName}.`)}`;
            
            inquiryModal.show();
        }
    });

    // Initialize the page
    if (productId) {
        loadProductDetails(productId);
    } else {
        document.getElementById('productDetails').innerHTML = `
            <div class="alert alert-warning">
                <h4>No Product Selected</h4>
                <p>Please select a product from the <a href="products.html">products page</a>.</p>
            </div>
        `;
    }
});
