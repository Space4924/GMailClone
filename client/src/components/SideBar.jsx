import React from 'react'
import { Drawer, styled } from '@mui/material'
import SedeBarContent from './SedeBarContent'
const StyledDrawer = styled(Drawer)`
    margin-top: 54px;
`
const SideBar = ({ openDrawers, toggleDrawer }) => {
    return (
        <>
            <StyledDrawer
                anchor='left'
                open={openDrawers}
                onClose={toggleDrawer}
                hideBackdrop={true}
                ModalProps={{
                    keepMounted: true
                }}
                variant='persistent'
                sx={{
                    '& .MuiDrawer-paper': {
                        marginTop: "64px",
                        width: "250px",
                        background: "#F5F5F5",
                        borderRight: "none",
                        height: 'calc(100vh-64px)'
                    }
                }}

            >
            <SedeBarContent />
            </StyledDrawer>

        </>
    )
}

export default SideBar
