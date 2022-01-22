import type { RequestHandler } from '@sveltejs/kit'
import { exec } from 'child_process';

/**
 * @param {string} command A shell command to execute
 * @return {Promise<string>} A promise that resolve to the output of the shell command, or an error
 * @example const output = await execute("ls -alh");
 */
function execute(command) {
  /**
   * @param {Function} resolve A function that resolves the promise
   * @param {Function} reject A function that fails the promise
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
   */
  return new Promise(function (resolve, reject) {
    /**
     * @param {Error} error An error triggered during the execution of the childProcess.exec command
     * @param {string|Buffer} standardOutput The result of the shell command execution
     * @param {string|Buffer} standardError The error resulting of the shell command execution
     * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     */
    exec(command, function (error, standardOutput, standardError) {
      if (standardError) {
        reject(standardError);

        return;
      }

      if (error) {
        reject(error);

        return;
      }

      resolve(standardOutput);
    });
  });
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post: RequestHandler = async ({ request }) => {
  const data = await request.json();

  let solution;

  switch (data.problem_type) {
    case 'collision':
      solution = await solve_collision(data.problem);
  }

  if (solution.failed) {
    return {
      status: 400,
      body: {
        error: solution.error,
      },
    };
  }

  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {...data.problem, ...solution},
  };
}

async function solve_collision(problem) {
  const filter_symbols = ["m1i", "m1f", "v1i", "v1f", "m2i", "m2f", "v2i", "v2f", "re"];
  let known_symbols = {};
  let unknown_symbols = [];

  for (const symbol of filter_symbols) {
    if (problem[symbol] !== null) {
      known_symbols[symbol] = problem[symbol];
    } else {
      unknown_symbols.push(symbol);
    }
  }

  let output;

  try {
    output = await runPythonScript("solve_collision.py", [JSON.stringify(known_symbols), JSON.stringify(unknown_symbols)]);
  } catch (error) {
    return {
      failed: true,
      error: error
    }
  }

  return JSON.parse(output);
}

async function runPythonScript(filename: string, args: string[]) {
  return await execute(`python3 src/lib/python/${filename} '${args.join("' '")}'`);
}