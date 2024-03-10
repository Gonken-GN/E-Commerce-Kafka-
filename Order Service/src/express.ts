import express, { Request, Response} from "express";
import cors from 'cors'
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";

const app = express();
app.use(cors())
app.use(express.json());

app.use('/order', orderRoutes);
app.use('/cart', cartRoutes);

export default app;
