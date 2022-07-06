import React from 'react'
import { Card } from "react-bootstrap";

const SingleChat = ({id, dateCreated, name,members}) => {
  return (
    <div>
        <Card style={{padding:'5%', margin: '5%'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <h3>{name}</h3>
                <h4>{members.length} משתתפים</h4>
            </div>
                <h5>{dateCreated.substring(0,16)}</h5>
        </Card>
      
    </div>
  )
}

export default SingleChat
