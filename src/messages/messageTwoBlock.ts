const text = "When are you free this week for a walk?";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const messageTwoBlock = {
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
        text: "Please select an appropriate time.",
      },
      accessory: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select a time",
        },
        options: [
          ...times.map(time => ({
            text: {
              type: "plain_text",
              text: time,
            },
            value: time,
          })),
        ],
        action_id: "time-select",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Please select an appropriate day.",
      },
      accessory: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select an item",
        },
        options: [
          ...days.map(day => ({
            text: {
              type: "plain_text",
              text: day,
            },
            value: day.toLowerCase(),
          })),
        ],
        action_id: "day-select",
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
          action_id: "message_two",
        },
      ],
    },
  ],
};

export default messageTwoBlock;
