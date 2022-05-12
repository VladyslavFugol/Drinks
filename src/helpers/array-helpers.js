export const getUniqueObjectsFromArray = (array, uniqueId) => {
    if (array.indexOf(uniqueId) === -1) {
      array.push(uniqueId)
      return true
    }

    return false
  }
