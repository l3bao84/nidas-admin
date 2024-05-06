import styles from "../Content.modules.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSackDollar, faHourglass, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Orders() {

    return (
        <div className={cx("overview_container")}>
            <div className={cx("overview_wrapper")}>
                <div className={cx("overview_title")}>
                    <h1>Orders</h1>
                </div>
                   
            </div>
        </div>
    );
}

export default Orders;
