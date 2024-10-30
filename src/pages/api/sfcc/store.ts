import { NextApiRequest, NextApiResponse } from "next";
import { Seller } from "commerce-sdk";
import initializeShopperConfig, { clientConfig } from "@utils/sfcc-connector/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    const query = req.query.api ?? "";
    const action = req.query.action ?? "";
    const { brand, city, name, service } = req.query;

    switch (query) {
        case "search":
            try {
                if (requestMethod === "GET" && action === "getStores") {
                    const configWithAuth = await initializeShopperConfig()
                    const accessToken = configWithAuth.access_token;
                    clientConfig.headers['authorization'] = `Bearer ${accessToken}`;
                    const shopperStoresClient = new Seller.ShopperStores(clientConfig);

                    const options = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                        parameters: {
                            organizationId: clientConfig.parameters.organizationId,
                            siteId: clientConfig.parameters.siteId,
                            countryCode: 'AE',
                            latitude: 38.7946,
                            longitude: 106.5348,
                            limit: 100,
                        },
                    };

                    const storeResults = await shopperStoresClient.searchStores(options);
                    let filteredStores = [];

                    const brands = Array.isArray(brand) ? brand : brand?.split(",");
                    const cities = Array.isArray(city) ? city : city?.split(",");
                    const names = Array.isArray(name) ? name : name?.split(",");
                    const services = Array.isArray(service) ? service : service?.split(",");

                    // If no filters are provided, return all stores
                    if (!brands && !cities && !names && !services) {
                        filteredStores = storeResults.data;
                    } else {
                        // Apply OR filtering if any filters are provided

                        // Filter by brand
                        if (brands) {
                            filteredStores = [
                              ...filteredStores,
                              ...storeResults.data.filter((store: any) =>
                                brands.some((b) => store.c_availableBrands?.includes(b))
                              ),
                            ];
                        }
                      
                        if (cities) {
                            filteredStores = [
                                ...filteredStores,
                                ...storeResults.data.filter((store: any) =>
                                cities.some((c) => store.city?.toLowerCase().includes(c.toLowerCase()))
                                ),
                            ];
                        }
                    
                        if (names) {
                            filteredStores = [
                                ...filteredStores,
                                ...storeResults.data.filter((store: any) =>
                                names.some((a) => store.name?.toLowerCase().includes(a.toLowerCase()))
                                ),
                            ];
                        }

                        if (services) {
                            filteredStores = [
                                ...filteredStores,
                                ...storeResults.data.filter((store: any) =>
                                services.some((a) => store.c_services?.toLowerCase().includes(a.toLowerCase()))
                                ),
                            ];
                        }
                    
                        // Remove duplicates from filteredStores
                        filteredStores = filteredStores.filter(
                          (store, index, self) => index === self.findIndex((s) => s.id === store.id)
                        );

                    }
                    
                    // Sort by `c_priority` if it exists, defaulting to a higher value for missing priority
                    filteredStores.sort((storeA: any, storeB: any) => {
                        return (parseInt(storeA.c_priority || '999')) - (parseInt(storeB.c_priority || '999'));
                    });
                    
                    // Extract available brands, cities, and names from the filteredStores
                    const availableBrands = [...new Set(filteredStores.flatMap((store: any) => store.c_availableBrands || []))];
                    const availableCities = [...new Set(filteredStores.map((store: any) => store.city))];
                    const availableNames = [...new Set(filteredStores.map((store: any) => store.name))];
                    const availableServices = [...new Set(filteredStores.flatMap((store: any) => store.c_services || []))];
                    

                    if (filteredStores.length > 0) {
                        // console.log("Filtered Stores : " + JSON.stringify(filteredStores, null, 4));
                        return res.status(200).json({ 
                            isError: false, 
                            response: filteredStores, 
                            availableFilters: {
                                availableBrands,
                                availableCities,
                                availableNames,
                                availableServices
                            }
                        });
                    } else {
                        console.log("No store found.");
                        return res.status(400).json({ isError: true, response: "No store found." });
                    }
                }

            } catch(err) {
                console.error(err);
      
                return {
                    statusCode: 500,
                    body: JSON.stringify({ msg: err }),
                };
            }
        break;
        default:
            return res.status(400).json({ isError: true });
    }
}

export default handler;
