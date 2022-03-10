import "reflect-metadata";

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
