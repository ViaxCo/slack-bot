import { Request, Response } from "express";
import startBot from "./startBot";
import restartBot from "./restartBot";

/**
 * Handles slash commands
 * @route `POST /slack/slash`
 * @param req
 * @param res
 */
const handleSlashCommands = async (req: Request, res: Response) => {
  const { command, user_id, channel_id } = req.body;
  try {
    switch (command) {
      case "/start-bot":
        await startBot(channel_id, user_id);
        return res.status(200).send();
      case "/restart-bot":
        await restartBot(channel_id, user_id);
        return res.status(200).send();
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }
};

export default handleSlashCommands;
