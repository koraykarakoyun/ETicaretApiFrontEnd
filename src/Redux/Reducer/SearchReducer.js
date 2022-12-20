const SearchState = {
    productName: null
}

const SearchReducer = (state = SearchState, action) => {


    switch (action.type) {

        case "productsearch": {
            return state = {
                productName: action.productName,
            };

        }
        default:
            return state

    }


}

export default SearchReducer