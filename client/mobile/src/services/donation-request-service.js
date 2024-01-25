import API from ".";

export const requestDonation =async details => {
    const {status, message} =await API.post('/donation-requests/new', details);
    return {status, message};
}

export const fetch_donation_requests =async () => {
    const {status, message, data} =await API.get('/donation-requests');
    return {status, message, data};
}