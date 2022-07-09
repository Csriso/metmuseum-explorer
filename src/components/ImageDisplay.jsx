import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios";

function ImageDisplay(props) {
    const { id, indice } = props;
    const [imageData, setImageData] = useState(null);
    const [styleToUse, setStyleUse] = useState(null);
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const getObjectResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            console.log(getObjectResponse.data);
            setImageData(getObjectResponse.data);
            if (getObjectResponse.data.isPublicDomain) {
                setStyleUse({ backgroundColor: "green" });
            } else {
                setStyleUse({ backgroundColor: "red" });
            }
        } catch (error) {
            console.log(error);

        }
    }
    if (imageData !== null && !imageData.isPublicDomain) {
        return "";
    }

    return (
        <div style={styleToUse}>
            {
                imageData !== null && <div className="result">
                    <h3>Author: {imageData.artistDisplayName}</h3>
                    {imageData.primaryImage && <a href={imageData.primaryImage}><img src={imageData.primaryImage} alt="" width={500} /></a>}
                    {!imageData.primaryImage && <p>No image</p>}
                    <p>PUBLIC DOMAIN: {imageData.isPublicDomain ? "✔️" : "❌"}</p>
                </div>
            }
        </div>
    )
}

export default ImageDisplay