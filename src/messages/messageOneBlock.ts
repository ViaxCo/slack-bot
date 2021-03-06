const text = "Welcome. How are you doing?";
const reactions = ["Doing Well", "Neutral", "Feeling Lucky"];

const messageOneBlock = {
  text,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text,
      },
    },
    {
      type: "divider",
    },
    {
      type: "actions",
      block_id: "message_one",
      elements: [
        ...reactions.map(reaction => ({
          type: "button",
          text: {
            type: "plain_text",
            text: reaction,
          },
        })),
      ],
    },
  ],
};

export default messageOneBlock;
