const { Router } = require("express");

const {
    newOTP,
    verifyOTP,
    deleteOTP,
    getOTP,
    getOTPById,
}=require("../controllers/otp.controller")
const otpPolice = require("../middleware/otpRolesPolice");


const router = Router();

router.post("/newotp", newOTP);
router.post("/verify", verifyOTP);
router.delete("/:id",otpPolice, deleteOTP);
router.get("/id/:id", getOTPById);
router.get("/",getOTP);

module.exports = router;
