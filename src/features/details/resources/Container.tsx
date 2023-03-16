import {Box, Typography} from "@mui/material";
import {DataTable} from "./DataTable";
import Search from "./Search";


function Container() {

    return (
        <Box >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    <Typography color="primary">Resources:</Typography>
                    <Box>
                        <Search />
                    </Box>
                </Box>
                <Box>
                    {/* add any buttons or other elements you want to the right */}
                </Box>
            </Box>
            <Box>
                <DataTable></DataTable>
            </Box>
        </Box>
    );
}

export default Container;