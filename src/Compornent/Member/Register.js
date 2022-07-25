import ErrorLr from "./ErrorLr";
import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setformData] = useState({});
  const [error, setError] = useState({});
  const [getFile, setFile] = useState("");
  const [avatar, setAvatar] = useState({});

  function handleFile(e) {
    // setFile(e.target.files);
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);// cái này để gửi qua API
      setFile(file[0]); // cái này để toàn bộ thông tin file upload đưa vào file, để xuống form gọi ra kiểm tra
    };
    reader.readAsDataURL(file[0]);
  }

  function handleChange(e) {
    const nameInput = e.target.name; 
    const value = e.target.value;
    setformData(state => ({ ...state, [nameInput]: value }))
  }
  // setformData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //   }) cach 2
  // tim hieu ve switch case
  // xử lý form
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flat = true;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let listType = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

    if (formData.name == undefined) {
      flat = false;
      errorSubmit.name = "Vui lòng nhập tên người đăng ký";
    }
    if (formData.email == undefined) {
      flat = false;
      errorSubmit.email = "Vui lòng nhập email"
    } else if (!regex.test(formData.email)) {
      errorSubmit.email = "Email không đúng định dạng vui lòng kiểm tra lại";
    }
    if (formData.password == undefined) {
      flat = false;
      errorSubmit.password = "Vui lòng nhập mật khẩu";
    }
    if (formData.phone == undefined) {
      flat = false;
      errorSubmit.phone = "Vui lòng nhập số điện thoại"
    }
    if (formData.address == undefined) {
      flat = false;
      errorSubmit.address = "Vui lòng nhập địa chỉ"
    }
    // console.log(getFile)
    if (getFile) {

      let getSize = getFile.size;
      let getName = getFile.name;
      let getsp = getName.split(".");

      // kiểm tra đuôi file có trong mảng không, không thì báo lỗi
      if (!listType.includes(getsp[1])) {
        flat = false;
        errorSubmit.getFile = "Vui lòng kiểm tra lại đây k đúng hình ảnh";
      }
      // rồi thì tiếp tục kiểm tra size có đúng định dạng hay không
      else if (getSize > 1024 * 1024) {
        flat = false;
        errorSubmit.getFile = "Vui lòng kiểm tra lại đơn vị của hình ảnh"
      }
    } else {
      flat = false;
      errorSubmit.getFile = "Chưa có hình ảnh được chọn"
    }
    if(formData.level == undefined){
      flat = false;
      errorSubmit.level = "vui lòng nhập cấp bậc"
    }
    // đưa tất cả lỗi trong cả errorSubmit vào trong setError
    if (!flat) {
      setError(errorSubmit);
    } else {
      const requestData = {
        name: formData["name"],
        email: formData["email"],
        password: formData["password"],
        phone: formData["phone"],
        address: formData["address"],
        avatar: avatar,
        level: 0
      }
      // console.log(requestData);
      axios.post("http://localhost/laravel/public/api/register", requestData)
        // sau khi API chạy thành công thì gọi toi function then dau vao la  res function va res tra ve... 
        .then(res => {
          //setformData(res)
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert("thanh cong")
          }

        })
    }
  }
  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>New User Signup!</h2>
        <ErrorLr error={error} />
        <form action="#" onSubmit={handleSubmit} formEncType="multipart/form-data">
          <input type="text" placeholder="Name" name="name" value={formData["name"]} onChange={handleChange} />
          {/* thuoc tinh value cua input name se co key co ten la name cua state formData */}
          <input type="text" placeholder="Email Address" name="email" value={formData["email"]} onChange={handleChange} />
          <input type='text' placeholder="Password" name="password" value={formData["password"]} onChange={handleChange} /><p />
          <input type="phone" placeholder="Phone" name="phone" value={formData["phone"]} onChange={handleChange} />
          <input type="address" placeholder="Address" name="address" value={formData["address"]} onChange={handleChange} />
          <input type="file" placeholder="Avatar" name="file" value={formData["file"]} onChange={handleFile} />
          <input type="level" placeholder="Level" name="level" value={formData["level"]} onChange={handleChange} />
          <button type="submit" className="btn btn-default">Signup</button>
        </form>
      </div>
    </div>
  );
}
export default Register;