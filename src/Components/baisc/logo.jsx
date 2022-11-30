import icon from "../../images/icon.png";
import React from "react";

export default function Logo({closeNav}) {

    const logoStyle = {
        marginBottom: '.3rem',
        paddingBottom: '.5rem',
        borderBottom: '1px solid #aaa',
        padding: '6px'
    }

    return (
        <div style={logoStyle}>
            <img
                style={{
                    maxWidth: '30px',
                    margin: '.5rem 0 0 .5rem'
                }}
                src={icon}
                alt="logo"/>
        </div>
    );
}
