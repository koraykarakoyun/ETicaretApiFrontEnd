
const AuthState = false;


const Authreducer = (state = AuthState, action) => {


    switch (action.type) {

        case "authanticated": {
            return  state=true;
            
        }

        case "notauthanticated": {
            localStorage.clear();
            return state=false;
        }
        default:
        return state 
        
    }


}

export default Authreducer