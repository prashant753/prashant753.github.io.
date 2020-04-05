import axios from 'axios';

export const getCurrencyValue = async (currency: string) => {
    try {
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${currency}`);
        return response.data.rates.INR;
    } catch (error) {
        // default USD value
        return 69;
    }
};
