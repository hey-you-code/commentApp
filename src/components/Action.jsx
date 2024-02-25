import React from 'react'

function Action({handleClick , type, className}) {
    return (
        <div className={className} onClick={handleClick}>
            {type}
        </div>
    )
}

export default Action
