/**
 * Handler for errors that occur in asynchronous actions
 * @param error Error object to handle
 * @param replyFn Function to respond to the user
 * @param channel Optional channel to reply to if needed
 */
const handleBotErrors = async (
  error: any,
  replyFn: (message: any) => Promise<any>,
  channel?: any
) => {
  const text = "Something went wrong. Try again using `/restart-bot`";
  console.error(error.message);
  if (!channel) {
    await replyFn({ text });
  } else {
    await replyFn({ text, channel });
  }
};

export default handleBotErrors;
