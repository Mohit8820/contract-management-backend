import mongoose from "mongoose";

const ContractFieldSchema = new mongoose.Schema({
  type: String,
  label: String,
  position: Object,
  value: mongoose.Schema.Types.Mixed,
});

const StatusHistorySchema = new mongoose.Schema({
  status: String,
  at: { type: Date, default: Date.now },
});

const ContractSchema = new mongoose.Schema({
  name: String,
  blueprintId: mongoose.Schema.Types.ObjectId,
  blueprintName: String,
  fields: [ContractFieldSchema],
  status: {
    type: String,
    enum: ["CREATED", "APPROVED", "SENT", "SIGNED", "LOCKED", "REVOKED"],
    default: "CREATED",
  },
  history: [StatusHistorySchema],
  createdDate: Date,
});

export default mongoose.model("Contract", ContractSchema);
