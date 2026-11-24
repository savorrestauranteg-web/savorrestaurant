/* ================== Telegram & Firebase Setup ================== */
const TELEGRAM_BOT_TOKEN = '8775573638:AAH0lL9JerMwWuIZPs2sfTMmpbqf4nRqU4I';
const TELEGRAM_CHAT_ID = '8540698486';

async function notifyTelegram(orderMsg) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: "🔔 <b>أوردر جديد من الموقع:</b>\n\n" + orderMsg,
        parse_mode: "HTML"
      })
    });
  } catch (err) {
    console.error('Telegram error:', err);
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyCmbgtwUgqm1QoCQ9W2Cv7HipbOI7DeCAQ",
  authDomain: "savor-dashboard.firebaseapp.com",
  projectId: "savor-dashboard",
  storageBucket: "savor-dashboard.firebasestorage.app",
  messagingSenderId: "612222765101",
  appId: "1:612222765101:web:6e1076706e59d418cb90a4"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ================== Internationalization (AR / EN) ================== */
let currentLang = localStorage.getItem('savor_lang') || (new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ar');

const I18N = {
  ar: {
    pageTitle: 'مطعم ساڤور',
    closedBanner: '🔴 المطعم مقفول حالياً، مينفعش تكمل الأوردر دلوقتي. جرب تاني بعد شوية.',
    navHome: 'الرئيسية',
    navMenu: 'المنيو',
    navWhy: 'ليه SAVOR',
    navContact: 'تواصل معنا',
    whatsappTitle: 'واتساب',
    mmWhatsapp: 'واتساب: 01067841756',
    mmCall: 'اتصل بنا: 01203653736',
    heroTitle: 'جوعت؟ <span class="accent">SAVOR</span> بيوصلك<br>لحد باب البيت',
    heroLead: 'من جيلٍ لجيل… الزمن بيحكي حكايته.<br>وإحنا اخترنا نحكي حكايتنا بطريقتنا.<br><br>ساڤور… طعم بيواكب الزمن، ويفضل في الذاكرة.<br><br>برجر • تورتيلا • باستا • بطاطس • مشروبات<br>منيو كامل… بضغطتين، ويوصلك سخن وطازة لحد مكانك',
    trustFast: 'توصيل أسرع',
    trustEasy: 'طلبك أسهل',
    trustCity: 'مرسي مطروح',
    menuKicker: 'المنيو الكامل',
    menuTitle: 'اختار طلبك وضيفه للسلة',
    menuSub: 'كل الأصناف، الأحجام والأسعار زي ما هي بالظبط. اختار الحجم، حدد الكمية، وضيف للسلة — وهنكمل الباقي معاك على واتساب.',
    whyKicker: 'ليه تطلب من SAVOR؟',
    whyTitle: 'طعم يستاهل الوقفة',
    why1Title: 'توصيل سريع',
    why1Desc: 'طلبك بيتحضر ويوصلك في أسرع وقت من فرع آخر شارع الإسكندرية.',
    why2Title: 'دفع عند الاستلام',
    why2Desc: 'ادفع كاش لما الطلب يوصلك، من غير أي تعقيد في الدفع أونلاين.',
    why3Title: 'مكونات طازة يوميًا',
    why3Desc: 'لحمة، فراخ وصوصات بتتحضر يوميًا عشان كل قضمة تبقى فريش.',
    why4Title: 'تواصل مباشر واتساب',
    why4Desc: 'أي استفسار أو تعديل على الطلب، احنا رد واحد بعيد على واتساب.',
    contactKicker: 'تواصل معانا',
    contactTitle: 'محتاج تطلب أو تسأل؟',
    contactSub: 'إحنا موجودين على واتساب والتليفون، وفرعنا في انتظارك.',
    contactAddress: 'آخر شارع الإسكندرية - بجوار حديقة الغزالة - أمام قسم الشرطة',
    contactWhatsapp: 'واتساب: 01067841756',
    contactPhone: 'تليفون: 01203653736',
    btnWhatsapp: 'راسلنا واتساب',
    btnCallNow: 'اتصل الآن',
    followSocial: 'تابعنا على السوشيال ميديا',
    btnOpenMap: 'افتح اللوكيشن على جوجل ماب',
    footerDesc: 'برجر لحمة، تشيكن كرسبي، تورتيلا، باستا، بطاطس ومشروبات — طلبك يوصلك من فرعنا في آخر شارع الإسكندرية.',
    footerLinksTitle: 'روابط سريعة',
    footerAddress: '📍 آخر شارع الإسكندرية - بجوار حديقة الغزالة',
    copyright: '© 2026 SAVOR. جميع الحقوق محفوظة.',
    stickyCartLabel: 'السلة',
    stickyCartView: 'شوف السلة',
    cartTitle: 'سلة طلبك',
    couponPlaceholder: 'كود الخصم',
    btnApply: 'تطبيق',
    subtotalLabel: 'المجموع الفرعي',
    discountLabel: 'الخصم',
    totalLabel: 'الإجمالي',
    btnCheckout: 'إتمام الطلب ➔',
    sizeTitle: 'الحجم',
    sizeRequired: 'مطلوب',
    itemNotesLabel: 'ملاحظات المنتج (اختياري)',
    itemNotesPlaceholder: 'مثال: بدون طماطم، صوص زيادة...',
    btnAdd: 'إضافة',
    orderTypeHeading: 'هتستلم طلبك إزاي؟',
    typeDelivery: 'دليفري',
    typeTakeaway: 'تيك أواي',
    typeDinein: 'صالة',
    labelName: 'الاسم',
    phName: 'اسمك بالكامل',
    labelPhone: 'رقم الموبايل',
    labelAddress: 'العنوان بالتفصيل',
    phAddress: 'الحي، الشارع، رقم العمارة/الدور',
    labelTable: 'رقم الترابيزة',
    phTable: 'أدخل رقم الترابيزة',
    labelNotes: 'ملاحظات (اختياري)',
    phNotes: 'مثال : هحاسب ڤودافون كاش...',
    btnSendOrder: 'إرسال الطلب على واتساب',
    callModalTitle: 'أرقام التواصل',
    primaryNum: 'الرقم الأساسي',
    backupNum: 'الرقم الاحتياطي',
    btnCall: 'اتصال',
    btnWa: 'واتساب',
    currency: 'ج.م',
    pricePrefix: 'السعر',
    orderNow: 'اطلب الآن ➔',
    unavailableToast: 'المنتج غير متوفر الآن 🚫',
    cartEmptyTitle: 'السلة فاضية',
    cartEmptySub: 'ضيف أكلة لذيذة وابدأ الطلب',
    sizePrefix: 'الحجم:',
    notePrefix: 'ملاحظة:',
    couponEmptyCart: 'السلة فاضية!',
    couponEnterCode: 'من فضلك أدخل الكود أولاً',
    couponInvalid: 'كوبون غير صحيح أو منتهي',
    couponInvalidVal: 'قيمة الكوبون غير صالحة',
    couponApplied: '✓ تم تطبيق الكوبون',
    couponError: 'حدث خطأ في الاتصال',
    closedCheckoutToast: 'المطعم مقفول حالياً 🔴، لا يمكن استقبال طلبات.',
    emptyCheckoutToast: 'السلة فاضية! ضيف أصناف الأول 🛒',
    enterNameToast: 'من فضلك اكتب اسمك 📝',
    enterPhoneAddrToast: 'من فضلك اكتب رقم الموبايل والعنوان 📝',
    enterPhoneToast: 'من فضلك اكتب رقم الموبايل 📝',
    enterTableToast: 'من فضلك اكتب رقم الترابيزة 📝',
    sendingText: 'جاري الإرسال...',
    linkCopiedToast: 'تم نسخ رابط المنتج بنجاح 🔗',
    linkCopyErrToast: 'حدث خطأ أثناء نسخ الرابط ❌',
    addedToCartToast: (name) => `تمت إضافة "${name}" للسلة ✅`,
    step2TitleHtml: (typeLabel) => `بيانات <span id="selectedTypeText" style="color: var(--gold);">${typeLabel}</span>`,
    sizes: { S: 'سمول', L: 'لارج', D: 'دابل', XL: 'اكس لارج' }
  },
  en: {
    pageTitle: 'Savor Restaurant',
    closedBanner: '🔴 The restaurant is currently closed, you cannot complete an order now. Please try again later.',
    navHome: 'Home',
    navMenu: 'Menu',
    navWhy: 'Why SAVOR',
    navContact: 'Contact Us',
    whatsappTitle: 'WhatsApp',
    mmWhatsapp: 'WhatsApp: 01067841756',
    mmCall: 'Call Us: 01203653736',
    heroTitle: 'Hungry? <span class="accent">SAVOR</span> delivers<br>to your door',
    heroLead: 'From generation to generation... Time tells its story. And we choose to tell ours our way.<br>Savor... a taste that keeps up with time, and stays in memory.<br>Burger • Tortilla • Pasta • Fries • Drinks<br>Full menu... in two clicks, delivered hot and fresh to your place',
    trustFast: 'Fast Delivery',
    trustEasy: 'Easy Ordering',
    trustCity: 'Marsa Matrouh',
    menuKicker: 'Full Menu',
    menuTitle: 'Choose your order and add to cart',
    menuSub: 'All items, sizes, and prices are exactly the same. Choose the size, select the quantity, and add to cart — we will complete the rest with you on WhatsApp.',
    whyKicker: 'Why Order From SAVOR?',
    whyTitle: 'A Taste Worth The Wait',
    why1Title: 'Fast Delivery',
    why1Desc: 'Your order is prepared and delivered ASAP from our Alexandria St. branch.',
    why2Title: 'Cash on Delivery',
    why2Desc: 'Pay cash when you receive your order, no online payment hassle.',
    why3Title: 'Fresh Ingredients Daily',
    why3Desc: 'Meat, chicken, and sauces prepared daily so every bite is fresh.',
    why4Title: 'Direct WhatsApp Contact',
    why4Desc: 'Any inquiry or order modification, we are one reply away on WhatsApp.',
    contactKicker: 'Contact Us',
    contactTitle: 'Need to order or ask?',
    contactSub: 'We are available on WhatsApp and Phone, and our branch is waiting for you.',
    contactAddress: 'End of Alexandria St. - Next to Al-Ghazala Park - In front of Police Station',
    contactWhatsapp: 'WhatsApp: 01067841756',
    contactPhone: 'Phone: 01203653736',
    btnWhatsapp: 'Message on WhatsApp',
    btnCallNow: 'Call Now',
    followSocial: 'Follow us on Social Media',
    btnOpenMap: 'Open location on Google Maps',
    footerDesc: 'Beef burger, crispy chicken, tortilla, pasta, fries and drinks — your order delivered from our Alexandria St. branch.',
    footerLinksTitle: 'Quick Links',
    footerAddress: '📍 End of Alexandria St. - Next to Al-Ghazala Park',
    copyright: '© 2026 SAVOR. All rights reserved.',
    stickyCartLabel: 'Cart',
    stickyCartView: 'View Cart',
    cartTitle: 'Your Cart',
    couponPlaceholder: 'Discount Code',
    btnApply: 'Apply',
    subtotalLabel: 'Subtotal',
    discountLabel: 'Discount',
    totalLabel: 'Total',
    btnCheckout: 'Checkout ➔',
    sizeTitle: 'Size',
    sizeRequired: 'Required',
    itemNotesLabel: 'Product Notes (Optional)',
    itemNotesPlaceholder: 'Example: No tomatoes, extra sauce...',
    btnAdd: 'Add',
    orderTypeHeading: 'How will you receive your order?',
    typeDelivery: 'Delivery',
    typeTakeaway: 'Takeaway',
    typeDinein: 'Dine-in',
    labelName: 'Name',
    phName: 'Full Name',
    labelPhone: 'Mobile Number',
    labelAddress: 'Detailed Address',
    phAddress: 'Neighborhood, Street, Building/Floor',
    labelTable: 'Table Number',
    phTable: 'Enter table number',
    labelNotes: 'Notes (Optional)',
    phNotes: 'Example: Payment via Vodafone Cash...',
    btnSendOrder: 'Send Order on WhatsApp',
    callModalTitle: 'Contact Numbers',
    primaryNum: 'Main Number',
    backupNum: 'Backup Number',
    btnCall: 'Call',
    btnWa: 'WhatsApp',
    currency: 'EGP',
    pricePrefix: 'Price',
    orderNow: 'Order Now ➔',
    unavailableToast: 'Product is currently unavailable 🚫',
    cartEmptyTitle: 'Cart is empty',
    cartEmptySub: 'Add a delicious meal to start',
    sizePrefix: 'Size:',
    notePrefix: 'Note:',
    couponEmptyCart: 'Cart is empty!',
    couponEnterCode: 'Please enter code first',
    couponInvalid: 'Invalid or expired coupon',
    couponInvalidVal: 'Invalid coupon value',
    couponApplied: '✓ Coupon Applied',
    couponError: 'Connection Error',
    closedCheckoutToast: 'Restaurant is closed 🔴, cannot accept orders right now.',
    emptyCheckoutToast: 'Cart is empty! 🛒',
    enterNameToast: 'Please enter your name 📝',
    enterPhoneAddrToast: 'Please enter mobile and address 📝',
    enterPhoneToast: 'Please enter mobile number 📝',
    enterTableToast: 'Please enter table number 📝',
    sendingText: 'Sending...',
    linkCopiedToast: 'Link copied to clipboard 🔗',
    linkCopyErrToast: 'Error copying link ❌',
    addedToCartToast: (name) => `Added "${name}" to cart ✅`,
    step2TitleHtml: (typeLabel) => `<span id="selectedTypeText" style="color: var(--gold);">${typeLabel}</span> Details`,
    sizes: { S: 'Small', L: 'Large', D: 'Double', XL: 'X-Large' }
  }
};

function t(key) {
  return I18N[currentLang][key] !== undefined ? I18N[currentLang][key] : I18N.ar[key];
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('savor_lang', lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  document.title = t('pageTitle');

  const langEnBtn = document.getElementById('langEnBtn');
  const langArBtn = document.getElementById('langArBtn');
  if (langEnBtn && langArBtn) {
    langEnBtn.classList.toggle('active', lang === 'en');
    langArBtn.classList.toggle('active', lang === 'ar');
  }

  // Update footer logo if desired (AR uses logo.jpeg, EN uses savorar.png)
  const footerLogoImg = document.getElementById('footerLogoImg');
  if (footerLogoImg) {
    footerLogoImg.src = lang === 'en' ? 'savorar.png' : 'logo.jpeg';
  }

  // Update category nav scroll arrow icons based on direction
  const arrowStart = document.querySelector('.arrow-start-icon path');
  const arrowEnd = document.querySelector('.arrow-end-icon path');
  if (arrowStart && arrowEnd) {
    if (lang === 'en') {
      arrowStart.setAttribute('d', 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z');
      arrowEnd.setAttribute('d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
    } else {
      arrowStart.setAttribute('d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
      arrowEnd.setAttribute('d', 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z');
    }
  }

  // Static text translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key] !== undefined) {
      el.textContent = I18N[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (I18N[lang][key] !== undefined) {
      el.innerHTML = I18N[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang][key] !== undefined) {
      el.placeholder = I18N[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (I18N[lang][key] !== undefined) {
      el.title = I18N[lang][key];
      el.setAttribute('aria-label', I18N[lang][key]);
    }
  });

  // Update Step 2 heading if open
  const finalTypeInput = document.getElementById('finalOrderType');
  const step2Heading = document.getElementById('step2Heading');
  if (finalTypeInput && step2Heading) {
    const typeVal = finalTypeInput.value;
    let typeLabel = lang === 'en' ? 'Order' : 'الطلب';
    if (typeVal === 'دليفري') typeLabel = t('typeDelivery');
    else if (typeVal === 'تيك أواي') typeLabel = t('typeTakeaway');
    else if (typeVal === 'صالة') typeLabel = t('typeDinein');
    step2Heading.innerHTML = t('step2TitleHtml')(typeLabel);
  }

  if (MENU.length > 0) {
    renderCatNav();
    renderMenuToHTML();
  }
  renderCart();
}

document.getElementById('langEnBtn').addEventListener('click', (e) => {
  e.preventDefault();
  if (currentLang !== 'en') applyLanguage('en');
});

document.getElementById('langArBtn').addEventListener('click', (e) => {
  e.preventDefault();
  if (currentLang !== 'ar') applyLanguage('ar');
});

/* ================== Scroll Top & Call Modal ================== */
const menuScrollTopBtn = document.getElementById('menuScrollTopBtn');
window.addEventListener('scroll', () => {
  if (!menuScrollTopBtn) return;
  if (window.scrollY > 500) {
    menuScrollTopBtn.classList.add('show');
  } else {
    menuScrollTopBtn.classList.remove('show');
  }
});

if (menuScrollTopBtn) {
  menuScrollTopBtn.addEventListener('click', () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

const callModal = document.getElementById('callModal');
const callModalCloseBtn = document.getElementById('callModalCloseBtn');
const sectionCallBtn = document.getElementById('sectionCallBtn');

if (sectionCallBtn) {
  sectionCallBtn.addEventListener('click', () => {
    callModal.classList.add('show');
    document.getElementById('overlayBg').classList.add('show');
  });
}
if (callModalCloseBtn) {
  callModalCloseBtn.addEventListener('click', () => {
    callModal.classList.remove('show');
    document.getElementById('overlayBg').classList.remove('show');
  });
}

document.getElementById('productModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeProductModal();
  }
});

/* ================== Restaurant Status (Open / Closed) ================== */
let isRestaurantOpen = true;

db.collection("menu").doc("status").get().then(doc => {
  isRestaurantOpen = doc.exists ? (doc.data().isOpen !== false) : true;
  
  const banner = document.getElementById('restaurantClosedBanner');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (!isRestaurantOpen) {
    banner.style.display = 'block';
    if (checkoutBtn) {
      checkoutBtn.style.opacity = '0.5';
      checkoutBtn.style.cursor = 'not-allowed';
    }
  } else {
    banner.style.display = 'none';
    if (checkoutBtn) {
      checkoutBtn.style.opacity = '1';
      checkoutBtn.style.cursor = 'pointer';
    }
  }
});

/* ================== Menu Structure & Fetching ================== */
const DEFAULT_MENU = [
  { id:'drinks', nameAr:'مشروبات', nameEn:'DRINKS', icon:'🥤', banner:'assets/drinks.jpg' },
  { id:'fries', nameAr:'باكت بطاطس', nameEn:'FRIES PACKET', icon:'🍟', banner:'assets/fries.jpg' },
  { id:'beefburger', nameAr:'برجر لحمة', nameEn:'BEEF BURGER', icon:'🍔', banner:'assets/beefburger.jpg' },
  { id:'tortillapotato', nameAr:'تورتيلا بطاطس', nameEn:'TORTILLA POTATO', icon:'🌯', banner:'assets/tortillapotato.jpg' },
  { id:'chickencrispy', nameAr:'تشيكن كرسبي', nameEn:'CHICKEN CRISPY', icon:'🍗', banner:'assets/chickencrispy.jpg' },
  { id:'chickenpasta', nameAr:'مكرونة تشيكن كرسبي', nameEn:'CHICKEN CRISPY PASTA', icon:'🍝', banner:'assets/chickenpasta.jpg' },
  { id:'tortillachicken', nameAr:'تورتيلا تشيكن كرسبي', nameEn:'TORTILLA CHICKEN CRISPY', icon:'🌯', banner:'assets/tortillachicken.jpg' },
  { id:'tortillabeef', nameAr:'تورتيلا لحمة', nameEn:'TORTILLA BEEF', icon:'🌯', banner:'assets/tortillabeef.jpg' },
  { id:'additions', nameAr:'إضافات', nameEn:'ADDITIONS', icon:'➕', banner:'assets/additions.jpg' },
];

let MENU = [];
let isMenuFirstLoad = true;

function fetchMenuData() {
  const cachedMenu = localStorage.getItem('savor_menu_cache');
  const now = new Date().getTime();

  db.collection("menu").get().then(snapshot => {
    let fetchedCategories = [];
    let fetchedProducts = [];
    let legacyOrder = [];
    
    snapshot.forEach(doc => {
      if (doc.id === 'categoriesData') {
        fetchedCategories = doc.data().list || [];
      } else if (doc.id === 'categoriesOrder') {
        legacyOrder = doc.data().order || [];
      } else if (doc.id === 'status') {
        return;
      } else {
        fetchedProducts.push(doc.data());
      }
    });

    if (fetchedCategories.length > 0) {
      MENU = fetchedCategories.map(cat => ({...cat, items: []}));
    } else {
      MENU = DEFAULT_MENU.map(cat => ({...cat, items: []}));
      if (legacyOrder.length > 0) {
        MENU.sort((a, b) => {
          let idxA = legacyOrder.indexOf(a.id);
          let idxB = legacyOrder.indexOf(b.id);
          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        });
      }
    }

    fetchedProducts.forEach(item => {
      const category = MENU.find(c => c.id === item.category);
      if (category) category.items.push(item);
    });

    MENU.forEach(cat => {
      cat.items.sort((a, b) => (a.order || 999) - (b.order || 999));
    });

    localStorage.setItem('savor_menu_cache', JSON.stringify(MENU));
    localStorage.setItem('savor_menu_time', now.toString());

    renderCatNav();
    renderMenuToHTML();
    handleSharedLink();
  }).catch(error => {
    console.error('Menu loading error:', error);
    if (cachedMenu) {
      MENU = JSON.parse(cachedMenu);
      renderCatNav();
      renderMenuToHTML();
      handleSharedLink();
    }
  });
}

function handleSharedLink() {
  if (isMenuFirstLoad) {
    const urlParams = new URLSearchParams(window.location.search);
    let shortId = urlParams.get('p');

    if (shortId) {
      shortId = shortId.replace(/ /g, '+');
      let sharedItemName = "";
      try {
        sharedItemName = decodeURIComponent(escape(atob(shortId)));
      } catch (e) {
        console.log('Invalid Link Decoding');
      }

      if (sharedItemName) {
        let itemFound = false;
        for (let c = 0; c < MENU.length; c++) {
          for (let i = 0; i < MENU[c].items.length; i++) {
            const dbName = MENU[c].items[i].name ? MENU[c].items[i].name.trim() : "";
            const dbNameEn = MENU[c].items[i].nameEn ? MENU[c].items[i].nameEn.trim() : "";
            const targetName = sharedItemName.trim();
            
            if (dbName === targetName || dbNameEn === targetName) {
              setTimeout(() => {
                openProductModal(c, i);
              }, 100);
              itemFound = true;
              break;
            }
          }
          if (itemFound) break;
        }
      }
    }
    isMenuFirstLoad = false;
  }
}

fetchMenuData();

function renderCatNav() {
  const catNav = document.getElementById('catNav');
  if (!catNav) return;
  catNav.innerHTML = '';
  MENU.forEach(cat => {
    if (cat.items.length === 0) return;
    const btn = document.createElement('button');
    const displayName = currentLang === 'en' ? (cat.nameEn || cat.nameAr) : cat.nameAr;
    btn.innerHTML = `<span class="ic">${cat.icon}</span> ${displayName}`;
    btn.dataset.target = cat.id;
    btn.addEventListener('click', () => {
      document.getElementById('cat-' + cat.id).scrollIntoView({ behavior: 'smooth' });
    });
    catNav.appendChild(btn);
  });
  window.catButtonsArray = Array.from(catNav.children);
}

const scrollStartBtn = document.getElementById('scrollStartBtn');
const scrollEndBtn = document.getElementById('scrollEndBtn');
const catNavEl = document.getElementById('catNav');

if (scrollStartBtn && scrollEndBtn && catNavEl) {
  scrollStartBtn.addEventListener('click', () => {
    catNavEl.scrollBy({ left: currentLang === 'en' ? -250 : 250, behavior: 'smooth' });
  });
  scrollEndBtn.addEventListener('click', () => {
    catNavEl.scrollBy({ left: currentLang === 'en' ? 250 : -250, behavior: 'smooth' });
  });
}

/* ================== Observers & Menu Rendering ================== */
const catObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id.replace('cat-', '');
      if (window.catButtonsArray) {
        window.catButtonsArray.forEach(b => {
          if (b.dataset.target === id) {
            b.classList.add('active');
            const catNavContainer = document.getElementById('catNav');
            if (catNavContainer) {
              const scrollPos = b.offsetLeft - (catNavContainer.offsetWidth / 2) + (b.offsetWidth / 2);
              catNavContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
            }
          } else {
            b.classList.remove('active');
          }
        });
      }
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

function renderItemCard(cat, item) {
  const imgSrc = item.image && item.image !== '' ? item.image : 'assets/logo.jpg';
  let startPrice = item.price;
  if (item.sizes) {
    const validSizes = Object.keys(item.sizes).filter(k => item.sizes[k] > 0);
    validSizes.sort((a, b) => item.sizes[a] - item.sizes[b]);
    if (validSizes.length > 0) startPrice = item.sizes[validSizes[0]];
  }
  const catIdx = MENU.findIndex(c => c.id === cat.id);
  const itemIdx = cat.items.indexOf(item);
  const isSoldOut = item.status === 'out_of_stock';
  
  const cardClass = isSoldOut ? "item-card sold-out" : "item-card";
  const clickAction = isSoldOut
    ? `event.stopPropagation(); showToast('${t('unavailableToast')}');`
    : `openProductModal(${catIdx}, ${itemIdx})`;

  const delay = (itemIdx % 10) * 0.1;
  const displayName = currentLang === 'en' ? (item.nameEn || item.name) : item.name;
  const displayDesc = currentLang === 'en' ? (item.descriptionEn || item.description || '') : (item.description || '');

  return `
    <div class="${cardClass}" onclick="${clickAction}" style="--delay: ${delay}s;">
      ${item.badge ? `<span class="badge">⭐ ${item.badge}</span>` : ''}
      <img src="${imgSrc}" alt="${displayName}" loading="lazy">
      <div class="item-name">${displayName}</div>
      ${displayDesc ? `<div class="item-desc-preview">${displayDesc}</div>` : ''}
      <div class="item-foot">
        <div class="price-tag">${t('pricePrefix')} <span>${startPrice}</span> <small>${t('currency')}</small></div>
        <button type="button" class="add-btn" onclick="event.stopPropagation(); ${clickAction}">
          ${t('orderNow')}
        </button>
      </div>
    </div>`;
}

function renderMenuToHTML() {
  const menuMount = document.getElementById('menuMount');
  menuMount.innerHTML = '';

  MENU.forEach(cat => {
    if (cat.items.length === 0) return;
    const section = document.createElement('div');
    section.className = 'category-block';
    section.id = 'cat-' + cat.id;
    const catDisplayName = currentLang === 'en' ? (cat.nameEn || cat.nameAr) : cat.nameAr;
    const catSubEn = currentLang === 'en' ? '' : (cat.nameEn || '');

    section.innerHTML = `
      <div class="container">
        <div class="cat-banner" style="background-image:url('${cat.banner}')">
          <div class="overlay"></div>
          <div class="cat-banner-content">
            <span class="ic">${cat.icon}</span><h3>${catDisplayName}</h3><span class="en">${catSubEn}</span>
          </div>
        </div>
        <div class="items-grid">
          ${cat.items.map(item => renderItemCard(cat, item)).join('')}
        </div>
      </div>`;
    menuMount.appendChild(section);
  });
  
  setTimeout(() => {
    document.querySelectorAll('.category-block').forEach(s => catObserver.observe(s));

    const itemCards = document.querySelectorAll('.item-card');
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    const cardFadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-up-active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    itemCards.forEach(card => {
      cardFadeObserver.observe(card);
    });
  }, 50);
}

/* ================== Product Modal ================== */
let activePmItem = null, activePmCat = null, activePmSize = null, activePmQty = 1;

function openProductModal(catIdx, itemIdx) {
  activePmCat = MENU[catIdx];
  activePmItem = activePmCat.items[itemIdx];
  activePmQty = 1;
  document.getElementById('pmItemNotes').value = '';
  document.getElementById('pmImage').src = activePmItem.image || 'assets/logo.jpg';
  document.getElementById('pmTitle').textContent = currentLang === 'en' ? (activePmItem.nameEn || activePmItem.name) : activePmItem.name;
  
  const descEl = document.getElementById('pmDescription');
  const activeDesc = currentLang === 'en' ? (activePmItem.descriptionEn || activePmItem.description) : activePmItem.description;
  if (activeDesc) {
    descEl.textContent = activeDesc;
    descEl.style.display = 'block';
  } else {
    descEl.style.display = 'none';
  }
  document.getElementById('pmQtyVal').textContent = activePmQty;
  
  let validSizes = [];
  if (activePmItem.sizes) {
    validSizes = Object.keys(activePmItem.sizes).filter(k => activePmItem.sizes[k] > 0);
    validSizes.sort((a, b) => parseFloat(activePmItem.sizes[a]) - parseFloat(activePmItem.sizes[b]));
  }

  const startPrice = validSizes.length > 0 ? activePmItem.sizes[validSizes[0]] : activePmItem.price;
  document.getElementById('pmStartPrice').textContent = `${t('pricePrefix')} ${startPrice} ${t('currency')}`;

  const sizesList = document.getElementById('pmSizesList');
  const sizesContainer = document.getElementById('pmSizesContainer');
  sizesList.innerHTML = '';

  if (validSizes.length > 0) {
    sizesContainer.style.display = 'block';
    activePmSize = validSizes[0];
    validSizes.forEach((k, i) => {
      const price = activePmItem.sizes[k];
      const sizeLabel = I18N[currentLang].sizes[k] || k;
      sizesList.innerHTML += `
        <label class="pm-size-row">
          <div class="pm-size-name">
            <input type="radio" name="pmsize" value="${k}" ${i === 0 ? 'checked' : ''} onchange="changePmSize('${k}')">
            ${sizeLabel}
          </div>
          <div class="pm-size-price">+${price} ${t('currency')}</div>
        </label>
      `;
    });
  } else {
    sizesContainer.style.display = 'none';
    activePmSize = null;
  }

  updatePmTotal();
  document.getElementById('productModal').classList.add('show');
  document.getElementById('overlayBg').classList.add('show');
  
  const utf8Str = unescape(encodeURIComponent(activePmItem.name));
  const rawBase64 = btoa(utf8Str);
  const shortId = encodeURIComponent(rawBase64);

  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?p=' + shortId;
  try {
    window.history.pushState({ path: newUrl }, '', newUrl);
  } catch (e) {}
}

function changePmSize(sizeKey) {
  activePmSize = sizeKey;
  updatePmTotal();
}

function updatePmTotal() {
  const basePrice = activePmItem.sizes ? activePmItem.sizes[activePmSize] : activePmItem.price;
  document.getElementById('pmTotalBtn').textContent = `${basePrice * activePmQty} ${t('currency')}`;
}

document.getElementById('pmQtyMinus').addEventListener('click', () => {
  if (activePmQty > 1) {
    activePmQty--;
    document.getElementById('pmQtyVal').textContent = activePmQty;
    updatePmTotal();
  }
});
document.getElementById('pmQtyPlus').addEventListener('click', () => {
  activePmQty++;
  document.getElementById('pmQtyVal').textContent = activePmQty;
  updatePmTotal();
});

function closeProductModal() {
  document.getElementById('productModal').classList.remove('show');
  document.getElementById('overlayBg').classList.remove('show');
  const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.pushState({ path: cleanUrl }, '', cleanUrl);
}

document.getElementById('pmCloseBtn').addEventListener('click', closeProductModal);

document.getElementById('pmShareBtn').addEventListener('click', async () => {
  const currentUrl = window.location.href;
  const itemName = currentLang === 'en' ? (activePmItem.nameEn || activePmItem.name) : activePmItem.name;
  const shareData = currentLang === 'en'
    ? { title: 'SAVOR Restaurant', text: `Check out ( ${itemName} ) from Savor!`, url: currentUrl }
    : { title: 'SAVOR Restaurant', url: currentUrl };

  const isLocal = window.location.protocol === 'file:';
  const canNativeShare = !isLocal && navigator.share && navigator.canShare && navigator.canShare(shareData);

  if (canNativeShare) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Share cancelled:', err);
    }
  } else {
    try {
      const clipText = currentLang === 'en' ? `Check out ( ${itemName} ) from Savor!
${currentUrl}` : currentUrl;
      await navigator.clipboard.writeText(clipText);
      showToast(t('linkCopiedToast'));
    } catch (err) {
      showToast(t('linkCopyErrToast'));
    }
  }
});

document.getElementById('pmAddToCartBtn').addEventListener('click', () => {
  const price = activePmItem.sizes ? activePmItem.sizes[activePmSize] : activePmItem.price;
  const itemNotes = document.getElementById('pmItemNotes').value.trim();
  addToCart({
    cat: activePmCat.nameAr,
    name: activePmItem.name,
    nameEn: activePmItem.nameEn || activePmItem.name,
    sizeKey: activePmSize,
    size: activePmSize ? (I18N.ar.sizes[activePmSize] || activePmSize) : null,
    price: price,
    qty: activePmQty,
    notes: itemNotes
  });
  document.getElementById('productModal').classList.remove('show');
  document.getElementById('overlayBg').classList.remove('show');
  const displayName = currentLang === 'en' ? (activePmItem.nameEn || activePmItem.name) : activePmItem.name;
  showToast(t('addedToCartToast')(displayName));
});

/* ================== Cart ================== */
let cart = JSON.parse(localStorage.getItem('savor_cart') || '[]');

function saveCart() {
  localStorage.setItem('savor_cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);

  if (localStorage.getItem('savor_custName')) {
    document.getElementById('custName').value = localStorage.getItem('savor_custName');
  }
  if (localStorage.getItem('savor_custPhone')) {
    document.getElementById('custPhone').value = localStorage.getItem('savor_custPhone');
  }
  if (localStorage.getItem('savor_custAddress')) {
    document.getElementById('custAddress').value = localStorage.getItem('savor_custAddress');
  }

  document.getElementById('custName').addEventListener('input', (e) => {
    localStorage.setItem('savor_custName', e.target.value);
  });
  document.getElementById('custPhone').addEventListener('input', (e) => {
    localStorage.setItem('savor_custPhone', e.target.value);
  });
  document.getElementById('custAddress').addEventListener('input', (e) => {
    localStorage.setItem('savor_custAddress', e.target.value);
  });
});

function addToCart({ cat, name, nameEn, sizeKey, size, price, qty, notes }) {
  const existing = cart.find(i => i.name === name && i.size === size && i.notes === notes);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ cat, name, nameEn: nameEn || name, sizeKey: sizeKey || null, size, price, qty, notes: notes || "" });
  }
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function changeCartQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function getCartItemSizeLabel(item) {
  if (!item.size && !item.sizeKey) return '';
  if (item.sizeKey && I18N[currentLang].sizes[item.sizeKey]) {
    return I18N[currentLang].sizes[item.sizeKey];
  }
  // Fallback mapping for legacy stored cart items
  const reverseArToKey = { 'سمول': 'S', 'لارج': 'L', 'دابل': 'D', 'اكس لارج': 'XL' };
  const mappedKey = reverseArToKey[item.size];
  if (mappedKey && I18N[currentLang].sizes[mappedKey]) {
    return I18N[currentLang].sizes[mappedKey];
  }
  return item.size || '';
}

var currentDiscountValue = 0;
var DELIVERY_FEE = 0;

function renderCart() {
  const body = document.getElementById('cartBody');
  const totalEl = document.getElementById('cartTotal');
  const countEl = document.getElementById('cartCount');
  const scTotal = document.getElementById('scTotal');
  const scCount = document.getElementById('scCount');
  const stickyCart = document.getElementById('stickyCart');
  
  const subTotalVal = document.getElementById('subTotalVal');
  const discountRow = document.getElementById('discountRow');
  const discountVal = document.getElementById('discountVal');

  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="ic">🍗</div>${t('cartEmptyTitle')}<br><small style="font-size:12px;">${t('cartEmptySub')}</small></div>`;
    currentDiscountValue = 0;
    if (document.getElementById('cartCouponInput')) document.getElementById('cartCouponInput').value = '';
    if (document.getElementById('couponMsg')) document.getElementById('couponMsg').textContent = '';
  } else {
    body.innerHTML = cart.map((item, idx) => {
      const displayName = currentLang === 'en' ? (item.nameEn || item.name) : item.name;
      const sizeDisplay = getCartItemSizeLabel(item);
      if (currentLang === 'en') {
        return `
        <div class="cart-row" style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
          <div class="cr-info" style="flex: 1; text-align: left;">
            <div class="cr-name">${displayName}</div>
            <div class="cr-size">${sizeDisplay ? t('sizePrefix') + ' ' + sizeDisplay : ''}</div>
            ${item.notes ? `<div style="font-size: 11px; color: var(--tomato); margin-top: 2px;">${t('notePrefix')} ${item.notes}</div>` : ''}
            <div class="cr-price">${item.qty} × ${item.price} ${t('currency')} = ${item.price * item.qty} ${t('currency')}</div>
          </div>
          <div class="qty-stepper">
            <button type="button" onclick="changeCartQty(${idx}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button type="button" onclick="changeCartQty(${idx}, 1)">+</button>
          </div>
          <button class="cr-remove" onclick="removeFromCart(${idx})">✕</button>
        </div>`;
      } else {
        return `
        <div class="cart-row">
          <button class="cr-remove" onclick="removeFromCart(${idx})">✕</button>
          <div class="qty-stepper">
            <button type="button" onclick="changeCartQty(${idx}, 1)">+</button>
            <span class="qty-val">${item.qty}</span>
            <button type="button" onclick="changeCartQty(${idx}, -1)">−</button>
          </div>
          <div class="cr-info" style="text-align:left;">
            <div class="cr-name">${displayName}</div>
            <div class="cr-size">${sizeDisplay ? t('sizePrefix') + ' ' + sizeDisplay : ''}</div>
            ${item.notes ? `<div style="font-size: 11px; color: var(--tomato); margin-top: 2px;">${t('notePrefix')} ${item.notes}</div>` : ''}
            <div class="cr-price">${item.qty} × ${item.price} ${t('currency')} = ${item.price * item.qty} ${t('currency')}</div>
          </div>
        </div>`;
      }
    }).join('');
  }

  const subTotal = cartTotal();
  const count = cartCount();
  
  let validDiscount = currentDiscountValue;
  if (validDiscount >= subTotal) {
    validDiscount = subTotal;
  }

  const finalTotal = subTotal > 0 ? (subTotal + DELIVERY_FEE - validDiscount) : 0;

  if (subTotalVal) subTotalVal.textContent = subTotal + ' ' + t('currency');
  
  if (validDiscount > 0 && subTotal > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountVal) discountVal.textContent = '-' + validDiscount + ' ' + t('currency');
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  if (totalEl) totalEl.textContent = finalTotal + ' ' + t('currency');
  
  if (count > 0) {
    countEl.style.display = 'flex';
    countEl.textContent = count;
  } else {
    countEl.style.display = 'none';
  }
  if (scTotal) scTotal.textContent = finalTotal + ' ' + t('currency');
  if (scCount) scCount.textContent = count;
  if (stickyCart) stickyCart.classList.toggle('show', count > 0);
}

/* ================== Coupon Logic ================== */
document.getElementById('applyCouponBtn').addEventListener('click', () => {
  const codeInput = document.getElementById('cartCouponInput');
  const code = codeInput ? codeInput.value.trim().toUpperCase() : '';
  const msgEl = document.getElementById('couponMsg');
  const applyBtn = document.getElementById('applyCouponBtn');
  
  if (!msgEl || !applyBtn) return;

  if (cart.length === 0) {
    msgEl.textContent = t('couponEmptyCart');
    msgEl.className = 'coupon-msg error';
    return;
  }

  if (!code) {
    msgEl.textContent = t('couponEnterCode');
    msgEl.className = 'coupon-msg error';
    return;
  }

  applyBtn.textContent = '...';
  applyBtn.disabled = true;

  db.collection('coupons').where('code', '==', code).where('active', '==', true).get()
    .then((snapshot) => {
      applyBtn.textContent = t('btnApply');
      applyBtn.disabled = false;

      if (snapshot.empty) {
        currentDiscountValue = 0;
        msgEl.textContent = t('couponInvalid');
        msgEl.className = 'coupon-msg error';
        renderCart();
      } else {
        const couponData = snapshot.docs[0].data();
        const rawDiscount = Number(couponData.value !== undefined ? couponData.value : couponData.discount ?? 0);
        const couponType = couponData.type || 'fixed';
        const subtotal = cartTotal();

        if (couponType === 'percentage') {
          currentDiscountValue = Math.min(subtotal * (rawDiscount / 100), subtotal);
        } else {
          currentDiscountValue = Math.min(rawDiscount, subtotal);
        }

        if (isNaN(currentDiscountValue) || currentDiscountValue <= 0 || rawDiscount < 0 || (couponType === 'percentage' && rawDiscount > 100)) {
          currentDiscountValue = 0;
          msgEl.textContent = t('couponInvalidVal');
          msgEl.className = 'coupon-msg error';
        } else {
          msgEl.textContent = t('couponApplied');
          msgEl.className = 'coupon-msg success';
        }
        renderCart();
      }
    })
    .catch((error) => {
      applyBtn.textContent = t('btnApply');
      applyBtn.disabled = false;
      msgEl.textContent = t('couponError');
      msgEl.className = 'coupon-msg error';
      console.error(error);
    });
});

/* ================== Drawers & Modals Controls ================== */
const cartDrawer = document.getElementById('cartDrawer');
const overlayBg = document.getElementById('overlayBg');

function openCart() {
  renderCart();
  cartDrawer.classList.add('open');
  overlayBg.classList.add('show');
}
function closeCart() {
  cartDrawer.classList.remove('open');
  overlayBg.classList.remove('show');
}

document.getElementById('cartOpenBtn').addEventListener('click', openCart);
const stickyCartBtn = document.getElementById('stickyCartBtn');
if (stickyCartBtn) {
  stickyCartBtn.addEventListener('click', openCart);
}
document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
overlayBg.addEventListener('click', () => {
  closeCart();
  closeCheckoutModal();
  closeProductModal();
  if (callModal) callModal.classList.remove('show');
});

const mobileMenu = document.getElementById('mobileMenu');
document.getElementById('mmOpenBtn').addEventListener('click', () => mobileMenu.classList.add('open'));
document.getElementById('mmCloseBtn').addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

const checkoutModal = document.getElementById('checkoutModal');
function openCheckoutModal() {
  if (!isRestaurantOpen) {
    showToast(t('closedCheckoutToast'));
    return;
  }
  if (cart.length === 0) {
    showToast(t('emptyCheckoutToast'));
    return;
  }
  closeCart();
  checkoutModal.classList.add('show');
  overlayBg.classList.add('show');
}

document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
document.getElementById('modalCloseBtn').addEventListener('click', closeCheckoutModal);

/* ================== Animated Checkout Steps (Step 1 & Step 2) ================== */
const step1 = document.getElementById('step1-OrderType');
const step2 = document.getElementById('step2-OrderForm');
const backBtn = document.getElementById('backToStep1');
const finalTypeInput = document.getElementById('finalOrderType');

document.querySelectorAll('.big-ot-card').forEach(card => {
  card.addEventListener('click', function() {
    if (this.classList.contains('is-animating')) return;

    const type = this.dataset.type;
    finalTypeInput.value = type;

    document.querySelectorAll('.big-ot-card').forEach(c => {
      c.classList.add('is-animating');
      c.style.pointerEvents = 'none';
    });

    if (type === 'دليفري') this.classList.add('animating-delivery');
    else if (type === 'تيك أواي') this.classList.add('animating-takeaway');
    else if (type === 'صالة') this.classList.add('animating-dinein');

    setTimeout(() => {
      step1.style.opacity = '0';
      setTimeout(() => {
        step1.style.display = 'none';
        step2.style.display = 'block';
        requestAnimationFrame(() => {
          step2.style.opacity = '1';
        });

        let typeLabel = t('typeDelivery');
        if (type === 'تيك أواي') typeLabel = t('typeTakeaway');
        else if (type === 'صالة') typeLabel = t('typeDinein');

        const step2Heading = document.getElementById('step2Heading');
        if (step2Heading) {
          step2Heading.innerHTML = t('step2TitleHtml')(typeLabel);
        }

        const addressField = document.getElementById('addressField');
        const tableField = document.getElementById('tableField');
        const phoneField = document.getElementById('phoneField');

        if (type === 'دليفري') {
          addressField.style.display = 'block';
          tableField.style.display = 'none';
          phoneField.style.display = 'block';
        } else if (type === 'تيك أواي') {
          addressField.style.display = 'none';
          tableField.style.display = 'none';
          phoneField.style.display = 'block';
        } else if (type === 'صالة') {
          addressField.style.display = 'none';
          tableField.style.display = 'block';
          phoneField.style.display = 'none';
        }

        this.classList.remove('animating-delivery', 'animating-takeaway', 'animating-dinein');
        document.querySelectorAll('.big-ot-card').forEach(c => {
          c.classList.remove('is-animating');
          c.style.pointerEvents = 'auto';
        });
      }, 200);
    }, 750);
  });
});

backBtn.addEventListener('click', () => {
  step2.style.opacity = '0';
  setTimeout(() => {
    step2.style.display = 'none';
    step1.style.display = 'block';
    requestAnimationFrame(() => {
      step1.style.opacity = '1';
    });
  }, 250);
});

function resetCheckoutModal() {
  step2.style.opacity = '0';
  step2.style.display = 'none';
  step1.style.display = 'block';
  step1.style.opacity = '1';
}

function closeCheckoutModal() {
  checkoutModal.classList.remove('show');
  overlayBg.classList.remove('show');
  setTimeout(resetCheckoutModal, 300);
}

/* ================== Send Order to WhatsApp & Telegram & Firestore ================== */
document.getElementById('sendOrderBtn').addEventListener('click', async () => {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const table = document.getElementById('custTable') ? document.getElementById('custTable').value.trim() : '';
  const notes = document.getElementById('custNotes').value.trim();
  const couponCode = document.getElementById('cartCouponInput') ? document.getElementById('cartCouponInput').value.trim().toUpperCase() : '';
  const orderType = finalTypeInput.value;

  if (!name) { showToast(t('enterNameToast')); return; }
  if (orderType === 'دليفري' && (!phone || !address)) { showToast(t('enterPhoneAddrToast')); return; }
  if (orderType === 'تيك أواي' && !phone) { showToast(t('enterPhoneToast')); return; }
  if (orderType === 'صالة' && !table) { showToast(t('enterTableToast')); return; }

  const btn = document.getElementById('sendOrderBtn');
  const btnTextEl = document.getElementById('sendOrderBtnText');
  if (btnTextEl) btnTextEl.textContent = t('sendingText');
  btn.disabled = true;

  const subTotal = cartTotal();
  let validDiscount = currentDiscountValue;
  if (validDiscount >= subTotal) { validDiscount = subTotal; }
  const finalTotal = subTotal > 0 ? (subTotal + DELIVERY_FEE - validDiscount) : 0;

  let msg = '';
  let tgMsg = '';

  if (currentLang === 'en') {
    let engOrderType = "Delivery";
    if (orderType === "تيك أواي") engOrderType = "Takeaway";
    if (orderType === "صالة") engOrderType = "Dine-in";

    msg = `Hello SAVOR, I'd like to place an order:
`;
    msg += `📍 Order Type: *${engOrderType}*

`;
    cart.forEach(item => {
      const itemName = item.nameEn || item.name;
      const sizeStr = getCartItemSizeLabel(item);
      msg += `• ${itemName}${sizeStr ? ' (' + sizeStr + ')' : ''} × ${item.qty} = ${item.price * item.qty} EGP
`;
      if (item.notes) msg += `   └ Note: ${item.notes}
`;
    });
    msg += `
-------------------
`;
    msg += `Subtotal: ${subTotal} EGP
`;
    if (validDiscount > 0) msg += `Discount: -${validDiscount} EGP (Coupon: ${couponCode})
`;
    msg += `Final Total: *${finalTotal} EGP*
`;
    msg += `-------------------

`;
    msg += `👤 Name: ${name}
`;
    if (orderType === 'دليفري' || orderType === 'تيك أواي') msg += `📱 Mobile: ${phone}
`;
    if (orderType === 'دليفري') msg += `🏠 Address: ${address}
`;
    if (orderType === 'صالة') msg += `🍽️ Table No: ${table}
`;
    if (notes) msg += `📝 Additional Notes: ${notes}
`;

    tgMsg = `📍 Order Type: <b>${engOrderType}</b>

`;
    cart.forEach(item => {
      const itemName = item.nameEn || item.name;
      const sizeStr = getCartItemSizeLabel(item);
      tgMsg += `• ${itemName}${sizeStr ? ' (' + sizeStr + ')' : ''} × ${item.qty} = ${item.price * item.qty} EGP
`;
      if (item.notes) tgMsg += `   └ Note: ${item.notes}
`;
    });
    tgMsg += `
───────────────────
`;
    tgMsg += `Subtotal: ${subTotal} EGP
`;
    if (validDiscount > 0) tgMsg += `Discount: -${validDiscount} EGP (Coupon: ${couponCode})
`;
    tgMsg += `Final Total: <b>${finalTotal} EGP</b>
`;
    tgMsg += `───────────────────

`;
    tgMsg += `👤 Name: ${name}
`;
    if (orderType === 'دليفري' || orderType === 'تيك أواي') tgMsg += `📱 Mobile: ${phone}
`;
    if (orderType === 'دليفري') tgMsg += `🏠 Address: ${address}
`;
    if (orderType === 'صالة') tgMsg += `🍽️ Table No: ${table}
`;
    if (notes) tgMsg += `📝 Additional Notes: ${notes}
`;
  } else {
    msg = `أهلاً SAVOR، حابب أطلب:
`;
    msg += `📍 نوع الطلب: *${orderType}*

`;
    cart.forEach(item => {
      msg += `• ${item.name}${item.size ? ' (' + item.size + ')' : ''} × ${item.qty} = ${item.price * item.qty} ج.م
`;
      if (item.notes) msg += `   └ ملاحظة: ${item.notes}
`;
    });
    msg += `
-------------------
`;
    msg += `المجموع الفرعي: ${subTotal} ج.م
`;
    if (validDiscount > 0) msg += `الخصم: -${validDiscount} ج.م (كوبون: ${couponCode})
`;
    msg += `الإجمالي النهائي: *${finalTotal} ج.م*
`;
    msg += `-------------------

`;
    msg += `👤 الاسم: ${name}
`;
    if (orderType === 'دليفري' || orderType === 'تيك أواي') msg += `📱 الموبايل: ${phone}
`;
    if (orderType === 'دليفري') msg += `🏠 العنوان: ${address}
`;
    if (orderType === 'صالة') msg += `🍽️ رقم الترابيزة: ${table}
`;
    if (notes) msg += `📝 ملاحظات إضافية: ${notes}
`;

    tgMsg = `📍 نوع الطلب: <b>${orderType}</b>

`;
    cart.forEach(item => {
      tgMsg += `• ${item.name}${item.size ? ' (' + item.size + ')' : ''} × ${item.qty} = ${item.price * item.qty} ج.م
`;
      if (item.notes) tgMsg += `   └ ملاحظة: ${item.notes}
`;
    });
    tgMsg += `
───────────────────
`;
    tgMsg += `المجموع الفرعي: ${subTotal} ج.م
`;
    if (validDiscount > 0) tgMsg += `الخصم: -${validDiscount} ج.م (كوبون: ${couponCode})
`;
    tgMsg += `الإجمالي النهائي: <b>${finalTotal} ج.م</b>
`;
    tgMsg += `───────────────────

`;
    tgMsg += `👤 الاسم: ${name}
`;
    if (orderType === 'دليفري' || orderType === 'تيك أواي') tgMsg += `📱 الموبايل: ${phone}
`;
    if (orderType === 'دليفري') tgMsg += `🏠 العنوان: ${address}
`;
    if (orderType === 'صالة') tgMsg += `🍽️ رقم الترابيزة: ${table}
`;
    if (notes) tgMsg += `📝 ملاحظات إضافية: ${notes}
`;
  }

  try {
    await db.collection('orders').add({
      orderType: orderType,
      customerName: name,
      phone: phone,
      address: address,
      table: table,
      notes: notes,
      couponCode: validDiscount > 0 ? couponCode : "",
      discount: validDiscount,
      items: cart.map(i => `${i.name}${i.size ? '(' + i.size + ')' : ''} x${i.qty}${i.notes ? ' [ملاحظة: ' + i.notes + ']' : ''}`).join(', '),
      total: finalTotal,
      status: 'new',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) {
    console.error('Database save error:', e);
  }

  await notifyTelegram(tgMsg);

  cart = [];
  currentDiscountValue = 0;
  saveCart();
  renderCart();
  closeCheckoutModal();
  if (btnTextEl) btnTextEl.textContent = t('btnSendOrder');
  btn.disabled = false;

  window.location.href = `whatsapp://send?phone=201067841756&text=${encodeURIComponent(msg)}`;
});

/* ================== Toast & Dark Mode ================== */
function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

const darkModeBtn = document.getElementById('darkModeBtn');
if (darkModeBtn) {
  if (localStorage.getItem('savor_dark_mode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('savor_dark_mode', 'enabled');
    } else {
      localStorage.setItem('savor_dark_mode', 'disabled');
    }
  });
}
