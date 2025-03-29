const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    subtitle:{
        type: String,
    },
    urlimage:{
        type: String,
        required: true
    },
    enterprise:{
        type: String,
    },
    site:{
        type: String,
    },
    placement:{
        type: String,
    }
});

const Anúncio = mongoose.model("Anúncio", adsSchema);

module.exports = Anúncio;
