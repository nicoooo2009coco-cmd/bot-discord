module.exports = {
  OWNER_IDS: ["1371023781484560509"],
  PREFIX: "!",
  SUPPORT_SERVER: "https://discord.gg/PfPFfwqdDP",
  PRESENCE: {
    ENABLED: true,
    STATUS: "online",
    TYPE: "WATCHING",
    MESSAGE: "{members} members in {servers} servers"
  },
  DASHBOARD: {
    enabled: false,
    baseURL: "http://localhost:8080",
    failureURL: "http://localhost:8080",
    port: "8080",
  },
  INTERACTIONS: {
    SLASH: true,
    CONTEXT: false,
    GLOBAL: false,
    TEST_GUILD_ID: "1561381746660868160",
  },
  XP_SYSTEM: {
    COOLDOWN: 5,
    DEFAULT_LVL_UP_MSG: "{m}, You just advanced to **Level {l}**",
  },
  MISCELLANEOUS: {
    DAILY_COINS: 100,
  },
  ECONOMY: {
    CURRENCY: "₪",
    DAILY_COINS: 100,
    MIN_BEG_AMOUNT: 100,
    MAX_BEG_AMOUNT: 2500,
  },
  SUGGESTIONS: {
    ENABLED: true,
    EMOJI: {
      UP_VOTE: "⬆️",
      DOWN_VOTE: "⬇️",
    },
    DEFAULT_EMBED: "#0099ff",
    APPROVED_EMBED: "#00ff00",
    DENIED_EMBED: "#ff0000",
  },
  IMAGE: {
    BASE_API: "https://image-api.strangebot.xyz",
  },
MUSIC: {
    IDLE_TIME: 60,
    MAX_SEARCH_RESULTS: 5,
    NODES: [
      {
        host: "54.37.6.86",
        port: 80,
        password: "Blacky#9125",
        identifier: "54.37.6.86",
        retryDelay: 5000,
        secure: false,
      },
    ],
  },
  EMBED_COLORS: {
    BOT_EMBED: "#068ADD",
    TRANSPARENT: "#36393F",
    SUCCESS: "#00A56A",
    ERROR: "#D61A3C",
    WARNING: "#F7E919",
    AUTOMOD: "#36393F",
    TICKET_CREATE: "#068ADD",
    TICKET_CLOSE: "#068ADD",
    TIMEOUT_LOG: "#102027",
    UNTIMEOUT_LOG: "#4B636E",
    KICK_LOG: "#FF7961",
    SOFTBAN_LOG: "#AF4448",
    BAN_LOG: "#D32F2F",
    VMUTE_LOG: "#102027",
    VUNMUTE_LOG: "#4B636E",
    DEAFEN_LOG: "#102027",
    UNDEAFEN_LOG: "#4B636E",
    DISCONNECT_LOG: "RANDOM",
    MOVE_LOG: "RANDOM",
    GIVEAWAYS: "#FF468A",
  },
  CACHE_SIZE: {
    GUILDS: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },
  MESSAGES: {
    API_ERROR: "Unexpected Backend Error! Try again later or contact support server",
  },
};