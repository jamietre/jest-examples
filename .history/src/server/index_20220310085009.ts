import "reflect-metadata";
import { container, DependencyContainer } from "tsyringe";
import express, { Request, Response } from "express";

import { Constructor } from "../util/type-helpers";
import { GetRegistrationHandler } from "./handlers/get-registration.handler";

import { ExpressHandler } from "./handlers/types";

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
  app.get("/get/:id", createHandler(container, GetRegistrationHandler));
}
