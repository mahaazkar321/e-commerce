const NewArrival = () => {
  return (
    <div style={{
      fontFamily: "'Arial', sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* Main Heading */}
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#333'
      }}>New Arrival</h1>

      {/* Product Grid - Top Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* PlayStation Card - Large Left Card */}
<div style={{
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  position: 'relative',
  height: '400px',
  display: 'flex',
  flexDirection: 'column'
}}>
  <img 
    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
    alt="PlayStation 5"
    style={{
      width: '100%',
      height: '60%',
      objectFit: 'cover'
    }}
  />
  <div style={{
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}>
    <div>
      <h2 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333'
      }}>PlayStation 5</h2>
      <p style={{
        fontSize: '16px',
        color: '#666',
        marginBottom: '20px'
      }}>Black and White versions of the PS5 coming out on sale.</p>
    </div>
    <button style={{
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      alignSelf: 'flex-start',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#333',
        transform: 'translateY(-2px)'
      }
    }}>Shop Now</button>
  </div>
</div>

        {/* Right Side - Two Small Cards Stacked */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Women's Collections Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            height: '190px'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
              alt="Women's Collections"
              style={{
                width: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              padding: '20px',
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#333'
              }}>Women's Collections</h2>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '15px'
              }}>Featured women collections that give you another vibe.</p>
              <button style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                alignSelf: 'flex-start'
              }}>Shop Now</button>
            </div>
          </div>

          {/* Speakers Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            height: '190px'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
              alt="Wireless Speakers"
              style={{
                width: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              padding: '20px',
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#333'
              }}>Speakers</h2>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '15px'
              }}>Amazon wireless speakers at Shop Now</p>
              <button style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                alignSelf: 'flex-start'
              }}>Shop Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Perfume Card */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        marginBottom: '40px',
        height: '300px'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
          alt="GUCCI Perfume"
          style={{
            width: '40%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          padding: '40px',
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333'
          }}>Perfume</h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '25px',
            fontWeight: 'bold'
          }}>GUCCI INTENSE TOP</p>
          <button style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            alignSelf: 'flex-start'
          }}>Shop Now</button>
        </div>
      </div>

      {/* Services Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        backgroundColor: '#f8f8f8',
        padding: '30px',
        borderRadius: '8px'
      }}>
        {/* Delivery Service */}
        <div style={{
          textAlign: 'center',
          padding: '15px'
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
          padding: '15px'
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
          padding: '15px'
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

export default NewArrival;