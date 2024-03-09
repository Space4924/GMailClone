import React from 'react'
import { useParams } from 'react-router-dom'
import SIDEBAR_DATA from '../../config/sidebar.config'
import { Box, Typography, styled,Divider } from '@mui/material'

const Component=styled(Box)({
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:"120px",
    opacity:0.8,
    width:"100%"
})
const StyledDivider=styled(Divider)({
    width:"100%",

})

const Nomails = ({ message }) => {
    const type=useParams();
    console.log(type);
    console.log(message.heading);
    const isStarredPresent = SIDEBAR_DATA.find(item => item.name === type.type);
    console.log(isStarredPresent);
    return (
            
            <Component>
                {<isStarredPresent.icon color='action' style={{fontSize:50,marginBottom:20}}/>}
                <Typography>{message.heading}</Typography>
                <Typography>{message.subHeading}</Typography>
               <StyledDivider/>
            </Component>
    )
}

export default Nomails
