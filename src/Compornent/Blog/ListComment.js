import React, { useState } from "react";

function ListComment(props) {

    function renderdata() {
        const comment = props.listCmt;

        const handleReply = (value) => {
            props.getId(value)
        }

        if (comment.length > 0) {
            return comment.map((value, key) => {
                if (value.id_comment == 0) {
                    return (
                        <React.Fragment key={key}>
                            <li className="media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={"http://localhost/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" />{value.created_at}pm</li>
                                        <li><i className="fa fa-calendar" />{value.updated_at}</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <a
                                        className="btn btn-primary"
                                        href="#cmt"
                                        onClick={() => handleReply(value)}
                                    >
                                        <i className="fa fa-reply" />
                                        Replay
                                    </a>
                                </div>
                            </li>
                            {comment.map((value2, key2) => {
                                if (value.id == value2.id_comment) {
                                    return (
                                        <li className="media second-media" key={key2}>
                                            <a className="pull-left" href="#">
                                                <img className="media-object" src={"http://localhost/laravel/public/upload/user/avatar/" + value2.image_user} alt="" />
                                            </a>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user" />{value2.name_user}</li>
                                                    <li><i className="fa fa-clock-o" />{value2.created_at}pm</li>
                                                    <li><i className="fa fa-calendar" />{value2.updated_at}</li>
                                                </ul>
                                                <p>{value2.comment}</p>
                                                <a
                                                    className="btn btn-primary"
                                                    href="#cmt"
                                                    onClick={() => handleReply(value)}
                                                >
                                                    <i className="fa fa-reply" />
                                                    Replay
                                                </a>
                                            </div>
                                        </li>
                                    );
                                }
                            })}
                        </React.Fragment>
                    )
                }
            })
        }
    }

    return (
        <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">
                {renderdata()}
            </ul>
        </div>
    )
}
export default ListComment;

// muon hien ra nhiều bình luận cha :
// ...map(...){
//     if(id_comment == 0){
//         return (
//             li cha
//         )
//     }
//     ...map2(..){
//         if(id_comment cua map 2 = id map 1){
//             return (
//                 li con
//             )
//         }
//     }

// }