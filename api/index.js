const mongoose = require('mongoose');
const {create_app} =require('./src/utils/server.js');
require('dotenv').config()

const app =create_app();

app.listen(5500, '0.0.0.0', async() =>{
    try {
        // localhost: 
        await mongoose.connect(process.env.MONGODB_URI_LOCAL);
        console.log('[+] Server running on port 5500');
    } catch ({message}) {
        console.log(`[-] ${message}`);
        
    }
});

// module.exports.handler =serveless(app)
