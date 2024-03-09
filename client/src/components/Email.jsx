import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Checkbox, styled } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Star } from '@mui/icons-material';
import {routes} from '../routes/routes'
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const Wrapper = styled(Box)({
    padding: "0 0 0 10px",
    backgroundColor: "#f2f6fc",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    '& > div': {
        display: "flex",
        widht: "100%",
        '& > p': {
            fontSize: 14
        }
    }
})
const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: "#ddd",
    padding: "0 4px",
    borderRadius: "4px",
    marginRight: "6px"

})
const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'


})

const Email = ({ emails, selectedEmails,setSelectedEmails,setReferesh }) => {
    
    const navigate=useNavigate();
    const onValueChange=()=>{
        if(selectedEmails.includes(emails._id)){
            setSelectedEmails(prevState=>prevState.filter(id=>id!=emails._id));
        }else {
            setSelectedEmails(prevState=>[...prevState,emails._id]);
        }
    }
    const mailToStarred=useApi(API_URLS.toggleStarredEmail)
    const toggleStarredMail=async()=>{
           mailToStarred.call({id:emails._id , value:!emails.starred})
           setReferesh(prevState=>!prevState);
    }
    return (
        <>
            <Wrapper >
                <Checkbox fontSize='small'
                    checked={selectedEmails?.includes(emails._id)}
                    onClick={()=>onValueChange()} />
                    {
                        emails.starred ? <Star fontSize="small" style={{marginRight:10 , opacity:0.5 ,color:'green', background:'white'}} onClick={()=>toggleStarredMail()}/>:
                        <StarBorderIcon fontSize='small' style={{ marginRight: 10 }} onClick={()=>toggleStarredMail()} />
                    }
                <Box onClick={()=>navigate(routes.view.path,{state:{emails:emails}},console.log("touched"))}>
                    <Typography style={{ width: "200px", overflow: "hidden" }}>{emails.name}</Typography>
                    <Indicator>Inbox</Indicator>
                    <Typography style={{ width: "400px", height: "20px", overflow: "hidden" }} >{emails.subject}{emails.body && '-'}{emails.body}</Typography>
                </Box>
                <Date>{new window.Date(emails.date).getDate()}
                    {new window.Date(emails.date).toLocaleString("default", { month: "long" })}
                </Date>

            </Wrapper>
        </>
    )
}

export default Email
