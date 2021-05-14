import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react';
import './Message.css'


const Message = forwardRef(({ message, username, vims, new_time }, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`message ${isUser && `message__user`}`}>
            <p className="message__name">{!isUser && `${message.username || 'Unknown User'}`}</p>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                    color="white"
                    variant="h5"
                    component="h2"
                    >
                         {message.message}
                    </Typography>
                    {vims.vims === "" ? <input type="text" hidden /> : <img className="new__vim" src={vims.vims} alt=""  />} 
                    
                    <p className={isUser ? "teller_user" : "teller_guest"}>{new_time.new_time}</p>
                    <p></p>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
