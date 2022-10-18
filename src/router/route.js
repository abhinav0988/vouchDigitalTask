let express = require("express")
let router = express.Router()
let ContactController = require("../controller/contactController")

router.post("/detail", ContactController.ContactCreate)
router.post("/login", ContactController.ceateLogin)
router.get("/fetchContact", ContactController.contactdetailfetch)
router.put("/updateContact", ContactController.updatecontact)
router.delete("/deleteContact", ContactController.deletecontact)

module.exports = router