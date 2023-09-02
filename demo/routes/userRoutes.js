const express=require("express")
const { registerUser, loginUser, currentUser, dashboard } = require("../controller/usercontroller")
const validateToken = require("../middleware/validateTokenHandler")
const router=express.Router()
router.get("/dashboard", validateToken,dashboard)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/current", validateToken, currentUser)
module.exports=router