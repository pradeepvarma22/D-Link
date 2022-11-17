
const walletReducer = (state, action) => {

    switch (action.type) {
        case WALLET_OPTIONS.SET_WALLET_ADDRESS: return { ...state, walletAddress: action.payload, isWalletConnected: true };

        case WALLET_OPTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };
        case WALLET_OPTIONS.PROVIDER: return { ...state, provider: action.payload };
        case WALLET_OPTIONS.IS_WALLET_CONNECTED: return { ...state, isWalletConnected: action.payload };

        default: return state;
    }
}

const WALLET_INITIAL_STATE = {
    walletAddress: "",
    isWalletConnected: false,
    provider: {},
    error: false,
    errorMessage: ""
}

const WALLET_OPTIONS = {
    SET_WALLET_ADDRESS: 'SET_WALLET_ADDRESS',
    PROVIDER: 'PROVIDER',
    ERROR: 'ERROR',
    IS_WALLET_CONNECTED: 'IS_WALLET_CONNECTED'
}

export { walletReducer, WALLET_INITIAL_STATE, WALLET_OPTIONS }
