import axios from "axios"
import { useEffect, useState } from "react"

function Account(props) {

    const [getAvatar, setGetAvatar] = useState({})
    const [getFile, setGetFile] = useState("")
    const [formUpdate, setFormUpdate] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
    })

    useEffect(() => {
        let userDataLogin = localStorage.getItem("login");
        if (userDataLogin) {
            let userData = JSON.parse(userDataLogin)
            let user = userData.data.Auth
            setFormUpdate({
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar,
            })
        }
    }, [])

    
    const handleChange = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setFormUpdate(state => ({ ...state, [nameInput]: value }));
    }

    const handleFile = (e) => {
        const file = e.target.files;

        let reader = new FileReader()
        reader.onload = () => {
            setGetFile(file[0]);
            setGetAvatar(e.target.result);
        }
        reader.readAsDataURL(file[0]);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let userDataLogin = localStorage.getItem("login");
        if(userDataLogin){
            let userData = JSON.parse(userDataLogin)
            let user = userData.data.Auth

            let url = "http://localhost/laravel/public/api/user/update/" + user.id;

            let accessToken = userData.data.success.token;

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
                let event = JSON.stringify(res)
                localStorage.setItem("login", event)
                alert("Update success");
            })
        }
    }

    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>User Update!</h2>
                {/* <ErrorLr error={error} /> */}
                <form action="#" onSubmit={handleSubmit} formEncType="multipart/form-data">
                    <input
                        className="name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formUpdate.name}
                        onChange={handleChange}
                    />
                    {/* thuoc tinh value cua input name se co key co ten la name_user cua state formUpdate */}
                    <input
                        className="email"
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        value={formUpdate.email}
                        onChange={handleChange}
                        readOnly
                    />
                    <input
                        className="password"
                        type='password'
                        placeholder="Password"
                        name="password"
                        value={formUpdate.password}
                        onChange={handleChange}
                    />
                    <input
                        className="phone"
                        type="phone"
                        placeholder="Phone"
                        name="phone"
                        value={formUpdate.phone}
                        onChange={handleChange}
                    />
                    <input
                        className="address"
                        type="address"
                        placeholder="Address"
                        name="address"
                        value={formUpdate.address}
                        onChange={handleChange}
                    />
                    <input
                        className="avatar"
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