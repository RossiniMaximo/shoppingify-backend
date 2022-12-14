import express from "express";
import itemsRoutes from "./routes/items.routes";
import listsRoutes from "./routes/lists.routes";
import myRoutes from "./routes/me.routes";
import userRoutes from "./routes/user.routes.";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: [
    "https://shoppingify-front-geqczjolf-rossinimaximo.vercel.app",
    "https://shoppingify-front.vercel.app",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use([itemsRoutes, listsRoutes, myRoutes, userRoutes]);

export { app };
