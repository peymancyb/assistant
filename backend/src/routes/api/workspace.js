import { Router } from "express";
import { check } from "express-validator";
import onCreateWorkspace from "../../handlers/onCreateWorkspace";
import onDeleteWorkspace from "../../handlers/onDeleteWorkspace";
import onGetWorkspace from "../../handlers/onGetWorkspace";
import onUpdateWorkspace from "../../handlers/onUpdateWorkspace";
import auth from "../../middleware/auth";

const router = Router();

// @route   POST api/workspace/create
// @desc    Register workspace given assistantName, gender and colorScheme returns {created:true} upon successful registration
// @access  Public
router.post(
  "/create",
  [
    auth,
    check("assistantName", "Please include assistantName")
      .isString()
      .isLength({ min: 3 }),
    check("gender", "Please include gender").isString().isLength({ min: 3 }),
    check("colorScheme", "Please include colorScheme").isNumeric(),
  ],
  onCreateWorkspace
);

// @route   POST api/workspace/create
// @desc    Register workspace given assistantName, gender and colorScheme returns {created:true} upon successful registration
// @access  Public
router.post(
  "/update",
  [
    auth,
    check("assistantName", "Please include assistantName")
      .isString()
      .isLength({ min: 3 }),
    check("gender", "Please include gender").isString().isLength({ min: 3 }),
    check("colorScheme", "Please include colorScheme").isNumeric(),
    check("workspaceId", "Please include workspace id").isString(),
  ],
  onUpdateWorkspace
);

// @route   POST api/workspace/delete
// @desc    Delete workspace given workspaceId
// @access  Public
router.delete(
  "/delete",
  [auth, check("workspaceId", "Please include workspace id")],
  onDeleteWorkspace
);

// @route   POST api/workspace/
// @desc    Get all user workspaces
// @access  Public
router.get("/", auth, onGetWorkspace);

export default router;
