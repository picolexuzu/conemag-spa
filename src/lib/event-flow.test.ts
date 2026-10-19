import { test, expect } from "bun:test";
import { eventPresentationPath } from "./event-flow";

test("GGX diagnostic opens GGX presentation after submission", () => {
  expect(eventPresentationPath("ggx")).toBe("/landingpage/equipamentos/ggx");
});
test("General diagnostic opens the catalog after submission", () => {
  expect(eventPresentationPath()).toBe("/landingpage/equipamentos");
});