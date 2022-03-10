import "reflect-metadata";
import { config } from "dotenv";
import { ClaimsDbConnection } from "./src/claims/db/connection";
import { initDiContainerTest } from "./src/test/di-setup-test";

process.env.HOMEE_API_HOST = "http://api.homee/v2";
process.env.HOMEE_APPLICATION_INTERNAL = "1";
process.env.HOMEE_USER_EMAIL = "jest@homeeondemand.com";
process.env.HOMEE_USER_PASSWORD = "password";

const container = initDiContainerTest();
let connection: ClaimsDbConnection;
const isIntegration = !!process.env.JEST_INTEGRATION;

if (isIntegration) {
  config();
  process.env.RUNTIME_ENV = "local";
  process.env.CL_CLIENT_CREDS = "none";

  jest.setTimeout(10000);
}

beforeAll(async () => {
  if (isIntegration) {
    connection = container.resolve(ClaimsDbConnection);
    await connection.connect();
  }
});

afterAll(async () => {
  if (isIntegration) {
    await connection.disconnect();
  }
});
