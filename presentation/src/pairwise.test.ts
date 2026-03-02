import { describe, it, expect } from "vitest";
import { generatePairwise, verifyPairwiseCoverage, type Param } from "./pairwise";

function assertPairwise(params: Param[], maxTests: number) {
  const tests = generatePairwise(params);
  const exhaustive = params.reduce((acc, p) => acc * p.values.length, 1);
  const { covered, missing } = verifyPairwiseCoverage(params, tests);

  expect(covered, `Missing pairs: ${missing.join(", ")}`).toBe(true);
  expect(tests.length).toBeLessThanOrEqual(maxTests);
  expect(tests.length).toBeLessThan(exhaustive);
}

describe("generatePairwise", () => {
  it("3x3x3 produces exactly 9 tests with full coverage", () => {
    const params: Param[] = [
      { name: "Browser", values: ["Chrome", "Firefox", "Safari"] },
      { name: "OS", values: ["Windows", "Mac", "Linux"] },
      { name: "Auth", values: ["OAuth", "Password", "SSO"] },
    ];
    const tests = generatePairwise(params);
    const { covered, missing } = verifyPairwiseCoverage(params, tests);

    expect(covered, `Missing pairs: ${missing.join(", ")}`).toBe(true);
    expect(tests.length).toBe(9);
  });

  it("2x2x2x3 (Login System) produces optimal results with full coverage", () => {
    const params: Param[] = [
      { name: "Credentials", values: ["Valid", "Invalid"] },
      { name: "TwoFactorAuth", values: ["Enabled", "Disabled"] },
      { name: "RememberMe", values: ["Checked", "Unchecked"] },
      { name: "PrevFailures", values: ["0", "1-2", "3+"] },
    ];
    // Lower bound: max pair is 2x3 = 6
    assertPairwise(params, 7);
  });

  it("3x3x3 (Payment Checkout) produces optimal results with full coverage", () => {
    const params: Param[] = [
      { name: "PaymentMethod", values: ["CreditCard", "PayPal", "BankTransfer"] },
      { name: "ShippingMethod", values: ["Standard", "Express", "Overnight"] },
      { name: "UserType", values: ["Guest", "Registered", "Premium"] },
    ];
    assertPairwise(params, 9);
  });

  it("4x3x3x3 (API Endpoint) produces reasonable results with full coverage", () => {
    const params: Param[] = [
      { name: "Method", values: ["GET", "POST", "PUT", "DELETE"] },
      { name: "Auth", values: ["Valid", "Invalid", "Missing"] },
      { name: "ContentType", values: ["JSON", "XML", "FormData"] },
      { name: "Payload", values: ["Empty", "Small", "Large"] },
    ];
    // Lower bound: max pair is 4x3 = 12
    assertPairwise(params, 16);
  });

  it("2x2 produces exactly 4 tests (same as exhaustive for 2 params)", () => {
    const params: Param[] = [
      { name: "A", values: ["a1", "a2"] },
      { name: "B", values: ["b1", "b2"] },
    ];
    const tests = generatePairwise(params);
    expect(tests.length).toBe(4);
    const { covered } = verifyPairwiseCoverage(params, tests);
    expect(covered).toBe(true);
  });

  it("returns empty array for fewer than 2 params", () => {
    expect(generatePairwise([])).toEqual([]);
    expect(
      generatePairwise([{ name: "A", values: ["a1", "a2"] }])
    ).toEqual([]);
  });
});
