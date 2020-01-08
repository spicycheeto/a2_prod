let fetch = require("isomorphic-fetch");


function makeInvite(){
          fetch('https://www.hackthebox.eu/api/invite/how/to/generate', {
            method: 'POST',
            headers:{
              'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: ""}),
          })
          .then(res => res.json() )
          .then(res => console.log(res) )
          .catch(err => console.log(err))
}

function generateCode(){
          fetch('https://www.hackthebox.eu/api/invite/generate', {
            method: 'POST',
            headers:{
              'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: ""}),
          })
          .then(res => res.json() )
          .then(res => console.log(res) )
          .catch(err => console.log(err))
}

function verify(code){
    var formData={"code":code};
          fetch('https://www.hackthebox.eu/api/invite/verify', {
            method: 'POST',
            headers:{
              'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          })
          .then(res => res.json() )
          .then(res => console.log(res) )
          .catch(err => console.log(err))
}

generateCode()
//verifyInviteCode("test");
//makeInviteCode()
//verify("testcode")
