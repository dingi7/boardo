const host = "https://boardo-back-end.vercel.app/api/v1";
// const host = "http://localhost:3000/api/v1";
// const host =
//    process.env.NODE_ENV === 'production'
//        ? 'https://boardo-back-end.vercel.app/api/v1'
//        : 'http://localhost:3000/api/v1';

interface RequestOptions {
    method: string;
    headers: {
        'Access-Control-Allow-Origin': string;
        'content-type'?: string;
        'x-authorization'?: string;
    };
    body?: string;
    isGeminiCall?: boolean;
}

// const auth = useAuthUser();
// const user = auth()!;

const request = async (
    method: string,
    url: string,
    data?: any,
    isGeminiCall?: boolean,
): Promise<any> => {
    const options: RequestOptions = {
        method,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };

    if (data) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (localStorage['x-authorization']) {
        const token = localStorage['x-authorization'];
        options.headers['x-authorization'] = token;
    }

    try {

        let apiUrl = host + url; // Set the default API URL

        if (isGeminiCall) {
            apiUrl = "https://boardo-back-end.vercel.app/api/v1"
        }

        const res = await fetch(apiUrl, options);
        const responseData = await res.json();


        // Check if the request is for /gemini endpoint, if yes, route it to Vercel

        if (!res.ok) {
            throw new Error(responseData.message);
        }

        if (res.status === 401) {
            localStorage.removeItem('access_info');
        }

        return responseData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const del = request.bind(null, 'DELETE');

export { get, post, put, patch, del };
