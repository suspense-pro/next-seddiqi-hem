import React from 'react'
import styles from './filterBar.module.scss'
import FilterBtn from '../filterBtn'

const FilterBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterBtns}>
        <FilterBtn icon={true} label={"All Filter & Sort by"} />
        <FilterBtn label={"New"} />
        <FilterBtn label={"Exclusive"} />
        <FilterBtn label={"Gifts"} />
        <FilterBtn label={"Messika"} />
        <FilterBtn label={"Bvlgari"} />
      </div>
      <div className={styles.productsLength}>328 Products</div>
    </div>
  )
}

export default FilterBar