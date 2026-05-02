document.addEventListener('DOMContentLoaded', () => {
  let cart = [];
  
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');
  const cartCount = document.getElementById('cart-count');
  const cartItemCount = document.getElementById('cart-item-count');
  const cartTotal = document.getElementById('cart-total');
  const checkoutWhatsappBtn = document.getElementById('checkout-whatsapp-btn');
  const btnAddToCart = document.getElementById('btn-add-to-cart');

  // Toggle Cart
  function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
  }

  function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
  }

  cartToggleBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Add to cart from modal
  if(btnAddToCart) {
    btnAddToCart.addEventListener('click', () => {
      // Need to access currentProduct from app.js
      // We can use the image and title in the DOM since they are updated by app.js
      const id = parseInt(document.querySelector('.view-product-btn').getAttribute('data-id')); // this might not be right
      
      const title = document.getElementById('modal-name').textContent;
      const priceText = document.getElementById('modal-pricing').textContent;
      const price = parseInt(priceText.replace('₹', ''));
      const img = document.getElementById('modal-main-img').src;

      const existingItem = cart.find(item => item.title === title);
      if(existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ title, price, img, qty: 1 });
      }

      updateCartUI();
      
      // Close product modal
      const modalOverlay = document.getElementById('modal-overlay');
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.getElementById('flip-card').classList.remove('flipped');
      }
      
      openCart();
    });
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    if(cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty" id="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>
      `;
      cartFooter.style.display = 'none';
      cartCount.textContent = '0';
      cartItemCount.textContent = '0';
      return;
    }

    cartFooter.style.display = 'block';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      count += item.qty;

      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.img}" alt="${item.title}">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">₹${item.price} x ${item.qty}</div>
            <button class="cart-item-remove" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    cartCount.textContent = count;
    cartItemCount.textContent = count;
    cartTotal.textContent = `₹${total}`;

    // Update Cart Checkout Logic
    const checkoutCartBtn = document.getElementById('checkout-cart-btn');
    if (checkoutCartBtn) {
      if (cart.length === 0) {
        checkoutCartBtn.style.opacity = '0.5';
        checkoutCartBtn.style.pointerEvents = 'none';
      } else {
        checkoutCartBtn.style.opacity = '1';
        checkoutCartBtn.style.pointerEvents = 'auto';
        checkoutCartBtn.onclick = () => {
          closeCart();
          if (window.openCartCheckout) {
            window.openCartCheckout(cart, total);
          }
        };
      }
    }

    // Bind remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }
  
  window.clearCart = function() {
    cart = [];
    updateCartUI();
  };
});
