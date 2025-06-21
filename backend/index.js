import { app } from "./app.js";
import "dotenv/config";
import connectDB from "./src/db/index.js";

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection Failed", err);
  });
