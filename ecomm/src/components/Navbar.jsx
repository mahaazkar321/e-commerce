import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';
import { FaSearch, FaRegHeart, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { useWishlist } from '../context/WishlistProvider';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { clearCart } = useCart();
    const { clearWishlist } = useWishlist(); 

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
        clearCart();       // clears local cart
        clearWishlist();   // clears local wishlist
        navigate('/log-in');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm(''); // Optional: Clear search term after submission
            setIsMobileMenuOpen(false); // Close mobile menu after search
        }
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
                    <form onSubmit={handleSearch}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search for products" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button 
                                    type="submit" 
                                    className="input-group-text bg-transparent text-primary"
                                    style={{ border: 'none', cursor: 'pointer' }}
                                >
                                    <FaSearch />
                                </button>
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