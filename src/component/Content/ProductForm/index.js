import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { addProduct, updateProduct } from '../service';

const cx = classNames.bind(styles);

function ProductForm({ data, categories , onClose, title, refreshData}) {
    
    const inputImageRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(data.images.map(image => `http://localhost:8080/img/${image}`));
    const [seletedCategory, setSeletedCategory] = useState(categories && categories[0] && categories[0].categoryName);
    const [productName, setProductName] = useState(data.productName);
    const [productDescription, setProductDescription] = useState(data.productDescription);
    const [productPrice, setProductPrice] = useState(data.price);
    const [stockQuantity, setStockQuantity] = useState(data.stock);
    const [piece, setPiece] = useState(data.pieces);
    const [imageFiles, setImageFiles] = useState([]);

    const handleChooseImage = (e) => {
        e.preventDefault();
        inputImageRef.current.click();
    };

    const handlePreviewImage = (e) => {
        const files = e.target.files;

        if(files.length > 10) {
            alert('You can only upload 10 images at a time');
            return;
        }else {
            const newImageURLs = Array.from(files).map((file) => URL.createObjectURL(file));
            setPreviewImage((prevImages) => [...prevImages, ...newImageURLs]);
            setImageFiles((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleCloseImage = (e, i) => {
        e.preventDefault();
        setPreviewImage((prevImages) => {
            const newImages = prevImages.filter((_, index) => index !== i);

            if (newImages.length === 0) {
                inputImageRef.current.value = '';
            }
            setImageFiles(newImages);
            return newImages;
            
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('stock', stockQuantity);
        formData.append('piece', piece);
        formData.append('desc', productDescription);
        formData.append('category', seletedCategory);
        imageFiles.forEach((file) => {
            formData.append(`images`, file);
        });

        try {
            if(title === 'Add New Product') {
                await addProduct(formData);
                alert("Add product successfully!");
            }
            if(title === 'Update Product') {
                await updateProduct(formData, data.productId);
                alert("Add product successfully!");
            }
            onClose(false);
            refreshData(1)
        } catch (error) {
            alert("Something went wrong, error: " + error.message);
        }
    }

    const handleCloseForm = (e) => {
        e.preventDefault();
        onClose(false);
    }

    return (
        <div className={cx('overview_container')}>
            <div className={cx('overview_wrapper')}>
                <div className={cx('overview_title')}>
                    <h1>{title}</h1>
                </div>
                <div className={cx('form_container')}>
                    <form encType="multipart/form-data">
                        <div className={cx('input_form_container')}>
                            <label htmlFor="name">Enter the name</label>
                            <input type="text" name="name" value={productName} onChange={(e) => setProductName(e.target.value)}/>
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="price">Enter the price</label>
                            <input type="number" name="price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="stock">Enter the stock</label>
                            <input type="number" name="stock" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)}/>
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="piece">Enter the piece</label>
                            <input type="number" name="piece" value={piece} onChange={(e) => setPiece(e.target.value)}/>
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="des">Enter the description</label>
                            <textarea name="des" cols="64" rows="6" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="category">Select Category</label>
                            <select 
                                name="category" 
                                value={seletedCategory} 
                                className={cx('select_input')}
                                onChange={(e) => setSeletedCategory(e.target.value)}
                            >
                                {categories && categories.map((item, index) => (
                                    <option key={index} value={item.categoryName}>{item.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{flexDirection: "column"}} className={cx('input_form_container-image')}>
                            <button onClick={(e) => handleChooseImage(e)} className={cx('choose-image-button')}>
                                Upload image
                            </button>
                            <input
                                ref={inputImageRef}
                                type="file"
                                hidden
                                name="files"
                                accept="image/png, image/jpeg"
                                multiple
                                onChange={handlePreviewImage}
                            />
                            <ul className={cx('image-reviews')}>
                                {previewImage &&
                                    previewImage.map((image, index) => (
                                        <li key={index} className={cx('image-preview-container')}>
                                            <img src={image} alt="" data-test="photo-preview" />
                                            <button
                                                onClick={(e) => handleCloseImage(e, index)}
                                                aria-label="Remove photo"
                                                data-test="photo-remove"
                                                data-di-id="di-id-70bfee02-e675ba25"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 17 17"
                                                    aria-hidden="true"
                                                    data-di-res-id="6c715e50-2706d963"
                                                    data-di-rand="1710988696177"
                                                >
                                                    <path
                                                        d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className={cx('action_form_container')}>
                            <button className={cx('cancel_btn')} onClick={(e) => handleCloseForm(e)}>
                                Cancel
                            </button>
                            <button className={cx('submit_btn')} onClick={(e) => handleSave(e)}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;