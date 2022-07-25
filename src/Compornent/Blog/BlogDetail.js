// import { render } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from './Comment';
import ListComment from "./ListComment";
import Rate from "./Rate";

function BlogDetail(props) {
    let params = useParams();

    const [detail, setDetail] = useState([]) 
    const [listCmt, setlistCmt] = useState([])
    const [commentInfo, setCommentInfo] = useState("")
    

    useEffect(() => {
        axios.get("http://localhost/laravel/public/api/blog/detail/" + params.id)
            .then(res => {
                setDetail(res.data.data)
                setlistCmt(res.data.data.comment)
            })
            // .catch(function (error) {
            //     console.log();
            // })
    }, [])


    // tạo một hàm có tên getCmt(data), truyền một biến qua Comment props.get(res.data.data) ngay dưới .then (res)
    // nối bằng hàm concat 1 mảng và một mảng.
    function getCmt(data) {
        const connect = listCmt.concat(data);
        console.log(connect);
        setlistCmt(connect)
    }

    function getId(value) {
        setCommentInfo(value)
    }

    function renderDetail() {
        return (
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">LATEST FROM OUR BLOG</h2>
                    <div className="single-blog-post">
                        <h3>{detail.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                        </div>
                        <a href="#">
                            {/* <img src={"http://localhost/laravel/public/upload/Blog/image/" + detail.image} alt="" /> */}
                        </a>
                        {/* <p>{detail.content}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><a href="#">Pre</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>{/*/blog-post-area*/}
                <Rate />
                <div className="socials-share">
                    <a href="#"><img src="images/blog/socials.png" alt="" /></a>
                </div>{/*/socials-share*/}
                <ListComment listCmt={listCmt} getId={getId} />
                <Comment getCmt={getCmt} commentInfo={commentInfo} />
            </div>
        )
    }
    return (
        renderDetail()
    )
}
export default BlogDetail;
