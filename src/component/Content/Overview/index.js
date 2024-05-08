import styles from '../Content.modules.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faSackDollar,
    faHourglass,
    faCartArrowDown,
    faDesktop,
    faTablet,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    Legend,
    Tooltip,
    Title,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    plugins,
} from 'chart.js';
import {
    getOrderCountByStatus,
    getItemsSold,
    getTotalEarnings,
    calculateDateDifference,
    getOrderStatistic,
} from '../service';
import { format, addDays } from 'date-fns';

ChartJs.register(CategoryScale, LinearScale, PointElement, Title, LineElement, Tooltip, Legend);

const cx = classNames.bind(styles);

function Overview() {
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [itemsSold, setItemsSold] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [fromValue, setFromValue] = useState(
        new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    );
    const [toValue, setToValue] = useState(new Date().toISOString().split('T')[0]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Orders',
                data: [],
                borderColor: 'green',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    });

    useEffect(() => {
        getOrderCountByStatus('PENDING CONFIRMATION')
            .then((data) => setPendingOrders(data.data))
            .catch((error) => console.error('Failed to load pending orders:', error));

        getOrderCountByStatus('COMPLETED')
            .then((data) => setCompletedOrders(data.data))
            .catch((error) => console.error('Failed to load completed orders:', error));

        getItemsSold()
            .then((data) => setItemsSold(data.data))
            .catch((error) => console.error('Failed to load items sold:', error));

        getTotalEarnings()
            .then((data) => setTotalEarnings(data.data))
            .catch((error) => console.error('Failed to load total earnings:', error));

        getOrderStatistic(format(fromValue, 'dd/MM/yyyy'), format(toValue, 'dd/MM/yyyy')).then((data) => {
            const labels = [];
            const dataSets = [];

            const sortedKeys = Object.keys(data.data).sort((a, b) => new Date(a) - new Date(b));

            sortedKeys.forEach((key) => {
                labels.push(key);
                dataSets.push(data.data[key]);
            });

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Orders',
                        dataSets,
                        borderColor: 'green',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        });
    }, []);

    const overviewCards = [
        {
            id: 1,
            title: 'PENDING ORDERS',
            icon: <FontAwesomeIcon icon={faHourglass} style={{ color: 'green', fontSize: '40px' }} />,
            value: pendingOrders,
        },
        {
            id: 2,
            title: 'COMPLETED ORDERS',
            icon: <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', fontSize: '40px' }} />,
            value: completedOrders,
        },
        {
            id: 3,
            title: 'ITEM SOLDS',
            icon: <FontAwesomeIcon icon={faCartArrowDown} style={{ color: 'green', fontSize: '40px' }} />,
            value: itemsSold,
        },
        {
            id: 4,
            title: 'TOTAL EARNINGS',
            icon: <FontAwesomeIcon icon={faSackDollar} style={{ color: 'green', fontSize: '40px' }} />,
            value: `$${totalEarnings}`,
        },
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const handleStatistics = () => {
        const startDate = new Date(fromValue);
        const endDate = new Date(toValue);
        if (startDate > endDate) {
            alert('The start date must be before the end date.');
            resetDateInputs()
            return;
        }
        if (calculateDateDifference(startDate, endDate) > 30) {
            alert('The difference between the start date and end date must not exceed 30 days.');
            resetDateInputs()
            return;
        }

        getOrderStatistic(format(startDate, 'dd/MM/yyyy'), format(endDate, 'dd/MM/yyyy')).then((data) => {
            const labels = [];
            const dataPoints = [];

            const sortedKeys = Object.keys(data.data).sort((a, b) => new Date(a) - new Date(b));

            sortedKeys.forEach((key) => {
                labels.push(format(new Date(key), 'dd/MM/yyyy'));
                dataPoints.push(data.data[key]);
            });

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Orders',
                        data: dataPoints,
                        borderColor: 'green',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        });
    };

    useEffect(() => {
        handleStatistics();
    }, [fromValue, toValue]);

    const resetDateInputs = () => {
        setFromValue(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]);
        setToValue(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className={cx('overview_container')}>
            <div className={cx('overview_wrapper')}>
                <div className={cx('overview_title')}>
                    <h1>Overview</h1>
                </div>
                <div className={cx('overview_widgets')}>
                    {overviewCards.map((item) => (
                        <div key={item.id} className={cx('overview_card')}>
                            <div className={cx('overview_content')}>
                                <div className={cx('overview_content-text')}>
                                    <div className={cx('overview_content-title')}>{item.title}</div>
                                    <div className={cx('overview_content-value')}>
                                        <span>{`${item.value}`}</span>
                                        <div className={cx('overview_content-icon')}>{item.icon}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('overview_statistic')}>
                    <div className={cx('overview_orders_statistic')}>
                        <div className={cx('overview_orders_chart-title')}>
                            <span>Sales Statistics</span>
                            <div className={cx('date')}>
                                <span>from: </span>
                                <input onChange={(e) => setFromValue(e.target.value)} value={fromValue} type="date" />
                            </div>
                            <div className={cx('date')}>
                                <span>to: </span>
                                <input onChange={(e) => setToValue(e.target.value)} type="date" value={toValue} />
                            </div>
                        </div>
                        <div className={cx('overview_orders_chart')}>
                            <Line
                                style={{ height: '500px', width: '100%', paddingBottom: '30px' }}
                                data={chartData}
                                options={options}
                            ></Line>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
