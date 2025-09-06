import * as screenModel from "../models/screen.model.js";

export const getScreensByTheater = async (req, res, next) => {
  try {
    const { theaterId } = req.params;
    const screens = await screenModel.findByTheaterId(theaterId);
    res.json({ screens });
  } catch (error) {
    next(error);
  }
};

export const getScreenById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const screen = await screenModel.findById(id);

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    res.json({ screen });
  } catch (error) {
    next(error);
  }
};

export const createScreen = async (req, res, next) => {
  try {
    const screen = await screenModel.create(req.body);
    res.status(201).json({ screen });
  } catch (error) {
    next(error);
  }
};

export const updateScreen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const screen = await screenModel.update(id, req.body);

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    res.json({ screen });
  } catch (error) {
    next(error);
  }
};

export const deleteScreen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const screen = await screenModel.remove(id);

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    res.json({ message: "Screen deleted successfully" });
  } catch (error) {
    next(error);
  }
};
