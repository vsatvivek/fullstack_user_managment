import * as theaterModel from "../models/theater.model.js";

export const getTheaters = async (req, res, next) => {
  try {
    const theaters = await theaterModel.findAll();
    res.json({ theaters });
  } catch (error) {
    next(error);
  }
};

export const getTheaterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const theater = await theaterModel.findById(id);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json({ theater });
  } catch (error) {
    next(error);
  }
};

export const createTheater = async (req, res, next) => {
  try {
    const theater = await theaterModel.create(req.body);
    res.status(201).json({ theater });
  } catch (error) {
    next(error);
  }
};

export const updateTheater = async (req, res, next) => {
  try {
    const { id } = req.params;
    const theater = await theaterModel.update(id, req.body);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json({ theater });
  } catch (error) {
    next(error);
  }
};

export const deleteTheater = async (req, res, next) => {
  try {
    const { id } = req.params;
    const theater = await theaterModel.remove(id);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json({ message: "Theater deleted successfully" });
  } catch (error) {
    next(error);
  }
};
