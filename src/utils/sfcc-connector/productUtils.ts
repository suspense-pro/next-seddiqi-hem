
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
  const response = data
  // Extract prices from the product objects
  const prices = response.hits.map(product => product.price);

  // Find minimum and maximum prices
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Define the number of bins (ranges)
  const numBins = 5;  // adjustable -  based on custom preference
  const binSize = (maxPrice - minPrice) / numBins;

  // Initialize bins and frequency counts
  const priceRanges = [];
  for (let i = 0; i < numBins; i++) {
      const lowerBound = minPrice + i * binSize;
      const upperBound = lowerBound + binSize;
      priceRanges.push({
          range: `${Math.round(lowerBound)} - ${Math.round(upperBound)}`,
          frequency: 0
      });
  }

  // Count the frequency of products in each price range
  prices.forEach(price => {
      for (const priceRange of priceRanges) {
      const [lowerBound, upperBound] = priceRange.range.split(' - ').map(Number);
      if (lowerBound <= price && price < upperBound) {
          priceRange.frequency++;
          break;
      }
      }
  });

  // Convert to JSON
  const priceRangeJson = JSON.stringify(priceRanges, null, 4);
  
  return priceRangeJson;
};
