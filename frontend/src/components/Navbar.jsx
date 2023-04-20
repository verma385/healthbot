import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { useContext, useEffect} from "react";
import { UserContext } from "./UserContext";
import Axios from "axios";
import axios from "axios";
import "./navbar.css"
import ProfilePhoto from "./ProfilePhoto";
import config from "../public/config.json";

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const profilePhotoStyle = {
      borderRadius: "100%",
      width: "20px",
      height: "20px",
      // marginTop:"10%"
      // backgroundColor: "#B90136"
    }
    // useEffect(()=>{
    //   Axios({
    //     method: "POST",
    //     withCredentials: false,
    //     url: config.BACKEND_URI + '/auth/user',
    //     data: {
          
    //     },
    //   }).then((res) => {
    //     setUser({...res.data});
    //     console.log("nav ", res.data);
    //   });
    // }, []);
    useEffect(() => {
      // Make a GET request to the user API endpoint on your Node.js backend
      axios.get(config.BACKEND_URI + '/auth/user', { withCredentials: true })
        .then(response => {
          // Handle the successful response and extract the user information
          const user = response.data;
          setUser(user);
          console.log("dat ", response.data);
        })
        .catch(error => {
          // Handle the error response (e.g., if the user is not authenticated)
          console.error(error);
        });
    }, []);


  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
  <a className="navbar-brand" href="/">HealthBOT</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
    

      {
        (!user.username || user.username=="") &&
        <>
        <li className="nav-item">
        <a className="nav-link" href="/login">Login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/signup">Signup</a>
      </li>
        </>
      }

      {
        user.username && user.username!="" && user.role==="user" &&
        <>
        <li className="nav-item">
        <a className="nav-link" href="/records">Records</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/users/my-appointments">Appointments</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/doctors">Find a Doctor</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account
         
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/user">View Profile</a>
          <a className="dropdown-item" href="/user/edit-profile">Edit account details</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/logout">Logout</a>
        </div>
      </li> 

        </>
      }

      {
        user.username && user.username!="" && user.role==="doctor" &&
        <>
        <li className="nav-item">
        <a className="nav-link" href="/doctors/user-records">Patients Records</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/doctors/my-appointments">Appointments</a>
      </li>
      
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/user">View Profile</a>
          <a className="dropdown-item" href="/user/edit-profile">Edit account details</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/logout">Logout</a>
        </div>
      </li> 

        </>
      }
     
    </ul>
   
  </div>
</nav>
    </div>
  );
}

export default Navbar;