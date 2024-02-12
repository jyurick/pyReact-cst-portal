import React from "react";
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Person, Accessibility, AirplanemodeActive, Home, DirectionsBus, AttachMoney, Pets, LocalHospital, Schedule } from '@mui/icons-material';

const Client = ({ client }) => {
    const name = client.first_name + ' ' + client.last_name;

    // Function to generate Chip component
    const renderChip = (label, icon) => {
        return (
            <Chip
                icon={icon}
                label={label}
                color="primary"
                size="small"
                variant="outlined"
                style={{ marginTop: '10px', marginRight: '5px' }}
            />
        );
    };

    return (
        <Card key={client.client_id} style={{ margin: '10px', width: '300px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name} 
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    {client.gender} | {client.date_of_birth}
                </Typography>
                <Typography variant="body2" component="p">
                    City: {client.city}
                </Typography>
                {client.indigenous === "Y" && renderChip("Indigenous", <Person />)}
                {client.pwd === "Y" && renderChip("Persons with Disabilities", <Accessibility />)}
                {client.vet === "Y" && renderChip("Veteran", <AirplanemodeActive />)}
                {client.emergency_sheltered === "Y" && renderChip("Emergency Sheltered", <Home />)}
                {client.bus_pass === "Y" && renderChip("Bus Pass", <DirectionsBus />)}
                {client.clothing_supplement === "Y" && renderChip("Clothing Supplement", <AttachMoney />)}
                {client.pet_deposit === "Y" && renderChip("Pet Deposit", <Pets />)}
                {client.pssg === "Y" && renderChip("PSSG", <LocalHospital />)}
                {client.status === "Y" && renderChip("Status", <Schedule />)}
                {client.deceased && renderChip("Deceased", <Typography variant="body2" component="p">{client.deceased}</Typography>)}
            </CardContent>
        </Card>
    );
};

export default Client;
