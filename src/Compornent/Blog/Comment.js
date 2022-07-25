import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";


function Comment(props) {
    const commentInfo = props.commentInfo;

    let params = useParams();

    const [text, setText] = useState("")
    const [error, setError] = useState("")



    function handleTextArea(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        let userDataComment = localStorage.getItem("login");
        if (userDataComment) {
            let userDataC = JSON.parse(userDataComment);
            let userData = userDataC.data.Auth

            //đường dẫn API
            let url = "http://localhost/laravel/public/api/blog/comment/" + params.id;
            let accessToken = userDataC.data.success.token;
            // config để gửi token qua API
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            const checklogin = localStorage.getItem("login")
            if (checklogin) {
                if (text == "") {
                    setError("Vui lòng nhập nội dung trước khi gửi")
                } else {
                    const formData = new FormData();
                    formData.append('id_blog', params.id);
                    formData.append('id_user', userData.id);
                    formData.append('id_comment', commentInfo.id ? commentInfo.id : 0);
                    formData.append('comment', text);
                    formData.append('image_user', userData.avatar);
                    formData.append('name_user', userData.name);

                    axios.post(url, formData, config)
                        .then(res => {
                            alert("Comment Success");
                            props.getCmt(res.data.data) // được truyền biến từ bên blogDetail sang để lấy thông tin vừa bl xong gửi qua bên detail.
                        })
                }
            }

        } else {
            alert("Bắt buộc đăng nhập trước khi bình luận")
        }

    }

    function renderComment() {
        return (
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <form onSubmit={handleSubmit}>
                                <div className="blank-arrow">
                                    <label>Your Name</label>
                                </div>
                                <span>*</span>
                                <textarea id="cmt" name="message" value={text} rows={11} onChange={handleTextArea} />
                                <p style={{ color: 'red' }}>{error}</p>
                                <button type="submit" className="btn btn-primary">Post Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        renderComment()
    )
}
export default Comment;