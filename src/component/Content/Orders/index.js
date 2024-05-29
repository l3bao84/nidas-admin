import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEllipsisVertical, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useOrders, updateOrder } from '../service';

const cx = classNames.bind(styles);

function Orders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const { orders, totalPages, refreshOrders } = useOrders(searchTerm, page);
    const [activePopupMenuId, setActivePopupMenuId] = useState(null);
    const statusOptions = ['PENDING CONFIRMATION', 'PREPARING','DELIVERING', 'CANCELLED', 'COMPLETED'];
    const [selectedStatus, setSeledStatus] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handlePageChange = (value) => {
        setPage(value);
        refreshOrders(value);
    };

    const handleShowPopup = (id) => {
        setActivePopupMenuId(id);
    };

    const handleAction = async (e, orderId, status) => {
        e.stopPropagation();
        const formData = new FormData();
        formData.append('id', orderId);
        formData.append('status', status);
        handleUpdate(formData)
        setActivePopupMenuId(null);
    };

    const handleStatusChange = async (id, status) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', status);
        handleUpdate(formData)
    };

    const handleUpdate = async (formData) => {
        try {
            await updateOrder(formData);
            alert("Order updated successfully!");
            refreshOrders(page);
        } catch (error) {
            alert("Cannot accept order: " + error.message);
        }
    }

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
                            {orders &&
                                orders.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.orderId}</td>
                                        <td>
                                            <span>{item.orderDate}</span>
                                        </td>
                                        <td>
                                            <span>{item.paymentStatus}</span>
                                        </td>
                                        <td>{`$${item.totalAmount}`}</td>
                                        <td>
                                            <div className={cx('order_status-selection')}>
                                                <select name="category" value={item.orderStatus} onChange={(e) => handleStatusChange(item.orderId, e.target.value)}>
                                                    {statusOptions.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                        <td>{item.shippingAddress}</td>
                                        <th>{item.shippingMethod}</th>
                                        <td>
                                            <div
                                                onClick={() => handleShowPopup(item.orderId)}
                                                className={cx('actions')}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                                {item.orderStatus === 'PENDING CONFIRMATION' && activePopupMenuId !== null && activePopupMenuId === item.orderId && (
                                                    <div
                                                        onClick={() => setActivePopupMenuId(null)}
                                                        className={cx('action_menu')}
                                                    >
                                                        <button
                                                            style={{ backgroundColor: 'Lime' }}
                                                            className={cx('action_button')}
                                                            onClick={(e) => handleAction(e, item.orderId, 'PREPARING')}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            style={{ backgroundColor: '#FF0000', color: '#fff' }}
                                                            className={cx('action_button')}
                                                            onClick={(e) => handleAction(e, item.orderId, 'CANCELLED')}
                                                        >
                                                            Reject
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

export default Orders;
