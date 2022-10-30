import React, { useState, useEffect } from 'react';
import Posts from "./Posts"
import Pagination from "./Pagination"
import { api } from '../Utilities/Api';
import ImageCarousel from '../Components/ImageSliderCarousel/ImageSliderCarousel';

const divMargin = {
    marginLeft: "5%",
    marginRight: "5%"
}

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    useEffect(() => {
        api("GET", "localhost", "7098", "products", "getall", null, null).then((data) => {
            setPosts(data);

        });
    }, MainPage)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <ImageCarousel></ImageCarousel>
            <div style={divMargin}>
                <Posts posts={currentPosts} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

export default MainPage;