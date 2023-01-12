import React, { useState, useEffect } from 'react';

import Posts from "./Posts"
import Pagination from "./Pagination"
import { api } from '../Utilities/Api';
import ImageCarousel from '../Components/ImageSliderCarousel/ImageSliderCarousel';
import { useParams } from "react-router-dom";
import { search } from '../Redux/Action/SearchAction'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const divMargin = {
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "1%"
}

const MainPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    let { category } = useParams();
    let { type } = useParams();
    let { parameter } = useParams();
    let { filter1} = useParams();
    let { filter2} = useParams();
    let { filter3} = useParams();
    let { filter4} = useParams();



    useEffect(() => {
        if (category != undefined) {


            if (type != undefined && parameter != undefined) {

                let data = {
                    "category": category,
                    "type": type,
                    "parameter": parameter
                }
                console.log(data);
                api("POST", "localhost", "7098", "categories", "SortCategoryInProducts", null, data).then((data) => {
                    console.log(data);
                    setPosts(data);
                });


            }

            else {
                
                let data = {
                    "category": category,
                    "type": type,
                    "parameter": parameter
                }
                console.log(data);
                api("GET", "localhost", "7098", "categories", "getbynamecategoryinproducts", category, null).then((data) => {
                    console.log(data);
                    setPosts(data);
                });
            }

        }
        else {
            let data = {
                "type": type,
                "parameter": parameter
            }
            console.log(data);
            if (type != undefined && parameter != undefined) {
                api("POST", "localhost", "7098", "products", "SortAllProducts", null, data).then((data) => {
                    setPosts(data);
                });
            }

            else {
                api("GET", "localhost", "7098", "products", "getall", null, null).then((data) => {
                    console.log(data)
                    setPosts(data);
                });
            }

        }

    }, [category, type, parameter])

    useEffect(() => {
        if (props.searchstate.productName != null && props.searchstate.productName != undefined && props.searchstate.productName != "") {
            console.log(props.searchstate.productName)
            api("GET", "localhost", "7098", "products", "searchproducts", props.searchstate.productName, null).then((data) => {
                console.log(data);
                setPosts(data);

            });

        }
        else {
            api("GET", "localhost", "7098", "products", "getall", null, null).then((data) => {
                setPosts(data);
                console.log(data);
            });
        }
    }, [props.searchstate])

    
 

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <ImageCarousel></ImageCarousel>
            <div style={divMargin}>
                <Posts posts={currentPosts} setPosts={setPosts} category={category} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        searchstate: state.search
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ search }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
