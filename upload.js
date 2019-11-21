import React, { Component } from 'react';
const axios = require('axios');

class upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      AWSAccessKeyId: "",
      policy: "",
      signature: "",
      acl:"",
    
    };
  }


  changeHandler = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };


  handleChange = e => {
    let file = e.target.files[0];
    this.setState({
      file: file
    });

  axios.get("http://3.209.149.222:8088/fastapi/sign_s3/?resource=images/" +e.target.files[0].name)
      .then(resp => {
        this.setState({
          key: resp.data.fields.key,
          AWSAccessKeyId: resp.data.fields.AWSAccessKeyId,
          policy: resp.data.fields.policy,
          signature: resp.data.fields.signature,
          acl:resp.data.fields.acl
        });
      });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const header ={
      "Content-Type":"multipart/form-data"
    }
    const formData = new FormData();
    formData.append( 'acl', this.state.acl);
    formData.append( 'Content-Type', 'png');
    formData.append( 'key', this.state.key);
    formData.append( 'AWSAccessKeyId', 'AKIA5ZXHSS7RR2SMS54W');
    formData.append( 'policy', this.state.policy);
    formData.append( 'signature', this.state.signature);
    formData.append( 'file', this.state.file);

    let url = "https://fullapi.s3.amazonaws.com";
    axios
      .post(url, formData, {headers:header})
      .then(response => {
      })
      .catch(error => {});
  };
  render() {
    return (
      <>
        <div>
          <input type="file" name="file" onChange={this.handleChange} />
        </div>

        <div>
          <form method="post" action="https://fullapi.s3.amazonaws.com" enctype="multipart/form-data">
            <input type="hidden" name="acl" value={this.state.acl} />
            <input type="hidden" name="Content-Type" value="png" />
            <input type="hidden" name="key" value={this.state.key} />
            <input
              type="hidden"
              name="AWSAccessKeyId"
              value={this.state.AWSAccessKeyId}
            />
            <input type="hidden" name="policy" value={this.state.policy} />
            <input
              type="hidden"
              name="signature"
              value={this.state.signature}
            />
           
            <button type="button" onClick={this.submitHandler}>
              submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default upload;