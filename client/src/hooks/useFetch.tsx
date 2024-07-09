import * as Types from '../types'
import {
    useState,
    useEffect,
} from 'react'

const useFetch = <T extends unknown[]>(
    url: string,
    useEffectDependencies: T,
    didSubmit: boolean = false,
    method: 'GET' | 'POST' = 'GET',
    body?: Types.RiskRateAnswers | Types.RiskRateResponseAndID
) => {
    const [fetchResult, setFetchResult] = useState<Types.FetchResponse>({
        response: 0,
        data: null,
        error: null,
        loading: false,
    ***REMOVED***

    const localFetchResult: Types.FetchResponse = {
        response: 0,
        data: null,
        error: null,
        loading: false,
    };

    useEffect(() => {
        if (didSubmit) {
            setFetchResult(prevState => ({
                ...prevState,
                loading: true
            }))
            let isResponseOk: boolean = false;
            const headers: { [key: string]: string } = {
                'Content-Type': 'application/json'
            }

            fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            })
                .then((response) => {
                    isResponseOk = response.ok;
                    localFetchResult.response = response.status;
                    return response.json();
                })
                .then((result) => {
                    if (!isResponseOk) {
                        localFetchResult.error = result;
                    } else {
                        localFetchResult.data = result;
                        localFetchResult.error = null;
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                    localFetchResult.error = error.message;
                })
                .finally(() => {
                    setTimeout(() => {
                        localFetchResult.loading = false;
                        setFetchResult(localFetchResult)
                    }, 500)
                })
        }
    }, useEffectDependencies)
    return fetchResult
}

export default useFetch