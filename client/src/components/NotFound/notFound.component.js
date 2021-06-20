import React from 'react';
import notFound from '../../assets/images/notFound.jpg'

const NotFound = () => {
    return (
        <div>
            <img src={notFound} width="45%" style={{ marginLeft: "27.5%", marginTop: "3rem" }} alt="not found " />
            <a
                style={{ color: 'black', fontSize: "0.6rem", textDecoration: "underline", position: "relative", left: "70px", top: "-40px" }}
                href="http://www.freepik.com">Designed by stories / Freepik</a>
        </div>
    )
}

export default NotFound
