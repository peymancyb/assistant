import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";
import Workspace from "../models/Workspace";

async function onDeleteWorkspace(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { workspaceId } = req.body;

  try {
    // Remove workspace
    await Workspace.findOneAndRemove({ _id: workspaceId });
    // get all user workspaces
    let userWorkspaces = await Workspace.find({ user: req.userId });
    userWorkspaces = userWorkspaces.map((currentWorkspace) => {
      const { _id, assistantName, gender, colorScheme } = currentWorkspace;
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

export default onDeleteWorkspace;
