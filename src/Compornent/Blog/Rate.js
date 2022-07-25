import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
function Rate(props) {

    let params = useParams();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        axios.get("http://localhost/laravel/public/api/blog/rate/" + params.id)
            .then(res => {
                let data = res.data.data;
                let total = 0;
                if (data.length > 0) {
                    data.map((value, key) => {
                        total = total + value.rate;
                    })
                    let avgRate = total / data.length;
                    // console.log(avgRate);
                    setRating(avgRate)
                }else{
                    alert("Vui lòng đánh giá sản phẩm giúp chúng tôi")
                }
            })
    }, [])

    function changeRating(newRating, name) {
        setRating(newRating);
        // console.log(newRating);

        let userData = localStorage["Information"]
        if (userData) {
            userData = JSON.parse(localStorage["Information"])

            let url = "http://localhost/laravel/public/api/blog/rate/" + params.id;
            let accessToken = userData.auth_token;
            // // config để gửi token qua API
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            const checklogin = localStorage.getItem("login")
            if (checklogin) {
                const formData = new FormData();
                formData.append('blog_id', params.id);
                formData.append('user_id', userData.id_user);
                formData.append('rate', newRating);

                axios.post(url, formData, config)
                    .then(res => {
                        alert(res.data.message);
                    })
            }
        }else {
            alert("Vui lòng Đăng Nhập trước khi đánh giá");
        }
    }
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li className="color">
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                    />
                </li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
            </ul>
        </div>
    )
}
export default Rate;