import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEllipsisVertical, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Orders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showActionMenu, setShowActionMenu] = useState(false);
    const actionMenuRef = useRef(null);

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

    return (
        <div className={cx('overview_container')}>
            <div className={cx('overview_wrapper')}>
                <div className={cx('overview_title')}>
                    <h1>Orders</h1>
                </div>
                <div className={cx('overview_searchbar')}>
                    <div className={cx('searchbar_container')}>
                        <form>
                            <input
                                type="text"
                                placeholder="Search orders..."
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
                                <th style={{ width: '4%' }}>#</th>
                                <th style={{ width: '13%' }}>Date</th>
                                <th style={{ width: '12.5%' }}>Payment</th>
                                <th style={{ width: '13%' }}>Total</th>
                                <th style={{ width: '20%' }}>Order status</th>
                                <th style={{ width: '20%' }}>Address</th>
                                <th style={{ width: '12.5%' }}>Method</th>
                                <th style={{ width: '4%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <span>04/05/2002</span>
                                </td>
                                <td>
                                    <span>COD</span>
                                </td>
                                <td>5,800,000</td>
                                <td>
                                    <div className={cx("order_status-selection")}>
                                        <select name="category" >
                                            <option>PENDING CONFIRMATION</option>
                                            <option>DELIVERING</option>
                                            <option>CANCELLED</option>
                                            <option>COMPLETED</option>
                                        </select>
                                    </div>
                                </td>
                                <td>Bài Trượng, Hoàng Diệu, Chương Mỹ, Hà Nội</td>
                                <th>Standard</th>
                                <td>
                                    <div
                                        onClick={() => setShowActionMenu(!showActionMenu)}
                                        className={cx('actions')}
                                        ref={actionMenuRef}
                                    >
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                        {showActionMenu && (
                                            <div className={cx('action_menu')}>
                                                <button
                                                    style={{ backgroundColor: 'Lime' }}
                                                    className={cx('action_button')}
                                                >
                                                    Refuse
                                                </button>
                                                <button
                                                    style={{ backgroundColor: '#FF0000', color: '#fff' }}
                                                    className={cx('action_button')}
                                                >
                                                    Accept
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

export default Orders;
