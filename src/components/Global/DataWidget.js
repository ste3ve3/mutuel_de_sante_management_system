import CircularProgress from '@mui/material/CircularProgress';
import { Alert, AlertTitle, Container, Stack, Typography } from '@mui/material';
import SoftTypography from "components/SoftTypography";

const DataWidget = ({ title, isLoading, isError = null, isEmpty, children, customEmptyMessage, customLoaders }) => {
    if (isLoading) {
        if (customLoaders) return customLoaders;
        return (
            <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ py: 2 }}>
                <CircularProgress size={30} color="dark" />
                <SoftTypography variant="h6">{title ? title : 'Items'} loading, please wait...</SoftTypography>
            </Stack>
        );
    }
    if (isError) {
        return (
            <Container sx={{ py: 2 }}>
                <Alert severity="error" variant="outlined">
                    <AlertTitle>Error!</AlertTitle>
                    {isError || 'Oops, Something went wrong due to unknown error. Try to refresh the page and try again.'}
                </Alert>
            </Container>
        );
    }
    if (isEmpty) {
        return (
            <Container sx={{ py: 2 }}>
                <Alert severity="info" variant="outlined">
                    <AlertTitle sx={{ fontSize: 17.5 }}>No {title ? title?.toLowerCase() : 'items'} found!</AlertTitle>
                    {customEmptyMessage
                        ? customEmptyMessage
                        : <SoftTypography sx={{ fontSize: 14 }}>There are no {title ? title?.toLowerCase() : 'items'} in our
                        system yet!</SoftTypography>
                        }
                </Alert>
            </Container>
        );
    }
    return <>{children}</>;
};

export default DataWidget;