import axios from "axios";
import { useEffect, useState } from "react";

function Account() {
    const [error, setError] = useState({})
    const [getFile, setGetFile] = useState("")
    const [getAvatar, setGetAvatar] = useState({})
    const [formUpdate, setFormUpdate] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
    })

    let userData = localStorage["Information"]
    useEffect(() => {
        if (userData) {
            userData = JSON.parse(localStorage["Information"])
            setFormUpdate({
                name: userData.name_user,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
                address: userData.address,
                avatar: getAvatar,
            })
        }
    }, [])


    const handleChange = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setFormUpdate(state => ({ ...state, [nameInput]: value }));
    }

    const handleFile = (e) => {
        // setGetFile(e.target.files)
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setGetAvatar(e.target.result);// cái này để gửi qua API
            setGetFile(file[0]); // cái này để toàn bộ thông tin file upload đưa vào file, để xuống form gọi ra kiểm tra
        };
        reader.readAsDataURL(file[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (userData) {
            userData = JSON.parse(localStorage["Information"])
            let url = "http://localhost/laravel/public/api/user/update/" + userData.id_user
            let accessToken = userData.auth_token;
            // // config để gửi token qua API
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append("name", formUpdate.name);
            formData.append("email", formUpdate.email);
            formData.append("password", formUpdate.password);
            formData.append("address", formUpdate.address);
            formData.append("avatar", formUpdate.avatar);
            formData.append("phone", formUpdate.phone);

            axios.post(url, formData, config)
            .then((res) => {
                console.log(res);
                var convert = JSON.stringify(res)
                localStorage.setItem('Information', convert)
                alert("Update thanh cong");
            });
        }

        // }
    }


    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>User Update!</h2>
                {/* <ErrorLr error={error} /> */}
                <form action="#" onSubmit={handleSubmit} formEncType="multipart/form-data">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formUpdate.name}
                        onChange={handleChange}
                    />
                    {/* thuoc tinh value cua input name se co key co ten la name_user cua state formUpdate */}
                    <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        value={formUpdate.email}
                        onChange={handleChange}
                        readOnly
                    />
                    <input
                        type='text'
                        placeholder="Password"
                        name="password"
                        value={formUpdate.password}
                        onChange={handleChange}
                    />
                    <input
                        type="phone"
                        placeholder="Phone"
                        name="phone"
                        value={formUpdate.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="address"
                        placeholder="Address"
                        name="address"
                        value={formUpdate.address}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        placeholder="Avatar"
                        name="file"
                        onChange={handleFile}
                    />
                    <button
                        type="submit"
                        className="btn btn-default">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Account;

//Các ý cần hỏi thầy:
// lỗi syntax khi vừa chạy xong web.
// cách tạo ra một database mới, tại sao lại bị trùng với cái cũ.
// kiểm tra lại lúc lấy dữ liệu từ localStorage ra kiểm tra if else.
// cách xử lý MenuLeft  bên login và register

 // const userData = JSON.parse(localStorage["Information"])
        // console.log(userData);
        
        // let errorSubmit = {};
        // let flag = true;
        // let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // let listType = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

        // if (formUpdate.name == "") {
        //     flag = false;
        //     errorSubmit.name = "Vui lòng nhập tên";
        // }
        // if (formUpdate.phone == "") {
        //     flag = false;
        //     errorSubmit.phone = "Vui lòng nhập số điện thoại";
        // }
        // if (formUpdate.address == "") {
        //     flag = false;
        //     errorSubmit.address = "Vui lòng nhập số điện thoại";
        // }

        // if (getFile) {
        //     let getSize = getFile.size;
        //     let getName = getFile.name;
        //     let getsp = getName.split(".");
        //     // console.log(getsp);

        //     // kiểm tra đuôi file có trong mảng không, không thì báo lỗi
        //     if (!listType.includes(getsp[1])) {
        //         flag = false;
        //         errorSubmit.getFile = "Vui lòng kiểm tra lại đây k đúng hình ảnh";
        //     }
        //     // rồi thì tiếp tục kiểm tra size có đúng định dạng hay không
        //     else if (getSize > 1024 * 1024) {
        //         flag = false;
        //         errorSubmit.getFile = "Vui lòng kiểm tra lại đơn vị của hình ảnh"
        //     }

        // }
        // // else {
        // //     flag = false;
        // //     errorSubmit.getFile = "Chưa có hình ảnh được chọn"
        // // }
        // if (!flag) {
        //     setError(errorSubmit);
        // } else {