import ourStory from '../../assets/img/OurStory.png'
import '../../assets/css/OurStory.css'
import { FaStore, FaDollarSign, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const OurStory = () => {
  return (
    <>
  <div className="row align-items-center" style={{marginTop:'50px'}}>
    <div className="col-lg-6 mb-4 mb-lg-0">
      <h1 className="mb-3" style={{marginLeft:'15px'}}>Our Story</h1>
      <p style={{ color: 'black', fontSize: '14px', textAlign: 'justify', marginLeft:'15px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum assumenda commodi neque. 
        Iste voluptatibus architecto officiis dicta, nihil cupiditate quisquam rem? Odio illum 
        itaque magni repudiandae unde harum labore cum! Lorem ipsum dolor sit amet consectetur 
        adipisicing elit. Itaque quia voluptatibus nobis sequi reprehenderit laudantium nemo 
        totam veritatis beatae, aperiam nihil error, doloremque architecto adipisci iste atque 
        quidem temporibus sint.
        <br /><br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ducimus corrupti 
        temporibus tempore itaque inventore harum ea eos, consectetur sapiente asperiores! 
        Accusantium soluta ipsam modi fugiat sit in aliquid et.
      </p>
    </div>
    <div className="col-lg-6">
      <img 
        src={ourStory} 
        alt="Our Story" 
        style={{ height: '400px', width: '600px', objectFit: 'cover' }} 
      />
    </div>
  </div>
  <div className="stats-container">
      <div className="stat-card">
        <div className="icon-box">
          <FaStore />
        </div>
        <h3>10.5k</h3>
        <p>Sellers active our site</p>
      </div>

      <div className="stat-card active">
        <div className="icon-box white-bg">
          <FaDollarSign />
        </div>
        <h3>33k</h3>
        <p>Monthly Product Sale</p>
      </div>

      <div className="stat-card">
        <div className="icon-box">
          <FaUser />
        </div>
        <h3>45.5k</h3>
        <p>Customer active in our site</p>
      </div>

      <div className="stat-card">
        <div className="icon-box">
          <FaMoneyBillWave />
        </div>
        <h3>25k</h3>
        <p>Annual gross sale in our site</p>
      </div>
    </div>
</>

  )
}

export default OurStory
