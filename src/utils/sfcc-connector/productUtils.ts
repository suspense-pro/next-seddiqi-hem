
/** This is a sample transform function **/
export const transformProduct = (data: any) => {
  const response = data
    ? {
        title: data?.title ?? "",
        description: data?.description ?? "",
      }
    : null;

  return response;
};

/** Product Price Graph transform function **/
export const getProductPriceGraph = (data: any) => {
  const response = data;
  // Extract prices from the product objects
  const prices = response.hits.map(product => product.price);

  // Set minimum price to zero and calculate the maximum price
  const minPrice = 0;
  const maxPrice = Math.max(...prices);

  // number of bins (ranges)
  const binWidth = 50;
  const numBins = Math.ceil(maxPrice / binWidth);

  const priceRanges = {};
  for (let i = 1; i <= numBins; i++) {
      const upperBound = i * binWidth;
      priceRanges[upperBound] = 0;  // Initialize frequency to 0 for each bin
  }

  // Count the frequency of products in each price bin
  prices.forEach(price => {
      for (const upperBound in priceRanges) {
          if (price <= parseInt(upperBound)) {
              priceRanges[upperBound]++;
              break;
          }
      }
  });


  return priceRanges;
};
