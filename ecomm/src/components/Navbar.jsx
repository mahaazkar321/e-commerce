import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { FaSearch, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isAbout = location.pathname === '/about';
    const isContact = location.pathname === '/contact';
    const isSignUp = location.pathname === '/sign-up';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar-container">
            <div className="logo-container">
                <a href="" className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold">Exclusive</h1>
                </a>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Navigation links - will show/hide based on mobile state */}
            <div className={`nav-links-container ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <ul className="nav-links">
                    <li className={`nav-item ${isHome ? 'active' : ''}`}>
                        <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    </li>
                    <li className={`nav-item ${isContact ? 'active' : ''}`}>
                        <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    </li>
                    <li className={`nav-item ${isAbout ? 'active' : ''}`}>
                        <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    </li>
                    <li className={`nav-item ${isSignUp ? 'active' : ''}`}>
                        <Link to="/sign-up" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                    </li>
                </ul>

                <div className="search-container">
                    <form action="">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for products" style={{backgroundColor:'f8f9fa'}}/>
                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-primary">
                                    <FaSearch />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="icon-container">
                    <a href="" className="btn">
                        <FaRegHeart className="text-primary" />
                    </a>
                    <a href="" className="btn">
                        <FaShoppingCart className="text-primary" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;