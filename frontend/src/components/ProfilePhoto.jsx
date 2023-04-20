import { useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { UserContext } from './UserContext';
import Unauthorized from './Unauthorized';
import config from "../public/config.json";

function ProfilePhoto({username, style}) {
  const [photo, setPhoto] = useState(null);
  console.log(username);
  
  useEffect(() => {
    Axios({
              method:"POST",
              withCredentials:false,
              url:config.BACKEND_URI + '/profile-photo/' + username,
              params: {
                
              },
            }).then((res) => {
                setPhoto(res.data);
              });
          }
  , [username]);
  
  
  
  return (

    <div>
      

      {photo && (
        <object style={style} target="_blank"
          data={`data:${photo.contentType};base64,${photo.base64}`}
          type={photo.contentType}
          width="auto"
          height="auto"
        >
          <p>
            Your browser does not support the file format.{" "}
          </p>
        </object>
      )
      }
      
      
    </div>
  );
}

export default ProfilePhoto;