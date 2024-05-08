import styles from './Header.modules.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin")
    }

    return (
        <header className={cx('header')}>
            <div className={cx('header_container')}>
                <div className={cx('header_logo')}>
                    <div>
                        <img src="https://nidas.hi.link/_assets/site-data/ops_Zmctdq5vlG64qvFFiw/images/9319c80b29e29af1aa255c1750ab1ebca33a904137e5ed04e25e93fd646c9cdf.png"></img>
                    </div>
                    <h1 className={cx('header_title')}>Nidas ADMIN</h1>
                </div>
                <div className={cx('header_user')}>
                    <div className={cx('header_user_img')}>
                        <img src="https://i.pinimg.com/564x/34/c3/33/34c3332cb8eb6c448bb4544cd7df4bcd.jpg"></img>
                    </div>
                    <div onClick={() => setShowPopup(!showPopup)} className={cx('header_user_name')}>
                        Hello <span>Đức Bảo</span>
                        {showPopup && (
                            <div ref={popupRef} className={cx('user_popup')}>
                                <ul className={cx('user_popup-list')}>
                                    <li className={cx('user_popup-list-item')}>
                                        <button>Profile</button>
                                    </li>
                                    <li className={cx('user_popup-list-item')}>
                                        <button>Settings</button>
                                    </li>
                                    <li className={cx('user_popup-list-item')}>
                                        <button onClick={() => handleLogout()}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
