import React from "react"
import s from "./Header.module.css"
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../../stores/root-store-context";

const Header: React.FC = observer(() => {
  const { 
    header: { isMenuOpen, toggleMenu },
    token: {clearToken}
  } = useStores();
    const navigate = useNavigate();

    const handleLogOut = (): void => {
        clearToken()
        navigate('/registration');
    }      
    
    return (
        <header className={s.header}>
          <div className={s.header__top}>
            <Link to="/admin" className={s.header__logo}>ADMIN</Link>
            <button className={s.header__burger} onClick={toggleMenu}><span></span><span></span><span></span></button>
          </div>
          <nav className={`${s.header__nav} ${isMenuOpen ? s.header__navOpen : ''}`}>
            <ul className={s.header__navList}>
              <li className={s.header__navItem}><Link to="/admin" className={s.header__navLink}>Главная</Link></li>
              <li className={s.header__navItem}><Link to="/admin/users" className={s.header__navLink}>Пользователи</Link></li>
              <li className={s.header__navItem}><Link to="/admin/posts" className={s.header__navLink}>Посты</Link></li>
              <li className={s.header__navItem}><button className={s.header__navLink} onClick={handleLogOut}>Выйти</button></li>
            </ul>
          </nav>
        </header>
    )
})

export default Header