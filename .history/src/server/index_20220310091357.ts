import "reflect-metadata";
import { DependencyContainer } from "tsyringe";
import express, { Request, Response } from "express";

import { Constructor } from "../util/type-helpers";
import { GetRegistrationHandler } from "./handlers/get-registration.handler";

import { ExpressHandler } from "./handlers/types";
import { PostRegistrationHandler } from "./handlers/post-registration.handler";
import { configureDependencies } from "./di-setup";
import { GetRegistrationsHandler } from "./handlers/get-registrations.handler";

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
  const container = configureDependencies();
  const app = express();
  app.use(express.json());

  app.get("/reg/all", createHandler(container, GetRegistrationsHandler));
  app.get("/reg/:id", createHandler(container, GetRegistrationHandler));
  app.post("/reg", createHandler(container, PostRegistrationHandler));

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

main();
