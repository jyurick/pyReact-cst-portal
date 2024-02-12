import React from "react";
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Person, Accessibility, AirplanemodeActive, Home, DirectionsBus, AttachMoney, Pets, LocalHospital, Schedule } from '@mui/icons-material';

const Client = ({ client }) => {
    const name = client.first_name + ' ' + client.last_name;

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

    const calculateAge = (dob) => {
        const dobDate = new Date(dob);
        const diffMs = Date.now() - dobDate.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <Card key={client.client_id} style={{ margin: '10px', width: '300px' }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                {client.active ? "Active" : "Inactive"} | {client.client_id}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>

                <Typography color="text.secondary" gutterBottom>
                    {calculateAge(client.date_of_birth)} years | {client.gender}
                </Typography>
                <Typography variant="body2" component="p">
                    {client.city_name} | {client.health_authority_name}
                </Typography>
                {client.indigenous && renderChip("Indigenous", <Person />)}
                {client.pwd && renderChip("Persons with Disabilities", <Accessibility />)}
                {client.vet  && renderChip("Veteran", <AirplanemodeActive />)}
                {client.emergency_sheltered  && renderChip("Emergency Sheltered", <Home />)}
                {client.bus_pass  && renderChip("Bus Pass", <DirectionsBus />)}
                {client.clothing_supplement  && renderChip("Clothing Supplement", <AttachMoney />)}
                {client.pet_deposit  && renderChip("Pet Deposit", <Pets />)}
                {client.pssg  && renderChip("PSSG", <LocalHospital />)}
                {client.status  && renderChip("Status", <Schedule />)}
                {client.deceased && renderChip("Deceased", <Typography variant="body2" component="p">{client.deceased}</Typography>)}
            </CardContent>
        </Card>
    );
};

export default Client;
