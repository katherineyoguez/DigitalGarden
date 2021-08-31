export const getSavedListIds = () => {
    const savedListsIds = localStorage.getItem('saved_lists')
      ? JSON.parse(localStorage.getItem('saved_lists'))
      : [];
  
    return savedListsIds;
  };
  
  export const saveListsIds = (listsIdArr) => {
    if (listsIdArr.length) {
      localStorage.setItem('saved_lists', JSON.stringify(listsIdArr));
    } else {
      localStorage.removeItem('saved_lists');
    }
  };
  
  export const removeListsId = (listsId) => {
    const savedListsIds = localStorage.getItem('saved_lists')
      ? JSON.parse(localStorage.getItem('saved_lists'))
      : null;
  
    if (!savedListsIds) {
      return false;
    }
  
    const updatedSavedListsIds = savedListsIds?.filter((savedListsId) => savedListsId !== listsId);
    localStorage.setItem('saved_lists', JSON.stringify(updatedSavedListsIds));
  
    return true;
  };