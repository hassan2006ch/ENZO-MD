const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0NyV3pJcUhpTGZVYlpwTE5wZzZWL3Fud2tlZDhNWkswOW9YdWYxRmluUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0VkbzBqOWV0ZXViVFlKKzYxa3NkLzV2N0FqU1ozVXNlU1JuTmxZRFRWVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRmVjQVd1dEJBZjJCclNJeUVSNE4vQ0FwaU90U2t4bGNzc0hzZU9MZVdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuSERIYzhwZFdnd1ZGODMrRjV2YVpHUExDd2JJcndtS1dYUE1UeWF0NlJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFPUThSd0diRGk1VHhVMHZFMEdVN2FTejAwOThGZ3o0OVhWRkJYVVFxMzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZlc2dHSUl6QUxsMldST0dIeUo5dExTeGQ2bmZqRlBWNEh4TTAxN0E2U1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0llYWk2UUVvUU9tRnJQSkppYzVnNDdZcXpBRUprWEtlVHNJSmRJbmRtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUlmWGU1RjJ6aHZpd0dkNm1KUGU4Y09FbnpyUHZhMFkwZU1PMk5NdGd6QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikw5WDd1NHZ2RDh2SHc3QTYvUFZUcEFDV0FnMkVRL1pkOThLb2YwU29lZU9kbFRWTU1BcVBQVXBQNUFGajNpdHQyRStLcDd3em9DQ3E4bkxWV09CM0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE5LCJhZHZTZWNyZXRLZXkiOiI3Ni9NbXYzVzROSHBlTWNyME00eXE0bkt2Z2g3N01mTTJJN09CQ1NGQ0djPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzcwNDk0MzI1NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3QjdGNjNBN0UxRTNFMzAyRDYxRENBRDkwNTY4OTI2NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMyODc0NTc1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjM3MDQ5NDMyNTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzc0QzY3NTBBMTQwRTRCRDdCQzNDRDdDMDMyOEFDNTIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMjg3NDU3NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoia3dSLUhRckhUbzJjNF9qb29OUTRHUSIsInBob25lSWQiOiJmN2E5Zjc0Yi02NzczLTQzODAtYmRmMC02NTRhZWFmYWMxNWMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFV6ZWZ6Y1RkWFU3a0JwNW5zK00yZWpFdjhRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRsQWNvbzVlY2JzT2YrOFNyV2tWcmZtMGlOOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIyRUpIS1Y5RCIsIm1lIjp7ImlkIjoiOTIzNzA0OTQzMjU2OjY0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikhhc3NhbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFRHcmJ3QkVMNmlwcm9HR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiME5XdVdqRVBWc1ZxUUxMY01qS1pZOWRvazhuMUZjdW8vMHh3aVRnSzMyWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoid29kVGxjSWsrKzhHeWY5MmhhVThWRnRQQm01VEg1R1drMjZUMERUdUlBVDNqUW9pV0VSOVNHK00ranB4YnZoS2Y4WEg1US8wWDBid3BmaVh5SVg2Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImVYaHk1Rm1wa3VaYlA2MVBHWDFnOUlYS2JFU2E4N0MvdWZuak1CZC9BenB2N09PZi9Tcis3YjNkMlYxTUF1WEI1emc0dW9JL1gvb05ERVl0c3RZWERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNzA0OTQzMjU2OjY0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmREVnJsb3hEMWJGYWtDeTNESXltV1BYYUpQSjlSWExxUDlNY0lrNEN0OW0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzI4NzQ1NzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWV2In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
