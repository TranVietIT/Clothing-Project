import { useState } from "react";
import ErrorLr from "./ErrorLr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [formData, setformData] = useState({})
  const [error, setError] = useState({})

  function handleChange(e) {
    const inputName = e.target.name;
    const value = e.target.value;
    setformData(state => ({ ...state, [inputName]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    let errorSubmit = {};
    let flat = true;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (formData.email == undefined) {
      flat = false;
      errorSubmit.email = "Vui lòng nhập email"
    } else if (!regex.test(formData.email)) {
      errorSubmit.email = "Email không đúng định dạng vui lòng kiểm tra lại"
    }
    if (formData.password == undefined) {
      flat = false;
      errorSubmit.password = "Vui lòng nhập mật khẩu"
    }
    if (formData.level == undefined) {
      flat = false;
      errorSubmit.level = "Vui lòng nhập cấp bậc"
    }

    if (!flat) {
      setError(errorSubmit);
    } else {
      const requestData = {
        email: formData["email"],
        password: formData["password"],
        level: 0
      }
      // console.log(requestData)
      axios.post("http://localhost/laravel/public/api/login", requestData)
        .then(res => {
          // console.log(res)
          if (res.data.errors) {
            setError(res.data.errors)
          } else {
            console.log(res)

            var login = JSON.stringify(res)
            localStorage.setItem("login", login); 
            navigate('/'); 
          } 
        })
    }
  }
  return (
    <div className="login">
      <div className="col-sm-4 col-sm-offset-1">
        <div className="login-form">
          <h2>Login to your account</h2>
          <ErrorLr error={error} />
          <form action="#" onSubmit={handleSubmit} formEncType="multipart/form-data">
            <input type="text" name="email" placeholder="Email" value={formData["email"]} onChange={handleChange} />
            <input type="text" name="password" placeholder="Password" value={formData["password"]} onChange={handleChange} />
            <input type="level" placeholder="Level" name="level" value={formData["level"]} onChange={handleChange} />
            <span>
              <input type="checkbox" className="checkbox" />
              Keep me signed in
            </span>
            <button type="submit" className="btn btn-default">Login</button>
          </form>
        </div>
      </div>
      <div className="col-sm-1">
        <h2 className="or">OR</h2>
      </div>
    </div>
  );
}
export default Login;