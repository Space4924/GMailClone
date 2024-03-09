import React from 'react'
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom'
import { API_URLS } from '../services/api.urls';
import Email from './Email';
import useApi from '../hooks/useApi';
import { Box, Checkbox, List } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Nomails from './common/Nomails';
import { EMPTY_TABS } from '../constant/constant';


const Emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [referesh, setReferesh] = useState(true);
  const { type } = useParams();
  const { openDrawers } = useOutletContext();
  const getEmailServices = useApi(API_URLS.getEmailFromType);
  const DeletedEmailServices = useApi(API_URLS.moveEmailsToBin);
  const DeleteEmail=useApi(API_URLS.deleteEmail);
  useEffect(() => {
    getEmailServices.call({}, type);
    setSelectedEmails([]);
  }, [type, referesh])
  const selectedAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailServices?.response?.map(email => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  }
  const DeletedEmail = () => {
    if (type === 'bin') {
      DeleteEmail.call(selectedEmails)
    } else {
      DeletedEmailServices.call(selectedEmails);
    }
    setReferesh(prev => !prev);
  }
  return (
    <Box style={openDrawers ? { marginLeft: 250, width: "calc(100% - 250px)" } : { width: "100%" }}>

      {
        getEmailServices?.response?.length === 0 ? <Nomails message={EMPTY_TABS[type]} /> :
          <Box style={{ padding: '20px 10px 0 10px', display: "flex", alignItems: "center" }}>
            <Checkbox size='small' onChange={(e) => selectedAllEmails(e)} />
            <DeleteOutlineOutlinedIcon color='action' onClick={() => DeletedEmail()} />
          </Box>
      }

      <List>
        {
          getEmailServices?.response?.map(emails => (
            <Email emails={emails}
              key={emails._id}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              setReferesh={setReferesh}
            />
          ))
        }
      </List>

    </Box>
  )
}

export default Emails
