export type latex = string | number;

export interface state {
    mass: latex,
    velocity: latex,
    momentum: latex,
    kinetic_energy: latex
}

export interface collision_object {
    before: state,
    after: state
}

export function collisionObjectFactory(): collision_object {
    return {
        before: {
            mass: null,
            velocity: null,
            momentum: null,
            kinetic_energy: null,
        },
        after: {
            mass: null,
            velocity: null,
            momentum: null,
            kinetic_energy: null,
        }
    }
}

export function transformCollision(obj1: collision_object, obj2: collision_object, relative_speed: latex) {
    return {
        m1i: obj1.before.mass,
        m1f: obj1.after.mass,
        v1i: obj1.before.velocity,
        v1f: obj1.after.velocity,
        e1i: obj1.before.kinetic_energy,
        e1f: obj1.after.kinetic_energy,
        m2i: obj2.before.mass,
        m2f: obj2.after.mass,
        v2i: obj2.before.velocity,
        v2f: obj2.after.velocity,
        e2i: obj2.before.kinetic_energy,
        e2f: obj2.after.kinetic_energy,
        re: relative_speed
    }
}