import { Request, Response } from "express";
import { UserResponse } from "../models";

/**
 * Return all the user responses
 * @route `GET /api/user-responses`
 * @param req
 * @param res
 */
export const getAllUserResponses = async (req: Request, res: Response) => {
  try {
    const userResponses = await UserResponse.find({}, { _id: 0, __v: 0, "responses._id": 0 });
    const filteredUserResponses = userResponses.map(userResponse => ({
      username: userResponse.user.username,
      responses: userResponse.responses,
    }));
    return res.status(200).json(filteredUserResponses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }
};

/**
 * Return a user's responses
 * @route `GET /api/user-responses/:username`
 * @param req
 * @param res
 */
export const getUserResponses = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const userResponses = await UserResponse.findOne(
      { "user.username": username },
      { _id: 0, __v: 0, "responses._id": 0 }
    );
    if (!userResponses) return res.status(404).json("No user found");
    return res.status(200).json({
      username,
      responses: userResponses.responses,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }
};
