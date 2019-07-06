import { Entity, Interaction } from "../state.js";
import { minMax } from '../help/utils.js';
const isWalkable = (entity) => entity === Entity.Floor
    || entity === Entity.Meet;
const isActable = (entity) => entity === Entity.Meet;
const isInteracting = (guy) => guy.interaction !== Interaction.None;
const getEntity = (items, cell, [x, y]) => {
    let item = items.find(item => item.x === x && item.y === y);
    let entity;
    try {
        entity = cell[y][x];
    }
    catch {
        entity = Entity.Wall;
    }
    return [entity, item ? item.id : undefined];
};
const newGuyPos = (guy, [x, y]) => [guy.x + x, guy.y + y];
const setInteraction = (interaction, state) => {
    state.guy.interaction = interaction;
    return state;
};
const walkTo = (state, offset) => {
    const newPos = newGuyPos(state.guy, offset);
    const [entityWithColor] = getEntity(state.items, state.cell, newPos);
    const [entity] = entityWithColor;
    if (isWalkable(entity)) {
        state.guy.x = newPos[0];
        state.guy.y = newPos[1];
    }
    return state;
};
const actTo = (state, offset) => {
    const newPos = newGuyPos(state.guy, offset);
    state.guy.interaction = Interaction.None;
    if (state.guy.inHand.length > 0) {
        const cropH = minMax(0, state.cell[0].length - 1);
        const cropV = minMax(0, state.cell.length - 1);
        const [inHand] = state.guy.inHand;
        state.items = state.items.map(item => item.id === inHand
            ? { ...item, x: cropH(newPos[0]), y: cropV(newPos[1]) }
            : item);
        state.guy.inHand = [];
        return state;
    }
    const [entity, itemId] = getEntity(state.items, state.cell, newPos);
    if (itemId) {
        state.guy.inHand = [itemId];
    }
    state.guy.interaction = Interaction.None;
    return state;
};
const handleInput = (pub) => {
    const MOVE_RIGHT = pub(['guy', 'guy_inHand'], (state) => isInteracting(state.guy)
        ? actTo(state, [1, 0])
        : walkTo(state, [1, 0]));
    const MOVE_LEFT = pub(['guy', 'guy_inHand'], (state) => isInteracting(state.guy)
        ? actTo(state, [-1, 0])
        : walkTo(state, [-1, 0]));
    const MOVE_DOWN = pub(['guy', 'guy_inHand'], (state) => isInteracting(state.guy)
        ? actTo(state, [0, 1])
        : walkTo(state, [0, 1]));
    const MOVE_UP = pub(['guy', 'guy_inHand'], (state) => isInteracting(state.guy)
        ? actTo(state, [0, -1])
        : walkTo(state, [0, -1]));
    const START_INTERACT = (inter) => pub(['guy_inHand'], (state) => setInteraction(inter, state));
    const directions = {
        l: MOVE_RIGHT,
        h: MOVE_LEFT,
        j: MOVE_DOWN,
        k: MOVE_UP,
        t: START_INTERACT(Interaction.Take),
    };
    document.addEventListener('keydown', e => {
        if (directions[e.key]) {
            directions[e.key]();
        }
    });
};
export default handleInput;
//# sourceMappingURL=moveGuy.js.map