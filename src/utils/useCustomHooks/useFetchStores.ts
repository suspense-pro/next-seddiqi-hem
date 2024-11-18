import { getStores } from "@utils/sfcc-connector/dataService";

const UseFetchStores = async (brand, city, name, service, lat, lng) => {
  try {
    const result = await getStores({
      method: 'GET',
      brand,
      city,
      name,
      service,
      lat,
      lng
    });

    console.log("DATA: ", result);

    if (result.isError) {
      throw new Error("Network response was not ok");
    }

    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch stores');
  }
};

export default UseFetchStores;