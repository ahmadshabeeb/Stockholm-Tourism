const placesReducerDefaultState = [];

export default (state = placesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_PLACE':
            return [...state, action.place];
        case 'REMOVE_PLACE':
            console.log('REMOVE_PLACE' + action.id);
            return state.filter(({ id }) => id !== action.id );
        case 'SET_PLACES' :
            return action.places;
        default:
            return state;
    }
};