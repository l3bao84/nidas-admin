import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEllipsisVertical, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddProductForm from '../AddProductForm';

const cx = classNames.bind(styles);

function Products() {

    const [searchTerm, setSearchTerm] = useState('');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const actionMenuRef = useRef(null);
    const [showAddProductForm, setShowAddProductForm] = useState(false)

    useEffect(() => {
        function handleClickOutside(event) {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setShowActionMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleShowAddProductForm = (value) => {
        setShowAddProductForm(value);
    }

    return (
        <div className={cx('overview_container')}>
            {showAddProductForm && <AddProductForm onClose={handleShowAddProductForm}/>}
            <div className={cx('overview_wrapper')}>
                <div className={cx('overview_title')}>
                    <h1>Products</h1>
                    <div onClick={() => setShowAddProductForm(!showAddProductForm)} className={cx('overview_button')}>
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
                            <tr>
                                <td style={{ width: '8%' }}>1</td>
                                <td style={{ height: 'auto' }}>
                                    <div className={cx('product_table-img')}>
                                        <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c3523dd33a45420e950461fc6802cfe4_9366/Predator_Elite_Firm_Ground_Football_Boots_Yellow_IF5441_HM1.jpg" />
                                    </div>
                                </td>
                                <td className={cx('product_table-name')}>
                                    <span>PREDATOR ELITE FIRM GROUND FOOTBALL BOOTS</span>
                                </td>
                                <td style={{ width: '26%' }}>5,800,000</td>
                                <td style={{ width: '12%' }}>1000</td>
                                <td style={{ width: '8%' }}>2</td>
                                <td>
                                    <div onClick={() => setShowActionMenu(!showActionMenu)} className={cx('actions')} ref={actionMenuRef}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showActionMenu && (
                                            <div className={cx('action_menu')}>
                                                <button
                                                    style={{ backgroundColor: 'Lime' }}
                                                    className={cx('action_button')}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    style={{ backgroundColor: '#FF0000', color: '#fff' }}
                                                    className={cx('action_button')}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={cx('pagination_container')}>
                        <nav>
                            <a className={cx('prev_page')}>
                                <FontAwesomeIcon style={{ fontSize: '16px' }} icon={faChevronLeft} />
                            </a>
                            <div className={cx('page_link')}>
                                <a>1</a>
                                <a>2</a>
                                <a>3</a>
                            </div>
                            <a className={cx('next_page')}>
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
