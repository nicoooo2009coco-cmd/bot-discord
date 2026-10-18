const { inspect } = require("util");
const { MessageEmbed, WebhookClient } = require("discord.js"),
  chalk = require("chalk"),
  moment = require("moment"),
  config = require("@root/config");

const errorWebhook = process.env.ERROR_LOGS ? new WebhookClient({ url: process.env.ERROR_LOGS }) : undefined;

const sendWebhook = (content, err) => {
  if (!content && !err) return;
  const errString = err?.stack || err;

  const embed = new MessageEmbed().setColor(config.EMBED_COLORS.ERROR).setAuthor({ name: err?.name || "Error" });

  if (errString)
    embed.setDescription(
      "```js\n" + (errString.length > 4096 ? `${errString.substr(0, 4000)}...` : errString) + "\n```"
    );
  if (err?.description) embed.addField("Description", content);
  if (err?.message) embed.addField("Message", err?.message);

  if (errorWebhook) {
    errorWebhook.send({
      username: "Logs",
      embeds: [embed],
    });
  }
};

const sendLogs = (level, content, data) => {
  const timestamp = `${moment().format("yyyy-MM-DD HH:mm:ss:SSS")}`;

  switch (level) {
    case "log":
      console.log(`[${chalk.cyan(timestamp)}] [${chalk.blueBright("info")}] ${content} `);
      break;

    case "success":
      console.log(`[${chalk.cyan(timestamp)}] [${chalk.green(level)}] ${content} `);
      break;

    case "warn":
      console.log(`[${chalk.cyan(timestamp)}] [${chalk.yellow("warn")}] ${content} `);
      break;

    case "error":
      console.log(
        `[${chalk.cyan(timestamp)}] [${chalk.redBright(level)}] ${content} ${
          data ? ": " + inspect(data.message ?? data) : ""
        }`
      );
      if (errorWebhook) sendWebhook(content, data);
      break;

    case "debug":
      break;

    default:
      break;
  }
};

exports.success = (content) => sendLogs("success", content);
exports.warn = (content) => sendLogs("warn", content);
exports.error = (content, ex) => sendLogs("error", content, ex);
exports.debug = (content) => sendLogs("debug", content);
exports.log = (content) => sendLogs("log", content);