export type latex = string | number;

export interface state {
	mass: latex;
	velocity: latex;
	momentum: latex;
	kinetic_energy: latex;
}

export interface collision_object {
	before: state;
	after: state;
}

export function collisionObjectFactory(): collision_object {
	return {
		before: {
			mass: null,
			velocity: null,
			momentum: null,
			kinetic_energy: null
		},
		after: {
			mass: null,
			velocity: null,
			momentum: null,
			kinetic_energy: null
		}
	};
}

export function collision_object_to_sympy(
	obj1: collision_object,
	obj2: collision_object,
	relative_speed: latex
) {
	return {
		m1i: obj1.before.mass,
		m1f: obj1.after.mass,
		v1i: obj1.before.velocity,
		v1f: obj1.after.velocity,
		p1i: obj1.before.momentum,
		p1f: obj1.after.momentum,
		e1i: obj1.before.kinetic_energy,
		e1f: obj1.after.kinetic_energy,
		m2i: obj2.before.mass,
		m2f: obj2.after.mass,
		v2i: obj2.before.velocity,
		v2f: obj2.after.velocity,
		p2i: obj2.before.momentum,
		p2f: obj2.after.momentum,
		e2i: obj2.before.kinetic_energy,
		e2f: obj2.after.kinetic_energy,
		re: relative_speed
	};
}

export function sympy_to_collision_object(sympy_obj): {
	obj1: collision_object;
	obj2: collision_object;
	relative_speed: latex;
} {
	return {
		obj1: {
			before: {
				mass: sympy_obj.m1i,
				velocity: sympy_obj.v1i,
				momentum: sympy_obj.e1i,
				kinetic_energy: sympy_obj.e1i
			},
			after: {
				mass: sympy_obj.m1f,
				velocity: sympy_obj.v1f,
				momentum: sympy_obj.e1f,
				kinetic_energy: sympy_obj.e1f
			}
		},
		obj2: {
			before: {
				mass: sympy_obj.m2i,
				velocity: sympy_obj.v2i,
				momentum: sympy_obj.e2i,
				kinetic_energy: sympy_obj.e2i
			},
			after: {
				mass: sympy_obj.m2f,
				velocity: sympy_obj.v2f,
				momentum: sympy_obj.e2f,
				kinetic_energy: sympy_obj.e2f
			}
		},
		relative_speed: sympy_obj.re
	};
}
