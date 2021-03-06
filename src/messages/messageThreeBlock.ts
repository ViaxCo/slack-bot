const text = "What are your favorite hobbies?";
const hobbies = ["Football", "Music", "Sleep", "Movies", "Basketball"];

const messageThreeBlock = {
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
      type: "section",
      text: {
        type: "mrkdwn",
        text: "You can select multiple hobbies.",
      },
      accessory: {
        type: "checkboxes",
        options: [
          ...hobbies.map(hobby => ({
            text: {
              type: "plain_text",
              text: hobby,
            },
            value: hobby.toLowerCase(),
          })),
        ],
        action_id: "hobbies-select",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Confirm",
          },
          action_id: "message_three",
        },
      ],
    },
  ],
};
export default messageThreeBlock;
