let coordinates= {};
export default function(state=coordinates, action){
    switch (action.type) {
        case "Coordinates": coordinates = {latitude: 10,longitude : 11};
            break;
    }
    return coordinates;
}
