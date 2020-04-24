import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";
import Workspace from "../models/Workspace";
import User from "../models/User";

async function onUpdateWorkspace(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { assistantName, gender, colorScheme, workspaceId } = req.body;
  const workspaceFields = {
    user: req.userId,
    assistantName,
    gender,
    colorScheme,
  };

  try {
    let user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "User not registered",
          },
        ],
      });
    }

    let workspace = await Workspace.findOne({ _id: workspaceId });
    if (workspace) {
      // Update
      workspace = await Workspace.findOneAndUpdate(
        { user: req.userId },
        { $set: workspaceFields },
        { new: true }
      );

      return res.json(workspace);
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "Workspace not found",
          },
        ],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

export default onUpdateWorkspace;
