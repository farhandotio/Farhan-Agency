import mongoose from "mongoose";

const keyInsightSchema = new mongoose.Schema(
  {
    insight: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveUrl: { type: String, required: true },
    keyInsights: { type: [keyInsightSchema], default: [] },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

export default projectModel;
