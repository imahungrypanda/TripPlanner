export const UPDATELOCATION = "UPDATELOCATION";

export const findLocation = () => dispatch =>{
  navigator.geolocation.getCurrentPosition((position) => {
    () => dispatch(updateLocation(position.coords))
  });
};

export const updateLocation = coords => ({
  type: UPDATELOCATION,
  coords
})