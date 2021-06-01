import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../helpers/axios'

function CategoriesApi() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            const res = await axiosInstance.get('/category/get')
            setCategories(res.data)
        }

        getCategories()
    }, [callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesApi
