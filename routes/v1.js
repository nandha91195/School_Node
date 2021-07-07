
const express = require('express');
const router = express.Router();


//Ecommerce
router.get('/', (req, res) => {
    res.status(200).json({message:'server is ready to serve you'});
})


module.exports = router