type T_Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'UPDATE'

interface I_Options {
    method: T_Method
    headers: {[k: string]: any}
    signal?: AbortSignal
    body?: {[k: string]: any} | string
}

const request = async (
    method: T_Method,
    url: string,
    body?: {[k: string]: any}
) => {
    const options: I_Options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    let convertedParams = ''
    
    if(body && method !== 'GET') {
        if(body instanceof FormData) {
            delete options.headers['Content-Type']
            options.body = body
        } else {
            options.body = JSON.stringify(body)
        }
    } else if(body?.params) {
        const {params} = body
        for(const key in clearEmptyParams(params)) {
            if(params !== '') convertedParams += '&'
            convertedParams += key + '=' + encodeURI(params[key])
        }
        convertedParams = convertedParams.slice(1)
        if(convertedParams) convertedParams = '?' + convertedParams
    }
    if(body?.signal) options.signal = body.signal
    return fetch(
        process.env.REACT_APP_API_URL + url + convertedParams,
        options as RequestInit
    )
        .then((res: Response) => res.json())
        .catch((err) => console.error(err))
}

const clearEmptyParams = (params: {[k: string]: any}) => {
    const cleared: {[k: string]: any} = {}
    Object.keys(params).forEach((key: string) => {
        if(params[key] && key !== 'signal') {
            cleared[key] = params[key]
        }
    })

    return cleared
}

export const get = (url: string, params?: any) =>
    request('GET', url, {
        params,
        signal: params?.signal
    })

export const post = (url: string, body?: any) =>
    request('POST', url, body)

export const put = (url: string, body?: any) =>
    request('PUT', url, body)

export const del = (url: string, body?: any) =>
    request('DELETE', url, body)

export const update = (url: string, body?: any) =>
    request('UPDATE', url, body)

export default request