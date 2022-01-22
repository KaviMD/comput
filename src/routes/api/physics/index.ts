import type { collision_object } from '$lib/ts/solver';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const data = await request.json();

  let solution;

  switch (data.problem_type) {
    case 'collision':
      solution = solve_collision(data.problem);
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
    body: solution
  };
}

function solve_collision(problem) {
  const obj1: collision_object = problem.obj1;
  const obj2: collision_object = problem.obj2;
  const relative_speed = problem.relative_speed;
}