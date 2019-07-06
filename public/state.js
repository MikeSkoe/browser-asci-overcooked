import { makeId } from './help/utils.js';
export var Entity;
(function (Entity) {
    Entity["Floor"] = ".";
    Entity["Wall"] = "#";
    Entity["Guy"] = "@";
    Entity["Meet"] = "0";
})(Entity || (Entity = {}));
export var Color;
(function (Color) {
    Color["Black"] = "b";
    Color["White"] = "w";
})(Color || (Color = {}));
export var Interaction;
(function (Interaction) {
    Interaction[Interaction["None"] = 0] = "None";
    Interaction[Interaction["Take"] = 1] = "Take";
})(Interaction || (Interaction = {}));
;
const F = `${Entity.Floor}${Color.White}`;
const W = `${Entity.Wall}${Color.Black}`;
const initialState = {
    cell: [
        [W, F, F, F, W],
        [F, W, F, F, F],
        [F, F, F, F, F],
        [F, F, F, W, F],
        [F, W, F, F, W],
    ],
    guy: {
        x: 2,
        y: 0,
        interaction: Interaction.None,
        inHand: [],
    },
    items: [
        { x: 2, y: 3, is: Entity.Meet, id: makeId() },
        { x: 3, y: 3, is: Entity.Meet, id: makeId() },
    ],
};
export default initialState;
//# sourceMappingURL=state.js.map