const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
    createAddress,
    updateAddress,
    getAddress
} = require('../controllers/AddressController');

router.post('/',
    createAddress
)

router.put('/',
    authMiddleware,
    updateAddress
)

router.get('/',
    authMiddleware,
    getAddress
)

module.exports = router;