import {useContext, useRef, useState} from "react";
import {dataProvider} from "../../App";
import {useNavigate} from "react-router-dom";

export default function ShowSpacesName({space}) {

    const name = useRef()
    const { setSpaceName } = useContext(dataProvider)
    const navigate = useNavigate()
    const [active, setActive] = useState(false)


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '.1rem',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.2)',
        }}>
                <span style={{
                    cursor: 'pointer',
                    padding: '6px .5rem 6px 1.3rem',
                    fontFamily: 'sans-serif',
                    fontSize: 'small',
                    textTransform: 'capitalize',
                    width: '100%',
                    color: 'rgba(5,191,218,0.67)'
                }}
                      ref={name}
                      onClick={() => {
                          setActive(!active)
                          setSpaceName(name.current.innerHTML)
                          navigate('/')
                      }}>{space.name}</span>
        </div>
    )
}
