const Listing = require("../models/listingModel.js");

module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports.createListing = async (req, res) => {
    try {

        // Parse form data
        const { userId, title, description, price, country, location } = req.body;
        const { path, filename } = req.file;

        
        console.log("user server",res.locals.currentUser);
console.log("user client",userId);
        // Create a new Listing object
        const newListing = new Listing({
            title,
            description,
            price,
            country,
            location,
            owner: userId, 
            image: { url: path, filename }
        });

        // Save the new listing to the database
        await newListing.save();

        // Respond with the created listing
        res.status(201).json(newListing);
    } catch (err) {
        // If there's an error, respond with a 400 status and an error message
        console.error("Error creating listing:", err);
        res.status(400).json({ error: 'Bad Request' });
    }
};



module.exports.update = async (req, res) => {
    try {
        
        const { id, title, description, price, country, location } = req.body;
        const { path, filename } = req.file;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
        if (!listing) {
            return res.status(404).json({ error: "Listing doesn't exist" });
        }
        if (req.file) {
            listing.image = { url:path, filename };
            await listing.save();
        }
        if(req.body){
            listing.title = title;
            listing.description = description;
            listing.price = price;
            listing.country = country;
            listing.location = location;
        }
        res.json(listing);
    } catch (err) {
        res.status(400).json({ error: 'Bad Request' });
    }
};

module.exports.delete = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            return res.status(404).json({ error: "Listing doesn't exist" });
        }
        res.json({ message: "Listing deleted" });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports.show = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
            .populate('owner');
        console.log("in show route");
        console.log(listing);
        if (!listing) {
            return res.status(404).json({ error: "Listing doesn't exist" });
        }

        res.status(200).json({ listing });
    } catch (error) {
        console.error('Error fetching listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.testing = async (req, res) => {
    const { title, description,image, price, country, location } = req.body;
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log({ title, description,image, price, country, location });
    res.status(200);
}