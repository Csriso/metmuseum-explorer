import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import "./Search.css"
import uuid from 'react-uuid';
import ImageDisplay from '../components/ImageDisplay';
import ClipLoader from 'react-spinners/ClipLoader';
export default function Search() {
    const [data, setData] = useState([]);
    const [searchIds, setSearchIds] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const apiEndPoint = "https://collectionapi.metmuseum.org";
    const inputRef = useRef();

    useEffect(() => {
        // getData();
    }, [])

    const getData = async () => {
        const response = await axios.get(`${apiEndPoint}/public/collection/v1/search`);
    }

    const search = async (pageParam) => {
        setLoading(true);
        const querySearch = inputRef.current.value;
        const getIdsResponse = await axios.get(`${apiEndPoint}/public/collection/v1/search?q=${querySearch}`);
        setSearchIds(getIdsResponse.data.objectIDs);
        setLoading(false);
    }

    const handlePrevPage = () => {
        const actualPage = page;
        if (page !== 0) {
            setPage(page - 1);
        }
        search(page - 1);
    }
    const handleNextPage = () => {
        setPage(page + 1);
        search(page + 1);
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
            <div className="pagination">
                <button onClick={handlePrevPage}>Prev</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
            <div className="results">
                {
                    !loading && searchIds !== null && searchIds.map((elem) => {
                        return (
                            <ImageDisplay key={uuid()} id={elem} />
                        )
                    })
                }
                {
                    loading && <ClipLoader />
                }
            </div>
        </div>
    )
}
