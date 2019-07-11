import { makeId } from './help/utils.js';
export var Entity;
(function (Entity) {
    Entity["Floor"] = ".";
    Entity["Table"] = "#";
    Entity["Guy"] = "@";
    Entity["Meet"] = "0";
})(Entity || (Entity = {}));
export var Msg;
(function (Msg) {
    Msg[Msg["FoodOnFloor"] = 0] = "FoodOnFloor";
    Msg[Msg["CuttedWith"] = 1] = "CuttedWith";
})(Msg || (Msg = {}));
;
export var Color;
(function (Color) {
    Color["Black"] = "b";
    Color["White"] = "w";
    Color["Gray"] = "g";
})(Color || (Color = {}));
export var Interaction;
(function (Interaction) {
    Interaction[Interaction["None"] = 0] = "None";
    Interaction[Interaction["Take"] = 1] = "Take";
    Interaction[Interaction["Cut"] = 2] = "Cut";
})(Interaction || (Interaction = {}));
const F = `${Entity.Floor}${Color.White}`;
const W = `${Entity.Table}${Color.Black}`;
const G = `${Entity.Table}${Color.Gray}`;
const initialState = {
    cell: [
        [W, F, F, F, W],
        [F, G, F, F, F],
        [F, F, F, F, F],
        [F, F, F, G, F],
        [F, W, F, F, W],
    ],
    guy: {
        x: 2,
        y: 0,
        interaction: Interaction.None,
        inHand: [],
    },
    items: [
        { x: 2, y: 3, is: Entity.Meet, id: makeId(), cutted: 1 },
        { x: 3, y: 3, is: Entity.Meet, id: makeId(), cutted: 1 },
    ],
    msgs: [],
};
export default initialState;
//# sourceMappingURL=state.js.map