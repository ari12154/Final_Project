import {useEffect, useState} from 'react';


const getInitialValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue

    if (initialValue instanceof Function) return initialValue()

    return initialValue
}

export default function UseLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getInitialValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[value])

    return [value, setValue]
}