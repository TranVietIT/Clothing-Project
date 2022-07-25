import axios from "axios";
import { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
function Blog(props) {

    const [blog, setBlog] = useState([])

    useEffect(() => {
        axios.get("http://localhost/laravel/public/api/blog")
            .then(res => {
                setBlog(res.data.blog.data)
                // console.log(res.data.blog.data)
            })
        // .catch(error => console.log(error))
    }, [])
        
    function renderData() {
        return (
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">LATEST FROM OUR BLOG</h2>

                    {blog.map(function (value, key) {
                        // console.log(value)
                        return (
                            <div className="single-blog-post" key={key}>
                                <h3>{value.title}</h3>
                                <div className="post-meta">
                                    <ul>
                                        <li><i className="fa fa-user" /> Mac Doe</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <span>
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star-half-o" />
                                    </span>
                                </div>
                                <a href>
                                    <img src={"http://localhost/laravel/public/upload/Blog/image/" + value.image} alt="" />
                                </a>
                                {/* <p>{value.content}</p> */}
                                <div dangerouslySetInnerHTML={{ __html: value.content }}></div>
                                <Link to={"/blog/detail/" + value.id} className="btn btn-primary" href="#">Read More</Link>
                            </div>
                        )}
                    )}
                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><a href className="active">1</a></li>
                            <li><a href>2</a></li>
                            <li><a href>3</a></li>
                            <li><a href><i className="fa fa-angle-double-right" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        renderData()
    )
}
export default Blog;
