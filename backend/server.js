import express, { response } from 'express';
import { connectDB } from './config/db.js';
import itemRoutes from "./routes/items.route.js"

const PORT = process.env.PORT || 9999;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from your frontend
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    next();
  });
app.use("/api/items",itemRoutes);

app.listen(PORT, ()=> {
    connectDB();
    console.log("Server started at http://localhost:"+PORT)});

