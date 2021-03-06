const text = "What are the first 3 digits on the number scale?";

const messageFourBlock = {
  text,
  blocks: [
    {
      type: "section",
      block_id: "message_four",
      text: {
        type: "mrkdwn",
        text,
      },
    },
  ],
};

export default messageFourBlock;
