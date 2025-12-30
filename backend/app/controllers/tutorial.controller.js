const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.title.trim()) {
    return res.status(400).send({ message: "Title can not be empty!" });
  }

  try {
    // Create a Tutorial
    const tutorial = new Tutorial({
      title: req.body.title.trim(),
      description: req.body.description?.trim(),
      published: req.body.published || false
    });

    // Save Tutorial in the database
    const data = await tutorial.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Tutorial."
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  try {
    const [data, total] = await Promise.all([
      Tutorial.find(condition).lean().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Tutorial.countDocuments(condition)
    ]);
    
    res.send({
      tutorials: data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findById(id);
    if (!data) {
      return res.status(404).send({ message: "Not found Tutorial with id " + id });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Tutorial with id=" + id });
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    }
    res.send({ message: "Tutorial was updated successfully.", data });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndRemove(id);
    if (!data) {
      return res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    }
    res.send({
      message: "Tutorial was deleted successfully!"
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with id=" + id
    });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Tutorial.deleteMany({});
    res.send({
      message: `${data.deletedCount} Tutorials were deleted successfully!`
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all tutorials."
    });
  }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.find({ published: true }).lean().sort({ createdAt: -1 });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  }
};
