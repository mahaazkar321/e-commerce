import '../../assets/css/Sidebar.css'
import slider1 from '../../assets/img/slider-1.webp'
import slider2 from '../../assets/img/slider-2.jpg'

const Sidebar = () => {
  return (
    <div>
      {/* Navbar Start */}
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block border border-top-0 border-bottom-0">
            <br/><br/>
            <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 " id="navbar-vertical">
              <div className="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link" data-toggle="dropdown">Woman's Fashion <i className="fa fa-angle-down float-right mt-1"></i></a>
                  <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <a href="" className="dropdown-item">Men's Dresses</a>
                    <a href="" className="dropdown-item">Women's Dresses</a>
                    <a href="" className="dropdown-item">Baby's Dresses</a>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link" data-toggle="dropdown">Men's Fashion <i className="fa fa-angle-down float-right mt-1"></i></a>
                  <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <a href="" className="dropdown-item">Men's Dresses</a>
                    <a href="" className="dropdown-item">Women's Dresses</a>
                    <a href="" className="dropdown-item">Baby's Dresses</a>
                  </div>
                </div>
                <a href="" className="nav-item nav-link">Electronics</a>
                <a href="" className="nav-item nav-link">Home & Lifestyle</a>
                <a href="" className="nav-item nav-link">Medicine</a>
                <a href="" className="nav-item nav-link">Sports & Outdoor</a>
                <a href="" className="nav-item nav-link">Baby's & Toys</a>
                <a href="" className="nav-item nav-link">Groceries & Pets</a>
                <a href="" className="nav-item nav-link">Health & Beauty</a>
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
            <br/><br/>
            <div id="header-carousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                <li data-target="#header-carousel" data-slide-to="1"></li>
              </ol>
              <div className="carousel-inner">
                
                <div className="carousel-item active" style={{height: "410px", backgroundColor: "#000"}}>
                  <img className="img-fluid h-100 w-100 object-fit-cover" src={slider2} alt="Promotion" />
                  <div className="carousel-caption d-flex flex-column align-items-start justify-content-center" style={{left: "10%", right: "auto", bottom: "auto", top: "50%", transform: "translateY(-50%)"}}>
                    <div className="text-left" style={{maxWidth: "500px"}}>
                      <h2 className="text-white font-weight-bold mb-3" style={{fontSize: "2rem"}}>New Collection</h2>
                      <h3 className="text-white font-weight-bold mb-4" style={{fontSize: "1.5rem"}}>Up to 10% off Voucher</h3>
                      <a href="" className="btn btn-light py-2 px-4 d-inline-flex align-items-center" style={{fontWeight: "600"}}>
                        Shop Now <i className="fa fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" style={{height: "410px", backgroundColor: "#000"}}>
                  <img className="img-fluid h-100 w-100 object-fit-cover" src={slider2} alt="Promotion" />
                  <div className="carousel-caption d-flex flex-column align-items-start justify-content-center" style={{left: "10%", right: "auto", bottom: "auto", top: "50%", transform: "translateY(-50%)"}}>
                    <div className="text-left" style={{maxWidth: "500px"}}>
                      <h2 className="text-white font-weight-bold mb-3" style={{fontSize: "2rem"}}>New Collection</h2>
                      <h3 className="text-white font-weight-bold mb-4" style={{fontSize: "1.5rem"}}>Up to 10% off Voucher</h3>
                      <a href="" className="btn btn-light py-2 px-4 d-inline-flex align-items-center" style={{fontWeight: "600"}}>
                        Shop Now <i className="fa fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" style={{height: "410px", backgroundColor: "#000"}}>
                  <img className="img-fluid h-100 w-100 object-fit-cover" src={slider2} alt="Promotion" />
                  <div className="carousel-caption d-flex flex-column align-items-start justify-content-center" style={{left: "10%", right: "auto", bottom: "auto", top: "50%", transform: "translateY(-50%)"}}>
                    <div className="text-left" style={{maxWidth: "500px"}}>
                      <h2 className="text-white font-weight-bold mb-3" style={{fontSize: "2rem"}}>New Collection</h2>
                      <h3 className="text-white font-weight-bold mb-4" style={{fontSize: "1.5rem"}}>Up to 10% off Voucher</h3>
                      <a href="" className="btn btn-light py-2 px-4 d-inline-flex align-items-center" style={{fontWeight: "600"}}>
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