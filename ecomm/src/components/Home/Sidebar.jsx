import '../../assets/css/Sidebar.css'
import { Link } from 'react-router-dom';
import slider2 from '../../assets/img/slider-2.jpg'

const Sidebar = () => {
  return (
    <div>
      {/* Navbar Start */}
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block border border-top-0 border-bottom-0">
            <br /><br />
            <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 " id="navbar-vertical">

              <div className="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                 <Link to="/category/woman-fashion" className="nav-item nav-link">Women's Fashion</Link>
                
                

              <div className="navbar-nav w-100 overflow-hidden" style={{ height: "410px" }}>
                <Link to="/category/woman-fashion" className="nav-item nav-link">Women's Fashion</Link>

                <Link to="/category/men-fashion" className="nav-item nav-link">Men Fashion</Link>

                <Link to="/category/appliance-electronics" className="nav-item nav-link">Electronics</Link>


                <Link to="/category/home-and-lifestyle" className="nav-item nav-link">Home & Lifestyle</Link>
                <Link to="/category/syrup-and-medicine" className="nav-item nav-link">Medicine</Link>
                <a href="" className="nav-item nav-link">Sports & Outdoor</a>

                <Link to="/category/health-and-beauty" className="nav-item nav-link">Health and Beauty</Link>

              </div>
            </nav>
          </div>

          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">Exclusive</h1>
              </a>
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
            <br /><br />
            <div id="header-carousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                <li data-target="#header-carousel" data-slide-to="1"></li>
              </ol>
              <div className="carousel-inner">

                <div className="carousel-item active" style={{ height: "410px", backgroundColor: "#000" }}>
                  <img className="img-fluid h-100 w-100 object-fit-cover" src={slider2} alt="Promotion" />
                  <div className="carousel-caption d-flex flex-column align-items-start justify-content-center" style={{ left: "10%", right: "auto", bottom: "auto", top: "50%", transform: "translateY(-50%)" }}>
                    <div className="text-left" style={{ maxWidth: "500px" }}>
                      <h2 className="text-white font-weight-bold mb-3" style={{ fontSize: "2rem" }}>New Collection</h2>
                      <h3 className="text-white font-weight-bold mb-4" style={{ fontSize: "1.5rem" }}>Up to 10% off Voucher</h3>
                      <a href="" className="btn btn-light py-2 px-4 d-inline-flex align-items-center" style={{ fontWeight: "600" }}>
                        Shop Now <i className="fa fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" style={{ height: "410px", backgroundColor: "#000" }}>
                  <img className="img-fluid h-100 w-100 object-fit-cover" src={slider2} alt="Promotion" />
                  <div className="carousel-caption d-flex flex-column align-items-start justify-content-center" style={{ left: "10%", right: "auto", bottom: "auto", top: "50%", transform: "translateY(-50%)" }}>
                    <div className="text-left" style={{ maxWidth: "500px" }}>
                      <h2 className="text-white font-weight-bold mb-3" style={{ fontSize: "2rem" }}>New Collection</h2>
                      <h3 className="text-white font-weight-bold mb-4" style={{ fontSize: "1.5rem" }}>Up to 10% off Voucher</h3>
                      <a href="" className="btn btn-light py-2 px-4 d-inline-flex align-items-center" style={{ fontWeight: "600" }}>
                        Shop Now <i className="fa fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" style={{ height: "410px", backgroundColor: "#000" }}>
                  <img className="img-fluid h-100 w-100 object-fit-cover" src={slider2} alt="Promotion" />
                  <div className="carousel-caption d-flex flex-column align-items-start justify-content-center" style={{ left: "10%", right: "auto", bottom: "auto", top: "50%", transform: "translateY(-50%)" }}>
                    <div className="text-left" style={{ maxWidth: "500px" }}>
                      <h2 className="text-white font-weight-bold mb-3" style={{ fontSize: "2rem" }}>New Collection</h2>
                      <h3 className="text-white font-weight-bold mb-4" style={{ fontSize: "1.5rem" }}>Up to 10% off Voucher</h3>
                      <a href="" className="btn btn-light py-2 px-4 d-inline-flex align-items-center" style={{ fontWeight: "600" }}>
                        Shop Now <i className="fa fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </div>
  )
}

export default Sidebar;