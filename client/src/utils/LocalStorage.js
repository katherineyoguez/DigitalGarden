export const getSavedPlantIds = () => {
    const savedPlantIds = localStorage.getItem('saved_plant')
      ? JSON.parse(localStorage.getItem('saved_plant'))
      : [];
  
    return savedPlantIds;
  };
  
  export const savePlantIds = (plantIdArr) => {
    if (plantIdArr.length) {
      localStorage.setItem('saved_plant', JSON.stringify(plantIdArr));
    } else {
      localStorage.removeItem('saved_plant');
    }
  };
  
  export const removePlantId = (plantId) => {
    const savedPlantIds = localStorage.getItem('saved_plant')
      ? JSON.parse(localStorage.getItem('saved_plant'))
      : null;
  
    if (!savedPlantIds) {
      return false;
    }
  
    const updatedSavedPlantIds = savedPlantIds?.filter((savedPlantId) => savedPlantId !== plantId);
    localStorage.setItem('saved_plant', JSON.stringify(updatedSavedPlantIds));
  
    return true;
  };