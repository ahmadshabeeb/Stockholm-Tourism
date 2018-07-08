const selectPlaces = (places, { text }) => {
    return places.filter((place) => {
        const textMatch = place.title.toLowerCase().includes(text);

        return textMatch;
    })
};

export default selectPlaces;