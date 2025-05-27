const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUxzeVh3dTExbWZjMVdNN05QcWl0eWY3ZU4wYlU3WHg4WUVreW1aaWgxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME01T1JnOE14VElqakNqRklhVGJ3TGFxSzZNSEZqcXBvV2hsWU9VV20wYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTVVtSTJ1b2tVZ2ZvK2lCcFZkOHZBalpveUt6dTBXdGo3OUljTVo5Zld3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2anNQd0hCV3FlOCsxMnJhNTB2VXNta3hZcFFBbmNUUEcyNkR3aHlQampVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFGQkEzbmtVdHhYb0lxbDhqYk5FYnVSeW9nZy81c1F2MlRVUzVZMmg3R009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im96TDdsaWFRM0swVFVyV3lVV1prZW5scFUvcEk5WEVXVkpUUEtyQ3J0UlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0kyLzduZ1JDeFg3RnExNStiVGJ4cU1MSGdSSFNybFFMd2p6UTd5VWIzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGhjVjFjMjNOOHhRZWFvMDRHUzRCLy9WckdxMUowQXRVSFM1emtLTmFYVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjU1VGpFQzhvS2U2N3NnZ05SUllGY0NDYU1RQ1RMR2JlY1NBSnBoNERmWGFuOFdDUTRJOE83clUwaWpxY1hJeVd4R1RQaEZHUjhKUVNxN09oZFhOdGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6IlpiK2JJY1B4MUp2K09sVnpUR2J1dDM4RDlEZWtjQnRDUXVpck5rRkJXTWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09lMys2TU1FSXJqMWNFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InF3bzVXaFFWalBjMGpQa1JtTldyS1QxeURkQnc1REVUMzFEckxYQnhUMms9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtjalQ5d3EvaGV2LzZwbUVpVGJ0QjlobXVmckc2TjZjdzErZDNLU2RucTQySHVEWWRtMlc5U1o0RWV6SStZdkdDTkoyYi9jVFBLL3hMUEdlaEVaZmpnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCZXlSekZNKzZpVjlHSmlMQzk2QUUySm9Qbms1UGF2b1lKN0ZqREUyN3p2Z3dFSE5wMnpXTUhHZkhaYlpoZTBqY0loN1JJNVBDL3hLUFYzRm5iQ0VpZz09In0sIm1lIjp7ImlkIjoiMjM3NjIwNDQzNTg3OjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQm90IGRlcGxveSIsImxpZCI6IjUwMjE0MjA3OTc5ODU6MkBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjIwNDQzNTg3OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYXNLT1ZvVUZZejNOSXo1RVpqVnF5azljZzNRY09ReEU5OVE2eTF3Y1U5cCJ9fV0sInBsYXRmb3JtIjoic21iaSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4MzMyOTUxLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "DML",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "DML",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'DML-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

