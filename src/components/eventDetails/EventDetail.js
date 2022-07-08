import React from "react";
import Home from 'containers/home/Home';

import { useSelector } from "react-redux";


function EventDetail(){
    
    const event = useSelector((state) => state.eventReducer);

    

   return(
       <div>
          <Home event={event} table='eventDetail' />          
        </div>
    )
}

export default EventDetail
