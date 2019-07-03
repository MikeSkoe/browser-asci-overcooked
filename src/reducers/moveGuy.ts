const handleInput = (pub) => {
    const MOVE_RIGHT = pub(
        ['guy'], 
        state => {
            const newState = {...state};
            newState.guy.x = Math.min(4, newState.guy.x + 1);
            return newState;
        }
    );
    const MOVE_LEFT = pub(
        ['guy'], 
        state => {
            const newState = {...state};
            newState.guy.x = Math.max(0, newState.guy.x - 1);
            return newState;
        }
    );
    const MOVE_DOWN = pub(
        ['guy'], 
        state => {
            const newState = {...state};
            newState.guy.y = Math.min(4, newState.guy.y + 1);
            return newState;
        }
    );
    const MOVE_UP = pub(
        ['guy'], 
        state => {
            const newState = {...state};
            newState.guy.y = Math.max(0, newState.guy.y - 1);
            return newState;
        }
    );

    const directions = {
        l: MOVE_RIGHT,
        h: MOVE_LEFT,
        j: MOVE_DOWN,
        k: MOVE_UP,
    }

    document.addEventListener('keydown', e => {
        if (directions[e.key]) {
            directions[e.key]()
        }
    })
}

export default handleInput;