const BadgeState = {
    count: "0"
}


const BadgeReducer = (state = BadgeState, action) => {


    switch (action.type) {

        case "setBadgeCount": {
            return state = {
                count:action.data
            };

        }

        default:
            return state

    }


}

export default BadgeReducer