const Bootcamp = require('../models/bootcamp');

//create bootcamps
exports.createBootcamp = async (req, res, next) => {
  try {
    const { bcCode, name } = req.body;
    if (!name || !bcCode) {
      throw new Error(404);
    }
    const bootcamp = new Bootcamp({
      bcCode,
      name
    })
    await bootcamp.save();
    res.status(201).json({
      message: "Successfully created"
    })
  } catch (err) {
    next(err);
  }

}

//get all bootcamps
exports.getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    next(bootcamp); //calling middleware for sorting etc
  } catch (err) {
    next(err);
  }
}

//get bootcamp by id
exports.getBootcampById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findOne({ _id: id });
    if (!bootcamp) {
      throw new Error(404);
    }
    res.status(200).json({ bootcamp });
  } catch (err) {
    next(err);
  }
}

//update bootcamp
exports.updateBootcamp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findOne({ _id: id });
    if (!bootcamp || !req.body.name) {
      throw new Error(404);
    }
    await Bootcamp.updateOne({ _id: id }, { $set: req.body });
    res.status(201).json({
      message: "Successfully updated"
    })
  } catch (err) {
    next(err);
  }
}

//delete bootcamp
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findOne({ _id: id });
    if (!bootcamp) {
      throw new Error(404);
    }
    await Bootcamp.deleteOne({ _id: id });
    res.status(201).json({
      message: "Successfully deleted"
    })
  } catch (err) {
    next(err);
  }
}
