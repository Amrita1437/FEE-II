import React, { useReducer, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Classic Leather Sneakers',
    category: 'Footwear',
    price: 50,
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
  },
  {
    id: 2,
    name: 'Blue Linen Casual Shirt',
    category: 'Apparel',
    price: 20,
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
  },
  {
    id: 3,
    name: 'Minimalist Wrist Watch',
    category: 'Accessories',
    price: 80,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    id: 4,
    name: 'Canvas Travel Backpack',
    category: 'Accessories',
    price: 65,
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
  },
  {
    id: 5,
    name: 'Retro UV Sunglasses',
    category: 'Accessories',
    price: 35,
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
  },
  {
    id: 6,
    name: 'Classic Denim Jacket',
    category: 'Apparel',
    price: 75,
    img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
  },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'INCREASE':
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREASE':
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload);

    case 'CLEAR':
      return [];

    default:
      return state;
  }
}

export default function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Footwear', 'Apparel', 'Accessories'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuy = () => {
    alert('Thank you for shopping with shopEasy!');
    dispatch({ type: 'CLEAR' });
  };

  return (
    <div style={styles.appContainer}>
      {/* 1. Top Announcement Bar */}
      <div style={styles.topBar}>
        🎉 Spring Sale: Enjoy 15% off on all items! Use code <strong>EASY15</strong>
      </div>

      {/* 2. Main Navigation Header */}
      <header style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            shop<span style={{ color: '#2563eb' }}>Easy</span>
          </div>
          <nav style={styles.navLinks}>
            <a href="#hero" style={styles.navLink}>Home</a>
            <a href="#catalog" style={styles.navLink}>Shop</a>
            <a href="#about" style={styles.navLink}>About</a>
          </nav>
          <div style={styles.cartBadge}>
            🛒 Cart ({totalItems})
          </div>
        </div>
      </header>

      {/* 3. Hero Banner */}
      <section id="hero" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroTag}>New Season Arrivals</span>
          <h1 style={styles.heroTitle}>Elevate Your Everyday Style</h1>
          <p style={styles.heroSubtitle}>
            Discover premium footwear, apparel, and accessories crafted for timeless comfort and modern elegance.
          </p>
          <a href="#catalog" style={styles.heroBtn}>Shop Collection</a>
        </div>
      </section>

      {/* 4. Value Propositions */}
      <section style={styles.featuresBar}>
        <div style={styles.featureItem}>
          <span style={styles.featureIcon}>🚚</span>
          <div>
            <strong>Free Shipping</strong>
            <p style={styles.featureSub}>On all orders over $50</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <span style={styles.featureIcon}>🔄</span>
          <div>
            <strong>30-Day Returns</strong>
            <p style={styles.featureSub}>Hassle-free exchange guarantee</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <span style={styles.featureIcon}>🔒</span>
          <div>
            <strong>Secure Payment</strong>
            <p style={styles.featureSub}>100% protected transactions</p>
          </div>
        </div>
      </section>

      {/* 5. Main Content: Catalog + Cart Sidebar */}
      <main id="catalog" style={styles.mainContent}>
        <section style={styles.productsSection}>
          <div style={styles.catalogHeader}>
            <h2 style={styles.sectionTitle}>Explore Products</h2>
            
            {/* Category Filter Pills */}
            <div style={styles.filterGroup}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  style={
                    selectedCategory === cat
                      ? { ...styles.filterBtn, ...styles.filterBtnActive }
                      : styles.filterBtn
                  }
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.imageWrapper}>
                  <img src={product.img} alt={product.name} style={styles.productImg} />
                </div>
                <div style={styles.cardDetails}>
                  <span style={styles.categoryBadge}>{product.category}</span>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <div style={styles.cardFooter}>
                    <span style={styles.price}>${product.price}.00</span>
                    <button
                      style={styles.addBtn}
                      onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Cart Sidebar */}
        <aside style={styles.cartSection}>
          <div style={styles.cartCard}>
            <div style={styles.cartHeader}>
              <h2 style={styles.cartTitle}>Your Bag</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={styles.itemCountText}>{totalItems} items</span>
                {cart.length > 0 && (
                  <button
                    style={styles.cleanTextBtn}
                    onClick={() => dispatch({ type: 'CLEAR' })}
                  >
                    Clean Cart
                  </button>
                )}
              </div>
            </div>

            {cart.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🛍️</div>
                <p>Your shopping bag is empty.</p>
              </div>
            ) : (
              <>
                <div style={styles.cartList}>
                  {cart.map((item) => (
                    <div key={item.id} style={styles.cartRow}>
                      <img src={item.img} alt={item.name} style={styles.cartThumb} />
                      <div style={styles.cartInfo}>
                        <div style={styles.cartItemName}>{item.name}</div>
                        <div style={styles.cartItemPrice}>${item.price}</div>
                        
                        <div style={styles.quantityPill}>
                          <button
                            style={styles.qtyBtn}
                            onClick={() => dispatch({ type: 'DECREASE', payload: item.id })}
                          >
                            -
                          </button>
                          <span style={styles.qtyValue}>{item.quantity}</span>
                          <button
                            style={styles.qtyBtn}
                            onClick={() => dispatch({ type: 'INCREASE', payload: item.id })}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        style={styles.removeIconBtn}
                        title="Remove item"
                        onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div style={styles.summaryContainer}>
                  <div style={styles.totalRow}>
                    <span>Total</span>
                    <span style={styles.totalPrice}>${totalAmount.toFixed(2)}</span>
                  </div>

                  <button
                    style={styles.buyBtn}
                    onClick={handleBuy}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </main>

      {/* 6. Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={styles.footerLogo}>shop<span style={{ color: '#60a5fa' }}>Easy</span></div>
            <p style={styles.footerText}>Simple, seamless shopping for everyone.</p>
          </div>
          <div style={styles.footerText}>
            © {new Date().getFullYear()} shopEasy Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    backgroundColor: '#f7f4ee',
    width: '100%',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e293b',
  },
  topBar: {
    backgroundColor: '#1e3a8a',
    color: '#f8fafc',
    textAlign: 'center',
    padding: '8px 16px',
    fontSize: '0.85rem',
  },
  navbar: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '16px 40px',
    sticky: 'top',
  },
  navContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#0f172a',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
  },
  navLink: {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  cartBadge: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    border: '1px solid #bfdbfe',
  },
  heroSection: {
    backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: '#ffffff',
    padding: '60px 40px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  heroTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'inline-block',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#e0e7ff',
    marginBottom: '28px',
    lineHeight: '1.5',
  },
  heroBtn: {
    backgroundColor: '#f7f4ee',
    color: '#1e3a8a',
    padding: '12px 28px',
    borderRadius: '8px',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'inline-block',
  },
  featuresBar: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  featureIcon: {
    fontSize: '1.8rem',
  },
  featureSub: {
    fontSize: '0.8rem',
    color: '#64748b',
    margin: 0,
  },
  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '32px',
  },
  productsSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  catalogHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    margin: 0,
    color: '#0f172a',
  },
  filterGroup: {
    display: 'flex',
    gap: '8px',
  },
  filterBtn: {
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#475569',
  },
  filterBtnActive: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '20px',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  productImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardDetails: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  categoryBadge: {
    fontSize: '0.75rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  productName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: '#1e293b',
    lineHeight: '1.3',
  },
  cardFooter: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#0f172a',
  },
  addBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  cartSection: {
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
  },
  cartCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.04)',
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid #f1f5f9',
  },
  cartTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    margin: 0,
  },
  itemCountText: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
  cleanTextBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '2px 4px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 10px',
    color: '#94a3b8',
    fontSize: '0.9rem',
  },
  cartList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    margin: '16px 0',
    maxHeight: '380px',
    overflowY: 'auto',
  },
  cartRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    paddingBottom: '12px',
    borderBottom: '1px solid #f8fafc',
  },
  cartThumb: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  cartInfo: {
    flexGrow: 1,
  },
  cartItemName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  cartItemPrice: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '6px',
  },
  quantityPill: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: '6px',
    padding: '2px',
  },
  qtyBtn: {
    border: 'none',
    backgroundColor: '#ffffff',
    width: '22px',
    height: '22px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#334155',
  },
  qtyValue: {
    padding: '0 8px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  removeIconBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '4px',
  },
  summaryContainer: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: '16px',
    marginTop: '8px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#2563eb',
  },
  buyBtn: {
    width: '100%',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  footer: {
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    padding: '30px 40px',
    marginTop: '60px',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  footerLogo: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '4px',
  },
  footerText: {
    fontSize: '0.85rem',
  },
};