import {
 
  faCar,
  faHome,faHotel,faWarehouse,faShoppingCart
} from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";

import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/Notificationcontext";


const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const { countFalseResponses } = useNotification();
  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

 

 
  
  const { dispatch } = useContext( AuthContext);
  const { user } = useContext(AuthContext);
  const handleclick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };
 
 

  return (
    <div className="header">
      
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Rent your car.
            </h1>
            <p className="headerDesc">
            <div class="profile">
    {/* Nom du profil */}
    <p>Nom du Profil</p>
    <div class="icon-slider">
  
<div class="icon-wrapper">
<a href="/rooms" >
  <div class="icon-container">
    <FontAwesomeIcon icon={faCar} className="icon" />
  </div>
  <span className="icon-title">voitures</span>
  </a>
  </div>

  <div class="icon-wrapper">
  <a href="/hotels" >
  <div class="icon-container">
    <FontAwesomeIcon icon={faHome} className="icon" />
  </div>
  <span className="icon-title">sieges</span>
  </a>
  </div>

  <div class="icon-wrapper">
  <a href="/confirmations" >
  <div class="icon-container">
    <FontAwesomeIcon icon={faHotel} className="icon" />
  </div><span className="icon-title">stats</span>
  </a>
  </div>

  <div class="icon-wrapper">
  <a href="/confirmations" >
  <div class="icon-container">
  <FontAwesomeIcon icon={faWarehouse} className="icon" />
  </div><span className="icon-title">garage</span>
  </a>
  </div>

  

</div>
  </div>
  
  <div class="shop">
    {/* Icône du shop */}
    <a href="/confirmations" >
    <FontAwesomeIcon icon={faShoppingCart} />
    {countFalseResponses > 0 &&
     (
       <span style={{backgroundColor:"red", padding:"5px" , color:"white", borderRadius:"5px"}} >
        {countFalseResponses}</span>
       )}
    </a>                
  </div>


 </p>

 {user ? (
  <button onClick={handleclick} className="logoutBtn">Logout</button>
) : (
  <Link to="/login">
    <button className="signInBtn">Sign in / Register</button>
  </Link>
)}
            
 </>
 )}
</div>
    </div>
  );
};

export default Header;
