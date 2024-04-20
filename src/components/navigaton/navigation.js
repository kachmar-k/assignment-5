import * as React from 'react'
import { Link } from 'gatsby'
import { nav, menuItem, link} from './navigation.module.css'

const Navigation = () => {
    return (
        <ul className={nav}>
            <li className={menuItem}>
                <Link to="/" className={link}>Home</Link>
            </li>
            <li className={menuItem}>
                <Link to="/about" className={link}>About</Link>
            </li>
        </ul>
    )
}

export default Navigation
