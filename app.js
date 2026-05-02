document.addEventListener('DOMContentLoaded', () => {
  // ===================== VARIABLES =====================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const productsGrid = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const backToTopBtn = document.getElementById('back-to-top');

  // Modal Elements
  const modalOverlay = document.getElementById('modal-overlay');
  const flipCardContainer = document.getElementById('flip-card');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const btnBuyNow = document.getElementById('btn-buy-now');
  const btnBackToProduct = document.getElementById('btn-back-to-product');
  const orderForm = document.getElementById('google-order-form');
  const qtyInput = document.getElementById('entry_quantity');
  
  let currentProduct = null;

  // ===================== INITIALIZE =====================
  initParticles();
  initCustomCursor();
  renderProducts('all');
  initScrollEvents();

  // ===================== NAVBAR & MENU =====================
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth <= 768) hamburger.click();
    });
  });

  // ===================== RENDER PRODUCTS =====================
  function renderProducts(filter) {
    productsGrid.innerHTML = '';
    
    // PRODUCTS array comes from products.js
    const filteredProducts = filter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card reveal-up';
      card.style.animationDelay = '0.1s';
      
      const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
      const originalPriceHtml = product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : '';
      
      card.innerHTML = `
        ${badgeHtml}
        <div class="product-img-wrap">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-cat">${product.category.replace('-', ' ')}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">
            <span class="current-price">₹${product.price !== null ? product.price : 'Price on Request'}</span>
            ${originalPriceHtml}
          </div>
          <button class="btn btn-gold btn-full view-product-btn" data-id="${product.id}">
            Shop Now
          </button>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // Attach event listeners to new buttons
    document.querySelectorAll('.view-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        openProductModal(id);
      });
    });
  }

  // ===================== PRODUCT FILTERING =====================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.getAttribute('data-filter'));
    });
  });

  // ===================== FLIP-CARD MODAL =====================
  function openProductModal(id) {
    currentProduct = PRODUCTS.find(p => p.id === id);
    if(!currentProduct) return;

    // Reset Flip
    flipCardContainer.classList.remove('flipped');
    
    // Populate Front (Product Details)
    document.getElementById('modal-main-img').src = currentProduct.images[0];
    
    // Setup Thumbnails
    const thumbsContainer = document.getElementById('modal-thumbnails');
    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      if (currentProduct.images && currentProduct.images.length > 1) {
        currentProduct.images.forEach((imgUrl, idx) => {
          const thumb = document.createElement('img');
          thumb.src = imgUrl;
          thumb.style.width = '60px';
          thumb.style.height = '60px';
          thumb.style.objectFit = 'contain';
          thumb.style.border = idx === 0 ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)';
          thumb.style.borderRadius = '4px';
          thumb.style.cursor = 'pointer';
          thumb.style.background = '#fff';
          thumb.style.transition = 'all 0.3s';
          
          thumb.addEventListener('click', () => {
            document.getElementById('modal-main-img').src = imgUrl;
            // Update active thumbnail border
            Array.from(thumbsContainer.children).forEach(t => t.style.border = '1px solid rgba(255,255,255,0.1)');
            thumb.style.border = '2px solid var(--color-gold)';
          });
          
          thumbsContainer.appendChild(thumb);
        });
      }
    }

    document.getElementById('modal-name').textContent = currentProduct.name;
    document.getElementById('modal-pricing').textContent = currentProduct.price ? `₹${currentProduct.price}` : 'Price on Request';
    document.getElementById('modal-desc').textContent = currentProduct.description;
    
    const badgeEl = document.getElementById('modal-badge');
    if(currentProduct.badge) {
      badgeEl.textContent = currentProduct.badge;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }

    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = '';
    for(const [key, value] of Object.entries(currentProduct.specs)) {
      specsContainer.innerHTML += `
        <div class="spec-item">
          <span class="spec-label">${key}</span>
          <span class="spec-value">${value}</span>
        </div>
      `;
    }

    // Populate Back (Form Summary)
    document.getElementById('form-summary-img').src = currentProduct.images[0];
    document.getElementById('form-summary-name').textContent = currentProduct.name;
    document.getElementById('form-summary-price').textContent = currentProduct.price ? `₹${currentProduct.price}` : 'Request Price';
    
    // Set hidden inputs for Google Form
    document.getElementById('entry_product').value = currentProduct.name;
    
    // Reset quantity and total
    qtyInput.value = 1;
    updateTotal();

    // Show Modal
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      flipCardContainer.classList.remove('flipped');
      orderForm.reset();
      const step1 = document.getElementById('checkout-step-1');
      const step2 = document.getElementById('checkout-step-2');
      if (step1 && step2) {
        step1.style.display = 'block';
        step2.style.display = 'none';
      }
    }, 300); // wait for fade out
  }

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  
  modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) closeModal();
  });

  // Flip Actions
  btnBuyNow.addEventListener('click', () => {
    flipCardContainer.classList.add('flipped');
  });

  btnBackToProduct.addEventListener('click', () => {
    flipCardContainer.classList.remove('flipped');
  });

  // Quantity change -> update total
  qtyInput.addEventListener('input', updateTotal);
  qtyInput.addEventListener('change', updateTotal);

  function updateTotal() {
    if(!currentProduct || document.getElementById('form-summary-name').textContent === "Cart Order (Multiple Items)") return;
    const qty = parseInt(qtyInput.value) || 1;
    const total = (currentProduct.price || 0) * qty;
    document.getElementById('form-total-amount').textContent = `₹${total}`;
  }

  // Open Checkout from Cart
  window.openCartCheckout = function(cartItems, totalAmount) {
    if (cartItems.length === 0) return;
    
    // Combine names
    const combinedNames = cartItems.map(item => `${item.title} (x${item.qty})`).join(', ');

    // Populate Back (Form Summary)
    document.getElementById('form-summary-img').src = cartItems[0].img;
    document.getElementById('form-summary-name').textContent = "Cart Order (Multiple Items)";
    document.getElementById('form-summary-price').textContent = `₹${totalAmount}`;
    
    document.getElementById('entry_product').value = combinedNames;
    qtyInput.value = 1; 
    document.getElementById('form-total-amount').textContent = `₹${totalAmount}`;

    // Show Modal flipped directly
    modalOverlay.classList.add('active');
    flipCardContainer.classList.add('flipped');
  };

  // Checkout Steps Logic
  const step1 = document.getElementById('checkout-step-1');
  const step2 = document.getElementById('checkout-step-2');
  const btnProceedPayment = document.getElementById('btn-proceed-payment');
  const btnBackToStep1 = document.getElementById('btn-back-to-step1');

  function transitionSteps(hideStep, showStep) {
    hideStep.style.transition = 'opacity 0.2s ease';
    hideStep.style.opacity = '0';
    setTimeout(() => {
      hideStep.style.display = 'none';
      showStep.style.display = 'block';
      showStep.style.opacity = '0';
      // Trigger reflow
      void showStep.offsetWidth;
      showStep.style.transition = 'opacity 0.2s ease';
      showStep.style.opacity = '1';
    }, 200);
  }

  if (btnProceedPayment) {
    btnProceedPayment.addEventListener('click', () => {
      if (orderForm.reportValidity()) {
        transitionSteps(step1, step2);
      }
    });
  }

  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => {
      transitionSteps(step2, step1);
    });
  }

  // Form Submit Handler
  orderForm.addEventListener('submit', (e) => {
    // Show success immediately to user while iframe loads in background
    const customerName = document.getElementById('entry_name').value || 'Customer';
    const customerEmail = document.getElementById('entry_email').value;
    const emailLine = customerEmail ? `\nEmail: ${customerEmail}` : '';
    alert(`🎉 Thank you, ${customerName}!\n\nYour order has been placed successfully.\n\nProducts: ${document.getElementById('entry_product').value}\nTotal Amount: ${document.getElementById('form-total-amount').textContent}${emailLine}\n\nOur team will contact you shortly via WhatsApp to confirm.`);
    closeModal();
    if(window.clearCart) window.clearCart();
  });

  // ===================== AUTO-FILL LOCATION =====================
  const btnGetLocation = document.getElementById('btn-get-location');
  const entryAddress = document.getElementById('entry_address');
  const entryPincode = document.getElementById('entry_pincode');
  
  if (btnGetLocation) {
    btnGetLocation.addEventListener('click', () => {
      const originalText = btnGetLocation.innerHTML;
      btnGetLocation.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
      btnGetLocation.disabled = true;

      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        btnGetLocation.innerHTML = originalText;
        btnGetLocation.disabled = false;
        return;
      }

      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const formattedAddress = [
              addr.house_number, addr.road, addr.suburb, addr.neighbourhood,
              addr.city || addr.town || addr.village, 
              addr.state
            ].filter(Boolean).join(', ');
            
            entryAddress.value = formattedAddress;
            
            if (addr.postcode) {
              entryPincode.value = addr.postcode;
            }
          } else {
            entryAddress.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          entryAddress.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        } finally {
          btnGetLocation.innerHTML = '<i class="fas fa-check"></i> Found';
          setTimeout(() => {
            btnGetLocation.innerHTML = originalText;
            btnGetLocation.disabled = false;
          }, 3000);
        }
      }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("Unable to retrieve your location. Please check location permissions.");
        btnGetLocation.innerHTML = originalText;
        btnGetLocation.disabled = false;
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }

  // ===================== SCROLL EVENTS & REVEAL =====================
  function initScrollEvents() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealElements = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      
      reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', () => {
      // Navbar effect
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top button
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      // Scroll spy for active nav link
      let current = '';
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });

      revealElements();
    });

    // Initial check
    revealElements();
    
    // Back to top click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===================== CUSTOM CURSOR =====================
  function initCustomCursor() {
    const cursor = document.getElementById('cursor-glow');
    if(window.innerWidth > 768 && cursor) {
      window.addEventListener('mousemove', (e) => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
      });

      // Interactive elements hover effect
      const interactives = document.querySelectorAll('a, button, .product-card');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
      });
    }
  }

  // ===================== BACKGROUND PARTICLES =====================
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['rgba(212, 175, 55, 0.2)', 'rgba(212, 175, 55, 0.4)', 'rgba(255, 255, 255, 0.1)'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.dx;
        p.y += p.dy;
        
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Footer Year
  const yearEl = document.getElementById('footer-year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

});

// Global form submit handler for contact section fallback
window.handleFormSubmit = function(e) {
  setTimeout(() => {
    document.getElementById('fallback-contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 1000);
}

// Global copy text utility for fast payment
window.copyText = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btnElement.style.color = '#111';
    btnElement.style.background = 'var(--color-gold)';
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
      btnElement.style.color = 'var(--color-gold)';
      btnElement.style.background = 'rgba(212,175,55,0.1)';
    }, 2000);
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}
