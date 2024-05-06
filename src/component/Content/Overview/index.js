import styles from "../Content.modules.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSackDollar, faHourglass, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const overviewCards = [
    {
        id: 1,
        title: "PENDING ORDERS",
        icon: <FontAwesomeIcon icon={faHourglass} style={{color: "green", fontSize: "40px"}}/>,
        value: "",
    },
    {
        id: 2,
        title: "COMPLETED ORDERS",
        icon: <FontAwesomeIcon icon={faCheckCircle} style={{color: "green", fontSize: "40px"}}/>,
        value: ""
    },
    {
        id: 3,
        title: "ITEM SOLDS",
        icon: <FontAwesomeIcon icon={faCartArrowDown} style={{color: "green", fontSize: "40px"}}/>,
        value: ""
    },
    {
        id: 4,
        title: "TOTAL EARNINGS",
        icon: <FontAwesomeIcon icon={faSackDollar} style={{color: "green", fontSize: "40px"}}/>,
        value: "$"
    }
]

function Overview() {

    return (
        <div className={cx("overview_container")}>
            <div className={cx("overview_wrapper")}>
                <div className={cx("overview_title")}>
                    <h1>Overview</h1>
                </div>
                <div className={cx("overview_widgets")}>
                    {overviewCards.map((item) => (
                        <div key={item.id} className={cx("overview_card")}>
                            <div className={cx("overview_content")}>
                                <div className={cx("overview_content-text")}>
                                    <div className={cx("overview_content-title")}>{item.title}</div>
                                    <div className={cx("overview_content-value")}>
                                        <span>{`${item.value}20`}</span>
                                        <div className={cx("overview_content-icon")}>
                                            {item.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>    
            </div>
        </div>
    );
}

export default Overview;
