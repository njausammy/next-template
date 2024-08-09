import React from 'react';
import { Box, Card, Typography, Checkbox, useTheme } from '@mui/material';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.main}`,
}));

const ContentBox = styled(Box)({
    flex: 1,
});

const ActionBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

interface LineItem {
    id: number;
    lineItem: string;
    repeats: number;
    timesIssued: number;
    issue: boolean;
}

interface LineItemsProps {
    control: any; // Control from react-hook-form
}

const LineItems: React.FC<LineItemsProps> = ({ control }) => {
    const theme = useTheme();

    const scriptContentData: LineItem[] = [
        { id: 1, lineItem: 'Amoxil 500mg po TDS x 5 tabs', repeats: 0, timesIssued: 1, issue: false },
        { id: 2, lineItem: 'Panado 1g po QID x 10 tabs', repeats: 0, timesIssued: 0, issue: false },
        { id: 3, lineItem: 'Loratadine 10mg po OD x 7 tabs', repeats: 0, timesIssued: 0, issue: false },
        { id: 4, lineItem: 'Omeprazole 20mg po OD x 14 caps', repeats: 0, timesIssued: 0, issue: false },
    ];

    return (
        <Box>
            <Typography
                textAlign="center"
                color="textSecondary"
                variant="h6"
                py={1}
            >
                Select Line Item to Issue
            </Typography>
            {scriptContentData.map((item) => (
                <StyledCard key={item.id}>
                    <ContentBox>
                        <Typography variant="body1" fontWeight={500} gutterBottom >
                            {item.lineItem}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Repeats: {item.repeats}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Times Issued: {item.timesIssued}
                        </Typography>
                    </ContentBox>
                    <ActionBox>
                        <Typography variant="body2" color="textSecondary">
                            Issue?
                        </Typography>
                        <Controller
                            name="lineItemIds"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value.includes(item.id)}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        if (isChecked) {
                                            field.onChange([...field.value, item.id]);
                                        } else {
                                            field.onChange(field.value.filter((id: number) => id !== item.id));
                                        }
                                    }}
                                />
                            )}
                        />
                    </ActionBox>
                </StyledCard>
            ))}
        </Box>
    );
};

export default LineItems;
