import React from 'react'
import { useOutletContext, useLocation } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { emptyProfilePic } from '../constant/constant';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import { useParams } from 'react-router-dom';

const IconWrappper = styled(Box)({
  padding: 15,
  margin: "10px 0 20px 75px",
  display: "flex"


})
const Image = styled('img')({
  borderRadius: '50%',
  width: 40,
  height: 40,
  margin: '5px 10px 0 10px',
  background: '#cccccc'
})
const Indicator = styled(Box)({
  fontSize: 12,
  backgroundColor: "#ddd",
  color: "#222",
  padding: '2px 4px',
  marginLeft: 6,
  borderRadius: 4,
  alignSelf: "center"
})
const Subject = styled(Typography)({
  fontSize: 22,
  margin: "10px 0 20px 75px",
  display: "flex"
})
const Container = styled(Box)({
  marginLeft: 15,
  display: 'flex',
  // width:"100%",
  '& > div': {
    // display:"flex",
    "& > p> span": {
      fontSize: 12,
      color: "#5E5E5E"

    }
  }
})
// const Wrapper=styled(Box)({
// display:"flex",


// })
const Date = styled(Box)({
  margin: '0 50px 0 auto',
  fontSize: 12,
  color: "#5E5E5E"
})

const ViewEmail = () => {
  const type=useParams();
  console.log(type,"type");
  const EmailToBinServices=useApi(API_URLS.moveEmailsToBin);
  const DeleteEmail=useApi(API_URLS.deleteEmail)

  const { openDrawers } = useOutletContext();
  const { state } = useLocation();
  const { emails } = state;
  const DeletedEmail=()=>{
    if(type==='bin'){
        DeleteEmail.call([emails._id]);
        console.log("deleted Parmanently")
    }else {
      EmailToBinServices.call([emails._id]);
      console.log("move to Bin")
    }
    window.history.back();
  }
  return (
    <Box style={openDrawers ? { marginLeft: 250 } : { width: '100%' }}>
      <IconWrappper>
        <ArrowBackIcon color='action' onClick={() => window.history.back()} fontSize='small' />
        <DeleteOutlineOutlinedIcon fontSize='small' color='action' style={{ marginLeft: "45px" }} onClick={()=>DeletedEmail()}/>
      </IconWrappper>
      <Subject>
        {emails.subject}
        <Indicator component="span">Inbox</Indicator>
      </Subject>
      <Box style={{ display: 'flex' }}>
        <Image src={emptyProfilePic} alt="Profile Pic" />
        <Box style={{ width: "100%" }}>
          <Container>
            <Typography style={{ marginTop: 10 }}>
              {emails.name}
              <Box component='span' >&nbsp;&#60;{emails.to}&#62;</Box>
            </Typography>
            <Date>{new window.Date(emails.date).getDate()} &nbsp;
              {new window.Date(emails.date).toLocaleString("default", { month: "long" })} &nbsp;
              {new window.Date(emails.date).getFullYear()}
            </Date>
          </Container>
          <Typography style={{ marginTop: 20 ,marginLeft:15}}>
            {emails.body}
          </Typography>
        </Box>

      </Box>
    </Box>

  )
}

export default ViewEmail
