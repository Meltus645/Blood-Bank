export const fetch_donations =async () => {
    const {status, message, data} =await API.get('/donations');
    return {status, message, data};
}