const activePlaceReducerDefaultState = {};

export default (state = activePlaceReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_PLACE':
            return action.place;
        default:
            return state;
    }
};