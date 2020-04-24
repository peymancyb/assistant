import { model, Schema } from "mongoose";

const workspaceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assistantName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  colorScheme: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Workspace = model("Workspace", workspaceSchema);

export default Workspace;
