const cors = require('cors');
const express = require('express');
const { AppointmentRoute, CenterRoute, DontationRoute, NotificationsRoute, UserRoute, RequestDonationRoute } = require('../routes/index.js');

function create_app(){
    
    const app =express();
    app.use(cors({origin: '*'}));
    app.use(express.json({limit: '30mb'}));
    app.use(express.urlencoded({extended: true, limit: '30mb'}));
    
    app.use('/users', UserRoute);
    app.use('/centers', CenterRoute);
    app.use('/donations', DontationRoute);
    app.use('/appointments', AppointmentRoute);
    app.use('/notifications', NotificationsRoute);
    app.use('/donation-requests', RequestDonationRoute);
    return app; 
}


module.exports ={create_app}