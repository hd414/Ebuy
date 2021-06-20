import React, { useContext } from 'react'
import { GlobalState } from '../../../../context/globalState';
import './filter.css';


function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.Categories.categories
    const [category, setCategory] = state.Products.category
    const [sort, setSort] = state.Products.sort
    const [search, setSearch] = state.Products.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span className="filter_labels">Filters: </span>
                <select className="filter_select" name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} className="fontAwesome filter_input" placeholder=" &#xf002;  Search products"
                onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span className="filter_labels">Sort By: </span>
                <select className="filter_select" value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
