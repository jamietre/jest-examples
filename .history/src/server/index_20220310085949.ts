import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import express, { Request, Response } from "express";

import { Constructor } from "../util/type-helpers";
import { GetRegistrationHandler } from "./handlers/get-registration.handler";

import { ExpressHandler } from "./handlers/types";
import { PostRegistrationHandler } from "./handlers/post-registration.handler";

const port = 3000;

function createHandler(
  container: DependencyContainer,
  handlerCotr: Constructor<ExpressHandler>
) {
  return (request: Request, response: Response) => {
    const handler = container.resolve(handlerCotr);
    handler.handle(request, response).catch((e) => {
      console.error(e);
    });
  };
}

async function main() {
  const app = express();
  app.get("/reg/:id", createHandler(container, GetRegistrationHandler));
  app.put("/reg", createHandler(container, PostRegistrationHandler));
  await app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

main()
  .then(() => {
    process.exit(1);
  })
  .catch((e) => console.error(e));
