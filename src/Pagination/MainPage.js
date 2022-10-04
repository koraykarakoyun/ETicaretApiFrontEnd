import React, { useState, useEffect } from 'react';
import Posts from "./Posts"
import Pagination from "./Pagination"
import { api } from '../Utilities/Api';

const MainPagination = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(24);
    useEffect(() => {
        api("GET", "localhost", "7098", "products", "getall", null, null).then((data) => {
            setPosts(data);
            console.log(data)
        });
    }, MainPagination)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div style={{ marginLeft: "15%", marginRight: "15%" }}>
            <Posts posts={currentPosts} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
};

export default MainPagination;