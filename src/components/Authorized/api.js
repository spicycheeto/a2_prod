import fetch from "isomorphic-fetch";


/****************************/
/***SITE SPECIFIC REQUESTS***/
/****************************/
export function reqCardState(obj){

  return(
    fetch('/cardDisplay/getCardState', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )
}

export function reqSetCardState(obj){
  return(
    fetch('/cardDisplay/setCardState', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )
}

export function reqUpdateCardState(obj){
  return(
    fetch('cardDisplay/updateProduct', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))
   )
  }

export function reqRemoveProduct(obj){
  return(
    fetch('cardDisplay/removeProduct', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))
   )
  }

  export function reqCreateProduct(obj){
    return(
      fetch('cardDisplay/createProduct', {
        method: 'POST',
        headers:{
          'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
      })
      .then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err))
     )
    }


export function reqAllCardState(){

  return(
    fetch('/cardDisplay/getAllCardData', {
      method: 'GET',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )
}


/****************************/
/****************************/
/****************************/


export function reqTwoFaAuth(bodyObj){

  return(
    fetch('/auth/twofaauth', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )
}

export function reqIsAuthorized(){

  return(
    fetch('/auth/isAuthorized', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({obj: 'empyObj'}),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )
}


export function reqProfileChange(bodyObj){

  return(
    fetch('/user/changeprofile', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )
}





/*******************Forgot Password Requests*****************************/

export function reqForgotPasswordEmail(bodyObj){

  return(
    fetch('/auth/forgotpassword', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    })
    .then(res => res.json())
    .then(res => res)
  )
}

export function reqNewPassword(bodyObj){
  return(

    fetch('/auth/changePassword', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(`error: ${err}`))
  )}

/************************************************************************/


export function reqNewApiKey(bodyObj){

  return(
    fetch('/user/newapikey', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )




}

export function reqProfilePage(bodyObj){
  return(
    fetch('/user/profile', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj),
    })
    .then(res => res.json() )
    .then(res => res )
    .catch(err => console.log(err))
  )

}


export function reqIsVerified(params){

  return(
    fetch('/auth/isVerified', {
      method: 'POST',
      headers:{
        'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))
  )
}



export function reqSignup(bodyObj){

  return(fetch('/auth/signup', {
    method: 'POST',
    headers:{
      'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  })
  .then(res => res.json() )
  .then(res => res)
)}




export function reqLogin(bodyObj){
  return(fetch('/auth/login', {

    method:"POST",
    headers:  {
      'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)

  })
  .then(res =>  res.json() )
  .then(res =>  res ) )
}

export function reqLogout(){
  return(fetch('/auth/logout', {
    method: 'GET',
    headers: {
      'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,q=0.8',
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json() )
  .then(res => res) )
}
