import React, { useState} from 'react'
import Mfa from './Mfa';
import axios from 'axios';
import $ from 'jquery';

const api = axios.create({
  baseURL: "http://localhost:5073",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const closeLogin = () => {
    $("#loginReset").click();
  }

  const submitLogin = (event: any) => {
    event.preventDefault();
    setLoginMessage('please wait...');
    const data =JSON.stringify({ username: username, password: password });
    api.post("/signin", data)
    .then((res) => {
        if (res.data.statuscode === 200) {
            setLoginMessage(res.data.message);

            if (res.data.qrcodeurl != null) {
                sessionStorage.setItem('USERID',res.data.id);
                sessionStorage.setItem('TOKEN',res.data.token);
                sessionStorage.setItem('ROLE',res.data.roles);
                sessionStorage.setItem('USERPIC',res.data.profilepic);
                $("#loginReset").click();
                $("#mfaModal").click();

            } else {
                sessionStorage.setItem('USERID',res.data.id);
                sessionStorage.setItem('USERNAME',res.data.username);
                sessionStorage.setItem('TOKEN',res.data.token);                        
                sessionStorage.setItem('ROLE',res.data.roles);
                sessionStorage.setItem('USERPIC',res.data.profilepic);
                $("#loginReset").click();
                window.location.reload();
            }
            return;
        } else {
          setLoginMessage(res.data.message);
            setTimeout(() => {
              setLoginMessage('');
            }, 3000);
            return;
        }
      }, (error) => {
            setLoginMessage(error.message);
            setTimeout(() => {
              setLoginMessage('');
            }, 3000);
            return;
    });
  }

  return (
    <>
    <Mfa/>
<div className="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticLoginLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-primary">
        <h1 className="modal-title fs-5 text-white" id="staticLoginLabel">User's Login</h1>
        <button id="closeLogin" onClick={closeLogin} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form id="loginForm" onSubmit={submitLogin} autoComplete='off'>
          <div className="mb-3">
            <input type="text" required className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter Username" autoComplete='off'/>
        </div>
        <div className="mb-3">
            <input type="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter Password" autoComplete='off'/>
        </div>
        <button type="submit" className="btn btn-primary">login</button>
        <button id="loginReset" type="reset" className="btn btn-primary">reset</button>
        <button id="mfaModal" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticMfa">mfa</button>

        </form>
      </div>
      <div className="modal-footer">
        <div id="loginMsg" className="w-100 text-left text-danger">{loginMessage}</div>
      </div>
    </div>
  </div>

</div>
</>
  )
}
