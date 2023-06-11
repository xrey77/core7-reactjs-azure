import React,{useState, useEffect} from 'react'
import $ from 'jquery';
import axios from 'axios';

const api = axios.create({
   baseURL: "http://localhost:5073",
   headers: {'Accept': 'application/json',
             'Content-Type': 'application/json'}
})

export default function Mfa() {

  let userId = sessionStorage.getItem('USERID');

  const [otpcode, setOtpcode] = useState("");
  const  [otpMessage, setOtpMessage] = useState("");

  useEffect(() => {

    // const fetchdata = async () => {
    //     const res = await api.get('/getproducts?find='+keyword);
    //     setProducts(res.data.data)
    // }
    // fetchdata();
});
  const closeMfa = () =>{
    setOtpMessage('');
    $("#mfaReset").click();
  }

  const submitOTP = (event: any) => {
    event.preventDefault();
    const data =JSON.stringify({ id: userId, otp: otpcode });
    api.post("/validateotp", data)
    .then((res) => {
        if (res.data.statuscode === 200) {
            setOtpMessage(res.data.message);
            sessionStorage.setItem("USERNAME", res.data.username);
            $("#mfaReset").click();
            window.setTimeout(() => {
              window.location.reload();
            }, 3000);
            return;
        } else {
          setOtpMessage(res.data.message);
          return;
        }
      }, (error) => {
            setOtpMessage(error.message);
            return;
    });    
  }

  return (
<div className="modal fade" id="staticMfa" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticMfaLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-warning">
        <h1 className="modal-title fs-5 text-white" id="staticMfaLabel">2-Factor Authenticator</h1>
        <button onClick={closeMfa} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form id="mfaForm" onSubmit={submitOTP} autoComplete='off'>
          <div className="mb-3">
            <input type="text" maxLength={6} required className="form-control" value={otpcode} onChange={e => setOtpcode(e.target.value)} placeholder="enter 6 digits OTP Code" autoComplete='off'/>
        </div>
        <button type="submit" className="btn btn-warning">submit</button>
        <button id="mfaReset" type="reset" className="btn btn-warning">reset</button>

        </form>
      </div>
      <div className="modal-footer">
        <div id="mfaMsg" className="w-100 text-left text-danger">{otpMessage}</div>
      </div>
    </div>
  </div>
</div>    
  )
}
