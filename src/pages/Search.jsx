import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import "./Search.css"

export default function Search() {
    const [data, setData] = useState([]);
    const apiEndPoint = "https://collectionapi.metmuseum.org";
    const inputRef = useRef();

    useEffect(() => {
        // getData();
    }, [])

    const getData = async () => {
        const response = await axios.get(`${apiEndPoint}/public/collection/v1/search`);
    }

    const search = async () => {
        const querySearch = inputRef.current.value;
        const getIdsResponse = await axios.get(`${apiEndPoint}/public/collection/v1/search?q=${querySearch}`);
        // getIdsResponse.data.objectIDs.forEach(element => {
        //     getObject(element);
        // });
        for (let index = 0; index < 10; index++) {
            await getObject(getIdsResponse.data.objectIDs[index]);
        }
        // getObject(getIdsResponse.data.objectIDs[0]);
        // console.log(getIdsResponse.data);
    }
    const getObject = async (id) => {
        const getObjectResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        await setData(data => [...data, getObjectResponse.data]);
    }

    // if (data === null) {
    //     return <p>Loading....</p>;
    // }
    return (
        <div>
            <div className="searchForm">
                <h1>Search</h1>
                <input type="text" name="search" id="search" ref={inputRef} />
                <button onClick={search}>Search</button>
            </div>
            <div className="results">
                {
                    data.length !== 0 && data.map((elem) => {
                        return (
                            <>
                                <div className="result">
                                    <h3>Author: {elem.artistDisplayName}</h3>
                                    <img src={elem.primaryImage} alt="" width={500} />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
