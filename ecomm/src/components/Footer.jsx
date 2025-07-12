const Footer = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#f8f8f8',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    }}>
      {/* Top section with features */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '40px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '40px',
      }}>
        
      </div>

      {/* Main footer content */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '40px',
        padding: '0 20px',
      }}>
        {/* Subscribe section */}
        <div style={{ minWidth: '250px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Exclusive Subscribe</h3>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>Get IDK off your first order</p>
          <div style={{ display: 'flex', marginBottom: '30px' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px 0 0 4px',
                flex: 1,
                fontSize: '14px',
              }}
            />
            <button style={{
              padding: '10px 15px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
            }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Support & Account section */}
        <div style={{ minWidth: '200px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Support Account</h3>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>I'll Enjoy sororin, Dholta, DH 1815, Bangladeshi.</p>
          <p style={{ fontSize: '14px', marginBottom: '5px' }}>exclusive@gmail.com</p>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>+88015-88888-9988</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>My Account</li>
            <li style={{ marginBottom: '8px' }}>Login / Register</li>
            <li style={{ marginBottom: '8px' }}>Cart</li>
            <li style={{ marginBottom: '8px' }}>Wishlist</li>
            <li style={{ marginBottom: '8px' }}>Shop</li>
          </ul>
        </div>

        {/* Quick Links section */}
        <div style={{ minWidth: '150px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Quick Link</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>Privacy Policy</li>
            <li style={{ marginBottom: '8px' }}>Terms of Use</li>
            <li style={{ marginBottom: '8px' }}>FAQ</li>
            <li style={{ marginBottom: '8px' }}>Contact</li>
          </ul>
        </div>

        {/* Download App section */}
        <div style={{ minWidth: '200px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Download App</h3>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>Save 51 with App Here More Only</p>
          {/* App store buttons would go here */}
        </div>
      </div>

      {/* Bottom section - layout/share info */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center',
      }}>
        <p>© 2023 Commerce Website. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;