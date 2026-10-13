import React, { useReducer } from 'react';

// Product data with online image URLs
const products = [
  {
    id: 1,
    name: 'Classic Sneakers',
    price: 50,
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&q=80',
  },
  {
    id: 2,
    name: 'Blue Linen Shirt',
    price: 20,
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80',
  },
  {
    id: 3,
    name: 'Minimalist Watch',
    price: 80,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
  },
];

// Reducer function handling all 5 actions
function cartReducer(state, action) {
  switch (action.type) {
    // 1. Add item to cart
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

    // 2. Increase item quantity (++)
    case 'INCREASE':
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    // 3. Decrease item quantity (--)
    case 'DECREASE':
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    // 4. Remove item
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload);

    // 5. Clean cart
    case 'CLEAR':
      return [];

    default:
      return state;
  }
}

export default function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        {/* Header */}
        <h1 style={styles.title}>shopEasy Store</h1>

        {/* Products Section */}
        <h2 style={styles.sectionHeading}>Available Products</h2>
        <div style={styles.productList}>
          {products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img
                src={product.img}
                alt={product.name}
                style={styles.productImg}
              />
              <div style={{ flexGrow: 1 }}>
                <div style={styles.productName}>{product.name}</div>
                <div style={styles.productPrice}>${product.price}.00</div>
              </div>
              <button
                style={styles.btnBlue}
                onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <h2 style={styles.sectionHeading}>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p style={styles.emptyText}>Your cart is currently empty.</p>
        ) : (
          <div style={styles.cartContainer}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.img} alt={item.name} style={styles.cartItemImg} />
                  <div>
                    <strong style={{ color: '#1e293b' }}>{item.name}</strong>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      ${item.price} each
                    </div>
                  </div>
                </div>

                <div style={styles.qtyControls}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => dispatch({ type: 'DECREASE', payload: item.id })}
                  >
                    -
                  </button>
                  <span style={styles.qtyCount}>{item.quantity}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => dispatch({ type: 'INCREASE', payload: item.id })}
                  >
                    +
                  </button>
                  <button
                    style={styles.removeBtn}
                    onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Cart Footer */}
            <div style={styles.cartFooter}>
              <h3 style={styles.totalText}>Total: ${total.toFixed(2)}</h3>
              <button
                style={styles.btnDanger}
                onClick={() => dispatch({ type: 'CLEAR' })}
              >
                Clean Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Blue & Beige Theme Styles
const styles = {
  pageBackground: {
    backgroundColor: '#f5f0eb', // Warm beige background
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    maxWidth: '650px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  },
  title: {
    color: '#1e3a8a', // Deep Blue
    margin: '0 0 24px 0',
    fontSize: '1.8rem',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '12px',
  },
  sectionHeading: {
    color: '#334155',
    fontSize: '1.2rem',
    marginBottom: '14px',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px',
  },
  productCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#FAF7F2', // Soft cream/beige
    border: '1px solid #e7e0d6',
  },
  productImg: {
    width: '60px',
    height: '60px',
    borderRadius: '6px',
    objectFit: 'cover',
  },
  productName: {
    fontWeight: 'bold',
    color: '#1e293b',
  },
  productPrice: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  btnBlue: {
    backgroundColor: '#2563eb', // Accent Blue
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  emptyText: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  cartContainer: {
    backgroundColor: '#FAF7F2',
    border: '1px solid #e7e0d6',
    borderRadius: '8px',
    padding: '16px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '10px',
    border: '1px solid #f1f5f9',
  },
  cartItemImg: {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  qtyBtn: {
    backgroundColor: '#e2e8f0',
    border: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#334155',
  },
  qtyCount: {
    minWidth: '20px',
    textAlign: 'center',
    fontWeight: '600',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '8px',
    fontSize: '0.85rem',
  },
  cartFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid #e2e8f0',
  },
  totalText: {
    margin: 0,
    color: '#1e3a8a',
  },
  btnDanger: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
};