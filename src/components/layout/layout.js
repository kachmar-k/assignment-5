import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import { content, header, headerText, footer, left} from './layout.module.css'
import { StaticImage } from 'gatsby-plugin-image'
import Navigation from '../navigaton/navigation'

const Layout = (props) => {
    const children = props.children;
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }`);

    return (
        <div class={content}>
            <header class={header}>
            <div class={left}>
                <StaticImage src="../../images/partly-cloudy.png" height={50} alt="New England icon"></StaticImage>
                <h1 class={headerText}>{data.site.siteMetadata.title}</h1>
            </div>
                <Navigation></Navigation>
            </header>
            <main>
                {children}
            </main>
            <footer class={footer}>
                <p>Assignments 4 and 5 for Harvard Extension School CSCI E-114</p>
            </footer>
        </div>
    )
}

export default Layout
