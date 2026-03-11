import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();


const PORT = process.env.PORT || 6000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/anglican-admission-system';


const startServer = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();