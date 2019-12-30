export function increment(){
  return{
    type: "Increment"
  };
}
export function decrement(){
  return{
    type: "Decrement"
  };
}
export function setLocation(coordinates){
    return {
      type: 'Coord',
      coordinates: coordinates
    };
}