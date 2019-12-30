let count= 0;
console.log('MapsReducer.js :',count);
export default function(state=count, action){
    switch (action.type) {
        case "Increment": count++;
            break;
        case "Decrement": count--;
            break;
    }
    return count;
}