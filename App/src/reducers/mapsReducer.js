let maps= {};
let mapState = ({ });
let longitude;
let latitude;
export default function(state=maps, action){
    switch (action.type) {
        case "Coord":
            mapState = ({ latitude : 10, longitude: 10 });
            break;
    }
    console.log(mapState);
    return {mapState};
}