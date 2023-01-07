const activebasketState = {
    activeBasket: false
}


const ActiveBasketReducer = (state = activebasketState, action) => {


    switch (action.type) {

        case "activatebasket": {
            return state = {
                activeBasket: true,
            };

        }

        case "deactivatebasket": {
            return state = {
                activeBasket: false
            };
        }
        default:
            return state

    }


}

export default ActiveBasketReducer