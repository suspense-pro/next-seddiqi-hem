import React, { useEffect, useRef, useState } from "react";
import Image from "../../module/image";
import styles from "./pdpTabs.module.scss";
import Typography from "../../module/typography";
import { PdpTabsDummyData, TechSpecsDummyData } from './dummyData';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const PdpTabs: React.FC = () => {
  const tabsData = PdpTabsDummyData.tabsData;
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  /**** The codes below this comment are for the Tech Specs Accordion ****/
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);

      console.log("Content Height:", contentHeight);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);

    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Adjust the scroll position by the offset
      setTimeout(() => {
        window.scrollBy(0, 0); // Adjust the offset value as needed
      }, 500); // Delay to match the smooth scroll duration

      /*const scrollToElementWithCustomOffset = (selector: any, offset: number) => {
        const element = selector;
        if (!element) return;
    
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top + window.scrollY;
        const targetPosition = elementTop - offset;
    
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
      }

      scrollToElementWithCustomOffset(contentRef.current, 300);*/
    }

    const targetEl:any = document.querySelector(".techSpecsContainerClass");

    targetEl.classList.remove("techSpecsContainerClassOpened");
    targetEl.style.height = targetEl.clientHeight;
  }
  /**** End for Tech Specs Accordion codes ****/


  /**** The codes below this comment are for the Tech Specs List Accordion ****/
  const techSpecsData = TechSpecsDummyData.specsData;
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  // Create a ref array dynamically based on the number of items
  const contentRefs = useRef<HTMLUListElement[]>([]);
  const [itemsListHeights, setItemsListHeights] = useState<number[]>(new Array(techSpecsData[0].specs.length).fill(0));
  const [techSpecsContainerHeight, setTechSpecsContainerHeight] = useState<number>(0);

  // Function to toggle the accordion for a specific item
  const toggleAccordion = (index: number) => {
    setOpenItemIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Function to update content heights dynamically
  const updateHeights = () => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        const height = openItemIndex === index ? ref.scrollHeight : 0;
        /*setItemsListHeights(prevHeights => {
          const newHeights = [...prevHeights];
          newHeights[index] = height;
          return newHeights;
        });*/
        ref.style.height = `${height}px`;
      }
    });

    const targetEl = document.querySelector(".techSpecsContainerClass");
    const classToAdd = document.querySelector(".techSpecsContainerClassOpened");

    if(isOpen === true) { 
      
      if(classToAdd === null || classToAdd === undefined){
        targetEl.classList.add("techSpecsContainerClassOpened");
      }
    }
  };

  // Effect to handle changes in openItemIndex and resize events
  useEffect(() => {
    // Update heights on openItemIndex change
    updateHeights();

    // Add resize event listener
    const handleResize = () => {
      // Update heights on resize
      updateHeights();

      const targetEl:any = document.querySelector(".techSpecsContainerClass");
      targetEl.classList.remove("techSpecsContainerClassOpened");

      setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [openItemIndex]);
  /**** End for Tech Specs List Accordion codes ****/

  return (
    <div className={styles.pdpTabsContainer}>
      <div className={styles.tabsContainer}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={16}
          breakpoints={{
            800: {
              spaceBetween: 60,
            }
          }}
          className={styles.tabHeaders}
        >
          {tabsData.map(tab => (
            <SwiperSlide key={tab.id} className={styles.tabSlide}>
              <button
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.tabTitle}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.tabContent}>
          <div className={styles.tabDataContent}>
            {tabsData.map(tab => (
              <div
                key={tab.id}
                className={`${styles.tabPane} ${activeTab === tab.id ? styles.fadeIn : styles.fadeOut}`}
              >
                <ul className={styles.specsContainer}>
                  {tab.specs.map(specs => (
                    <li key={specs.title}>
                      <h5>{specs.title}</h5>
                      <p>{specs.description}</p>
                    </li>
                  ))}
                </ul>

                <img
                  src={tab.productImageUrl}
                  className={styles.productImage}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.techSpecsContent}>
        <div className={`${[styles.techSpecsContainer]} techSpecsContainerClass`} style={{ height: isOpen ? `${contentHeight}px` : '0' }} ref={contentRef}>
          <h3 className={`${[styles.techSpecsMainTitle]}`}>{techSpecsData[0].mainTitle}</h3>

          <ul className={styles.mainSpecsList}>
            {techSpecsData[0].specs.map((spec, index) => (
              <li key={spec.id} className={styles.spec}>
                <h4 className={`${styles.specTitle} ${openItemIndex === index ? styles.openedSpec : ''}`} onClick={() => toggleAccordion(index)}>
                  {spec.specsTitle}
                </h4>
                
                <ul
                  className={styles.itemsList}
                  ref={el => contentRefs.current[index] = el}
                  style={{ height: `${itemsListHeights[index]}px` }}
                >
                  {spec.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.item}>
                      <h5 className={styles.itemTitle}>{item.itemTitle}</h5>
                      <p className={styles.itemDescription}>{item.itemDescription}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <button className={`${styles.viewMoreDetails} ${isOpen ? styles.isOpened : ''} button plain dark_green`} onClick={handleToggle}>
          <span>View More Details</span>
        </button>
      </div>
    </div>
  );
};

export default PdpTabs;