import { test } from "node:test";
import { strict as assert } from "node:assert";
import { eventPresentationPath, eventThankYouPath, eventCatalogRedirectDelay } from "./event-flow";

test("Machine presentation uses the machine main slug", () => {
  assert.equal(eventPresentationPath("ggx"), "/landingpage/ggx");
});
test("Thank-you redirects to the main equipment catalog", () => {
  assert.equal(eventPresentationPath(), "/landingpage");
});
test("Successful submissions open the thank-you page", () => {
  assert.equal(eventThankYouPath, "/landingpage/obrigado");
});
test("Thank-you redirect waits exactly five seconds", () => {
  assert.equal(eventCatalogRedirectDelay, 5000);
});