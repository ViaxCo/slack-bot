import startBot from "./startBot";
import { UserResponse } from "../models";
import { webClient } from "../app";
import handleBotErrors from "../utils/handleBotErrors";

const restartBot = async (channelId: string, userId: string) => {
  try {
    const userExists = await UserResponse.findOne({
      "user.userId": userId,
    });
    if (userExists) {
      await UserResponse.deleteOne({ "user.userId": userId });
      await startBot(channelId, userId);
    } else {
      await webClient.chat.postMessage({
        text: "No current session. Use `/start-bot` command or tag `@bot` to start a session",
        channel: channelId,
      });
    }
  } catch (error) {
    await handleBotErrors(error, webClient.chat.postMessage, channelId);
  }
};

export default restartBot;
