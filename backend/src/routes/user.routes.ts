import { Router } from "express";
import { check } from "express-validator";
import { authenticate, authorize } from "../middleware/auth";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

// All routes are protected and admin only
router.use(authenticate, authorize(["admin"]));

router.get("/", getUsers);

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
    check("role", "Role is required").not().isEmpty(),
  ],
  createUser
);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
