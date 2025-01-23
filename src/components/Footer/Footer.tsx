import React from "react"
import s from "./Footer.module.css"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
    return (
        <footer className={s.footer}>
            <div className={`__container ${s.footer__container}`}>
                <Link className={s.footer__logo} to="/">Feels</Link>
                <ul className={s.socials}>
                    <li className={s.social}><a className={s.social__link} target="_blank" href="https://m.vk.com/l1lines"><img className={s.social__image} src="/socials/vk.svg" alt="vk" /></a></li>
                    <li className={s.social}><a className={s.social__link} target="_blank" href="https://www.instagram.com/l1lines/"><img className={s.social__image} src="/socials/inst.svg" alt="inst" /></a></li>
                    <li className={s.social}><a className={s.social__link} target="_blank" href="https://t.me/l1lines"><img className={s.social__image} src="/socials/tg.svg" alt="tg" /></a></li>
                    <li className={s.social}><a className={s.social__link} target="_blank" href="https://github.com/lnnsss"><img className={s.social__image} src="/socials/github.svg" alt="github" /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer