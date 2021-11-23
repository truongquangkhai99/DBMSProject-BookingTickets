import React from 'react'

function SeatItem({status, show, select}) {
    return (
        <div>
            {
                status == 'x' ? 
                <>
                    <button className="column column13 inUse">{status}</button>
                </>
                : <>
                    <button className="column column13 canSelect" onClick={() => select(status)}>{status}</button>
                </>
            }
        </div>
    )

}

export default SeatItem
