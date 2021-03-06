import { messageOneBlock } from "../messages";
import { UserResponse } from "../models";
import { webClient } from "../app";
import handleBotErrors from "../utils/handleBotErrors";

const startBot = async (channelId: string, userId: string) => {
  try {
    const userExists = await UserResponse.findOne({
      "user.userId": userId,
    });
    if (userExists) {
      await webClient.chat.postMessage({
        text:
          "You already have an ongoing session. Use the `/restart-bot` command to restart your session",
        channel: channelId,
      });
    } else {
      await webClient.chat.postMessage({ ...messageOneBlock, channel: channelId });
    }
  } catch (error) {
    await handleBotErrors(error, webClient.chat.postMessage, channelId);
  }
};

export default startBot;
