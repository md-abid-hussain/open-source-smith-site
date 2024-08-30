const environment = process.env.NODE_ENV;

const isProduction = environment === "production";

const GITHUB_ID = isProduction
  ? process.env.GITHUB_ID
  : process.env.GITHUB_ID_DEV;
const GITHUB_SECRET = isProduction
  ? process.env.GITHUB_SECRET
  : process.env.GITHUB_SECRET_DEV;
const DATABASE_URL = isProduction
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_DEV;

export { GITHUB_ID, GITHUB_SECRET, DATABASE_URL };
