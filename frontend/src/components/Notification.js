import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    const notifications = useSelector(state => state.notifications)

    if(!notifications) {
        return null
    }

    console.log('no', notifications.message)

    return (
        <>
            {notifications.message && <div className={ notifications.success ? "successMsg centered-message" : "errorMsg centered-message"}><ul>{notifications.message.split(",").map((msg, index) => <li key={index}>{msg}</li>)}</ul></div>}
        </>
    )
}

export default Notification