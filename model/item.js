const mongoose = require("mongoose");

const itemsSchema = {
    name: {
        type: String,
        required: true
    }
};

const Item = mongoose.model("Item", itemsSchema);

module.exports = Item;