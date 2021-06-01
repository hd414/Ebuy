import React, { useContext, useState } from 'react'
import { GlobalState } from '../../context/globalState'
import axiosInstance from '../../helpers/axios'
import './category.css'

const Category = () => {
    const state = useContext(GlobalState)
    const [categories] = state.Categories.categories
    const [category, setCategory] = useState('')
    const [token] = state.Token
    const [callback, setCallback] = state.Categories.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                const res = await axiosInstance.put(`/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                alert("category updated")
            } else {
                const res = await axiosInstance.post('/category/create', { name: category }, {
                    headers: { Authorization: token }
                })
                alert("category created")
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.error)
        }
    }

    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id => {
        try {
            const res = await axiosInstance.delete(`/category/${id}`, {
                headers: { Authorization: token }
            })
            alert("category deleted")
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required
                    onChange={e => setCategory(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Category
