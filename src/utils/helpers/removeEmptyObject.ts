const isObject = (object) =>
  typeof !!object && object === "object" && !Array.isArray(object);


export const removeEmptyObjectsByKeys = (object) => {

    console.log("==> ", typeof !!object && object === "object");
    
  console.log({ object });

  if (!isObject(object)) return;

  let newObject = {};
  Object.keys(object).forEach((key) => {
    console.log({ key });
    console.log(object[key]);

    if (object[key]) {
      newObject[key] = object[key];
    }
  });
  return object;
};


export const filterObjectRemoveEmptyKey = (filters) => {

    let newObject = {};
    Object.keys(filters).forEach((key) => {
  
      if (filters[key]) {
        newObject[key] = filters[key];
      }
    });
    return newObject;
}
