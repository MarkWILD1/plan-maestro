const { default: mongoose } = require('mongoose')

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.DB_CONNECTION)
        console.log("Database conected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect; 