import * as movieModel from "../models/movie.model.js";

export const getMovies = async (req, res, next) => {
  try {
    const { genre, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const movies = await movieModel.findAll({
      genre,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({ movies });
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ movie });
  } catch (error) {
    next(error);
  }
};

export const getGenres = async (req, res, next) => {
  try {
    const genres = await movieModel.getGenres();
    res.json({ genres });
  } catch (error) {
    next(error);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.create(req.body);
    res.status(201).json({ movie });
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.update(id, req.body);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ movie });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.remove(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Admin-only route to get all movies (including inactive)
export const getAllMovies = async (req, res, next) => {
  try {
    const { genre, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const movies = await movieModel.findAll({
      genre,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset),
      includeInactive: true,
    });

    res.json({ movies });
  } catch (error) {
    next(error);
  }
};
