/* script.js untuk StyleEase - VERSION FIXED
   Tugas: render produk, cart localStorage, modal, responsive menu, form handling
*/

const FAROJ_PRODUCTS = [
  // Atasan (Tops)
  { 
    id: 'p1', 
    title: 'Kaos Basic Premium', 
    price: 99000, 
    category: 'tops',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', 
    desc: 'Kaos bahan katun combed 100% premium, nyaman dipakai sehari-hari.',
    colors: ['Putih', 'Hitam', 'Navy', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 'p2', 
    title: 'Kemeja Flanel Premium', 
    price: 159000, 
    category: 'tops',
    img: 'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=800&auto=format&fit=crop', 
    desc: 'Kemeja flanel lembut dengan motif kotak klasik, cocok untuk gaya casual.',
    colors: ['Merah', 'Biru', 'Hijau'],
    sizes: ['M', 'L', 'XL']
  },
  { 
    id: 'p3', 
    title: 'Basic Crop Top', 
    price: 89000, 
    category: 'tops',
    img: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop', 
    desc: 'Crop top dengan bahan lembut dan nyaman, cocok untuk gaya casual.',
    colors: ['Putih', 'Hitam', 'Pink'],
    sizes: ['S', 'M', 'L']
  },

  // Outerwear
  { 
    id: 'p4', 
    title: 'Hoodie Premium', 
    price: 235000, 
    category: 'outerwear',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', 
    desc: 'Hoodie tebal dengan bahan fleece premium, hangat dan stylish.',
    colors: ['Abu-abu', 'Hitam', 'Navy'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  { 
    id: 'p5', 
    title: 'Denim Jacket', 
    price: 299000, 
    category: 'outerwear',
    img: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800&auto=format&fit=crop', 
    desc: 'Jaket denim klasik dengan washing sempurna, material premium.',
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL']
  },

  // Bawahan (Bottoms)
  { 
    id: 'p6', 
    title: 'Celana Chino Slim Fit', 
    price: 179000, 
    category: 'bottoms',
    img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop', 
    desc: 'Celana chino dengan potongan slim fit, nyaman dan rapi.',
    colors: ['Khaki', 'Navy', 'Olive', 'Black'],
    sizes: ['28', '30', '32', '34', '36']
  },
  { 
    id: 'p7', 
    title: 'Rok Plisket Premium', 
    price: 159000, 
    category: 'bottoms',
    img: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=800&auto=format&fit=crop', 
    desc: 'Rok plisket dengan bahan lembut dan jatuh sempurna.',
    colors: ['Black', 'Navy', 'Cream'],
    sizes: ['S', 'M', 'L']
  },

  // Dress
  { 
    id: 'p8', 
    title: 'Dress Midi Elegant', 
    price: 259000, 
    category: 'dresses',
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', 
    desc: 'Dress midi dengan desain elegan, cocok untuk berbagai acara.',
    colors: ['Black', 'Navy', 'Maroon'],
    sizes: ['S', 'M', 'L']
  },
  { 
    id: 'p9', 
    title: 'Summer Dress', 
    price: 189000, 
    category: 'dresses',
    img: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=800&auto=format&fit=crop', 
    desc: 'Dress ringan dengan motif floral, sempurna untuk musim panas.',
    colors: ['Floral Print'],
    sizes: ['S', 'M', 'L']
  },

  // Aksesoris
  { 
    id: 'p10', 
    title: 'Tote Bag Canvas', 
    price: 129000, 
    category: 'accessories',
    img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop', 
    desc: 'Tas tote berbahan canvas premium dengan kompartemen dalam.',
    colors: ['Natural', 'Black'],
    sizes: ['One Size']
  },
  { 
    id: 'p11', 
    title: 'Belt Premium', 
    price: 89000, 
    category: 'accessories',
    img: 'https://th.bing.com/th/id/R.584eb4d7b447d3f1282f56115e327fcc?rik=noCOtJyvAsZyBw&riu=http%3a%2f%2fwww.leathertalks.com%2fcdn%2fshop%2fproducts%2f2022-11-2412-12-38_B_R8_S4.jpg%3fv%3d1669616470&ehk=Vi4jLsBuleeXrlt3TvQMbFqzUTCS3Tr1sp90zpHe62Q%3d&risl=&pid=ImgRaw&r=0', 
    desc: 'Ikat pinggang kulit sintetis premium dengan buckle classic.',
    colors: ['Brown', 'Black'],
    sizes: ['S', 'M', 'L']
  }
];

// utilities
const fmtRupiah = v => {
  return 'Rp' + v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getCart = ()=> JSON.parse(localStorage.getItem('faroj_cart') || '[]');
const saveCart = (c)=> localStorage.setItem('faroj_cart', JSON.stringify(c));
const cartCountElIds = ['faroj_cart_count','faroj_cart_count_top','faroj_cart_count_tentang','faroj_cart_count_blog','faroj_cart_count_kontak','faroj_cart_count_faq','faroj_cart_count_cart','faroj_cart_count_bukutamu'];

// Migrate legacy 'cart' (array of items) into canonical 'faroj_cart' format {id, qty}
function migrateLegacyCart() {
  try {
    const legacy = JSON.parse(localStorage.getItem('cart') || '[]');
    const current = JSON.parse(localStorage.getItem('faroj_cart') || '[]');
    if (Array.isArray(legacy) && legacy.length > 0 && (!Array.isArray(current) || current.length === 0)) {
      const migrated = legacy.map(i => {
        // support different shapes
        return { id: i.id || i.productId || i.product || null, qty: i.qty || i.jumlah || 1 };
      }).filter(i => i.id !== null);
      if (migrated.length > 0) {
        localStorage.setItem('faroj_cart', JSON.stringify(migrated));
      }
    }
  } catch (e) {
    console.warn('Migration failed', e);
  }
}

function updateCartCountUI(){
  const sum = getCart().reduce((s,i)=>s+i.qty,0);
  cartCountElIds.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = sum;
  });
}

// render product card (used in index and toko)
function renderProducts(rootId, items=FAROJ_PRODUCTS){
  const root = document.getElementById(rootId);
  if(!root) return;
  root.innerHTML = '';
  items.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'faroj_product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="faroj_product_content">
        <div class="faroj_product_category">${getCategoryLabel(p.category)}</div>
        <h4>${p.title}</h4>
        <div class="faroj_product_price">${fmtRupiah(p.price)}</div>
        <div class="faroj_product_variants">
          <div class="faroj_product_colors">
            ${p.colors ? p.colors.map(color => `<span class="faroj_color_dot" title="${color}"></span>`).join('') : ''}
          </div>
          <div class="faroj_product_sizes">
            ${p.sizes ? p.sizes.map(size => `<span class="faroj_size_badge">${size}</span>`).join('') : ''}
          </div>
        </div>
        <div class="faroj_product_actions">
          <button class="faroj_btn_add faroj_add_btn" data-id="${p.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 20a1 1 0 100 2 1 1 0 000-2z"/>
              <path d="M20 20a1 1 0 100 2 1 1 0 000-2z"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            Tambah ke Keranjang
          </button>
          <button class="faroj_btn_detail faroj_detail_btn" data-id="${p.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    root.appendChild(card);
  });

  // attach events
  document.querySelectorAll('.faroj_add_btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      addToCart(id,1);
      animateAdd(e.currentTarget);
    });
  });

  document.querySelectorAll('.faroj_detail_btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      openProductModal(id);
    });
  });
}

function animateAdd(el){
  el.textContent='✓ Ditambahkan';
  setTimeout(()=> el.textContent='Tambah ke Keranjang',900);
}

// add to cart
function addToCart(productId, qty=1){
  const cart = getCart();
  const idx = cart.findIndex(i=>i.id===productId);
  const prod = FAROJ_PRODUCTS.find(p => p.id === productId);
  
  if(idx>=0){
    cart[idx].qty += qty;
    showCartNotification('success', 'Jumlah diperbarui', `${prod?.title || 'Produk'} ditambah ke keranjang`);
  } else {
    cart.push({ id: productId, qty });
    showCartNotification('success', 'Produk ditambahkan', `${prod?.title || 'Produk'} ditambah ke keranjang`);
  }
  saveCart(cart);
  updateCartCountUI();
}

function showCartNotification(type, title, message) {
  const notification = document.getElementById('faroj_cart_notification');
  if (!notification) return;

  const iconSvg = type === 'success' ? `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ` : type === 'error' ? `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M15 9l-6 6M9 9l6 6"/>
    </svg>
  ` : `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  `;

  notification.querySelector('.faroj_notification_icon').innerHTML = iconSvg;
  notification.querySelector('.faroj_notification_title').textContent = title;
  notification.querySelector('.faroj_notification_message').textContent = message;
  
  notification.setAttribute('aria-hidden', 'false');
  
  setTimeout(() => {
    notification.setAttribute('aria-hidden', 'true');
  }, 3000);
}

// modal
function openProductModal(id){
  const prod = FAROJ_PRODUCTS.find(p=>p.id===id);
  const modal = document.getElementById('faroj_product_modal');
  const content = document.getElementById('faroj_modal_content') || document.getElementById('faroj_modal_content2');
  if(!modal || !content) return;
  content.innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <img src="${prod.img}" alt="${prod.title}" style="max-width:320px;border-radius:10px;flex:1">
      <div style="flex:1">
        <h2>${prod.title}</h2>
        <p class="faroj_price">${fmtRupiah(prod.price)}</p>
        
        <p style="color:var(--muted)">${prod.desc}</p>
        <div style="margin-top:12px" class="faroj_qty_control">
          <label>Jumlah:</label>
          <div class="faroj_qty_wrapper">
            <button class="faroj_qty_btn" id="faroj_modal_minus">-</button>
            <input id="faroj_modal_qty" type="text" value="1" readonly>
            <button class="faroj_qty_btn" id="faroj_modal_plus">+</button>
          </div>
        </div>
        <div style="margin-top:12px">
          <button id="faroj_modal_add" class="faroj_btn">Tambah ke Keranjang</button>
        </div>
      </div>
    </div>
  `;
  modal.setAttribute('aria-hidden','false');

  // close handlers
  const closeBtn = document.querySelector('#faroj_modal_close') || document.querySelector('#faroj_modal_close2');
  if(closeBtn) closeBtn.onclick = ()=> modal.setAttribute('aria-hidden','true');

  setTimeout(()=>{
    const minusBtn = document.getElementById('faroj_modal_minus');
    const plusBtn = document.getElementById('faroj_modal_plus');
    const qtyInput = document.getElementById('faroj_modal_qty');
    const addBtn = document.getElementById('faroj_modal_add');
    
    if(minusBtn && plusBtn && qtyInput) {
      minusBtn.addEventListener('click', ()=> {
        let qty = parseInt(qtyInput.value);
        if(qty > 1) {
          qtyInput.value = qty - 1;
        }
      });
      
      plusBtn.addEventListener('click', ()=> {
        let qty = parseInt(qtyInput.value);
        qtyInput.value = qty + 1;
      });
    }

    if(addBtn){
      addBtn.addEventListener('click', ()=>{
        const q = parseInt(document.getElementById('faroj_modal_qty').value) || 1;
        if(q > 0) {
          addToCart(id,q);
          modal.setAttribute('aria-hidden','true');
        } else {
          alert('Silakan pilih jumlah produk');
        }
      });
    }
  },100);
}

// render cart page
function renderCartPage() {
  const root = document.getElementById('faroj_cart_root');
  const checkoutBox = document.getElementById('faroj_checkout_box');
  if (!root) return;
  
  const cart = getCart();
  if (cart.length === 0) {
    root.innerHTML = `
      <div class="faroj_cart_empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 20a1 1 0 100 2 1 1 0 000-2z"/>
          <path d="M20 20a1 1 0 100 2 1 1 0 000-2z"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        <h3>Keranjang Belanja Kosong</h3>
        <p>Anda belum menambahkan produk ke keranjang.</p>
        <a href="toko.html" class="faroj_btn">Mulai Belanja</a>
      </div>
    `;
    if (checkoutBox) checkoutBox.style.display = 'none';
    return;
  }

  if (checkoutBox) checkoutBox.style.display = 'block';
  let subtotal = 0;
  let totalItems = 0;
  
  root.innerHTML = '';
  cart.forEach(item => {
    const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { 
      title: 'Produk tidak ditemukan', 
      price: 0, 
      img: '',
      colors: [],
      sizes: [] 
    };
    
    subtotal += prod.price * item.qty;
    totalItems += item.qty;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'faroj_cart_item';
    cartItem.innerHTML = `
      <img src="${prod.img}" alt="${prod.title}" class="faroj_cart_image">
      <div class="faroj_cart_info">
        <h4 class="faroj_cart_title">${prod.title}</h4>
        <div class="faroj_cart_variant">
          ${prod.colors[0] ? `<span>Warna: ${prod.colors[0]}</span>` : ''}
          ${prod.sizes[0] ? `<span>• Ukuran: ${prod.sizes[0]}</span>` : ''}
        </div>
        <div class="faroj_cart_price">${fmtRupiah(prod.price)}</div>
      </div>
      <div class="faroj_cart_actions">
        <div class="faroj_quantity_control">
          <button class="faroj_quantity_btn" data-id="${item.id}" data-op="dec">−</button>
          <input type="text" class="faroj_quantity_input" data-id="${item.id}" value="${item.qty}">
          <button class="faroj_quantity_btn" data-id="${item.id}" data-op="inc">+</button>
        </div>
        <button class="faroj_remove_btn" data-id="${item.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
        </button>
      </div>
    `;
    root.appendChild(cartItem);
  });

  // Update checkout box
  document.getElementById('faroj_total_items').textContent = `${totalItems} item`;
  document.getElementById('faroj_subtotal').textContent = fmtRupiah(subtotal);
  
  // simple shipping logic: flat 20000 if subtotal >0 and <200000, else 0 for >=200k
  const shipping = subtotal === 0 ? 0 : (subtotal >= 200000 ? 0 : 20000);
  document.getElementById('faroj_shipping').textContent = fmtRupiah(shipping);
  document.getElementById('faroj_total').textContent = fmtRupiah(subtotal + shipping);

  // Update modal total
  const modalTotal = document.getElementById('faroj_modal_total');
  if (modalTotal) {
    modalTotal.textContent = fmtRupiah(subtotal + shipping);
  }

  // Attach quantity button events
  document.querySelectorAll('.faroj_quantity_btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      const op = e.currentTarget.dataset.op;
      const cart = getCart();
      const idx = cart.findIndex(i => i.id === id);
      if (idx >= 0) {
        if (op === 'inc') cart[idx].qty += 1;
        else cart[idx].qty = Math.max(1, cart[idx].qty - 1);
        saveCart(cart);
        renderCartPage();
        updateCartCountUI();
        showCartNotification('success', 'Keranjang diperbarui', 'Jumlah produk telah diubah');
      }
    });
  });

  // Attach quantity input events
  document.querySelectorAll('.faroj_quantity_input').forEach(inp => {
    inp.addEventListener('change', e => {
      const id = e.currentTarget.dataset.id;
      let val = parseInt(e.currentTarget.value) || 1;
      val = Math.max(1, val);
      const cart = getCart();
      const idx = cart.findIndex(i => i.id === id);
      if (idx >= 0) {
        cart[idx].qty = val;
        saveCart(cart);
        renderCartPage();
        updateCartCountUI();
        showCartNotification('success', 'Keranjang diperbarui', 'Jumlah produk telah diubah');
      }
    });
  });

  // Attach remove button events
  document.querySelectorAll('.faroj_remove_btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      let cart = getCart();
      const prod = FAROJ_PRODUCTS.find(p => p.id === id);
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCartPage();
      updateCartCountUI();
      showCartNotification('info', 'Produk dihapus', `${prod?.title || 'Produk'} telah dihapus dari keranjang`);
    });
  });

  // checkout button
  const checkoutBtn = document.getElementById('faroj_checkout_btn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      const modal = document.getElementById('faroj_checkout_modal');
      if (modal) {
        modal.setAttribute('aria-hidden', 'false');
      }
    };
  }

  const closeCheckout = document.getElementById('faroj_checkout_close');
  if(closeCheckout) closeCheckout.onclick = ()=> {
    const modal = document.getElementById('faroj_checkout_modal');
    if (modal) {
      modal.setAttribute('aria-hidden','true');
    }
  };
}

// responsive menu toggle
function setupMenuToggle(){
  document.querySelectorAll('#faroj_menu_toggle').forEach(btn => {
    const list = document.querySelector('#faroj_menu_list');
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !list.contains(e.target)) {
        list.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle menu on button click
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      list.classList.toggle('open');
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && list.classList.contains('open')) {
        list.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle menu item selection
    list.querySelectorAll('.faroj_menu_link').forEach(link => {
      link.addEventListener('click', () => {
        list.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });
}

// guest form handling (prevent double submit and show message)
function setupGuestForm(){
  const form = document.getElementById('faroj_guest_form');
  if(!form) return;
  form.addEventListener('submit', handleFormSubmit);
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const formSuccess = document.getElementById('formSuccess');
  
  // Show loading state
  if(btnText && btnLoading) {
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
  }
  submitBtn.disabled = true;
  
  const data = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    // Hide loading state
    if(btnText && btnLoading) {
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';
    }
    submitBtn.disabled = false;
    
    // Show success message
    if(formSuccess) {
      form.reset();
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      showNotification('Pesan berhasil dikirim!', 'success');
      form.reset();
    }
  })
  .catch(error => {
    // Hide loading state
    if(btnText && btnLoading) {
      btnText.style.display = 'block';
      btnLoading.style.display = 'none';
    }
    submitBtn.disabled = false;
    
    showNotification('Gagal mengirim pesan. Silakan coba lagi.', 'error');
  });
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  if(!notification) return;
  
  notification.textContent = message;
  notification.style.background = type === 'success' ? '#059669' : '#DC2626';
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// footer year
function initFooterYear(){
  document.querySelectorAll('#faroj_year, #faroj_year2').forEach(el=>{
    if(el) el.textContent = new Date().getFullYear();
  });
}

// init on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{
  // render products on pages (if the element exists)
  renderProducts('faroj_products');
  
  // render best sellers on home page
  const bestSellers = [
    FAROJ_PRODUCTS.find(p => p.id === 'p1'), // Kaos Basic Premium
    FAROJ_PRODUCTS.find(p => p.id === 'p4'), // Hoodie Premium
    FAROJ_PRODUCTS.find(p => p.id === 'p5'), // Denim Jacket
    FAROJ_PRODUCTS.find(p => p.id === 'p8')  // Dress Midi Elegant
  ].filter(Boolean);
  
  renderProducts('faroj_home_products', bestSellers);

  // product modal link for toko page might use different id, ensure both content containers supported
  setupMenuToggle();
  // migrate legacy cart key -> canonical key
  migrateLegacyCart();
  updateCartCountUI();
  initFooterYear();
  setupGuestForm();
  setupContactForm();
  // enable centralized payment form validation and wiring
  if (typeof setupPaymentValidation === 'function') setupPaymentValidation();

  if(document.getElementById('faroj_cart_root')){
    renderCartPage();
    renderPurchaseHistory();
  }

  // close modal when clicked outside inner
  document.querySelectorAll('.faroj_modal').forEach(mod=>{
    mod.addEventListener('click', (e)=>{
      if(e.target === mod){
        mod.setAttribute('aria-hidden','true');
      }
    });
  });
});

// Category and Filter Functions
function getCategoryLabel(category) {
  const labels = {
    tops: 'Atasan',
    bottoms: 'Bawahan',
    outerwear: 'Outerwear',
    dresses: 'Dress',
    accessories: 'Aksesoris'
  };
  return labels[category] || category;
}

function setupShopFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  const categoryBtns = document.querySelectorAll('.faroj_category_btn');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', filterProducts);
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      if (categoryFilter) {
        categoryFilter.value = e.target.dataset.category;
        filterProducts();
      }
    });
  });
}

function filterProducts() {
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  let filteredProducts = [...FAROJ_PRODUCTS];

  // Apply category filter
  if (categoryFilter && categoryFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter.value);
  }

  // Apply sort filter
  if (sortFilter) {
    switch(sortFilter.value) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you'd have a date field to sort by
        break;
      case 'popular':
        // In a real app, you'd have a popularity/sales field to sort by
        break;
    }
  }

  renderProducts('faroj_products', filteredProducts);
}

// Add event listener for shop filters
document.addEventListener('DOMContentLoaded', () => {
  setupShopFilters();
});

// ------------------- RIWAYAT TRANSAKSI -------------------
document.addEventListener("DOMContentLoaded", function() {
  const tabelBody = document.querySelector("#faroj_tabelRiwayat tbody");
  const pesanKosong = document.getElementById("pesanKosong");

  if (tabelBody) {
    const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

    if (transaksi.length === 0) {
      pesanKosong.textContent = "Belum ada transaksi yang tercatat.";
      tabelBody.innerHTML = "";
    } else {
      transaksi.forEach((item, i) => {
        const row = `
          <tr>
            <td>${i + 1}</td>
            <td>${item.nama}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${item.harga.toLocaleString()}</td>
            <td>Rp ${(item.harga * item.jumlah).toLocaleString()}</td>
            <td>${item.tanggal}</td>
          </tr>`;
        tabelBody.innerHTML += row;
      });
    }
  }
});


function simpanTransaksi(cart) {
  const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
  const tanggal = new Date().toLocaleDateString("id-ID");

  cart.forEach(item => {
    transaksi.push({
      nama: item.nama,
      jumlah: item.jumlah,
      harga: item.harga,
      tanggal: tanggal
    });
  });

  localStorage.setItem("transaksi", JSON.stringify(transaksi));
  console.log("Transaksi disimpan:", transaksi); // cek di console browser
}
document.addEventListener("DOMContentLoaded", function() {
  const tabelBody = document.querySelector("#faroj_tabelRiwayat tbody");
  const pesanKosong = document.getElementById("pesanKosong");

  if (!tabelBody) return;

  const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

  if (transaksi.length === 0) {
    pesanKosong.textContent = "Belum ada transaksi yang tercatat.";
    return;
  }

  tabelBody.innerHTML = "";
  transaksi.forEach((item, i) => {
    // Deteksi otomatis nama property
    const nama = item.nama || item.nama_produk || item.produk || "Tidak diketahui";
    const jumlah = item.jumlah || item.qty || item.quantity || 0;
    const harga = item.harga || item.price || 0;
    const tanggal = item.tanggal || item.date || "-";
    const total = harga * jumlah;

    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${nama}</td>
        <td>${jumlah}</td>
        <td>Rp ${harga.toLocaleString()}</td>
        <td>Rp ${total.toLocaleString()}</td>
        <td>${tanggal}</td>
      </tr>`;
    tabelBody.innerHTML += row;
  });
});

// ------------------- BUKU TAMU -------------------
// Simple, robust guestbook: uses ids from `bukutamu.html` (form id="guestbook-form", list id="guest-list")
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guestbook-form") || document.getElementById('guest-form');
  const list = document.getElementById("guest-list") || document.getElementById('guestList');
  let saved = JSON.parse(localStorage.getItem("guestMessages")) || [];

  function renderGuestList() {
    if(!list) return;
    list.innerHTML = '';
    saved.forEach((msg, idx) => {
      const div = document.createElement('div');
      div.className = 'guest-item';
      div.innerHTML = `
        <h4>${escapeHtml(msg.name)}</h4>
        <p>${escapeHtml(msg.message)}</p>
        <small>📧 ${escapeHtml(msg.email)}</small>
        <button class="guest-delete" data-index="${idx}" title="Hapus pesan">🗑️ Hapus</button>
      `;
      div.querySelector('.guest-delete').addEventListener('click', (e) => {
        const i = parseInt(e.currentTarget.dataset.index);
        if (!Number.isNaN(i)) {
          saved.splice(i,1);
          localStorage.setItem('guestMessages', JSON.stringify(saved));
          renderGuestList();
        }
      });
      list.appendChild(div);
    });
  }

  // helper to avoid simple injection
  function escapeHtml(s){
    if(!s) return '';
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  if(list) renderGuestList();

  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameEl = document.getElementById('nama') || form.querySelector('[name="name"]') || form.querySelector('#guestName');
      const emailEl = document.getElementById('email') || form.querySelector('[name="email"]') || form.querySelector('#guestEmail');
      const messageEl = document.getElementById('pesan') || form.querySelector('[name="message"]') || form.querySelector('#guestMessage');

      const name = nameEl ? nameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      if(!name || !email || !message) return;

      saved.push({ name, email, message });
      localStorage.setItem('guestMessages', JSON.stringify(saved));
      renderGuestList();
      form.reset();
    });
  }
});

// ===========================
// TAMPILKAN TESTIMONI DI HALAMAN DEPAN
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const testimoniList = document.getElementById("testimoniList");
  if (testimoniList) {
    const saved = JSON.parse(localStorage.getItem("guestMessages")) || [];

    if (saved.length === 0) {
      testimoniList.innerHTML = `<p class="faroj_muted">Belum ada testimoni 😇</p>`;
      return;
    }

    // tampilkan maksimal 3 pesan terbaru
    const latest = saved.slice(-3).reverse();

    latest.forEach((msg) => {
      const card = document.createElement("div");
      card.className = "testimoni-card";
      card.innerHTML = `
        <h4>👤 ${msg.name}</h4>
        <p>"${msg.message}"</p>
        <small>📧 ${msg.email}</small>
      `;
      testimoniList.appendChild(card);
    });
  }
});
// ===============================
// TANDAI MENU AKTIF BERDASARKAN HALAMAN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop(); // nama file saat ini
  const links = document.querySelectorAll(".faroj_menu_link");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});

// Render purchase history
function renderPurchaseHistory() {
    const historyContent = document.getElementById('faroj_history_content');
    if (!historyContent) {
        console.log('❌ Element faroj_history_content tidak ditemukan');
        return;
    }

    // ✅ CLEAR CONTENT SEBELUM RENDER BARU
    historyContent.innerHTML = '';
    
    const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
    console.log('📦 Riwayat pembelian:', history);
    
    if (history.length === 0) {
        historyContent.innerHTML = '<p>Belum ada riwayat pembelian.</p>';
        return;
    }

    let html = '';
    
    // ✅ GUNAKAN SET UNTUK HINDARI DUPLIKAT ORDER ID
    const seenOrderIds = new Set();
    
    history.reverse().forEach(order => {
        if (!order || typeof order !== 'object') {
            console.warn('Order data tidak valid:', order);
            return;
        }

        // ✅ CEK DUPLIKAT ORDER ID
        if (seenOrderIds.has(order.id)) {
            console.warn('⚠️ Duplikat order ID ditemukan:', order.id);
            return; // Skip order duplikat
        }
        seenOrderIds.add(order.id);

        // ... lanjutan kode render yang ada ...
    });

    historyContent.innerHTML = html;
    
    // ✅ SETUP EVENT LISTENERS HANYA SEKALI dengan timeout
    setTimeout(() => {
        setupPaymentActionListeners();
    }, 100);
}

// Fungsi khusus untuk setup event listeners
function setupPaymentActionListeners() {
    console.log('🔧 Setting up payment action listeners...');
    
    // ❌ HAPUS event listeners lama dengan cara yang benar
    document.querySelectorAll('.confirm-payment-btn, .cancel-order-btn').forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // ✅ GUNAKAN EVENT DELEGATION
    document.addEventListener('click', function(e) {
        // Tombol Konfirmasi Pembayaran
        if (e.target.closest('.confirm-payment-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.closest('.confirm-payment-btn');
            const orderId = btn.getAttribute('data-order-id');
            console.log('🔄 Tombol konfirmasi diklik untuk order:', orderId);
            openPaymentProofModal(orderId);
        }
        
        // Tombol Batalkan Pesanan
        if (e.target.closest('.cancel-order-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.closest('.cancel-order-btn');
            const orderId = btn.getAttribute('data-order-id');
            if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                updatePaymentStatus(orderId, 'Dibatalkan');
            }
        }
    });
    
    console.log('✅ Payment action listeners setup completed');
}

// Fungsi buka modal konfirmasi pembayaran
function openPaymentProofModal(orderId) {
    console.log('🚀 Membuka modal untuk order:', orderId);
    
    const modal = document.getElementById('paymentProofModal');
    const orderIdInput = document.getElementById('proof_order_id');
    
    if (!modal) {
        console.error('❌ Modal paymentProofModal tidak ditemukan');
        return;
    }
    
    if (!orderIdInput) {
        console.error('❌ Input proof_order_id tidak ditemukan');
        return;
    }
    
    // Set order ID
    orderIdInput.value = orderId;
    
    // Reset form
    const form = document.getElementById('paymentProofForm');
    if (form) {
        form.reset();
    }
    
    // Reset preview gambar
    const imagePreview = document.getElementById('imagePreview');
    const uploadArea = document.getElementById('uploadArea');
    if (imagePreview && uploadArea) {
        imagePreview.style.display = 'none';
        uploadArea.style.display = 'block';
    }
    
    // Tampilkan modal
    modal.setAttribute('aria-hidden', 'false');
    console.log('✅ Modal berhasil dibuka');
}
// Event listeners untuk tombol
function addPaymentActionListeners() {
    document.querySelectorAll('.confirm-payment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            openPaymentProofModal(orderId);
        });
    });
}

function updateOrderStatus(orderId, newStatus) {
  const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
  const updatedHistory = history.map(order => {
    if (order.id === orderId) {
      return { ...order, status: newStatus };
    }
    return order;
  });
  localStorage.setItem('faroj_purchase_history', JSON.stringify(updatedHistory));
  renderPurchaseHistory();
}

// ===============================
// SISTEM PEMBAYARAN YANG DIPERBAIKI
// ===============================

function setupPaymentValidation() {
    const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
    const orderForm = document.getElementById('faroj_order_form');
    
    if (!orderForm) return;
    
    // Set default checked state dan update details
    if (paymentRadios.length > 0) {
        paymentRadios[0].checked = true;
        updatePaymentDetails(paymentRadios[0].value);
        
        // Handle perubahan metode pembayaran
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                updatePaymentDetails(this.value);
                // Hapus pesan error jika ada
                const errorElement = document.getElementById('payment-error');
                if (errorElement) {
                    errorElement.remove();
                }
            });
        });
    }
    
    // Validasi form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi metode pembayaran
        const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
        if (!selectedPayment) {
            showPaymentError('Silakan pilih metode pembayaran');
            return;
        }
        
        // Validasi form lainnya
        if (!validateOrderForm()) {
            return;
        }
        
        // Jika semua validasi passed, proses pesanan
        processOrder();
    });
}

function validateOrderForm() {
    const requiredFields = [
        'customer_name',
        'customer_email', 
        'customer_phone',
        'customer_address',
        'customer_city'
    ];
    
    let isValid = true;
    
    // Reset error styles
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ef4444';
            
            // Tambahkan event untuk menghapus error style saat user mulai mengetik
            field.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        }
    });
    
    // Validasi email
    const emailField = document.getElementById('customer_email');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            isValid = false;
            emailField.style.borderColor = '#ef4444';
            showFormError('Format email tidak valid');
        }
    }
    
    // Validasi nomor telepon
    const phoneField = document.getElementById('customer_phone');
    if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(phoneField.value.trim())) {
            isValid = false;
            phoneField.style.borderColor = '#ef4444';
            showFormError('Format nomor telepon tidak valid');
        }
    }
    
    if (!isValid) {
        showFormError('Harap lengkapi semua field yang wajib diisi');
    }
    
    return isValid;
}

function processOrder() {
    const formData = new FormData(document.getElementById('faroj_order_form'));
    const cart = getCart();
    
    if (cart.length === 0) {
        showFormError('Keranjang belanja kosong');
        return;
    }
    
    // Hitung total pesanan
    const subtotal = cart.reduce((sum, item) => {
        const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { price: 0 };
        return sum + (prod.price * item.qty);
    }, 0);
    
    const shipping = subtotal >= 200000 ? 0 : 20000;
    const total = subtotal + shipping;
    
    // Buat data pesanan
    const orderData = {
        id: generateOrderId(),
        date: new Date().toLocaleString('id-ID'),
        customer: {
            name: formData.get('customer_name'),
            email: formData.get('customer_email'),
            phone: formData.get('customer_phone'),
            address: formData.get('customer_address'),
            city: formData.get('customer_city'),
            postal: formData.get('customer_postal') || '',
            notes: formData.get('order_notes') || ''
        },
        items: cart.map(item => {
            const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { title: 'Produk tidak ditemukan', price: 0 };
            return {
                id: item.id,
                name: prod.title,
                price: prod.price,
                quantity: item.qty,
                subtotal: prod.price * item.qty
            };
        }),
        payment: {
            method: formData.get('payment_method'),
            total: total,
            shipping: shipping,
            subtotal: subtotal
        },
        status: 'Menunggu Pembayaran'
    };
    
    // Simpan ke riwayat pembelian
    const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
    history.push(orderData);
    localStorage.setItem('faroj_purchase_history', JSON.stringify(history));
    
    // Tampilkan modal sukses
    showSuccessModal(orderData);
    
    // Kosongkan keranjang
    localStorage.removeItem('faroj_cart');
    updateCartCountUI();
    
    // Refresh tampilan keranjang dan riwayat
    if (typeof renderCartPage === 'function') {
        renderCartPage();
    }
    if (typeof renderPurchaseHistory === 'function') {
        renderPurchaseHistory();
    }
}

function showSuccessModal(orderData) {
    // Update modal sukses
    const successOrderId = document.getElementById('success_order_id');
    if (successOrderId) {
        successOrderId.textContent = orderData.id;
    }
    
    // Sembunyikan modal pembayaran
    const checkoutModal = document.getElementById('faroj_checkout_modal');
    if (checkoutModal) {
        checkoutModal.setAttribute('aria-hidden', 'true');
    }
    
    // Tampilkan modal sukses
    const successModal = document.getElementById('faroj_success_modal');
    if (successModal) {
        successModal.setAttribute('aria-hidden', 'false');
    }
    
    // Tampilkan notifikasi
    showCartNotification('success', 'Pesanan Berhasil!', `Pesanan #${orderData.id} telah dibuat`);
}

function updatePaymentDetails(method) {
    const detailsSection = document.getElementById('faroj_payment_details');
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => {
        const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { price: 0 };
        return sum + (prod.price * item.qty);
    }, 0);
    const shipping = subtotal >= 200000 ? 0 : 20000;
    const total = subtotal + shipping;
    
    let detailsHTML = '';
    
    switch(method) {
        case 'transfer':
            detailsHTML = `
                <h4>Instruksi Transfer Bank</h4>
                <p>Silakan transfer ke rekening berikut:</p>
                <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:10px 0">
                    <strong>Bank BCA</strong><br>
                    No. Rekening: 1234-5678-9012<br>
                    Atas Nama: STYLEEASE STORE<br><br>
                    
                    <strong>Bank Mandiri</strong><br>
                    No. Rekening: 0987-6543-2109<br>
                    Atas Nama: STYLEEASE STORE<br><br>
                    
                    <strong>Total yang harus dibayar:</strong><br>
                    <span style="font-size: 1.2em; font-weight: bold; color: var(--accent);">${fmtRupiah(total)}</span>
                </div>
                <p style="font-size: 0.9em; color: var(--muted);">
                    ⚠️ <strong>Penting:</strong> Transfer sesuai total yang tertera. Konfirmasi pembayaran akan dikirim ke email Anda.
                </p>
            `;
            break;
            
        case 'cod':
            detailsHTML = `
                <h4>Bayar di Tempat (COD)</h4>
                <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:10px 0">
                    <p><strong>Total yang harus dibayar:</strong></p>
                    <span style="font-size: 1.2em; font-weight: bold; color: var(--accent);">${fmtRupiah(total)}</span>
                </div>
                <p style="font-size: 0.9em; color: var(--muted);">
                    💰 Anda akan membayar pesanan ini saat barang diterima.<br>
                    Pastikan menyiapkan uang pas dan memeriksa barang sebelum membayar.
                </p>
            `;
            break;
            
        case 'ewallet':
            detailsHTML = `
                <h4>Pembayaran E-Wallet</h4>
                <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin:10px 0">
                    <p><strong>Pilih E-Wallet:</strong></p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                        <button type="button" class="faroj_ewallet_btn" data-wallet="gopay">GoPay</button>
                        <button type="button" class="faroj_ewallet_btn" data-wallet="ovo">OVO</button>
                        <button type="button" class="faroj_ewallet_btn" data-wallet="dana">DANA</button>
                        <button type="button" class="faroj_ewallet_btn" data-wallet="linkaja">LinkAja</button>
                    </div>
                    <p><strong>Total:</strong> <span style="font-size: 1.2em; font-weight: bold; color: var(--accent);">${fmtRupiah(total)}</span></p>
                </div>
                <p style="font-size: 0.9em; color: var(--muted);">
                    📱 Instruksi pembayaran lengkap akan dikirim via email setelah konfirmasi.
                </p>
            `;
            break;
    }
    
    if (detailsSection) {
        detailsSection.innerHTML = detailsHTML;
        
        // Setup e-wallet buttons jika metode e-wallet dipilih
        if (method === 'ewallet') {
            setupEwalletButtons();
        }
    }
}

function setupEwalletButtons() {
    const ewalletBtns = document.querySelectorAll('.faroj_ewallet_btn');
    ewalletBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Hapus active class dari semua buttons
            ewalletBtns.forEach(b => b.classList.remove('active'));
            // Tambahkan active class ke button yang diklik
            this.classList.add('active');
        });
    });
}

// Fungsi untuk menghasilkan ID pesanan
function generateOrderId() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SE${timestamp.slice(-6)}${random}`;
}

function showPaymentError(message) {
    // Hapus error sebelumnya jika ada
    const existingError = document.getElementById('payment-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Tambahkan error message
    const paymentOptions = document.querySelector('.faroj_payment_options');
    if (paymentOptions) {
        const errorElement = document.createElement('div');
        errorElement.id = 'payment-error';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.9em';
        errorElement.style.marginTop = '10px';
        errorElement.style.padding = '8px';
        errorElement.style.background = '#fef2f2';
        errorElement.style.borderRadius = '6px';
        errorElement.style.border = '1px solid #fecaca';
        errorElement.innerHTML = `⚠️ ${message}`;
        
        paymentOptions.appendChild(errorElement);
    }
}

function showFormError(message) {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.getElementById('form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Tambahkan notifikasi error
    const form = document.getElementById('faroj_order_form');
    if (form) {
        const notification = document.createElement('div');
        notification.id = 'form-notification';
        notification.style.color = '#ef4444';
        notification.style.fontSize = '0.9em';
        notification.style.marginBottom = '15px';
        notification.style.padding = '10px';
        notification.style.background = '#fef2f2';
        notification.style.borderRadius = '6px';
        notification.style.border = '1px solid #fecaca';
        notification.innerHTML = `⚠️ ${message}`;
        
        form.insertBefore(notification, form.firstChild);
    }
}

// Close success modal and redirect
function closeSuccessModal() {
    const successModal = document.getElementById('faroj_success_modal');
    if (successModal) {
        successModal.setAttribute('aria-hidden', 'true');
    }
    // Redirect ke halaman utama setelah sukses
    function closeSuccessModal() {
    const successModal = document.getElementById('faroj_success_modal');
    if (successModal) {
        successModal.setAttribute('aria-hidden', 'true');
    }
    
    // ✅ TAMPILKAN NOTIFIKASI SUKSES (opsional)
    showCartNotification('success', 'Pesanan Berhasil!', 'Terima kasih telah berbelanja di StyleEase');
    
    console.log('✅ Modal sukses ditutup, tetap di halaman keranjang');
}
}

// Print invoice helper
function printOrder() {
    const orderIdElement = document.getElementById('success_order_id');
    const orderId = orderIdElement ? orderIdElement.textContent : '#SE0001';
    const content = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="text-align: center; color: #ff6b6b;">StyleEase Invoice</h2>
          <p><strong>No. Pesanan:</strong> ${orderId}</p>
          <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
          <p><strong>Status:</strong> Menunggu Pembayaran</p>
          <hr>
          <p>Terima kasih telah berbelanja di StyleEase!</p>
          <p style="font-size: 0.9em; color: #666;">
            Invoice ini merupakan bukti pemesanan yang sah.<br>
            Silakan lakukan pembayaran sesuai instruksi yang dikirim via email.
          </p>
        </div>
      `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice ${orderId}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>${content}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// ===============================
// FUNGSI UNTUK MENGIRIM EMAIL
// ===============================

function sendOrderConfirmation(orderData) {
    // Gunakan EmailJS atau service email lainnya
    // Contoh menggunakan EmailJS (gratis untuk 200 email/bulan)
    
    // Pastikan EmailJS diinisialisasi di halaman HTML
    if (typeof emailjs !== 'undefined') {
        const templateParams = {
            to_email: orderData.customer.email,
            to_name: orderData.customer.name,
            order_id: orderData.id,
            order_date: orderData.date,
            customer_name: orderData.customer.name,
            customer_email: orderData.customer.email,
            customer_phone: orderData.customer.phone,
            customer_address: orderData.customer.address|| '-', 
            customer_city: orderData.customer.city|| '-', 
            customer_postal: orderData.customer.postal|| '-', 
            payment_method: getPaymentMethodLabel(orderData.payment.method),
            total_amount: fmtRupiah(orderData.payment.total),
            subtotal: fmtRupiah(orderData.payment.subtotal),
            shipping: fmtRupiah(orderData.payment.shipping),
            order_items: formatOrderItemsForEmail(orderData.items),
            order_notes: orderData.customer.notes || 'Tidak ada catatan'
        };

        return emailjs.send('service_your_service_id', 'template_your_template_id', templateParams)
            .then(function(response) {
                console.log('Email berhasil dikirim!', response.status, response.text);
                return true;
            }, function(error) {
                console.log('Gagal mengirim email:', error);
                // Fallback: tetap lanjut meski email gagal
                return true;
            });
    } else {
        // Fallback: simpan data untuk dikirim manual atau tampilkan di console
        console.log('Data pesanan untuk email:', orderData);
        // Tetap return resolved promise agar proses lanjut
        return Promise.resolve(true);
    }
}

function getPaymentMethodLabel(method) {
    const methods = {
        'transfer': 'Transfer Bank',
        'cod': 'Bayar di Tempat (COD)',
        'ewallet': 'E-Wallet'
    };
    return methods[method] || method;
}

function formatOrderItemsForEmail(items) {
    let html = '';
    items.forEach((item, index) => {
        html += `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${fmtRupiah(item.price)}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${fmtRupiah(item.subtotal)}</td>
            </tr>
        `;
    });
    return html;
}

// ===============================
// FUNGSI FALLBACK EMAIL (Form Submit)
// ===============================

function sendEmailFallback(orderData) {
    // Fallback menggunakan form submit ke FormSubmit.co (gratis)
    const formData = new FormData();
    
    // Format data untuk email
    const emailBody = `
DATA PESANAN STYLEEASE

No. Pesanan: ${orderData.id}
Tanggal: ${orderData.date}

DATA PELANGGAN:
Nama: ${orderData.customer.name}
Email: ${orderData.customer.email}
Telepon: ${orderData.customer.phone}
Alamat: ${orderData.customer.address}
Kota: ${orderData.customer.city}
Kode Pos: ${orderData.customer.postal}
Catatan: ${orderData.customer.notes || 'Tidak ada'}

DETAIL PESANAN:
${orderData.items.map((item, index) => 
    `${index + 1}. ${item.name} - ${item.quantity} x ${fmtRupiah(item.price)} = ${fmtRupiah(item.subtotal)}`
).join('\n')}

RINGKASAN PEMBAYARAN:
Subtotal: ${fmtRupiah(orderData.payment.subtotal)}
Ongkos Kirim: ${fmtRupiah(orderData.payment.shipping)}
Total: ${fmtRupiah(orderData.payment.total)}
Metode Pembayaran: ${getPaymentMethodLabel(orderData.payment.method)}

Status: ${orderData.status}

Terima kasih telah berbelanja di StyleEase!
    `.trim();

    formData.append('_subject', `Konfirmasi Pesanan #${orderData.id} - StyleEase`);
    formData.append('message', emailBody);
    formData.append('_replyto', orderData.customer.email);
    formData.append('_cc', orderData.customer.email); // CC ke customer
    
    // Submit ke FormSubmit.co
    return fetch('https://formsubmit.co/ajax/2303010075@unper.ac.id', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email fallback berhasil dikirim:', data);
        return true;
    })
    .catch(error => {
        console.log('Gagal mengirim email fallback:', error);
        return true; // Tetap lanjut meski email gagal
    });
}

// ===============================
// UPDATE FUNGSI processOrder()
// ===============================

function processOrder() {
    const formData = new FormData(document.getElementById('faroj_order_form'));
    const cart = getCart();
    
    if (cart.length === 0) {
        showFormError('Keranjang belanja kosong');
        return;
    }
    
    // Hitung total pesanan
    const subtotal = cart.reduce((sum, item) => {
        const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { price: 0 };
        return sum + (prod.price * item.qty);
    }, 0);
    
    const shipping = subtotal >= 200000 ? 0 : 20000;
    const total = subtotal + shipping;
    
    // Buat data pesanan
    const orderData = {
        id: generateOrderId(),
        date: new Date().toLocaleString('id-ID'),
        customer: {
            name: formData.get('customer_name'),
            email: formData.get('customer_email'),
            phone: formData.get('customer_phone'),
            address: formData.get('customer_address'),
            city: formData.get('customer_city'),
            postal: formData.get('customer_postal') || '',
            notes: formData.get('order_notes') || ''
        },
        items: cart.map(item => {
            const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { title: 'Produk tidak ditemukan', price: 0 };
            return {
                id: item.id,
                name: prod.title,
                price: prod.price,
                quantity: item.qty,
                subtotal: prod.price * item.qty
            };
        }),
        payment: {
            method: formData.get('payment_method'),
            total: total,
            shipping: shipping,
            subtotal: subtotal
        },
        status: 'Menunggu Pembayaran'
    };
    
    // Tampilkan loading state
    const confirmBtn = document.getElementById('faroj_confirm_payment');
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
            </svg>
            Mengirim konfirmasi...
        `;
    }
    
    // Kirim email konfirmasi
    sendEmailConfirmation(orderData)
        .then(success => {
            // Simpan ke riwayat pembelian
            const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
            history.push(orderData);
            localStorage.setItem('faroj_purchase_history', JSON.stringify(history));
            
            // Tampilkan modal sukses
            showSuccessModal(orderData);
            
            // Kosongkan keranjang
            localStorage.removeItem('faroj_cart');
            updateCartCountUI();
            
            // Refresh tampilan keranjang dan riwayat
            if (typeof renderCartPage === 'function') {
                renderCartPage();
            }
            if (typeof renderPurchaseHistory === 'function') {
                renderPurchaseHistory();
            }
        })
        .finally(() => {
            // Reset button state
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Konfirmasi & Bayar Sekarang
                `;
            }
        });
}

// ===============================
// FUNGSI EMAILJS YANG SIAP PAKAI
// ===============================

function sendOrderConfirmation(orderData) {
    return new Promise((resolve, reject) => {
        // Validasi EmailJS terinisialisasi
        if (typeof emailjs === 'undefined') {
            console.log('EmailJS not loaded');
            resolve(false);
            return;
        }

        // Format items untuk email
        const orderItemsHTML = orderData.items.map((item, index) => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${index + 1}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${fmtRupiah(item.price)}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${fmtRupiah(item.subtotal)}</td>
            </tr>
        `).join('');

        const templateParams = {
            // Data customer
            to_name: orderData.customer.name,
            to_email: orderData.customer.email,
            customer_name: orderData.customer.name,
            customer_email: orderData.customer.email,
            customer_phone: orderData.customer.phone,
            customer_address: orderData.customer.address,
            customer_city: orderData.customer.city,
            customer_postal: orderData.customer.postal || '-',
            customer_notes: orderData.customer.notes || 'Tidak ada catatan',
            
            // Data order
            order_id: orderData.id,
            order_date: orderData.date,
            order_status: orderData.status,
            
            // Data items
            order_items: orderItemsHTML,
            total_items: orderData.items.reduce((sum, item) => sum + item.quantity, 0),
            
            // Data payment
            payment_method: getPaymentMethodLabel(orderData.payment.method),
            subtotal: fmtRupiah(orderData.payment.subtotal),
            shipping: fmtRupiah(orderData.payment.shipping),
            total_amount: fmtRupiah(orderData.payment.total),
            
            // Additional info
            website_url: window.location.origin,
            support_phone: '+62 898-6735-615',
            support_email: '2303010075@unper.ac.id',
            current_year: new Date().getFullYear()
        };

        console.log('📧 Mengirim email dengan data:', templateParams);

        // GANTI service_id dan template_id dengan milik Anda
        const SERVICE_ID = 'service_4q0dppb'; // Ganti dengan Service ID Anda
        const TEMPLATE_ID = 'template_0vlukud'; // Ganti dengan Template ID Anda

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('✅ Email berhasil dikirim! Status:', response.status, response.text);
                showCartNotification('success', 'Email Terkirim', `Konfirmasi pesanan #${orderData.id} telah dikirim ke ${orderData.customer.email}`);
                resolve(true);
            })
            .catch(function(error) {
                console.log('❌ Gagal mengirim email:', error);
                showCartNotification('warning', 'Email Gagal', 'Pesanan berhasil, tetapi email konfirmasi gagal dikirim');
                resolve(false); // Tetap lanjut proses order
            });
    });
}

// Helper function untuk label metode pembayaran
function getPaymentMethodLabel(method) {
    const methods = {
        'transfer': 'Transfer Bank',
        'cod': 'Bayar di Tempat (COD)',
        'ewallet': 'E-Wallet'
    };
    return methods[method] || method;
}
// ===============================
// FUNGSI EMAILJS YANG DIPERBAIKI
// ===============================

async function sendOrderConfirmation(orderData) {
    try {
        console.log('📧 Memulai proses pengiriman email...');
        
        // Validasi data penting
        if (!orderData.customer.email) {
            throw new Error('Email customer tidak boleh kosong');
        }

        // Format items untuk email
        const formattedItems = orderData.items.map(item => 
            `• ${item.name} - ${item.quantity} x ${fmtRupiah(item.price)}`
        ).join('\n');

        // Parameter untuk template EmailJS
        const templateParams = {
            to_name: orderData.customer.name,
            to_email: orderData.customer.email,
            customer_name: orderData.customer.name,
            customer_email: orderData.customer.email,
            customer_phone: orderData.customer.phone,
            order_id: orderData.id,
            order_date: orderData.date,
            items: formattedItems,
            subtotal: fmtRupiah(orderData.payment.subtotal),
            shipping_cost: fmtRupiah(orderData.payment.shipping),
            total: fmtRupiah(orderData.payment.total),
            shipping_address: `${orderData.customer.address}, ${orderData.customer.city}`,
            payment_method: getPaymentMethodLabel(orderData.payment.method),
            bank_accounts: `Bank BCA: 1234-5678-9012\nBank Mandiri: 0987-6543-2109`
        };

        console.log('📧 Data email yang dikirim:', templateParams);

        // Kirim email dengan EmailJS
        const response = await emailjs.send(
            "service_4q0dppb", 
            "template_0vlukud", 
            templateParams
        );

        console.log('✅ Email berhasil dikirim:', response);
        return response;

    } catch (error) {
        console.error('❌ Gagal mengirim email:', error);
        throw error;
    }
}

// ===============================
// PROCESSORDER YANG DIPERBAIKI
// ===============================

async function processOrder() {
    const formData = new FormData(document.getElementById('faroj_order_form'));
    const cart = getCart();
    
    if (cart.length === 0) {
        showFormError('Keranjang belanja kosong');
        return;
    }
    
    // Hitung total pesanan
    const subtotal = cart.reduce((sum, item) => {
        const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { price: 0 };
        return sum + (prod.price * item.qty);
    }, 0);
    
    const shipping = subtotal >= 200000 ? 0 : 20000;
    const total = subtotal + shipping;
    
    // Buat data pesanan
     const orderData = {
        id: generateOrderId(),
        date: new Date().toLocaleString('id-ID'),
        customer: {
            name: formData.get('customer_name') || 'Tidak ada nama',
            email: formData.get('customer_email') || '-',
            phone: formData.get('customer_phone') || '-',
            address: formData.get('customer_address') || '-',
            city: formData.get('customer_city') || '-',
            postal: formData.get('customer_postal') || '',
            notes: formData.get('order_notes') || ''
        },
        items: cart.map(item => {
            const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { title: 'Produk tidak ditemukan', price: 0 };
            return {
                id: item.id,
                name: prod.title,
                price: prod.price,
                quantity: item.qty,
                subtotal: prod.price * item.qty
            };
        }),
        payment: {
            method: formData.get('payment_method'),
            total: total,
            shipping: shipping,
            subtotal: subtotal
        },
        status: 'Menunggu Pembayaran'
    };
    
    // Tampilkan loading state
    const confirmBtn = document.getElementById('faroj_confirm_payment');
    const originalBtnText = confirmBtn ? confirmBtn.innerHTML : '';
    
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
            </svg>
            Mengirim konfirmasi...
        `;
    }
    
    try {
        // Kirim email konfirmasi
        await sendOrderConfirmation(orderData);
        
        // Simpan ke riwayat pembelian
        const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
        history.push(orderData);
        localStorage.setItem('faroj_purchase_history', JSON.stringify(history));
        
        // Tampilkan modal sukses
        showSuccessModal(orderData);
        
        // Kosongkan keranjang
        localStorage.removeItem('faroj_cart');
        updateCartCountUI();
        
        // Refresh tampilan
        if (typeof renderCartPage === 'function') renderCartPage();
        if (typeof renderPurchaseHistory === 'function') renderPurchaseHistory();
        
        console.log('✅ Proses order selesai');
        
    } catch (error) {
        console.error('❌ Error dalam proses order:', error);
        showFormError('Gagal memproses pesanan. Silakan coba lagi.');
    } finally {
        // Reset button state
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = originalBtnText;
        }
    }
}
// ===============================
// FUNGSI HELPER
// ===============================

function getPaymentMethodLabel(method) {
    const methods = {
        'transfer': 'Transfer Bank',
        'cod': 'Bayar di Tempat (COD)',
        'ewallet': 'E-Wallet'
    };
    return methods[method] || method;
}

// Hapus fungsi duplikat di bagian akhir file
// HAPUS bagian ini dari kode Anda:
/*
async function sendOrderConfirmation() {
    try {
        // Dapatkan data dari form
        const customerName = document.getElementById('name').value;
        // ... kode yang tidak lengkap ...
*/

// ===============================
// SETUP FORM ORDER
// ===============================

function setupOrderForm() {
    const orderForm = document.getElementById('faroj_order_form');
    if (!orderForm) return;
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi form
        if (!validateOrderForm()) {
            return;
        }
        
        // Proses order
        processOrder();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Loaded - Initializing payment system...');
    
    // ... kode existing lainnya ...
    
    // Setup payment proof form
    setupPaymentProofForm();
    
    // Render purchase history jika di halaman riwayat
    if (document.getElementById('faroj_history_content')) {
        console.log('📋 Rendering purchase history...');
        renderPurchaseHistory();
    }
    
    console.log('✅ Payment system initialized');
    if (document.querySelector('.confirm-payment-btn') || document.querySelector('.cancel-order-btn')) {
        setupPaymentActionListeners();
    }
});
function validateOrderForm() {
    const requiredFields = [
        'customer_name',
        'customer_email', 
        'customer_phone',
        'customer_address',
        'customer_city'
    ];
    
    let isValid = true;
    
    // Reset error styles
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    // Validasi field required
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ef4444';
            
            field.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        }
    });
    
    // Validasi email khusus
    const emailField = document.getElementById('customer_email');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            isValid = false;
            emailField.style.borderColor = '#ef4444';
            showFormError('Format email tidak valid');
            return false;
        }
    }
    
    if (!isValid) {
        showFormError('Harap lengkapi semua field yang wajib diisi');
    }
    
    return isValid;
}
function renderPurchaseHistory() {
    const historyContent = document.getElementById('faroj_history_content');
    if (!historyContent) {
        console.log('❌ Element faroj_history_content tidak ditemukan');
        return;
    }

    const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
    console.log('📦 Riwayat pembelian:', history);
    
    if (history.length === 0) {
        historyContent.innerHTML = '<p>Belum ada riwayat pembelian.</p>';
        return;
    }

    let html = '';
    history.reverse().forEach(order => {
        if (!order || typeof order !== 'object') {
            console.warn('Order data tidak valid:', order);
            return;
        }

        const payment = order.payment || {};
        const subtotal = payment.subtotal || 0;
        const shipping = payment.shipping || 0;
        const total = payment.total || 0;
        
        const items = order.items || [];
        const orderId = order.id || 'N/A';
        const orderDate = order.date || 'Tidak diketahui';
        const orderStatus = order.status || 'Menunggu Pembayaran';

        console.log(`🔍 Order ${orderId}: Status = ${orderStatus}`);

        // TOMBOL KONFIRMASI - Hanya tampilkan jika status Menunggu Pembayaran
        let actionButtons = '';
        
        if (orderStatus === 'Menunggu Pembayaran' || orderStatus === 'Menunggu Konfirmasi') {
            actionButtons = `
                <div class="faroj_history_actions">
                    <button class="faroj_btn_small confirm-payment-btn" data-order-id="${orderId}">
                        💳 Konfirmasi Pembayaran
                    </button>
                    <button class="faroj_btn_small faroj_btn_outline cancel-order-btn" data-order-id="${orderId}">
                        ❌ Batalkan
                    </button>
                </div>
            `;
        } else if (orderStatus === 'Berhasil Dibayar') {
            actionButtons = `
                <div class="faroj_history_actions">
                    <span class="faroj_status_badge faroj_status_success">
                        ✅ Pembayaran Berhasil
                    </span>
                    ${order.paid_at ? `<small style="display:block;margin-top:5px;color:var(--muted);">Dibayar: ${order.paid_at}</small>` : ''}
                </div>
            `;
        } else if (orderStatus === 'Dibatalkan') {
            actionButtons = `
                <div class="faroj_history_actions">
                    <span class="faroj_status_badge faroj_status_cancelled">❌ Dibatalkan</span>
                </div>
            `;
        }

        html += `
            <div class="faroj_history_item">
                <div class="faroj_history_header">
                    <div>
                        <strong>Order ID: #${orderId}</strong>
                        <div class="faroj_muted">Tanggal: ${orderDate}</div>
                        <div>Status: <span class="faroj_status faroj_status_${orderStatus.toLowerCase().replace(/\s+/g, '-')}">${orderStatus}</span></div>
                    </div>
                    ${actionButtons}
                </div>
                
                <div class="faroj_history_items">
                    ${items.map(item => {
                        const itemName = item.name || 'Produk tidak ditemukan';
                        const itemQuantity = item.quantity || 0;
                        const itemPrice = item.price || 0;
                        const itemSubtotal = item.subtotal || 0;
                        
                        return `
                            <div class="faroj_history_item_row">
                                <div class="faroj_history_item_name">${itemName}</div>
                                <div class="faroj_history_item_qty">${itemQuantity}x</div>
                                <div class="faroj_history_item_price">${fmtRupiah(itemPrice)}</div>
                                <div class="faroj_history_item_subtotal">${fmtRupiah(itemSubtotal)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="faroj_history_summary">
                    <div>Subtotal: ${fmtRupiah(subtotal)}</div>
                    <div>Ongkir: ${fmtRupiah(shipping)}</div>
                    <div><strong>Total: ${fmtRupiah(total)}</strong></div>
                </div>
            </div>
        `;
    });

    historyContent.innerHTML = html;
    
    // Setup event listeners untuk tombol
    setupPaymentActionListeners();
}

// ===============================
// SISTEM KONFIRMASI PEMBAYARAN OTOMATIS
// ===============================

// Fungsi untuk buka modal upload bukti bayar
function openPaymentProofModal(orderId) {
    const modal = document.getElementById('paymentProofModal');
    const orderIdInput = document.getElementById('proof_order_id');
    
    if (modal && orderIdInput) {
        orderIdInput.value = orderId;
        modal.setAttribute('aria-hidden', 'false');
        
        // Reset form
        document.getElementById('paymentProofForm').reset();
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('uploadArea').style.display = 'block';
    }
}

// Setup form upload bukti bayar
function setupPaymentProofForm() {
    const form = document.getElementById('paymentProofForm');
    const modal = document.getElementById('paymentProofModal');
    const closeBtn = document.getElementById('paymentProofClose');
    const uploadArea = document.getElementById('uploadArea');
    const proofImageInput = document.getElementById('proof_image');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');
    
    if (!form) return;
    
    // Close modal
    if (closeBtn) {
        closeBtn.onclick = () => modal.setAttribute('aria-hidden', 'true');
    }
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Upload image handler
    uploadArea.addEventListener('click', () => proofImageInput.click());
    
    proofImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran file maksimal 2MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                uploadArea.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Remove image
    removeImageBtn.addEventListener('click', function() {
        proofImageInput.value = '';
        imagePreview.style.display = 'none';
        uploadArea.style.display = 'block';
    });
    
    // Handle form submission - OTOMATIS TANPA ADMIN
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        try {
            const orderId = document.getElementById('proof_order_id').value;
            const senderName = document.getElementById('sender_name').value;
            const senderBank = document.getElementById('sender_bank').value;
            const transferAmount = document.getElementById('transfer_amount').value;
            const transferDate = document.getElementById('transfer_date').value;
            const proofImage = document.getElementById('proof_image').files[0];
            
            // Validasi sederhana
            if (!proofImage) {
                throw new Error('Harap upload bukti transfer');
            }
            
            // Simpan data bukti bayar
            const proofData = {
                orderId,
                senderName,
                senderBank,
                transferAmount,
                transferDate,
                submittedAt: new Date().toLocaleString('id-ID'),
                status: 'verified_auto'
            };
            
            await savePaymentProof(proofData);
            
            // **OTOMATIS: Langsung ubah status menjadi Berhasil Dibayar**
            await autoConfirmPayment(orderId, proofData);
            
            // Tutup modal
            modal.setAttribute('aria-hidden', 'true');
            
            // Tampilkan notifikasi sukses
            showCartNotification('success', 'Pembayaran Dikonfirmasi', 
                `Pembayaran untuk order #${orderId} telah dikonfirmasi otomatis!`);
                
        } catch (error) {
            console.error('Error konfirmasi pembayaran:', error);
            showCartNotification('error', 'Gagal', error.message || 'Gagal mengkonfirmasi pembayaran');
        } finally {
            // Reset loading state
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Fungsi konfirmasi otomatis tanpa admin
async function autoConfirmPayment(orderId, proofData) {
    console.log(`🔄 Konfirmasi otomatis untuk order: ${orderId}`);
    
    // Update status pesanan langsung ke "Berhasil Dibayar"
    const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
    
    const updatedHistory = history.map(order => {
        if (order.id === orderId) {
            return {
                ...order,
                status: 'Berhasil Dibayar',
                payment_proof: proofData,
                paid_at: new Date().toLocaleString('id-ID'),
                payment_status: 'completed',
                confirmed_at: new Date().toLocaleString('id-ID')
            };
        }
        return order;
    });
    
    localStorage.setItem('faroj_purchase_history', JSON.stringify(updatedHistory));
    
    // Kirim email konfirmasi otomatis
    const order = updatedHistory.find(o => o.id === orderId);
    if (order) {
        try {
            await sendAutoPaymentConfirmation(order, proofData);
        } catch (emailError) {
            console.log('⚠️ Email gagal dikirim, tapi order berhasil:', emailError);
        }
    }
    
    // Refresh tampilan
    if (typeof renderPurchaseHistory === 'function') {
        renderPurchaseHistory();
    }
    
    console.log(`✅ Pembayaran #${orderId} dikonfirmasi otomatis dengan bukti transfer`);
}

// Simpan data bukti bayar
async function savePaymentProof(paymentData) {
    return new Promise((resolve) => {
        const paymentProofs = JSON.parse(localStorage.getItem('faroj_payment_proofs') || '[]');
        paymentProofs.push(paymentData);
        localStorage.setItem('faroj_payment_proofs', JSON.stringify(paymentProofs));
        resolve(true);
    });
}

// Email konfirmasi otomatis
async function sendAutoPaymentConfirmation(orderData, proofData) {
    try {
        const templateParams = {
            to_email: orderData.customer.email,
            to_name: orderData.customer.name,
            customer_name: orderData.customer.name,
            order_id: orderData.id,
            total_amount: fmtRupiah(orderData.payment.total),
            payment_method: getPaymentMethodLabel(orderData.payment.method),
            payment_date: new Date().toLocaleString('id-ID'),
            confirmation_type: 'Otomatis via Upload Bukti Transfer',
            next_steps: 'Pesanan Anda akan segera diproses dan dikirim. Terima kasih!'
        };

        await emailjs.send(
            "service_4q0dppb",
            "template_0vlukud", 
            templateParams
        );
        
        console.log('✅ Email konfirmasi pembayaran otomatis terkirim');
    } catch (error) {
        console.error('❌ Gagal kirim email konfirmasi:', error);
        // Tetap lanjut meski email gagal
    }
}
// Setup form konfirmasi pembayaran
// Setup form upload bukti bayar - HANYA FOTO
function setupPaymentProofForm() {
    const form = document.getElementById('paymentProofForm');
    const modal = document.getElementById('paymentProofModal');
    
    if (!form || !modal) {
        console.log('ℹ️ Modal konfirmasi pembayaran tidak ditemukan');
        return;
    }
    
    console.log('🔧 Setting up payment proof form (hanya foto)...');
    
    // Close modal handler
    const closeBtn = document.getElementById('paymentProofClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'true');
        });
    }
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Upload image handler
    const uploadArea = document.getElementById('uploadArea');
    const proofImageInput = document.getElementById('proof_image');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');
    
    if (uploadArea && proofImageInput) {
        uploadArea.addEventListener('click', () => {
            proofImageInput.click();
        });
        
        proofImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validasi ukuran file
                if (file.size > 2 * 1024 * 1024) {
                    alert('❌ Ukuran file maksimal 2MB');
                    return;
                }
                
                // Validasi tipe file
                if (!file.type.startsWith('image/')) {
                    alert('❌ Hanya file gambar yang diizinkan (JPG, PNG, GIF)');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    uploadArea.style.display = 'none';
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Remove image handler
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', function() {
            proofImageInput.value = '';
            imagePreview.style.display = 'none';
            uploadArea.style.display = 'block';
        });
    }
    
    // Form submission handler - SANGAT SEDERHANA
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Form konfirmasi pembayaran disubmit (hanya foto)');
        
        const orderId = document.getElementById('proof_order_id').value;
        const proofImage = document.getElementById('proof_image').files[0];
        
        // Validasi SEDERHANA: hanya cek apakah ada gambar
        if (!proofImage) {
            alert('❌ Harap upload bukti transfer terlebih dahulu');
            return;
        }
        
        console.log('✅ Bukti transfer valid, memproses...');
        
        // Tampilkan loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '🔄 Memproses pembayaran...';
        submitBtn.disabled = true;
        
        try {
            // Simpan bukti bayar - DATA MINIMAL
            const proofData = {
                orderId,
                imageName: proofImage.name,
                imageSize: (proofImage.size / 1024).toFixed(2) + ' KB',
                imageType: proofImage.type,
                submittedAt: new Date().toLocaleString('id-ID'),
                status: 'verified_auto'
            };
            
            // Konfirmasi otomatis
            await autoConfirmPayment(orderId, proofData);
            
            // Tutup modal
            modal.setAttribute('aria-hidden', 'true');
            
            // Tampilkan notifikasi sukses
            showCartNotification('success', 'Pembayaran Dikonfirmasi!', 
                `Pembayaran untuk order #${orderId} berhasil dikonfirmasi otomatis`);
            
        } catch (error) {
            console.error('❌ Error:', error);
            alert('❌ Gagal mengkonfirmasi pembayaran: ' + error.message);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    console.log('✅ Payment proof form setup completed (hanya foto)');
}
// ===============================
// FUNGSI UPDATE STATUS PEMBAYARAN YANG HILANG
// ===============================

function updatePaymentStatus(orderId, newStatus) {
    console.log(`🔄 Mengupdate status order ${orderId} menjadi: ${newStatus}`);
    
    const history = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
    const updatedHistory = history.map(order => {
        if (order.id === orderId) {
            const updatedOrder = {
                ...order,
                status: newStatus
            };
            
            // Tambahkan timestamp untuk status tertentu
            if (newStatus === 'Dibatalkan') {
                updatedOrder.cancelled_at = new Date().toLocaleString('id-ID');
            }
            
            return updatedOrder;
        }
        return order;
    });
    
    localStorage.setItem('faroj_purchase_history', JSON.stringify(updatedHistory));
    
    // Refresh tampilan
    if (typeof renderPurchaseHistory === 'function') {
        renderPurchaseHistory();
    }
    
    // Tampilkan notifikasi
    showCartNotification('info', 'Status Diperbarui', `Status pesanan #${orderId} telah diubah menjadi "${newStatus}"`);
    
    console.log(`✅ Status order ${orderId} berhasil diupdate`);
}

// ===============================
// PERBAIKI FUNGSI setupPaymentActionListeners
// ===============================

function setupPaymentActionListeners() {
    console.log('🔧 Setting up payment action listeners...');
    
    // Tombol Konfirmasi Pembayaran
    document.querySelectorAll('.confirm-payment-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const orderId = this.getAttribute('data-order-id');
            console.log('🔄 Tombol konfirmasi diklik untuk order:', orderId);
            openPaymentProofModal(orderId);
        });
    });
    
    // Tombol Batalkan Pesanan - PERBAIKAN DI SINI
    document.querySelectorAll('.cancel-order-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const orderId = this.getAttribute('data-order-id');
            if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                updatePaymentStatus(orderId, 'Dibatalkan'); // INI YANG DIPERBAIKI
            }
        });
    });
    
    console.log('✅ Payment action listeners setup completed');
}

// ===============================
// FUNGSI TAMBAHAN UNTUK HANDLE MODAL
// ===============================

function closePaymentProofModal() {
    const modal = document.getElementById('paymentProofModal');
    if (modal) {
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Pastikan fungsi ini dipanggil saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // ... kode existing lainnya ...
    
    // Pastikan setup payment proof form
    if (typeof setupPaymentProofForm === 'function') {
        setupPaymentProofForm();
    }
    
    // Pastikan render purchase history
    if (document.getElementById('faroj_history_content')) {
        renderPurchaseHistory();
    }
});

// ✅ TAMBAHKAN DI UTILITIES
let isProcessingOrder = false;

// ✅ PERBAIKI PROCESSORDER YANG BENAR
async function processOrder() {
    // ✅ CEK JIKA SEDANG PROSES ORDER
    if (isProcessingOrder) {
        console.log('⚠️ Order sedang diproses, tunggu...');
        showFormError('Order sedang diproses, silakan tunggu...');
        return;
    }
    
    isProcessingOrder = true;
    
    const formData = new FormData(document.getElementById('faroj_order_form'));
    const cart = getCart();
    
    if (cart.length === 0) {
        showFormError('Keranjang belanja kosong');
        isProcessingOrder = false; // ✅ RESET JIKA VALIDASI GAGAL
        return;
    }
    
    // Tampilkan loading state
    const confirmBtn = document.getElementById('faroj_confirm_payment');
    const originalBtnText = confirmBtn ? confirmBtn.innerHTML : '';
    
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
            </svg>
            Mengirim konfirmasi...
        `;
    }
    
    try {
        // Hitung total pesanan
        const subtotal = cart.reduce((sum, item) => {
            const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { price: 0 };
            return sum + (prod.price * item.qty);
        }, 0);
        
        const shipping = subtotal >= 200000 ? 0 : 20000;
        const total = subtotal + shipping;
        
        // Buat data pesanan
        const orderData = {
            id: generateOrderId(),
            date: new Date().toLocaleString('id-ID'),
            customer: {
                name: formData.get('customer_name') || 'Tidak ada nama',
                email: formData.get('customer_email') || '-',
                phone: formData.get('customer_phone') || '-',
                address: formData.get('customer_address') || '-',
                city: formData.get('customer_city') || '-',
                postal: formData.get('customer_postal') || '',
                notes: formData.get('order_notes') || ''
            },
            items: cart.map(item => {
                const prod = FAROJ_PRODUCTS.find(p => p.id === item.id) || { title: 'Produk tidak ditemukan', price: 0 };
                return {
                    id: item.id,
                    name: prod.title,
                    price: prod.price,
                    quantity: item.qty,
                    subtotal: prod.price * item.qty
                };
            }),
            payment: {
                method: formData.get('payment_method'),
                total: total,
                shipping: shipping,
                subtotal: subtotal
            },
            status: 'Menunggu Pembayaran'
        };
        
        // ✅ CEK DUPLIKASI ORDER SEBELUM MEMPROSES
        const existingHistory = JSON.parse(localStorage.getItem('faroj_purchase_history') || '[]');
        const recentOrder = existingHistory[existingHistory.length - 1];
        
        if (recentOrder && isDuplicateOrder(recentOrder, cart)) {
            console.log('⚠️ Order duplikat terdeteksi, membatalkan proses');
            showFormError('Order sedang diproses, silakan tunggu...');
            return;
        }
        
        // Kirim email konfirmasi
        await sendOrderConfirmation(orderData);
        
        // Simpan ke riwayat pembelian
        existingHistory.push(orderData);
        localStorage.setItem('faroj_purchase_history', JSON.stringify(existingHistory));
        
        // Tampilkan modal sukses
        showSuccessModal(orderData);
        
        // Kosongkan keranjang
        localStorage.removeItem('faroj_cart');
        updateCartCountUI();
        
        // Refresh tampilan
        if (typeof renderCartPage === 'function') renderCartPage();
        if (typeof renderPurchaseHistory === 'function') renderPurchaseHistory();
        
        console.log('✅ Proses order selesai');
        
    } catch (error) {
        console.error('❌ Error dalam proses order:', error);
        showFormError('Gagal memproses pesanan. Silakan coba lagi.');
    } finally {
        // ✅ PASTIKAN SELALU RESET STATE
        isProcessingOrder = false;
        
        // Reset button state
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = originalBtnText;
        }
    }
}

// ✅ FUNGSI CEK DUPLIKASI ORDER
function isDuplicateOrder(existingOrder, currentCart) {
    // Cek berdasarkan timestamp (dalam 30 detik terakhir)
    const orderTime = new Date(existingOrder.date).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = (currentTime - orderTime) / 1000; // dalam detik
    
    if (timeDiff < 30) { // 30 detik
        // Cek jika cart items sama
        const existingItems = existingOrder.items || [];
        const currentItems = currentCart.map(item => {
            const prod = FAROJ_PRODUCTS.find(p => p.id === item.id);
            return {
                id: item.id,
                name: prod?.title || 'Unknown',
                quantity: item.qty
            };
        });
        
        // Bandingkan items
        if (existingItems.length === currentItems.length) {
            const isSame = existingItems.every((item, index) => 
                item.id === currentItems[index].id && 
                item.quantity === currentItems[index].quantity
            );
            if (isSame) {
                console.log('⚠️ Duplikat order terdeteksi');
                return true;
            }
        }
    }
    return false;
}