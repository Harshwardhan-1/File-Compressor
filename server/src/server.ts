import app from "./app";
import { PORT } from "./configs/env.config";
import { connectDb } from './Database/connectDb';
app.listen(PORT, async() => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDb();
});  