import React from 'react';
import CurrentSpace from "../operations/currentSpace";
import CreateList from "../operations/createList";

function BodyData({spaces, spaceName, setSpaceName}) {
    return (
        <>
            <div className='showCurrentSpace'>
                <div className='currentSpaceHeader'>
                    {!spaceName
                        ? <>
                            <img style={{display: 'flex', flexDirection: "column", margin: '8rem 30%', width: '50%'}}
                               src="https://app-cdn.clickup.com/sanbath_chill.8dba001986c14eaa.png"
                               alt="background"
                            />
                        </>
                        : null}
                    {spaces.map(space => {
                        return spaceName === space.name
                            ?
                            <CurrentSpace key={space.id} space={space} setSpaceName={setSpaceName}/>
                            : null
                    })}
                </div>
                {spaces.map(space => {
                    return spaceName === space.name
                        ? <CreateList key={space.id} space={space}/>
                        : null
                })}
            </div>
        </>
    );
}

export default BodyData;