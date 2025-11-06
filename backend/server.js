import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
