import React from 'react'
import { useState } from 'react';
import { Box, Dialog, Typography, InputBase, Button, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { API_URLS } from '../services/api.urls.js';
import useApi from '../hooks/useApi';
import ClearIcon from '@mui/icons-material/Clear';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
const StyledDialog = {
    // maxHeight:"100%",
    height: "100%",
    width: "100%",


}
const Footer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: '0 0 0 20px'
})

const SendButton = styled(Button)({
    background: "#0B57D0",
    color: "#fff",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 18,
    width: 100
})
const Header = styled(Box)({
    // height:34,
    backgroundColor: "#f2f6fc",
    padding: "10px 0 10px 25px",
    display: "flex",
    alignItems: "center",
    '& > p': {
        fontSize: 14,
        fontWeight: 500
    },
    '& > div': {
        marginLeft: "auto"
    },
    '& > div > svg': {
        marginRight: 15
    }
})
const ReceiptWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: '0 15px',
    '& > div': {
        fontSize: 14,
        borderBottom: '1px solid #f5f5f5',
        marginTop: 10
    }
})
const ComposeMail = ({ openDialog, setOpenDialog }) => {
    const setEmailService = useApi(API_URLS.saveSentEmail);
    const [data, setData] = useState({});
    const saveDraftServices = useApi(API_URLS.saveDraftEmails)
    const OnValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const closeComposeMail = (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: "bitwisespace@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: "",
            name: "Bhoopendra Singh",
            starred: false,
            type: 'drafts'
        }
        saveDraftServices.call(payload);
        if (!saveDraftServices.error) {
            setOpenDialog(false);
            setData({});
        } else {
            console.log("error in Draft Email")
        }
        setOpenDialog(false);
    }
    const sendEmail = (e) => {
        e.preventDefault();
        const config = {
            Username: "bhoopendrathakur@yopmail.com",
            Password: "059D6CD36FBFEF68085F853B7CCFEFDC9BC5",
            Host: "smtp.elasticemail.com",
            Port: 2525,
        }
        if (!data.to || !data.subject || !data.body) {
            alert("Please Fill in all Fields");
            return;
        }
        if (window.Email) {
            window.Email.send({
                ...config,
                To: data.to,
                From: "bitwisespace@gmail.com",
                Subject: data.subject,
                Body: data.body
            }).then(
                message => {
                    console.log("message have Sended");
                    alert("Email Sent Successfully");
                    setOpenDialog(false);
                }

            );
        }
        const payload = {
            to: data.to,
            from: "bitwisespace@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: "",
            name: "Bhoopendra Singh",
            starred: false,
            type: 'sent'
        }
        console.log(payload);
        setEmailService.call(payload);
        if (!setEmailService.error) {
            setOpenDialog(false);
            setData({});
        } else {
            console.log("error in Compose Email")
        }
        setOpenDialog(false);
    }
    const DeleteEmail = () => {
        // e.preventDefault();
        setOpenDialog(false);
    }
    return (
        <>
            <Dialog
                open={openDialog}
                PaperProps={{ sx: StyledDialog }}
                maxWidth="lg"
            >
                <Header>
                    <Typography>New Message</Typography>
                    <Box>
                        <RemoveIcon color='action' style={{ fontSize: "20px" }} />
                        <OpenInFullIcon color='action' style={{ fontSize: "20px" }} />
                        <ClearIcon onClick={(e) => closeComposeMail(e)} color='action' style={{ fontSize: "20px" }} />
                    </Box>
                </Header>
                <ReceiptWrapper>
                    <InputBase name='to' placeholder='Recipients' onChange={(e) => OnValueChange(e)} />
                    <InputBase name='subject' placeholder='Subjects' onChange={(e) => OnValueChange(e)} />
                </ReceiptWrapper>
                <TextField
                    onChange={(e) => OnValueChange(e)}
                    multiline
                    name='body'
                    // maxRows={10}
                    rows={20}
                    sx={{ '& .MuiOutlinedInput-notchedOutline': { border: "none" } }}
                />
                <Footer>
                    <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                    <DeleteForeverOutlinedIcon onClick={() => DeleteEmail()} />
                </Footer>



            </Dialog>
        </>
    )
}

export default ComposeMail
