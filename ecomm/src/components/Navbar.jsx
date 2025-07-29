import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { FaSearch, FaRegHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in (on mount or when localStorage changes)
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/log-in');
    };

    const isHome = location.pathname === '/';
    const isAbout = location.pathname === '/about';
    const isContact = location.pathname === '/contact';
    const isSignUp = location.pathname === '/sign-up';

    return (
        <div className="navbar-container">
            <div className="logo-container">
                <Link to="/" className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold">Exclusive</h1>
                </Link>
            </div>

            {/* Mobile menu button */}
            <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Navigation links */}
            <div className={`nav-links-container ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <ul className="nav-links">
                    <li className={`nav-item ${isHome ? 'active' : ''}`}>
                        <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Home</Link>
                    </li>
                    <li className={`nav-item ${isContact ? 'active' : ''}`}>
                        <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>Contact</Link>
                    </li>
                    <li className={`nav-item ${isAbout ? 'active' : ''}`}>
                        <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>About</Link>
                    </li>
                    {!isLoggedIn ? (
                        <li className={`nav-item ${isSignUp ? 'active' : ''}`}>
                            <Link to="/sign-up" className="nav-link" onClick={toggleMobileMenu}>Sign Up</Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-danger" onClick={handleLogout}>
                                Log Out
                            </button>
                        </li>
                    )}
                </ul>

                <div className="search-container">
                    <form>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for products" />
                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-primary">
                                    <FaSearch />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="icon-container">
                    <Link to="/wish-list" className="btn">
                        <FaRegHeart className="text-primary" />
                    </Link>
                    <Link to="/cart" className="btn">
                        <FaShoppingCart className="text-primary" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
