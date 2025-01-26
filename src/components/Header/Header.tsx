import React, { useState } from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import HeaderStore from '../../stores/header-store';
import { observer } from 'mobx-react-lite';
import TokenStore from '../../stores/token-store';

const Header: React.FC = observer(() => {
  const { isMenuOpen, toggleMenu } = HeaderStore;
  const { token } = TokenStore

  return (
    <header className={s.header}>
      <div className={s.header__top}>
        <Link to="/" className={s.header__logo}>FEELS</Link>
        <button className={s.header__burger} onClick={toggleMenu}><span></span><span></span><span></span></button>
      </div>
      <nav className={`${s.header__nav} ${isMenuOpen ? s.header__navOpen : ''}`}>
        <ul className={s.header__navList}>
          <li className={s.header__navItem}><Link to="/" className={s.header__navLink}>Главная</Link></li>
          <li className={s.header__navItem}><Link to="/users" className={s.header__navLink}>Пользователи</Link></li>
          <li className={s.header__navItem}><Link to="/posts" className={s.header__navLink}>Посты</Link></li>
          {
          token 
          ? (
            <li className={s.header__navItem}><Link to="/account" className={s.header__navLink}>Личный кабинет</Link></li>
          )
          : (
            <>
              <li className={s.header__navItem}><Link to="/registration" className={s.header__navLink}>Регистрация</Link></li>
              <li className={s.header__navItem}><Link to="/login" className={s.header__navLink}>Вход</Link></li>
            </>
            )
          }
        </ul>
      </nav>
    </header>
  );
});

export default Header;