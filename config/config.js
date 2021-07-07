require('dotenv').config();//instatiate environment variables

let CONFIG = {};

CONFIG.APP = process.env.APP || "Development";

CONFIG.PORT = process.env.PORT || 3000

CONFIG.MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/Ecommerce_Database"

module.exports = CONFIG;