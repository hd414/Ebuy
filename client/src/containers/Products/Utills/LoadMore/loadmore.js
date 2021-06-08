import React, { useContext } from 'react'
import { GlobalState } from '../../../../context/globalState'
// import './loadmore.css'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.Products.page
    const [result] = state.Products.result
    console.log("result", result, "page", page);

    return (
        <div className="load_more">
            {
                result < page * 9 ? ""
                    : <button id="load_more_btn" onClick={() => setPage(page + 1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore
