import Link from "next/link";
import React from "react";
const NavBar = (
    { style }: { style?: React.CSSProperties }
) => {
    return (
        <nav style={style}>
            <Link href={'/'}>HOME</Link>
            <Link href={'/contact-us'}>CONTACT US</Link>
            <Link href={'/about-us'}>ABOUT</Link>
            <Link href={'/how-to-use'}>HOW TO USE</Link>
        </nav>
    )
}
export default NavBar