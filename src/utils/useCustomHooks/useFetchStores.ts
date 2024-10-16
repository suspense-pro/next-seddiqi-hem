import { getStores } from "@utils/sfcc-connector/dataService";

const UseFetchStores = async (brand, name, city) => {
  try {
    const result = await getStores({
      method: 'GET',
      brand,
      name,
      city,
    });

    //console.log("DATA: ", result.response.data);

    return result.response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch stores');
  }
};

export default UseFetchStores;