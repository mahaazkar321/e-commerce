import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      color: '#1a1a1a',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
      }}>
        {/* Left Column */}
        <div style={{
          flex: '1 1 300px',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '30px',
          backgroundColor: '#f9f9f9',
        }}>
          <div style={{ marginBottom: '30px' }}>
            <FaPhoneAlt size={24} color="#EF4444" />
            <h3 style={{ margin: '10px 0' }}>Call To Us</h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p style={{ fontWeight: 'bold' }}>Phone: +8801611112222</p>
          </div>

          <hr style={{ borderColor: '#ddd' }} />

          <div style={{ marginTop: '30px' }}>
            <FaEnvelope size={24} color="#EF4444" />
            <h3 style={{ margin: '10px 0' }}>Write To Us</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email: customer@exclusive.com</p>
            <p>Email: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div style={{
          flex: '2 1 600px',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '30px',
          backgroundColor: '#fff',
        }}>
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
            }}>
              <input type="text" placeholder="Your Name *" required style={inputStyle} />
              <input type="email" placeholder="Your Email *" required style={inputStyle} />
              <input type="tel" placeholder="Your Phone *" required style={inputStyle} />
            </div>
            <textarea placeholder="Your Message" rows={6} style={{
              width: '100%',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '14px',
            }}></textarea>
            <button type="submit" style={{
              alignSelf: 'flex-end',
              backgroundColor: '#EF4444',
              color: '#fff',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  flex: '1 1 30%',
  minWidth: '250px',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '14px',
};

export default ContactUs;
