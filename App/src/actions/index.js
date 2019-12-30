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
  alert("1");
    return { type: 'Coord', coordinates };
}