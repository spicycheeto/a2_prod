import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {reqLogout, reqSignup, reqLogin, reqIsVerified, reqTwoFaAuth, reqProfilePage,reqNewPassword, reqForgotPasswordEmail, reqNewApiKey, reqProfileChange, req2faSignup} from "./api";

//site specific imports
import {reqCardState,reqSetCardState,reqAllCardState,reqUpdateCardState,reqRemoveProduct, reqCreateProduct} from "./api";


export const initializeSession = ( session ) => ( {
    type: "INITIALIZE_SESSION",
    session,
} );

export const initializeUsername = ( username ) => ( {
    type: "INITIALIZE_USERNAME",
    username,
} );


export const initializeStoreData = ( data ) => ( {
    type: "STORE_DATA",
    data,
} );

 const storeData = ( data ) => ( {
    type: "STORE_DATA",
    data,
} );



const removeStoreData = ( name ) => ( {
    type: "REMOVE_STORE_DATA",
     name,
} );


/****************************/
/***SITE SPECIFIC REQUESTS***/
/****************************/
export const getCardState = (obj, dispatch) => {
  reqCardState(obj).then(response => {
    return dispatch(storeData(response) );
  })
}

export const setCardState = (obj, dispatch) => {
  reqSetCardState(obj).then(response => {
    return dispatch(storeData(response) );
  })
}

export const getAllCardState = (dispatch,cb) => {
  reqAllCardState().then(response => {
    if(cb){
      dispatch(storeData(response) );
      return (cb(null,true))
    }else{
    return dispatch(storeData(response) );
    }
  })
}


export const updateProduct = (obj, dispatch) => {
  reqUpdateCardState(obj).then(response => {
      return dispatch( storeData(response) )
  })
}

export const removeProduct = (obj,dispatch) => {
  reqRemoveProduct(obj).then(response => {
      return dispatch( storeData(response) )
  })
}

export const createProduct = (obj,dispatch) => {
  console.log('createProduct store')
  reqCreateProduct(obj).then(response => {
      return dispatch( storeData(response) )
  })
}


/****************************/
/****************************/
/****************************/



export const do2faSignup = (secret, dispatch) => {
  req2faSignup().then(response => {
    dispatch(storeData(response));
  })


}


export const checkAuth = (isLoggedIn, dispatch) => {

  reqIsAuthorized().then(response => {

    if(response.loggedIn !== isLoggedIn){
      dispatch(initializeSession(response.isLoggedIn))
    }else{
      return;
    }
  })

}

/****************/
// Add data to store
/***************/
export const addData = (dataObj,dispatch) => {

  dispatch(storeData(dataObj));
}

/*  Remove data from store)
* @elementName String
*/
export const removeData = (elementName,dispatch) => {
  dispatch(removeStoreData(elementName));
}

/*Request a change to user data
*/
export const doProfileChange = (bodyObj, dispatch) => {
  reqProfileChange(bodyObj).then(response => {
    dispatch(storeData(response));
    doProfilePage({name: 'settings'},dispatch)

  })
}


/*Request new Api Key */
export const doNewApiKey = ( bodyObj, dispatch) => {
  reqNewApiKey(bodyObj).then(response => {
    dispatch(storeData(response));
  })
}


export const forgotPasswordEmail = (bodyObj, dispatch) => {

  reqForgotPasswordEmail(bodyObj).then(res => {
    dispatch(storeData(res))
   }
  );
}

export const doForgotPassword = (bodyObj, dispatch) => {

  reqNewPassword(bodyObj).then(res => {
    dispatch(storeData(res))
  })

}

export const doProfilePage = ( bodyObj,dispatch ) => {

if(bodyObj){
  reqProfilePage(bodyObj).then(res => {
    dispatch( storeData(res) )
  });
}else{
  reqProfilePage().then(res => {
    dispatch( storeData(res) )
  });
}


}

export const doTwoFaAuth = (bodyObj, dispatch) => {

  reqTwoFaAuth(bodyObj).then(response => {

    dispatch(storeData(response));

  })

}

export const accountVerification = (obj, dispatch) => {

  reqIsVerified(obj).then(res => {
    if(res.verified){
      dispatch(initializeSession(res.verified));
      dispatch(storeData(res));
    }else{
      dispatch(storeData(res))
    }

  })
}



export const doLogin = ( bodyObj, dispatch ) => {

    reqLogin(bodyObj).then( res => {
      console.log('dologin response:')
      console.log(res)
      if(res.name === 'accountVerification' || res.name === 'Fail'){
        dispatch(storeData(res))
      }
      else{
        dispatch( initializeSession( res.isLoggedIn ) )
      }
    });
  }

export const doLogout = (dispatch) =>{

  reqLogout().then(res => {
    dispatch(initializeSession(res.isLoggedIn))
    dispatch(storeData({name: 'justLoggedOut'}))
  })
}
export const doSignup = (bodyObj,dispatch) =>{

  reqSignup(bodyObj).then(res => {

    if(res.name === 'accountVerification'){
      dispatch(storeData(res));
    }else{
      dispatch(storeData(res))
    }
  })
}


const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":{
          if(action.session){
            return action.session;
          }
          else{
            return false;
          }
        }
        default: return state;
    }
};



const usernameReducer = ( state = '', action ) => {
    switch ( action.type ) {
        case "INITIALIZE_USERNAME":{
          if(action.username){
            return action.username;
          }
          else{
            return '';
          }
        }
        default: return state;
    }
};




const accountVerificationReducer = (state = false, action) => {
  switch(action.type){
    case "ESTABLISH_ACCOUNT_VERIFCATION":{
      if(action.accountVerification){
        return action.accountVerification;
        }
      }
      default: return state;
  }
}

const dataReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case "STORE_DATA":{
          let newState = state.filter(e => e.name !== action.data.name)
          newState.push(action.data)
          return newState;

        }

        case "REMOVE_STORE_DATA":{
          console.log('123')
          console.log(action)
          let newState = state.filter(element => element.name !== action.name )
          return newState;
        }

        default: return state;
    }
};

const reducer = combineReducers( {
    loggedIn: sessionReducer,
    data: dataReducer,
    username: usernameReducer,

} );

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
