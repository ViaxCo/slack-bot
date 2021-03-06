import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes";

import { createEventAdapter } from "@slack/events-api";
import { createMessageAdapter } from "@slack/interactive-messages";
import { WebClient } from "@slack/web-api";
import botEventHandlers from "./controllers/botEventHandlers";

const token = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
export const webClient = new WebClient(token);

const app = express();

if (!signingSecret) throw new Error("No signing secret found");
if (!token) throw new Error("No bot token found");

export const slackEvents = createEventAdapter(signingSecret);
export const slackInteractions = createMessageAdapter(signingSecret);

// Middlewares
app.use("/slack/events", slackEvents.expressMiddleware());
app.use("/slack/actions", slackInteractions.expressMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bot events and interactions
botEventHandlers();

// Routes
app.use("/", routes);

export default app;
