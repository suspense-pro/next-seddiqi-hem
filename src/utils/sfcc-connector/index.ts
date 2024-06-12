import { Product, Search } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "./config";



export default async function getProducts(searchQuery) {

  const configWithAuth = await initializeShopperConfig();

  const searchClient = new Search.ShopperSearch(configWithAuth);
  const searchResults = await searchClient.productSearch({
    parameters: { q: searchQuery },
  });

  const results = [];

  const productsClient = new Product.ShopperProducts(configWithAuth);

  await Promise.all(
    searchResults.hits.map(async (product) => {
      const productResults = await productsClient.getProduct({
        parameters: {
          organizationId: clientConfig.parameters.organizationId,
          siteId: clientConfig.parameters.siteId,
          id: product.productId,
        },
      });

      /* Transform Product Results Here before pusing in the Results Array */

      results.push(productResults);
    }),
  );

  return results;
}
