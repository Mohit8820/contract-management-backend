import Blueprint from "../models/Blueprint";

// Helper to convert Mongoose doc to plain object with id
const withId = (doc) => doc.toObject({ getters: true, virtuals: true });

export const getBlueprints = async (_req, res) => {
  const blueprints = await Blueprint.find();
  res.json(blueprints.map(withId));
};

export const createBlueprint = async (req, res) => {
  const blueprint = await Blueprint.create(req.body);
  res.status(201).json(withId(blueprint));
};

export const updateBlueprint = async (req, res) => {
  const bp = await Blueprint.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!bp) return res.status(404).json({ error: "Blueprint not found" });

  res.json(withId(bp));
};

export const deleteBlueprint = async (req, res) => {
  const bp = await Blueprint.findByIdAndDelete(req.params.id);
  if (!bp) return res.status(404).json({ error: "Blueprint not found" });

  res.sendStatus(204);
};
