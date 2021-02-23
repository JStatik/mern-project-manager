const fetchAuth = async( endpoint, body ) => {
    const url = process.env.REACT_APP_URL + endpoint;

    const request = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( body )
        }
    );

    return {
        response: await request.json()
    };
};

export default fetchAuth;
