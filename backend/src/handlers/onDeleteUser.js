import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import User from "../models/User";
import Workspace from "../models/Workspace";

async function onDeleteUser(req, res) {
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
        Workspace.deleteMany({ user: req.userId })
          .then(() => {
            user.remove();
            res.json({
              removed: true,
            });
          })
          .catch((error) => {
            console.log("error", error);
          });
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

export default onDeleteUser;
