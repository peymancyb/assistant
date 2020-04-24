import { Router } from "express";
import { check } from "express-validator";
import onCreateUser from "../../handlers/onCreateUser";
import onAuthenticateUser from "../../handlers/onAuthenticateUser";
import onDeleteUser from "../../handlers/onDeleteUser";
import auth from "../../middleware/auth";

const router = Router();

// @route   POST api/user/create
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/create",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "firstName",
      "Please enter a firstName with 3 or more characters"
    ).isLength({ min: 3 }),
    check(
      "lastName",
      "Please enter a lastName with 3 or more characters"
    ).isLength({ min: 3 }),
  ],
  onCreateUser
);

// @route   POST api/user/auth
// @desc    Authenticate user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/auth",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  onAuthenticateUser
);

// @route   POST api/user/delete
// @desc    Delete user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/delete",
  [
    auth,
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  onDeleteUser
);

export default router;
