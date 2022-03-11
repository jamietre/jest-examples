# Jest Examples

A collection of Jest test examples for discussion.

## Overview

This repo shows a variety of ways to write unit tests with Jest. The goal is to show examples of a number of common patterns, discuss advantages and disadvantages, and work through evolution of a test file to a "best practice" state.

The repo is a simple backend application with a two-tiered data service architecture, a "store" and a "service". The application also uses an inversion of control (IoC) container (tsyringe), which is fundamental to some of the more advanced testing patterns.

## Structure

- `/server` contains a working Express server that provides access to the data service.
- `/db` contains the data store; if implemented against a real database this would be a low-level DAL (data access layer)
- `/service` contains the service layer that access the database; it depends on the store.
- `/tests` contains a single test of the _service_ layer

## Usage

- `yarn serve` - start the server
- `yarn test` - run tests

Each of the "example-{n}" tests are meant to be cumulative, building/improving off the prior test.

## Limitations

This repo was put together for a presenation, and hasn't gone through a lot of refinement or review! Please contribute!
