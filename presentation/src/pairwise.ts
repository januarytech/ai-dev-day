export type Param = { name: string; values: string[] };

export function parseValues(raw: string): string[] {
  return raw.split(",").map((v) => v.trim()).filter(Boolean);
}

// IPO (In-Parameter-Order) algorithm for deterministic, near-optimal pairwise generation
export function generatePairwise(params: Param[]): string[][] {
  if (params.length < 2) return [];

  // Start with all combinations of the first two parameters
  const tests: number[][] = [];
  for (let v0 = 0; v0 < params[0].values.length; v0++) {
    for (let v1 = 0; v1 < params[1].values.length; v1++) {
      const row = new Array(params.length).fill(-1);
      row[0] = v0;
      row[1] = v1;
      tests.push(row);
    }
  }

  // For each subsequent parameter, extend existing rows then add new ones
  for (let pi = 2; pi < params.length; pi++) {
    // Track which pairs (pi, earlier_param) still need coverage
    const uncovered = new Set<string>();
    for (let pj = 0; pj < pi; pj++) {
      for (let vi = 0; vi < params[pi].values.length; vi++) {
        for (let vj = 0; vj < params[pj].values.length; vj++) {
          uncovered.add(`${pi}:${vi},${pj}:${vj}`);
        }
      }
    }

    // Horizontal extension: assign values to existing rows
    for (const row of tests) {
      let bestVal = 0;
      let bestCount = 0;
      for (let vi = 0; vi < params[pi].values.length; vi++) {
        let count = 0;
        for (let pj = 0; pj < pi; pj++) {
          if (uncovered.has(`${pi}:${vi},${pj}:${row[pj]}`)) count++;
        }
        if (count > bestCount) {
          bestCount = count;
          bestVal = vi;
        }
      }
      row[pi] = bestVal;
      for (let pj = 0; pj < pi; pj++) {
        uncovered.delete(`${pi}:${bestVal},${pj}:${row[pj]}`);
      }
    }

    // Vertical extension: add new rows for any still-uncovered pairs
    while (uncovered.size > 0) {
      const row = new Array(params.length).fill(-1);
      const first = uncovered.values().next().value!;
      const parts = first.split(",");
      for (const part of parts) {
        const [p, v] = part.split(":").map(Number);
        row[p] = v;
      }
      for (let pk = 0; pk < params.length; pk++) {
        if (row[pk] !== -1) continue;
        let bestVal = 0;
        let bestCount = 0;
        for (let vi = 0; vi < params[pk].values.length; vi++) {
          let count = 0;
          for (let pj = 0; pj < params.length; pj++) {
            if (pj === pk || row[pj] === -1) continue;
            const key1 = `${pk}:${vi},${pj}:${row[pj]}`;
            const key2 = `${pj}:${row[pj]},${pk}:${vi}`;
            if (uncovered.has(key1)) count++;
            if (uncovered.has(key2)) count++;
          }
          if (count > bestCount) {
            bestCount = count;
            bestVal = vi;
          }
        }
        row[pk] = bestVal;
      }
      for (let i = 0; i < params.length; i++) {
        for (let j = i + 1; j < params.length; j++) {
          uncovered.delete(`${i}:${row[i]},${j}:${row[j]}`);
          uncovered.delete(`${j}:${row[j]},${i}:${row[i]}`);
        }
      }
      tests.push(row);
      if (tests.length > 100) break;
    }
  }

  // Compaction: remove any row whose pairs are all covered by other rows
  for (let ri = tests.length - 1; ri >= 0; ri--) {
    const row = tests[ri];
    let removable = true;
    for (let i = 0; i < params.length && removable; i++) {
      for (let j = i + 1; j < params.length && removable; j++) {
        const coveredElsewhere = tests.some(
          (other, oi) =>
            oi !== ri && other[i] === row[i] && other[j] === row[j]
        );
        if (!coveredElsewhere) removable = false;
      }
    }
    if (removable) tests.splice(ri, 1);
  }

  return tests.map((row) =>
    row.map((vi, pi) => params[pi].values[vi])
  );
}

// Verify that every pair of parameter values appears in at least one test case
export function verifyPairwiseCoverage(
  params: Param[],
  tests: string[][]
): { covered: boolean; missing: string[] } {
  const missing: string[] = [];
  for (let i = 0; i < params.length; i++) {
    for (let j = i + 1; j < params.length; j++) {
      for (const vi of params[i].values) {
        for (const vj of params[j].values) {
          const found = tests.some((row) => row[i] === vi && row[j] === vj);
          if (!found) {
            missing.push(`(${params[i].name}=${vi}, ${params[j].name}=${vj})`);
          }
        }
      }
    }
  }
  return { covered: missing.length === 0, missing };
}
