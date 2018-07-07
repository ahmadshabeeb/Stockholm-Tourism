import database from '../firebase/firebase';

export const addPlace = (place) => ({
    type: 'ADD_PLACE',
    place
});

export const startAddPlace = (placeData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            position = {},
            title = ''
        } = placeData;

        const place = { position, title};
        return database.ref(`users/${uid}/places`).push(place).then((ref) => {
            dispatch(addPlace({
                id: ref.key,
                ...place
            }))
        });
    };
};

export const removePlace = ({ id }) => ({
    type: 'REMOVE_PLACE',
    id
});

export const startRemovePlace = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/places/${id}`).remove().then(() => {
            dispatch(removePlace({ id }));
        });
    };
};

export const setPlaces = (places) => ({
    type: 'SET_PLACES',
    places
});

export const startSetPlaces = () => {
    return (dispatch, getState) =>  {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/places`)
        .once('value')
        .then((snapshot) => {
            const places = [];

            snapshot.forEach((childSnapshot) => {
                places.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setPlaces(places));
        });
    };
};