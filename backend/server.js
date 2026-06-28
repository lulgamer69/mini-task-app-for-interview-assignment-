import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

console.log("CLIENT_URL =", process.env.CLIENT_URL);
const startServer = async () => {
  try {
    await connectDB();

   const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

