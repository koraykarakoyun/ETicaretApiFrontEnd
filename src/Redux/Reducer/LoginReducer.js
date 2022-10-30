
const LoginState = [
    {
        email:"bos",
        sifre:"bos"
    }
];


const Loginreducer = (state = LoginState, action) => {


    switch (action.type) {

        case "add": {
            return [...state, action.data]
        }

        case "remove": {
            return state.filter((element) => {
                return element.id!=action.data.id
            })
        }
        default:
        return state 
        
    }


}

export default Loginreducer