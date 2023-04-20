import * as React from 'react';
import Axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import "./home.css";
import config from "../public/config.json";

const User = () => {
  const { user, setUser } = useContext(UserContext);
 
  useEffect(()=>{
    Axios({
      method: "POST",
      withCredentials: false,
      url: config.BACKEND_URI + '/auth/user',
      data: {
        
      },
    }).then((res) => {
      setUser(res.data);
      console.log(config);
    });
  }, []);

  
  return (

    <div className=''>
      
      <h1>Welcome to HealthBOT</h1>


    </div>
  );
};

export default User;