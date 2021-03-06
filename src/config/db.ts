import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("No uri found");
  }
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
      `CONNECTED to ${conn.connection.db.databaseName} on: ${conn.connection.host}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
