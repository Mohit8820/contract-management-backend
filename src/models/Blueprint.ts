import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  type: String,
  label: String,
  position: Object,
});

const BlueprintSchema = new mongoose.Schema({
  name: String,
  fields: [FieldSchema],
});

export default mongoose.model("Blueprint", BlueprintSchema);
