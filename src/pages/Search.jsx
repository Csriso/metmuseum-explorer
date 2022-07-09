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
        try {
            setLoading(true);
            setSearchIds(null);
            const querySearch = inputRef.current.value;
            const getIdsResponse = await axios.get(`${apiEndPoint}/public/collection/v1/search?q=${querySearch}`);
            setSearchIds(getIdsResponse.data.objectIDs);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
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
            <div className="searchForm flex flex-row justify-center items-center justify-items-center content-center mt-5">
                <input type="text" name="search" id="search" className="w-3/12 block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search" ref={inputRef} />
                <button onClick={search} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2">Search</button>
            </div>
            {/* <div className="pagination">
                <button onClick={handlePrevPage}>Prev</button>
                <button onClick={handleNextPage}>Next</button>
            </div> */}
            <div className="results mt-10">
                {
                    !loading && searchIds !== null && searchIds.map((elem, index) => {
                        return (
                            <ImageDisplay key={uuid()} id={elem} indice={index} />
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
