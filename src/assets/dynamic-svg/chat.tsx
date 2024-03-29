import * as React from 'react'

const bookmark = (fill = '#FFFFFF') => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="24 / basic / bookmark">
                <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M5 22.618L12 19.118L19 22.618V4C19 2.89543 18.1046 2 17 2H7C5.89543 2 5 2.89543 5 4V22.618ZM12 16.882L7 19.382V4H17V19.382L12 16.882Z" fill={fill}/>
            </g>
        </svg>
    )
}

export const chatIcons = {
    bookmark
}
