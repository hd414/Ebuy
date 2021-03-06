import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Loader from '../../../components/Loader/loader.component';
import { GlobalState } from '../../../context/globalState';
import axiosInstance from '../../../helpers/axios';
import './createProduct.css';

const CreateProduct = () => {


    const InititalState = {
        title: "",
        price: 0,
        description: "",
        content: "",
        category: "",
        quantity: ''
    }

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(InititalState)
    const [categories] = state.Categories.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.User.isAdmin
    const [token] = state.Token

    const history = useHistory()
    const param = useParams()

    // const [products] = state.Products.products;
    const [onEdit, setOnEdit] = useState(false)
    const [shopProducts, setShopProducts] = state.User.ShopProducts;
    const [shopCallback, setShopCallback] = state.User.ShopCallback;
    // const [callback, setCallback] = state.Products.callback

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            shopProducts.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })

        } else {
            setOnEdit(false)
            setProduct(InititalState)
            setImages(false)
        }
    }, [param.id, shopProducts])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axiosInstance.post('/uploads', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axiosInstance.post('/uploads/delete', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            if (!images) return alert("No Image Upload")

            if (onEdit) {
                await axiosInstance.put(`/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }
                })
            } else {
                await axiosInstance.post('/products', { ...product, images }, {
                    headers: { Authorization: token }
                })
            }
            setShopCallback(!shopCallback)
            if (onEdit)
                history.push('/shop_products')
            // history.push("/")
        } catch (err) {
            // console.log(err.data.error);
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loader /></div>

                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestroy}><i class="fa fa-times-circle"></i></span>
                        </div>
                }

            </div>

            <form onSubmit={handleSubmit}>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                        value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Quantity</label>
                    <input type="text" name="quantity" id="quantity" required
                        value={product?.quantity} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
