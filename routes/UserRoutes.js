const router = require("express").Router();
import {
  SearchUsers,
  FindUser,
  AddFriend,
} from "../controllers/UserController.js";

router.get("/", SearchUsers);
router.get("/:userid", FindUser);
router.post("/addUser", AddFriend);

module.exports = router;
