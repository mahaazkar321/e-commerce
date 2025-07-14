import React from 'react';
import '../../assets/css/DetailsProduct.css';
import mainHavit from '../../assets/img/havit1.png';
import havit2 from '../../assets/img/havit2.png'
import havit3 from '../../assets/img/havit3.png'
import havit4 from '../../assets/img/havit4.png'
import havit5 from '../../assets/img/havit5.png'

const Details = () => {
    const Thumbnails = [
    {
        id: 1,
        img: havit2,
        alt: 'Havit 2',
    },
    {
        id: 2,
        img: havit3,
        alt: 'Havit 3',
    },
    {
        id: 3,
        img: havit4,
        alt: 'Havit 4',
    },
    {
        id: 4,
        img: havit5,
        alt: 'Havit 5',
    },
];

    return (
        <div className="product-container">
            {/* Left: Images */}
            <div className="product-images">
                <div className="thumbnail-list">
                    {Thumbnails.map((thumb) => (
                        <img
                            key={thumb.id}
                            src={thumb.img}
                            alt={thumb.alt}
                            className="thumbnail"
                        />
                    ))}



                </div>
                <div className="main-image">
                    <img src={mainHavit} alt="main-product" />
                </div>
            </div>

            {/* Right: Details */}
            <div className="product-details">
                <h2 className="product-title">Havic HV G-92 Gamepad</h2>
                <div className="product-rating">
                    <span className="stars">★★★★☆</span>
                    <span className="reviews">(150 Reviews)</span>
                    <span className="in-stock">In Stock</span>
                </div>

                <div className="price">$192.00</div>

                <p className="description">
                    PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.
                </p>

                <div className="colors">
                    <span>Colours:</span>
                    <div className="color-options">
                        <span className="color red" />
                        <span className="color gray" />
                    </div>
                </div>

                <div className="sizes">
                    <span>Size:</span>
                    <div className="size-options">
                        {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
                            <button key={i} className={`size-btn ${size === 'M' ? 'selected' : ''}`}>{size}</button>
                        ))}
                    </div>
                </div>

                <div className="quantity-row">
                    <input type="number" defaultValue={2} min={1} />
                    <button className="buy-btn">Buy Now</button>
                    <button className="wishlist-btn">♡</button>
                </div>

                <div className="delivery-info">
                    <div className="delivery-row">
                        <div className="icon">🚚</div>
                        <div>
                            <div className="title">Free Delivery</div>
                            <a href="#">Enter your postal code for Delivery Availability</a>
                        </div>
                    </div>
                    <div className="delivery-row">
                        <div className="icon">↩️</div>
                        <div>
                            <div className="title">Return Delivery</div>
                            <span>Free 30 Days Delivery Returns. <a href="#">Details</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
