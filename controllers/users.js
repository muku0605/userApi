const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  //jobs accociated with user
  const allUsers = await User.find();
  res.status(StatusCodes.OK).json({ allUsers, count: allUsers.length });
};

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError(`No job with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const updateUser = async (req, res) => {
  const {
    body: { status },
    params: { id: userId },
  } = req;

  if (status === "") {
    throw new BadRequestError("status can not be empty");
  }
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError(`Job id ${userId} is not found`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await User.findByIdAndRemove({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No job found with id ${userId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
