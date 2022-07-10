import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function SingleChat({id, dateCreated,name,members}) {
  return (

      <ListItem alignItems="flex-start" style={{border: '1px solid black' ,  backgroundImage: "linear-gradient(to right, #E6F6E1, #F6F6F6)",}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                
              >
                {members.length} members
              </Typography>
              - {dateCreated.substring(0,16)}
            </React.Fragment>
          }
        />
      </ListItem>
  );
}