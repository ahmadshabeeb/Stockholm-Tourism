const mapReducerDefaultState = null;

export default (state = mapReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_MAP':
            return action.map;
        default:
            return state;
    }
};