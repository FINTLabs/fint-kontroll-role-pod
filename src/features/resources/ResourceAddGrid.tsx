import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import data from '../../repositories/resourceListFakeData.json';
import {Card, Grid, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from '@mui/icons-material/Face';

const ResourceAddGrid = () => {
    const [chips, setChips] = useState([]);

    const handleButtonClick = (resourceId: number) => {
        // @ts-ignore
        if (!chips.includes(resourceId)) {
            const resource = resources.find(r => r.id === resourceId);
            if (resource) {
                const {name} = resource;
                // @ts-ignore
                setChips([...chips, name]);
            }

        }
    };

    let navigate = useNavigate();

    function handleSaveClick() {
        navigate("/details/1");
    }

    const [resources] = useState(data.resources);

    return (
        <Grid container spacing={3} sx={{padding: 5}}>
            <Grid item xs={8} sx={{marginRight: 5}}>
                <Card sx={{padding: 5}}>
                    <Grid container spacing={3}>
                        {resources.map(resource => (
                            <Grid item xs={2} key={resource.name}>
                                <img src={resource.icon} alt={resource.name} width="50" height="50"/>
                                <p>{resource.name}</p>
                                <p>{resource.description}</p>
                                <p>{resource.active ? 'Yes' : 'No'}</p>
                                <Button onClick={() => handleButtonClick(resource.id)}>
                                    Add Chip
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={3} sx={{backgroundColor: 'lightgrey', borderRadius: 10}}>
                <Typography>Valgte ressurser</Typography>
                <div className="chip-container box-height">
                    {chips.map((chip, index) => (
                        <Chip key={index} label={chip} sx={{margin: 1}} icon={<FaceIcon/>}/>
                    ))}
                </div>
            </Grid>
            <Grid container spacing={3} sx={{padding: 5}} justifyContent="flex-end">
                <Grid item xs={2} align-self="right">
                    <Button onClick={handleSaveClick} variant="contained" color="primary" startIcon={<AddIcon/>}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={2} align-self="right">
                    <Button>Button 2</Button>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default ResourceAddGrid;
