import * as express from "express";
import itemsRoutes from "./routes/items.routes";
import listsRoutes from "./routes/lists.routes";
import myRoutes from "./routes/me.routes";
import userRoutes from "./routes/user.routes.";
import * as cors from "cors";
import path = require("path");
const app = express();
const corsOptions = {
  origin: "https://shoppingify-front.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use([itemsRoutes, listsRoutes, myRoutes, userRoutes]);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "../dist/index.html")));
});
export { app };
