export default function(state, action){
    console.log(action);
    switch (action.type) {
        case "Coord":
            console.log(action);
            return {
                mapState = {10,10
            };
        default:
            return null;
    }
};