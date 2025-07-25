const Address = require('../models/Address');


exports.createAddress = async (req, res) => {
    try {
        const { user, email, phone, addressLine, city, postalCode, country } = req.body;

        console.log('Received required');
        console.log('Body:', req.body);
        
        // Basic validation
        if (!user || !email || !phone || !addressLine || !city || !postalCode || !country ) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        const newAddress = new Address({
            user,
            email,
            phone,
            addressLine,
            city,
            postalCode,
            country
        });
        await newAddress.save();

        return res.status(201).json({
            message: "Address Added",
            address: newAddress
        })
    } catch (error) {
        console.error("Adding new address failed:", error);
    }
};


exports.updateAddress = async (req, res) => {
    try {
        const { user, email, phone, addressLine, city, postalCode, country } = req.body;
        console.log('Received required');
        console.log('Body:', req.body);

        // Fetch existing address
        const address = await Address.findOne({ user: userId });
        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        // Update address fields
        if (phone) address.phone = phone;
        if (addressLine) address.addressLine = addressLine;
        if (city) address.city = city;
        if (postalCode) address.postalCode = postalCode;
        if (country) address.country = country;

        await address.save();
        return res.status(200).json({
            message: "Address updated!",
            address: address
        });
    } catch (error) {
        console.error("Updating address failed");
        return res.status(500).json({
            message: "Updating address failed"
        });
    }
}

exports.getAddress = async (req, res) => {
    const userId = req.user;
    console.log("userId:", user);
    try {
        const address = await Address.findOne({ user: userId });
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

         return res.status(200).json({
            success: true,
            address 
         })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}