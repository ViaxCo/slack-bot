# seren-x-slack-bot

This is a simple Slack chat bot created with Node.js, Express and the [Node Slack SDK.](https://github.com/slackapi/node-slack-sdk)

## Bot features

- The bot can be triggered using a slash command: `/start-bot` or `@bot`.
- Saying "Hello @bot" or using the slack command will return a response to the user saying "Welcome. How are you doing?"
- The bot will present a list of buttons in Slack for the user to select: “Doing Well” , “Neutral, “Feeling Lucky”.
- After the user selects response, the bot will pop another question asking “When are you free this week for a walk?” The bot will present two dropdown lists in Slack for the user to select two time slots:
  - (12:00, 12.30, 13:00...up to 18.00) - in 30 minute increments.
  - various days of the week.
- After user selects response, the bot will pop another question asking “What are your favorite hobbies?”. The bot will present checkboxes in Slack for the user to select multiple inputs; “Football”, “Music” “Sleep”, “Movies”, “Basketball”.
- After user selects response, the bot will pop another question asking “What are the first 3 digits on the number scale?”. The bot will allow the user type in free text as a response.
- After user selects response, the bot will say “Thank you”.
- The user's responses are saved in a MongoDB database.
- A user is only allowed to answer questions once in a "session", to answer questions again, the bot has to be triggered using the slash command `/restart-bot`, doing that will delete the user from the database and start the questions afresh.

**Example:**

![Slack bot test](https://user-images.githubusercontent.com/43748536/110233108-26b5db00-7f22-11eb-89ac-478d8fbcf1d1.gif)

The environment variables for this project are:

```
MONGO_URI=
SLACK_SIGNING_SECRET=
SLACK_BOT_TOKEN=
```

## API

An API was designed to fetch user responses from the database using two endpoints; One to fetch all the responses, and the other to fetch individual responses.

Documentation for the API can be found here: [Seren X Slack Bot](https://documenter.getpostman.com/view/13046478/Tz5jfg7E)
