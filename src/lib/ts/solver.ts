export type latex = string | number;

export interface state {
    mass: { val: latex, justChanged: boolean, frozen: boolean },
    velocity: { val: latex, justChanged: boolean, frozen: boolean },
    momentum: { val: latex, justChanged: boolean, frozen: boolean },
    kinetic_energy: { val: latex, justChanged: boolean, frozen: boolean }
}

export interface collision_object {
    before: state,
    after: state
}

export function collisionObjectFactory(): collision_object {
    return {
        before: {
            mass: { val: null, justChanged: false, frozen: false },
            velocity: { val: null, justChanged: false, frozen: false },
            momentum: { val: null, justChanged: false, frozen: false },
            kinetic_energy: { val: null, justChanged: false, frozen: false }
        },
        after: {
            mass: { val: null, justChanged: false, frozen: false },
            velocity: { val: null, justChanged: false, frozen: false },
            momentum: { val: null, justChanged: false, frozen: false },
            kinetic_energy: { val: null, justChanged: false, frozen: false }
        }
    }
}

function countKnown(state: state): number {
    let count = 0;
    if (state.mass.val) count++;
    if (state.velocity.val) count++;
    if (state.momentum.val) count++;
    if (state.kinetic_energy.val) count++;
    return count;
}

const momentum_equation = "p = m * v";
const kinetic_energy_equation = "e = 1/2 * m * v^2";

export function solveState(state: state): state {
    if (state.mass.justChanged) {
        state.mass.justChanged = false;
        if (countKnown(state) >= 2) {
            if (state.velocity.val) {
                if (!state.momentum.frozen) {
                    state.momentum.val = `(${state.mass.val})*(${state.velocity.val})`;
                }
                if (!state.kinetic_energy.frozen) {
                    state.kinetic_energy.val = `0.5*(${state.mass.val})*(${state.velocity.val})^2`;
                }
            }
        }
        if (state.velocity.justChanged) {
            state.velocity.justChanged = false;
        }
        if (state.momentum.justChanged) {
            state.momentum.justChanged = false;
        }
        if (state.kinetic_energy.justChanged) {
            state.kinetic_energy.justChanged = false;
        }
    }
    return state;
}

export function solveCollision(obj1: collision_object, obj2: collision_object): { obj1: collision_object, obj2: collision_object } {
    return {
        obj1: obj1,
        obj2: obj2
    }
}