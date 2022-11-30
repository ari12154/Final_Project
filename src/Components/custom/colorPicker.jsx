import {useEffect, useState} from "react";
import { ChromePicker } from 'react-color'

export default function ColorPicker({colorValue}) {

    const [color, setColor] = useState('')

    useEffect(() => {
        colorValue(color.hex)
    }, [color])

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ChromePicker
                width={'100%'}
                color={color}
                onChange={updateColor => setColor(updateColor)}
            />
        </div>
    );
}
