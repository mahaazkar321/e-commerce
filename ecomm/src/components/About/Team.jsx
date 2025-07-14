import React from 'react';
// Import images (adjust these paths to match your actual file structure)
import tomCruise from '../../assets/img/tst.jpg';
import emmaWatson from '../../assets/img/tst1.webp';
import willSmith from '../../assets/img/tst2.jpg';

const Team = () => {
  return (
    <div className="team-section" style={{
      fontFamily: 'sans-serif',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '28px',
        fontWeight: 'bold'
      }}>Our Team</h2>

      {/* Centered Team Members Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '60px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '800px',
          width: '100%'
        }}>
          {/* Team Member 1 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              height: '200px',
              marginBottom: '15px',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <img 
                src={tomCruise} 
                alt="Tom Cruise"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>Tom Cruise</h3>
            <p style={{
              fontSize: '14px',
              color: '#666'
            }}>Founder & Chairman</p>
          </div>

          {/* Team Member 2 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              height: '200px',
              marginBottom: '15px',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <img 
                src={emmaWatson} 
                alt="Emma Watson"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>Emma Watson</h3>
            <p style={{
              fontSize: '14px',
              color: '#666'
            }}>Managing Director</p>
          </div>

          {/* Team Member 3 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              height: '200px',
              marginBottom: '15px',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <img 
                src={willSmith} 
                alt="Will Smith"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '5px'
            }}>Will Smith</h3>
            <p style={{
              fontSize: '14px',
              color: '#666'
            }}>Product Designer</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '40px'
      }}>
        {/* Delivery Service */}
        <div style={{
          textAlign: 'center',
          padding: '15px',
          flex: '1',
          minWidth: '250px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '10px',
            color: '#333'
          }}>🚚</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333'
          }}>FREE AND FAST DELIVERY</h3>
          <p style={{
            fontSize: '14px',
            color: '#666'
          }}>Free delivery for all orders</p>
        </div>

        {/* Customer Service */}
        <div style={{
          textAlign: 'center',
          padding: '15px',
          flex: '1',
          minWidth: '250px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '10px',
            color: '#333'
          }}>📞</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333'
          }}>24/7 CUSTOMER SERVICE</h3>
          <p style={{
            fontSize: '14px',
            color: '#666'
          }}>Always ready to help</p>
        </div>

        {/* Money Back */}
        <div style={{
          textAlign: 'center',
          padding: '15px',
          flex: '1',
          minWidth: '250px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '10px',
            color: '#333'
          }}>💵</div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333'
          }}>MONEY BACK GUARANTEE</h3>
          <p style={{
            fontSize: '14px',
            color: '#666'
          }}>Return within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
