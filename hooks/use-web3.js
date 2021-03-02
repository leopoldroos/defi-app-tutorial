import { useReducer } from 'react';
import Web3 from 'web3';

const web3Reducer = (state, action) => {
    switch (action.type) {
        case 'LOADED': {
            return { isLoaded: true };
        }
        default: {
            throw new Error(`Unhandled type: ${action.type}`);
        }
    }
};

// const useWeb3 = ({ reducer = web3Reducer }) => {
const useWeb3 = () => {
    const reducer = web3Reducer;
    const [{ isLoaded }, dispatch] = useReducer(reducer, { isLoaded: false });
    const setLoaded = () => dispatch({ type: 'LOADED' });
    const load = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            dispatch({ type: 'LOADED' });
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            dispatch({ type: 'LOADED' });
        } else {
            window.alert(
                'Non-Ethereum browser detected. You should consider trying MetaMask!'
            );
        }
    };

    return { isWeb3Loaded: isLoaded, setWeb3Loaded: setLoaded, loadWeb3: load };
};

export default useWeb3;
