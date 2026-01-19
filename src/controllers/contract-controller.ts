import Contract from "../models/Contract";
import Blueprint from "../models/Blueprint";

const transitions = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
};

// Helper to convert Mongoose doc to plain object with id
const withId = (doc) => doc.toObject({ getters: true, virtuals: true });

export const getContracts = async (_req, res) => {
  const contracts = await Contract.find();
  res.json(contracts.map(withId));
};

export const getContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (!contract) return res.status(404).json({ error: "Contract not found" });

  res.json(withId(contract));
};

export const createFromBlueprint = async (req, res) => {
  const { blueprintId, name } = req.body;
  const bp = await Blueprint.findById(blueprintId);

  if (!bp) return res.status(404).json({ error: "Blueprint not found" });

  const contract = await Contract.create({
    name,
    blueprintId: bp._id,
    blueprintName: bp.name,
    fields: bp.fields.map((f) => ({ ...f.toObject(), value: "" })),
    history: [{ status: "CREATED" }],
    createdDate: new Date(),
  });

  res.status(201).json(withId(contract));
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const contract = await Contract.findById(req.params.id);

  if (!contract) return res.status(404).json({ error: "Contract not found" });

  if (!transitions[contract.status]?.includes(status)) {
    return res.status(400).json({ error: "Invalid status transition" });
  }

  contract.status = status;
  contract.history.push({ status });
  await contract.save();

  res.json(withId(contract));
};

export const updateFields = async (req, res) => {
  const contract = await Contract.findById(req.params.id);

  if (!contract) return res.status(404).json({ error: "Contract not found" });

  if (["LOCKED", "REVOKED"].includes(contract.status)) {
    return res.status(400).json({ error: "Contract is immutable" });
  }

  contract.fields = req.body.fields;
  await contract.save();

  res.json(withId(contract));
};
