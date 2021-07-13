const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoute = require("./routes/authRoute");
const roomRoute = require("./routes/roomRoute");
const checkinRoute = require("./routes/checkinRoute");
const checkoutRoute = require("./routes/checkoutRoute");

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/v1/api/auth", authRoute);
app.use("/v1/api/room", roomRoute);
app.use("/v1/api/checkin", checkinRoute);
app.use("/v1/api/checkout", checkoutRoute);

async function connection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(port, () =>
      console.log(`server run at http://localhost:${port}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connection();
