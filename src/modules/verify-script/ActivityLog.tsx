import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography, Box, Avatar, Stack, useTheme } from '@mui/material';
import { Email as EmailIcon, Medication as MedicationIcon, Error as ErrorIcon, LocationOn as LocationOnIcon, LocalPharmacy as LocalPharmacyIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { format, isToday } from 'date-fns';

const TimelineContentStyled = styled(TimelineContent)(({ theme }) => ({
    padding: '16px 0',
}));

export const shouldForwardProp =
    <TCustomProps extends Record<string, unknown>>(customProps: ReadonlyArray<keyof TCustomProps>) =>
        (prop: string): boolean =>
            !customProps.includes(prop);

const StyledTimelineDot = styled(TimelineDot, {
    shouldForwardProp: shouldForwardProp(['actionType']),
})<{ actionType: string }>(({ theme, actionType }) => ({
    margin: 0,
    boxShadow: 'none',
    backgroundColor: actionType === 'Send mail' ? theme.palette.secondary.main : theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const TimelineStyled = styled(Timeline)(({ theme }) => ({
    '& .MuiTimelineItem-root:before': {
        flex: 0,
        padding: 0,
    },
}));

const getIcon = (actionType: string) => {
    switch (actionType) {
        case 'Send mail':
            return <EmailIcon />;
        case 'Issue item':
            return <MedicationIcon />;
        default:
            return <ErrorIcon />;
    }
};

const getInitials = (name: string) => {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials;
};

const formatDate = (date: string) => {
    const today = new Date();
    const logDate = new Date(date);
    return isToday(logDate) ? 'Today' : format(logDate, 'dd/MM/yyyy');
};

interface LogEntry {
    id: number;
    timestamp: string;
    action: string;
    actionType: string;
    pharmacyBranch: string;
    pharmacy: string;
    emailRecipient?: string; // Optional field for email recipient
}

const ActivityLog: React.FC = () => {
    const logData: LogEntry[] = [
        { id: 1, timestamp: '2024-08-08T08:00', action: 'Piliton (item 2) issued', actionType: 'Issue item', pharmacyBranch: "Central Avenue", pharmacy: "GreenLeaf Pharmacy" },
        { id: 3, timestamp: '2024-08-08T08:00', action: 'Original script sent by email', actionType: 'Send mail', pharmacyBranch: "Central Avenue", pharmacy: "GreenLeaf Pharmacy", emailRecipient: 'd***m@medicpharm.co.za' },
        { id: 2, timestamp: '2024-08-07T08:00', action: 'Amoxil (item 1) issued', actionType: 'Issue item', pharmacyBranch: "Maple Street", pharmacy: "HealthFirst Pharmacy" },
    ];

    const theme = useTheme();
    const avatarColor = theme.palette.info.main;

    return (
        <TimelineStyled>
            {logData.map((log) => (
                <TimelineItem key={log.id}>
                    <TimelineSeparator>
                        <StyledTimelineDot actionType={log.actionType}>
                            {getIcon(log.actionType)}
                        </StyledTimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContentStyled>
                        <Box sx={{ padding: '12px 16px', backgroundColor: theme.palette.background.paper, borderRadius: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="body2" color="textSecondary">
                                {formatDate(log.timestamp)} {format(new Date(log.timestamp), 'HH:mm')}
                            </Typography>
                            <Typography variant="body1" component="h1" fontWeight={500} gutterBottom>
                                {log.action}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '8px' }}>
                                <LocalPharmacyIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {log.pharmacy}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '4px' }}>
                                <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {log.pharmacyBranch}
                                </Typography>
                            </Stack>
                            {log.actionType === 'Send mail' && (
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '4px' }}>
                                    <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="textSecondary">
                                        Sent to: <strong>{log.emailRecipient}</strong>
                                    </Typography>
                                </Stack>
                            )}
                        </Box>
                    </TimelineContentStyled>
                </TimelineItem>
            ))}
        </TimelineStyled>
    );
};

export default ActivityLog;