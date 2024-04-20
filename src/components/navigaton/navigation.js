import * as React from 'react'
import { Link } from 'gatsby'
import { nav, menuItem, link} from './navigation.module.css'

const Navigation = (props) => {
    return (
        <ul class={nav}>
            <li class={menuItem}>
                <Link to="/" class={link}>Home</Link>
            </li>
            <li class={menuItem}>
                <Link to="/about" class={link}>About</Link>
            </li>
        </ul>
    )
}

export default Navigation
