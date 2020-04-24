import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";
import Workspace from "../models/Workspace";
import User from "../models/User";

async function onCreateWorkspace(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const { assistantName, gender, colorScheme } = req.body;
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

    // Create
    const workspace = new Workspace(workspaceFields);
    await workspace.save();

    // get all user workspaces
    let userWorkspaces = await Workspace.find({ user: req.userId });
    userWorkspaces = userWorkspaces.map((currentWorkspace) => {
      const {
        _id,
        assistantName,
        gender,
        colorScheme,
      } = currentWorkspace;
      return {
        workspaceId: _id,
        assistantName,
        gender,
        colorScheme,
      };
    });
    res.json(userWorkspaces || []);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

export default onCreateWorkspace;
