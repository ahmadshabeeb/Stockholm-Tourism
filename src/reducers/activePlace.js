const activePlaceReducerDefaultState = {
    place: {},
    reactivated: false
};

export default (state = activePlaceReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_PLACE':
            return {
                place: action.place,
                reactivated: !state.reactivated
            };
        default:
            return state;
    }
};