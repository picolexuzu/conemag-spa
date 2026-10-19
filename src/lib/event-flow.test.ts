import { test } from "node:test";
import { strict as assert } from "node:assert";
import { eventPresentationPath } from "./event-flow";

test("GGX diagnostic opens GGX presentation after submission", () => {
  assert.equal(eventPresentationPath("ggx"), "/landingpage/equipamentos/ggx");
});
test("General diagnostic opens the catalog after submission", () => {
  assert.equal(eventPresentationPath(), "/landingpage/equipamentos");
});