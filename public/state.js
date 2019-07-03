export var Entities;
(function (Entities) {
    Entities[Entities["Floor"] = 0] = "Floor";
    Entities[Entities["Wall"] = 1] = "Wall";
    Entities[Entities["Guy"] = 7] = "Guy";
})(Entities || (Entities = {}));
const initialState = {
    cellData: {
        width: 5,
        height: 5,
    },
    cell: [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
    ],
    guy: {
        x: 2,
        y: 0,
    }
};
export default initialState;
//# sourceMappingURL=state.js.map