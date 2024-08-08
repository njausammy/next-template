'use client'
import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Tooltip, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';


const TopBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.default,
}));

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const theme = useTheme();
    const router = useRouter()

    const handleVerifyScript = () => {
        router.push('/')
    }

    return (
        <Box sx={{
            minHeight: '100vh',
        }}>
            <TopBar position="static">
                <Toolbar  >
                    <img
                        src="https://app.prescribepro.com/assets/pp.png"
                        alt="Prescribe Pro"
                        loading="lazy"
                        width={180}
                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
                    />
                    <Tooltip
                        disableInteractive
                        arrow
                        title="Click here to verify a script"
                    >
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleVerifyScript}
                            sx={{textTransform: 'none', marginLeft: 3}}
                        >
                            <b>Verify Script</b>
                        </Button>
                    </Tooltip>
                
                </Toolbar>
            </TopBar>
            {children}
        </Box>
    );
}