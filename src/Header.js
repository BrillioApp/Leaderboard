import logo from './logo-dashboard.jpg';
import './Header.css';
const Header =()=>{
    return(<div>
  <div className="center-div">
        <img
          src={logo}
          height={250}
          width={400}
          alt=""
          className="logo-img"
        />
    </div>
  
    </div>
    )
}

export default Header;