import {useState} from 'react';
import Axios from "axios";

export default function UseAxios() {
    const [response, setResponse] = useState([])
    const [data, setData] = useState({
        pending: false,
        data: undefined,
        error: false
    })

    const request = async (method, url, dataToPost) => {
        let response;
        setData({
            pending: true,
            data: undefined,
            error: false
        })
        switch (method) {
            case 'GET':
                response = await Axios.get(url)
                setResponse(response.data.spaces)
                break
            case 'POST':
                response = await Axios.post(url, dataToPost)
                try {
                    setData({
                        pending: false,
                        data: response.data,
                        error: false
                    })
                } catch (err) {
                    setData({
                        pending: false,
                        data: undefined,
                        error: err.message
                    })
                }
                break
            case 'DELETE':
                response = await Axios.delete(url)
                setResponse(response.data.spaces)
                break
            case 'EDIT':
                response = await Axios.put(url, dataToPost)
                setResponse(response.data.spaces)
                break
            default: break
        }
    }

    return {...data, response, request}
}


