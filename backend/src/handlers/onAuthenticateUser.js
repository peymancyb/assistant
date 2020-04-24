import bcrypt from "bcryptjs";
import config from "config";
import { validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User";

async function onAuthenticateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "User does not exists",
          },
        ],
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result == true) {
        const payload = {
          userId: user.id,
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: config.get("jwtExpiration") },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            });
          }
        );
      } else {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Password is incorrect",
            },
          ],
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

export default onAuthenticateUser;
