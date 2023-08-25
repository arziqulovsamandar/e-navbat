const { Router } = require("express");
const {
  addClient,
  getClient,
  updateClient,
  getClientById,
} = require("../controllers/client.controller");

const router = Router();

router.post("/add", addClient);
router.get("/", getClient);
router.put("/:id", updateClient);
router.get("/:id", getClientById);

module.exports = router;
