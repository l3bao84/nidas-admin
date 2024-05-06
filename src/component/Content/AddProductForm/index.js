import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AddProductForm({ onClose }) {

    const inputImageRef = useRef(null);
    const [previewImage, setPreviewImage] = useState([]);

    const handleCloseForm = (e) => {
        e.preventDefault();
        onClose(false);
    };

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
        }
    };

    const handleCloseImage = (e, i) => {
        e.preventDefault();
        setPreviewImage((prevImages) => {
            const newImages = prevImages.filter((_, index) => index !== i);

            if (newImages.length === 0) {
                inputImageRef.current.value = '';
            }

            return newImages;
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        onClose(false);
    }
    
    return (
        <div className={cx('overlay')}>
            <div className={cx('modal_container')}>
                <div className={cx('modal_container-header')}>
                    <h2>Add New Product</h2>
                    <button onClick={(e) => handleCloseForm(e)} className={cx('button_close-header')}>
                        <FontAwesomeIcon icon={faClose} style={{ fontSize: '24px' }} />
                    </button>
                </div>
                <div className={cx('form_container')}>
                    <form encType="multipart/form-data">
                        <div className={cx('input_form_container')}>
                            <label htmlFor="name">Enter the name</label>
                            <input type="text" name="name" />
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="price">Enter the price</label>
                            <input type="number" name="price" />
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="stock">Enter the stock</label>
                            <input type="number" name="stock" />
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="piece">Enter the piece</label>
                            <input type="number" name="piece" />
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="des">Enter the description</label>
                            <textarea name="des" cols="30" rows="4"></textarea>
                        </div>
                        <div className={cx('input_form_container')}>
                            <label htmlFor="category">Select Category</label>
                            <select name="category" className={cx('select_input')}>
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="accessories">Accessories</option>
                                <option value="furniture">Furniture</option>
                            </select>
                        </div>
                        <div style={{alignItems: "center"}} className={cx('input_form_container')}>
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

export default AddProductForm;
