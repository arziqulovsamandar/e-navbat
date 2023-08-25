const { Router } = require("express");


const clientRouter=require("./client.routes");
const otpRoute=require("./otp.routes")

const router = Router();

router.use("/client",clientRouter)
router.use("/otp",otpRoute)

module.exports = router;
