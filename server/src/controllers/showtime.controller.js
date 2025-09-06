import * as showtimeModel from "../models/showtime.model.js";

export const getShowtimesByMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    const showtimes = await showtimeModel.findByMovieId(movieId, date);
    res.json({ showtimes });
  } catch (error) {
    next(error);
  }
};

export const getShowtimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const showtime = await showtimeModel.findById(id);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json({ showtime });
  } catch (error) {
    next(error);
  }
};

export const getAvailableSeats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const seatData = await showtimeModel.getAvailableSeats(id);

    if (!seatData) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json({
      seatLayout: seatData.seat_layout,
      bookedSeats: seatData.booked_seats,
    });
  } catch (error) {
    next(error);
  }
};

export const createShowtime = async (req, res, next) => {
  try {
    const showtime = await showtimeModel.create(req.body);
    res.status(201).json({ showtime });
  } catch (error) {
    next(error);
  }
};

export const updateShowtime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const showtime = await showtimeModel.update(id, req.body);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json({ showtime });
  } catch (error) {
    next(error);
  }
};

export const deleteShowtime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const showtime = await showtimeModel.remove(id);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json({ message: "Showtime deleted successfully" });
  } catch (error) {
    next(error);
  }
};
