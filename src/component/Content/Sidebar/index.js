import styles from "../Content.modules.scss";
import classNames from "classnames/bind";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse, faTable } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const sidebarItems = [
    {
        id: 1,
        title: "Dashboard",
        icon: <FontAwesomeIcon icon={faHouse} className={cx("sidebar_list-item-icon")} />,
    },
    {
        id: 2,
        title: "Products",
        icon: <FontAwesomeIcon icon={faTable} className={cx("sidebar_list-item-icon")} />,
    },
    {
        id: 3,
        title: "Orders",
        icon: <FontAwesomeIcon icon={faCartShopping} className={cx("sidebar_list-item-icon")} />,
    },
]

function Sidebar({onClick}) {

    const [selectedMenu, setSelectedMenu] = useState(1)

    const handleChooseMenu = (id) => {
        setSelectedMenu(id)
        onClick(id)
    }

    return (
        <div className={cx("sidebar_menu")}>
            <ul className={cx("sidebar_list")}>
                {sidebarItems.map((item) => (
                    <li key={item.id} 
                        onClick={() => handleChooseMenu(item.id)} 
                        className={cx("sidebar_list-item")}
                        style={{color: selectedMenu === item.id ? "#006cb7" : "#141414"}}
                    >
                        {item.icon}
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
