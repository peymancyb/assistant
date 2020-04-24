import bcrypt from "bcryptjs";
import config from "config";
import { validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User";

async function onCreateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Build user object
    const userFields = {
      email,
      password: hashed,
      firstName,
      lastName,
    };

    user = new User(userFields);
    await user.save();

    const payload = {
      userId: user.id,
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: config.get("jwtExpiration") },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

export default onCreateUser;
