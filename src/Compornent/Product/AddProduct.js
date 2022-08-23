import { useState } from "react";
import Error from "../ShowError/Error";

function AddProduct() {

    const [error, setError] = useState({})
    const [inputs, setInputs] = useState({})
    const [getFile, setGetFile] = useState({})

    const hanldeFile = (e) => {
        setGetFile(e.target.files)
        console.log(e.target.files);
    }

    const hanldeInput = (e) => {
        let nameInput = e.target.name;
        let valueInput = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: valueInput }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let errorSubmit = {};
        let flag = true;

        if (inputs.category == undefined) {
            flag = false;
            errorSubmit.category = "Vui lòng chọn Loại"
        }
        if (inputs.brand == undefined) {
            flag = false;
            errorSubmit.brand = "Vui lòng chọn nhãn hàng"
        }
        if (inputs.name == undefined) {
            flag = false;
            errorSubmit.name = "Vui lòng nhập tên"
        }
        if (getFile) {

            Object.keys(getFile).map((value,key) => {
                
                let listType = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
                let name = getFile[value].name;
                let namesplit = name.split('.');
                let img = listType.includes(namesplit[1]);

                
                if(getFile[value].size > 1024*1024){
                    flag = false;
                    errorSubmit.getFile = "Vui lòng kiểm tra size của hình ảnh"
                }
                if(!img){
                    flag = false;
                    errorSubmit.getFile = "Vui lòng kiểm tra lại đây k đúng hình ảnh"
                }
                
            })
        } 
        else {
            flag = false;
            errorSubmit.getFile = "Chưa có hình ảnh được chọn"
        }
        if (!flag) {
            setError(errorSubmit);
        }

    }

    return (
        <div className="col-sm-9 padding-right">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header"><h3>Add Product</h3></div>
                    <br />
                    <div className="card-body">
                        <Error error={error} />
                        <form id="main-contact-form" className="contact-form row" name="contact-form" onSubmit={handleSubmit}>

                            <div className="form-group col-md-12">
                                <select name="category" onChange={hanldeInput}>
                                    <option value={0}>Please select category</option>
                                    <option value={1}>Category1</option>
                                    <option value={2}>Category2</option>
                                    <option value={3}>Category3</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <select name="brand" onChange={hanldeInput}>
                                    <option value={0}>Please select brand</option>
                                    <option value={1}>Brand1</option>
                                    <option value={2}>Brand2</option>
                                </select>
                            </div>

                            <div className="form-group col-md-12">
                                <input type="text" className="form-control" placeholder="Name" name="name" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12">
                                <input className="form-control" type="file" name="image" multiple onChange={hanldeFile} />
                            </div>

                            <div className="form-group col-md-12">
                                <input type="number" className="form-control" id="display" placeholder="Price" name="price" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12" >
                                <select name="status" onChange={hanldeInput}>
                                    <option value={1}>new</option>
                                    <option value={0}>sale</option>
                                </select>
                            </div>

                            {/* {renderSale()} */}

                            <div className="form-group col-md-12">
                                <textarea id="detail" className="form-control" placeholder="Detail" name="detail" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12">
                                <input id="company_profile" className="form-control" placeholder="company" name="company" onChange={hanldeInput} />
                            </div>

                            <div className="form-group col-md-12">
                                <input type="submit" className="btn btn-primary pull" name="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;