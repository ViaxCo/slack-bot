import { messageTwoBlock, messageThreeBlock, messageFourBlock } from "../messages";
import { Response, User, UserResponse } from "../models";
import { slackEvents, slackInteractions, webClient } from "../app";
import startBot from "./startBot";
import handleBotErrors from "../utils/handleBotErrors";

const botEventHandlers = () => {
  // Bot Mention
  slackEvents.on("app_mention", async event => {
    await startBot(event.channel, event.user);
  });

  // Message One
  slackInteractions.action({ blockId: "message_one" }, async (payload, respond) => {
    const { id, username } = payload.user;
    const question = payload.message.text;
    const answer = payload.actions[0].text.text;
    try {
      // Check if user exists, if not create new user
      const userExists = await UserResponse.findOne({
        "user.userId": id,
      });
      if (userExists) throw new Error();

      const user = new User({ userId: id, username });
      const response = new Response({ question, answer });
      await UserResponse.create({
        user,
        responses: [response],
      });
      await respond({ ...messageTwoBlock });
    } catch (error) {
      await handleBotErrors(error, respond);
    }
  });

  // Message Two
  let selectedTime: string | undefined;
  let selectedDay: string | undefined;
  slackInteractions.action({ actionId: "time-select" }, payload => {
    selectedTime = payload.actions[0].selected_option.text.text;
  });
  slackInteractions.action({ actionId: "day-select" }, payload => {
    selectedDay = payload.actions[0].selected_option.text.text;
  });

  slackInteractions.action({ actionId: "message_two" }, async (payload, respond) => {
    const question = payload.message.text;
    if (!selectedTime || !selectedDay) throw new Error("Please select a day and time");
    const answer = [selectedTime, selectedDay];
    try {
      // Check if answer exists to avoid saving multiple entries to DB
      const answerExists = await UserResponse.findOne({ "responses.answer": answer });
      if (answerExists) throw new Error();

      const response = new Response({ question, answer });
      await UserResponse.findOneAndUpdate(
        { "user.userId": payload.user.id },
        { $push: { responses: response } }
      );
      await respond({ ...messageThreeBlock });
      // Empty answers after responding
      selectedDay = undefined;
      selectedTime = undefined;
    } catch (error) {
      await handleBotErrors(error, respond);
    }
  });

  // Message Three
  let selectedHobbies: any[] | undefined;
  slackInteractions.action({ actionId: "hobbies-select" }, payload => {
    selectedHobbies = payload.actions[0].selected_options;
  });

  slackInteractions.action({ actionId: "message_three" }, async (payload, respond) => {
    if (!selectedHobbies || selectedHobbies.length === 0) throw new Error();

    const question = payload.message.text;
    const answer = selectedHobbies.map((option: any) => option.text.text);
    try {
      // Check if answer exists to avoid saving multiple entries to DB
      const answerExists = await UserResponse.findOne({ "responses.answer": answer });
      if (answerExists) throw new Error();

      const response = new Response({ question, answer });
      await UserResponse.findOneAndUpdate(
        { "user.userId": payload.user.id },
        { $push: { responses: response } }
      );
      await respond({ ...messageFourBlock });
      // Empty answers after responding
      selectedHobbies = undefined;
      // Message Four
      handleMessageFourReply(messageFourBlock.text);
    } catch (error) {
      await handleBotErrors(error, respond);
    }
  });

  const handleMessageFourReply = (question: any) => {
    // Check for the user's reply
    slackEvents.on("message", async (event: any) => {
      try {
        const currentUser = await UserResponse.findOne({
          "user.userId": event.user,
        });
        // Check if the current user is sending the message to avoid infinite loop when the bot sends a message
        if (currentUser) {
          // Check if question exists to avoid saving multiple entries to DB
          const questionExists = await UserResponse.findOne({ "responses.question": question });
          if (questionExists) throw new Error();

          const answer = event.text;
          const response = new Response({ question, answer });
          await UserResponse.findOneAndUpdate(
            { "user.userId": event.user },
            { $push: { responses: response } }
          );
          await webClient.chat.postMessage({
            text: "Thank you",
            channel: event.channel,
          });
          return slackEvents.removeAllListeners("message");
        }
      } catch (error) {
        await handleBotErrors(error, webClient.chat.postMessage, event.channel);
      }
    });
  };
};
export default botEventHandlers;
