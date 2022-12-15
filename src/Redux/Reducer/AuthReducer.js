 const AuthState = {
    isAuth: false,
    activeAccount: "",
    role:""

}


const Authreducer = (state = AuthState, action) => {


    switch (action.type) {

        case "authanticated": {
            return state = {
                isAuth: true,
                activeAccount: action.activeAccount,
                role:action.role
            };

        }

        case "notauthanticated": {
            localStorage.clear();
            return state = {
                isAuth: false,
                activeAccount:action.activeAccount,
            };
        }
        default:
            return state

    }


}

export default Authreducer