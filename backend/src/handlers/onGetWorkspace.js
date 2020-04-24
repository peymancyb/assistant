import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";
import Workspace from "../models/Workspace";
import User from "../models/User";

async function onGetWorkspace(req, res) {
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

    let workspace = await Workspace.find({ user: req.userId });
    workspace = workspace.map((currentWorkspace) => {
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
    res.json(workspace || []);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}

export default onGetWorkspace;
