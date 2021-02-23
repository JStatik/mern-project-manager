const fetchWithToken = async( endpoint, token, method, body ) => {
    const url = process.env.REACT_APP_URL + endpoint;

    if( method === 'GET' || method === 'DELETE' ) {
        const request = await fetch(
            url,
            {
                method: method,
                headers: {
                    'x-token': token
                }
            }
        );

        return {
            response: await request.json()
        };
    } else {
        const request = await fetch(
            url,
            {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify( body )
            }
        );
    
        return {
            response: await request.json()
        };
    }
};

export default fetchWithToken;
