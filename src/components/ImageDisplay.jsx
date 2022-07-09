import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios";

function ImageDisplay(props) {
    console.log(props);
    const { id } = props;
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const getObjectResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        await setImageData(getObjectResponse.data);
    }

    return (
        <>
            {
                imageData !== null && <div className="result">
                    <h3>Author: {imageData.artistDisplayName}</h3>
                    <img src={imageData.primaryImage} alt="" width={500} />
                </div>
            }
        </>
    )
}

export default ImageDisplay