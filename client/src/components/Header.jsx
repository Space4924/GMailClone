import React from 'react'
import {AppBar , Box, InputBase, styled } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import  MenuIcon  from '@mui/icons-material/Menu';
import { gmailLogo } from '../constant/constant';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const StyledAppBar=styled(AppBar)({
    background:'#F5F5F5',
    boxShadow:"none"

})
const OptionsWrapper=styled(Box)({
    width:"100%",
    display:"flex",
    justifyContent:"flex-end",
    '& > svg':{
        marginLeft:20
    }
})
const SearchWrapper=styled(Box)({
    background:"#EAF1FB",
    marginLeft:80,
    borderRadius:8,
    minWidth:690,
    maxWidth:720,
    height:48,
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    padding:"0 20px",
    '& > div':{
        width:"100%",
        padding:"0 10px"

    }
})

const Header = ({toggleDrawer}) => {


    return (
        <>
            <StyledAppBar position='static' >
                <Toolbar>
                    <MenuIcon onClick={toggleDrawer} color='action'/>
                    <img src={gmailLogo} alt="logo" style={{widht:'110',marginLeft:'15px'}} />
                    <SearchWrapper>
                        <SearchIcon color='action'/>
                        <InputBase placeholder='Search Mail'/>
                        <TuneIcon color='action'/>
                    </SearchWrapper>
                    <OptionsWrapper>
                        <HelpOutlineOutlinedIcon color='action'/>
                        <SettingsOutlinedIcon color='action'/>
                        <AppsOutlinedIcon color='action'/>
                        <AccountCircleOutlinedIcon color='action'/>
                    </OptionsWrapper>
                </Toolbar>
            </StyledAppBar>

        </>
    )
}

export default Header
