import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEllipsisVertical, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddProductForm from '../AddProductForm';
import { useProducts, getCategories, removeProduct } from '../service';
import ProductForm from '../ProductForm';

const cx = classNames.bind(styles);

function Products() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductForm, setShowProductForm] = useState(false);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('Add New Product');
    const { products, totalPages, refreshProducts } = useProducts(searchTerm, page);
    const [activePopupMenuId, setActivePopupMenuId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState({
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        stock: '',
        pieces: '',
        category: '',
        images: [],
    });

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error('Failed to fetching data:', error));
    }, []);

    useEffect(() => {
        refreshProducts(page);
    }, [page]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleShowProductForm = (value) => {
        setEditData({
            productId: '',
            productName: '',
            productDescription: '',
            price: '',
            stock: '',
            pieces: '',
            category: '',
            images: [],
        });
        setShowProductForm(value);
    };

    const handlePageChange = (value) => {
        setPage(value);
    };

    const handleShowPopup = (id) => {
        setActivePopupMenuId(id);
    };

    const handleAction = async (e, tag, data) => {
        e.stopPropagation();
        if (tag === 'DELETE') {
            try {
                await removeProduct(data);
                alert('Remove product successfully!');
                refreshProducts(1);
            } catch (error) {
                alert('Cannot remove product: ' + error.message);
            }
        }
        if (tag === 'EDIT') {
            setTitle('Update Product');
            setEditData(data);
            setShowProductForm(true);
        }
        setActivePopupMenuId(null);
    };

    const handleShowDetail = (data) => {
        setTitle('Detail Product')
        setEditData(data);
        setShowProductForm(true);
    };

    return showProductForm ? (
        <ProductForm
            data={editData}
            categories={categories}
            onClose={handleShowProductForm}
            title={title}
            refreshData={refreshProducts}
        ></ProductForm>
    ) : (
        <div className={cx('overview_container')}>
            <div className={cx('overview_wrapper')}>
                <div className={cx('overview_title')}>
                    <h1>Products</h1>
                    <div onClick={() => setShowProductForm(!showProductForm)} className={cx('overview_button')}>
                        <button className={cx('overview_button_add')}>
                            <FontAwesomeIcon style={{ fontSize: '16px', color: '#fff' }} icon={faPlus} />
                        </button>
                        Add new Product
                    </div>
                </div>
                <div className={cx('overview_searchbar')}>
                    <div className={cx('searchbar_container')}>
                        <form>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                className={cx('search_input')}
                            />
                            <button type="submit" onClick={(e) => handleSearch(e)} className={cx('search_button')}>
                                <FontAwesomeIcon style={{ fontSize: '16px' }} icon={faSearch} />
                            </button>
                        </form>
                    </div>
                </div>
                <div className={cx('overview_table')}>
                    <table className={cx('products_table')}>
                        <thead>
                            <tr>
                                <th style={{ width: '8%' }}>#</th>
                                <th style={{ width: '12%' }}>Image</th>
                                <th style={{ width: '26%' }}>Name</th>
                                <th style={{ width: '26%' }}>Price</th>
                                <th style={{ width: '12%' }}>Stock</th>
                                <th style={{ width: '12%' }}>Pieces</th>
                                <th style={{ width: '8%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '8%' }}>{index + 1}</td>
                                        <td style={{ height: 'auto' }}>
                                            <div className={cx('product_table-img')}>
                                                <img src={`http://localhost:8080/img/${item.images[0]}`} />
                                            </div>
                                        </td>
                                        <td className={cx('product_table-name')}>
                                            <span style={{ cursor: 'pointer' }} onClick={() => handleShowDetail(item)}>
                                                {item.productName}
                                            </span>
                                        </td>
                                        <td style={{ width: '26%' }}>{`$${item.price}`}</td>
                                        <td style={{ width: '12%' }}>{item.stock}</td>
                                        <td style={{ width: '8%' }}>{item.pieces}</td>
                                        <td>
                                            <div
                                                onClick={() => handleShowPopup(item.productId)}
                                                className={cx('actions')}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                                {activePopupMenuId !== null && activePopupMenuId === item.productId && (
                                                    <div
                                                        onClick={() => setActivePopupMenuId(null)}
                                                        className={cx('action_menu')}
                                                    >
                                                        <button
                                                            style={{ backgroundColor: 'Lime' }}
                                                            className={cx('action_button')}
                                                            onClick={(e) => handleAction(e, 'EDIT', item)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            style={{ backgroundColor: '#FF0000', color: '#fff' }}
                                                            className={cx('action_button')}
                                                            onClick={(e) => handleAction(e, 'DELETE', item.productId)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className={cx('pagination_container')}>
                        <nav>
                            <a onClick={() => page !== 1 && handlePageChange(page - 1)} className={cx('prev_page')}>
                                <FontAwesomeIcon style={{ fontSize: '16px' }} icon={faChevronLeft} />
                            </a>
                            <div className={cx('page_link')}>
                                <span>{page}</span>
                            </div>
                            <a
                                onClick={() => page !== totalPages && handlePageChange(page + 1)}
                                className={cx('next_page')}
                            >
                                <FontAwesomeIcon style={{ fontSize: '16px' }} icon={faChevronRight} />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
