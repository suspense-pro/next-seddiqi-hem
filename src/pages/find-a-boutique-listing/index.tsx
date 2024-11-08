import React, { useEffect, useState } from "react";
import styles from "./findABotiqueListing.module.scss";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import compact from "lodash/compact";
import Layout from "@components/layout";
import NeedMoreHelp from "@components/rendering/needMoreHelp";
import ContentBlock from "@components/module/contentBlock";
import UseFetchStores from "@utils/useCustomHooks/useFetchStores";
import MapView from "@components/module/mapView";
import { useDeviceWidth } from "@utils/useCustomHooks";
import { CloseIcon, FilterIcon, LocationIcon, SearchIcon } from "@assets/images/svg";
import StoreMapListContainer from "@components/module/storeMapListContainer";
import LocationTabs from "@components/module/locationTabs";
import { getDistance } from "@utils/helpers/getDistance";
import ToggleMapResults from "@components/module/toggleMapResults";

import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { SideDrawer, Typography } from "@components/module";
import { FilterAccordian, FilterAccordionItem } from "@components/module/filterAccordian";
import CheckboxFilter from "@components/module/checkboxFilter";
import SearchIcon2 from "@assets/images/svg/SearchIcon2";
import { useRouter } from 'next/router';


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "find-a-boutique-listing" },
      },
    },
    context
  );

  return {
    props: {
      ...data,
    },
  };
}


export default function FindABoutiqueListing({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeToggle, setActiveToggle] = useState(true);
  const [fadeList, setFadeList] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [activeTab, setActiveTab] = useState('All');
  const [cities, setCities] = useState([]);
  const [filtersPopup, showFiltersPopup] = useState(false);
  const [locationCheckboxValues, setLocationCheckboxValues] = useState([]);
  const [brandCheckboxValues, setBrandCheckboxValues] = useState([]);
  const [serviceCheckboxValues, setServiceCheckboxValues] = useState([]);
  const [openAccordion, setOpenAccordion] = useState("brands"); // Default open accordion

  const handleToggleAccordion = (accordion) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  const tabs = [
    { label: 'All Boutiques', value: 'All' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
  ];

  const filtersItem = [
    { 
      id: "1", 
      label: 'Brands', 
      values: brandCheckboxValues.map(brand => ({ key: brand, label: brand || 'Unknown' }))
    },
    { 
      id: "2", 
      label: 'Locations', 
      values: locationCheckboxValues.map(address => ({ key: address, label: address || 'Unknown' }))
    },
    { 
      id: "3", 
      label: 'Services', 
      values: serviceCheckboxValues.map(service => ({ key: service, label: service || 'Unknown' }))
    },
  ];

  const handleStoreClick = (index) => {
    setActiveIndex(index); // Set the clicked store as active
  };

  const [isMobile] = useDeviceWidth();

  const handleStoreDetails = (storeId) => {
  router.push(`/find-a-boutique-details/${storeId}`); 
};


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const result = await UseFetchStores('', '', '', '');
        setStores(result.response);

        // Extract unique cities
        const uniqueCities = [...new Set(result.response.map(store => store.city))];
        setCities(uniqueCities);

        const filteredCity = result.response.filter(store => 
          store.city === 'Dubai' || store.city === 'Abu Dhabi'
        );

        const filteredAddresses = result.response
        .filter(store => store.city === 'Dubai' || store.city === 'Abu Dhabi')
        .map(store => store.address1);

        // Uncomment the first const uniqueAddresses line below for dynamic addresses and comment out the second const uniqueAddresses
        //const uniqueAddresses = [...new Set(result.map(store => store.address1))];
        const uniqueAddresses = [...new Set(filteredAddresses)];
        //setLocationAddresses(uniqueAddresses);
        setLocationCheckboxValues(uniqueAddresses);

        //const uniqueBrands = [...new Set(result.response.flatMap(store => store.c_availableBrands))]; 
        const uniqueBrands = [...new Set(filteredCity.flatMap(store => store.c_availableBrands))];
        setBrandCheckboxValues(uniqueBrands);

        const uniqueServices = [...new Set(filteredCity.flatMap(store => store.c_services))];
        setServiceCheckboxValues(uniqueServices);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
      });
    }
  }, []);

  useEffect(() => {
    if (stores.length > 0 && userLocation) {
      const nearest = calculateNearestStore(stores);
      setNearestStore(nearest);
    }
  }, [stores, userLocation]);

  useEffect(() => {
    console.log("uniqueBrands2: ", brandCheckboxValues);
  }, [brandCheckboxValues]);

  const calculateNearestStore = (storesList) => {
    if (!userLocation || storesList.length === 0) return null;

    const distances = storesList.map(store => {
      const storeLocation = { lat: store.latitude, lng: store.longitude };
      return {
        store,
        distance: getDistance(userLocation, storeLocation)
      };
    });

    return distances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr)).store;
  };

  const handleLoadMore = () => {
    setItemsToShow(prevItems => prevItems + 8); // Increment items to show by 8
  };

  const handleTabChange = (tab) => {
    setFadeList(true);
    setTimeout(() => {
      setActiveTab(tab);
      setItemsToShow(8);
      setFadeList(false);

      const storesToCalculate = tab === 'All' ? stores : stores.filter(store => store.city === tab);
      const nearest = calculateNearestStore(storesToCalculate);
      setNearestStore(nearest);
    }, 300);
  };

  const handleToggleChange = (toggle) => {
    setFadeList(true);
    setTimeout(() => {
      setActiveToggle(toggle);
      setFadeList(false);
    }, 300);
  };

  const renderStores = (storesList) => {
    const displayedStores = storesList.slice(0, itemsToShow);

    return (
      <>
        <ul className={styles.storeList}>
        {displayedStores.map(store => (
          <li className={styles.store} key={store.id} onClick={() => handleStoreDetails(store.id)}>
            <div className={styles.storeImageContainer}>
              <img src={store.c_storeImage} alt={store.name} className={styles.storeImage} />

              {/* Uncomment the commented codes below this to show the nearest store label in the image */}
              {/* {activeToggle ? (
                  <>
                    {nearestStore && nearestStore.id === store.id && (
                      <h3 className={styles.nearestStore}>Nearest Store</h3>
                    )}
                  </>
                ) : null} */}
            </div>

            <div className={styles.storeDetails}>
              <h4 className={styles.storeName}>{store.name}</h4>

              <div className={styles.storeLocation}>
                <LocationIcon />

                <p><span>{store.city}</span><span>{store.address1}</span></p>
              </div>
            </div>
          </li>
        ))}
        </ul>
      
        {storesList.length > itemsToShow && (
          <button className={`${[styles.loadMore]} button transparent`} onClick={handleLoadMore}>Load More</button>
        )}
      </>
    );
  };

  const renderMaps = (storesList) => {
    if (storesList.length === 0) return null;

    return (
      <>
        <div className={styles.mapContainer}>
          {nearestStore && (
            <MapView 
              nearestStore={nearestStore} 
              stores={stores} 
              activeStore={stores[activeIndex]} 
              userLocation={userLocation}
            />
          )}
        </div>

        <StoreMapListContainer 
          storesList={storesList} 
          activeIndex={activeIndex} 
          handleStoreClick={handleStoreClick} 
          isMobile={!isMobile} 
          isAbsolutePosition={true}
          needScrollbar={true} //For Desktop Only
        />
      </>
    );
  };

  //const combinedStores = stores;
  const combinedStores = stores.filter(store => 
    store.city.toLowerCase() === 'dubai' || store.city.toLowerCase() === 'abu dhabi'
  );

  //Open Filters Popup
  const [filters, setFiltersState] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [popupActiveTab, setPopupActiveTab] = useState('All');

  const popupTabs = [
    { label: 'All Boutiques', value: 'All' },
    { label: 'Dubai', value: 'Dubai' },
    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
  ];

  const openFilters = () => {
    showFiltersPopup(true);
  };

  useEffect(() => {
    setFiltersState({});
  }, []);

  const calculateStoreCounts = (storesList) => {
    const combinedStores = storesList.filter(store => 
      store.city.toLowerCase() === 'dubai' || store.city.toLowerCase() === 'abu dhabi'
    );
  
    return {
      All: combinedStores.length,
      ...Object.fromEntries(cities.map(city => [city, combinedStores.filter(store => store.city === city).length])),
    };
  };
  
  // Store counts state
  const [storeCounts, setStoreCounts] = useState(calculateStoreCounts(stores));
  
  // Update store counts whenever filters change
  useEffect(() => {
    const filteredStores = getFilteredStores();
    setStoreCounts(calculateStoreCounts(filteredStores));
  }, [filters, activeTab, stores]);

  /*const getFilteredStores = () => {
    let filteredStores = stores;
  
    // Filter by city
    if (activeTab !== 'All') {
      filteredStores = filteredStores.filter(store => store.city === activeTab);
    }
  
    // Filter by brands
    if (filters['1'] && filters['1'].length > 0) {
      filteredStores = filteredStores.filter(store =>
        filters['1'].some(brand => store.c_availableBrands.includes(brand))
      );
    }
  
    // Filter by locations
    if (filters['2'] && filters['2'].length > 0) {
      filteredStores = filteredStores.filter(store =>
        filters['2'].includes(store.address1)
      );
    }
  
    // Filter by services
    if (filters['3'] && filters['3'].length > 0) {
      filteredStores = filteredStores.filter(store =>
        filters['3'].some(service => store.c_services.includes(service))
      );
    }
  
    return filteredStores;
  };*/

  const getFilteredStores = () => {
    let filteredStores = stores;

    if (activeTab === 'All') {
        filteredStores = filteredStores.filter(store =>
            store.city === 'Dubai' || store.city === 'Abu Dhabi'
        );
    } else {
        filteredStores = filteredStores.filter(store => store.city === activeTab);
    }

    if (filters['1'] && filters['1'].length > 0) {
      filteredStores = filteredStores.filter(store =>
          filters['1'].some(brand => 
              store.c_availableBrands?.includes(brand)
          )
      );
    }

    if (filters['2'] && filters['2'].length > 0) {
        filteredStores = filteredStores.filter(store =>
            filters['2'].includes(store.address1)
        );
    }

    if (filters['3'] && filters['3'].length > 0) {
        filteredStores = filteredStores.filter(store =>
            filters['3'].some(service => store.c_services.includes(service))
        );
    }

    return filteredStores;
  };

  const handleOptionChange = (filterKey, option) => {
    setFiltersState((prevFilters) => {
        const prevSelectedOptions = prevFilters[filterKey] || [];
        const newSelectedOptions = prevSelectedOptions.includes(option)
            ? prevSelectedOptions.filter((selected) => selected !== option)
            : [...prevSelectedOptions, option];
  
        // Combine all selected options into one state
        const combinedOptions = {
            ...prevFilters,
            [filterKey]: newSelectedOptions,
        };
  
        return combinedOptions;
    });
  };

  const handleDelete = (filterKey, option) => {
    setFiltersState((prevFilters) => {
      if (filterKey === "sortOption") {
        return { ...prevFilters, sortOption: undefined };
      }

      const prevSelectedOptions = prevFilters[filterKey] || [];

      if (Array.isArray(prevSelectedOptions)) {
        const newSelectedOptions = prevSelectedOptions.filter(
          (selected) => selected !== option
        );

        return { ...prevFilters, [filterKey]: newSelectedOptions };
      }

      return prevFilters;
    });
  };

  const handleClearAll = () => {
    setFiltersState({});
  };
  
  const handlePopupTabChange = (tab) => {
    setFadeList(true);

    setTimeout(() => {
        setPopupActiveTab(tab);
        
        // const filteredStores = tab === 'All' 
        //     ? stores 
        //     : stores.filter(store => store.city === tab);
        const filteredStores = tab === 'All' 
            ? stores.filter(store => store.city === 'Dubai' || store.city === 'Abu Dhabi') 
            : stores.filter(store => store.city === tab);
        
        const filteredAddresses = [...new Set(filteredStores.map(store => store.address1))];
        const filteredBrands = [...new Set(filteredStores.flatMap(store => store.c_availableBrands))];
        const filteredServices = [...new Set(filteredStores.flatMap(store => store.c_services))];

        setLocationCheckboxValues(filteredAddresses);
        setBrandCheckboxValues(filteredBrands);
        setServiceCheckboxValues(filteredServices);
        
        setFadeList(false);
    }, 300);
};

  const handleClearCheckboxes = (filterKey) => {
    setFiltersState((prevFilters) => ({
      ...prevFilters,
      [filterKey]: [],
    }));
  };

  const totalSelectedCount = filters 
  ? Object.values(filters).reduce((acc: number, curr: unknown) => {
      return acc + (Array.isArray(curr) ? curr.length : 0);
    }, 0)
  : 0;

  return (
    <>
      <div className={styles.heroBannerWrapper}>
      {compact(content?.page?.components).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
      </div>

      <div className={styles.storeLocatorContainer}>
        
        <div className={styles.tabsSwiperContainer}>
          <div className={styles.filtersContainer}>
            <button 
              className={styles.filterButton}
              onClick={openFilters}
            >
              <FilterIcon />

              <span>
                {`Filters By (${totalSelectedCount < 10 ? `0${totalSelectedCount}` : totalSelectedCount})`}
              </span>
            </button>
          </div>

          {/* <LocationTabs activeTab={activeTab} handleTabChange={handleTabChange} tabs={[{ label: 'All Boutiques', value: 'All' }, ...cities.map(city => ({ label: city, value: city }))]}  /> */}
          <LocationTabs activeTab={activeTab} handleTabChange={handleTabChange} tabs={tabs} />
        </div>

        {Object.keys(filters).some(filterKey => 
          Array.isArray(filters[filterKey]) && filters[filterKey].length > 0) && (
          <div className={styles.optionsContainer}>
              <div className={styles.selectedOptions}>
                  {Object.keys(filters).flatMap((filterKey) => 
                      Array.isArray(filters[filterKey]) ? 
                          filters[filterKey].map((option, index) => (
                              <div key={index} className={styles.selectedOption}>
                                  <Typography align="left" variant="p" className={styles.option}>
                                      {option}
                                  </Typography>
                                  <div
                                      className={styles.deleteOption}
                                      onClick={() => handleDelete(filterKey, option)}
                                  >
                                      <CloseIcon />
                                  </div>
                              </div>
                          )) 
                          : []
                  )}
              </div>

              <button className={`${styles.clearAll} button plain green_dark`} onClick={handleClearAll}>
                  <span>Clear All</span>
              </button>
          </div>
        )}

        <ToggleMapResults 
          onToggle={handleToggleChange} 
          activeTab={activeTab} 
          storeCounts={storeCounts} 
        />

        <div className={`${styles.storeListContainer} ${fadeList ? styles.fadeOut : styles.fadeIn}`}>
          {activeToggle ? 
            renderStores(getFilteredStores()) : 
            renderMaps(getFilteredStores())
          }
        </div>
      </div>

      <NeedMoreHelp />

      <SideDrawer
        isOpen={filtersPopup}
        onClose={() => showFiltersPopup(false)}
        showFooter={true}
        onSubmit={null}
        onClearAll={handleClearAll}
        showBackButton={false}
        title="Filter"
        position={""}
      >

        {Object.keys(filters).some(filterKey => Array.isArray(filters[filterKey]) && filters[filterKey].length > 0) && (
          <div className={styles.selectedOptions}>
            {Object.keys(filters).map((filterKey) =>
              Array.isArray(filters[filterKey])
                ? filters[filterKey].map((option, index) => (
                    <div key={index} className={styles.selectedOption}>
                      <Typography
                        align="left"
                        variant="p"
                        className={styles.option}
                      >
                        {option}
                      </Typography>
                      <div
                        className={styles.deleteOption}
                        onClick={() => handleDelete(filterKey, option)}
                      >
                        <CloseIcon />
                      </div>
                    </div>
                  ))
                : null
            )}
          </div>
        )}

        <FilterAccordian>
          {filtersItem.map((filterItem) => {
            const selectedOptionsCount = filters[filterItem.id]?.length || 0;

            return (
              <FilterAccordionItem
                key={filterItem.id}
                title={filterItem.label}
                onClear={() => handleClearCheckboxes(filterItem.id)}
                selectedCount={selectedOptionsCount}
                isOpen={openAccordion === filterItem.label.toLowerCase()}
                onToggle={() => handleToggleAccordion(filterItem.label.toLowerCase())}
              >
                {filterItem.label.toLowerCase() === 'brands' && (
                  <>
                    <div className={styles.searchInputContainer}>
                      <SearchIcon2 className={styles.searchIcon} />
                      <input 
                        type="text" 
                        placeholder="Search for brands" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className={styles.searchInput}
                      />
                    </div>

                    {filterItem.values && (
                      <>
                        <CheckboxFilter
                          title={filterItem.label}
                          options={brandCheckboxValues
                            .filter(label => label && label.toLowerCase().includes(searchQuery.toLowerCase()))} // Ensure label is defined
                          filterKey={filterItem.id}
                          onOptionChange={handleOptionChange}
                          selectedOptions={filters[filterItem.id] || []}
                        />
                        
                        {/* Add no results found message */}
                        {filterItem.values
                          .map((val) => val.label)
                          .filter((label) => label && label.toLowerCase().startsWith(searchQuery.toLowerCase())).length === 0 && (
                          <div className={styles.noResults}>
                            No brands found
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                {filterItem.label.toLowerCase() === 'locations' && ( 
                  <>
                    {/* <LocationTabs activeTab={popupActiveTab} handleTabChange={handlePopupTabChange} tabs={[{ label: 'All', value: 'All' }, ...cities.map(city => ({ label: city, value: city }))]}  /> */}
                    <LocationTabs 
                      activeTab={popupActiveTab} 
                      handleTabChange={handlePopupTabChange} 
                      tabs={popupTabs} 
                    />

                    <div className={`${styles.locationCheckboxContainer} ${fadeList ? styles.fadeOut : styles.fadeIn}`}>
                      {filterItem.values && (
                        <CheckboxFilter
                          title={filterItem.label}
                          options={filterItem.values
                            .map((val) => val.label)
                            .filter((label) => label.toLowerCase().includes(searchQuery.toLowerCase()))}
                          filterKey={filterItem.id}
                          onOptionChange={handleOptionChange}
                          selectedOptions={filters[filterItem.id] || []}
                        />
                      )}
                    </div>
                  </>
                )}
                {filterItem.label.toLowerCase() === 'services' && (
                  <>
                  {filterItem.values && (
                    <CheckboxFilter
                      title={filterItem.label}
                      options={filterItem.values
                        .map((val) => val.label)
                        .filter((label) => label.toLowerCase().includes(searchQuery.toLowerCase()))}
                      filterKey={filterItem.id}
                      onOptionChange={handleOptionChange}
                      selectedOptions={filters[filterItem.id] || []}
                    />
                  )}
                  </>
                )}
              </FilterAccordionItem>
            )
          })}
        </FilterAccordian>
        
      </SideDrawer>
    </>
  );
};


FindABoutiqueListing.Layout = Layout;
