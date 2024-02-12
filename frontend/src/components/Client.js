import React, { useState } from "react";
import { Alert, Card, Button, CardContent, Typography, Chip } from '@mui/material';
import { Person, Accessibility, Delete, Edit, AirplanemodeActive, Home, DirectionsBus, AttachMoney, Pets, LocalHospital, Schedule } from '@mui/icons-material';
import { calculateAge } from '../services/misc';
import axios from 'axios';

const Client = ({ client, selectClient }) => {
    const [errorString, setError] = useState('');
    const [successString, setSuccess] = useState('');
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

    const handleDeleteClient = async (clientId) => {
        try {
            await axios.delete(`https://cst-portal-ca281c870ff7.herokuapp.com/client_data/${clientId}`);

            setSuccess(`Client with ID ${clientId} deleted successfully`);

        } catch (error) {
            setError('Error deleting client:', error);
        }
    };


    const ageString = client.date_of_birth ? calculateAge(client.date_of_birth) + " years" : "Unknown age";

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
                    {ageString} | {client.gender}
                </Typography>
                <Typography variant="body2" component="p">
                    {client.city_name} | {client.health_authority_name}
                </Typography>
                {client.status && <Typography variant="body2" component="p">
                    Status: {client.status}
                </Typography>}
                {client.indigenous && renderChip("Indigenous", <Person />)}
                {client.pwd && renderChip("Persons with Disabilities", <Accessibility />)}
                {client.vet && renderChip("Veteran", <AirplanemodeActive />)}
                {client.emergency_sheltered && renderChip("Emergency Sheltered", <Home />)}
                {client.bus_pass && renderChip("Bus Pass", <DirectionsBus />)}
                {client.clothing_supplement && renderChip("Clothing Supplement", <AttachMoney />)}
                {client.pet_deposit && renderChip("Pet Deposit", <Pets />)}
                {client.pssg && renderChip("PSSG", <LocalHospital />)}
                {client.deceased && renderChip("Deceased", <Typography variant="body2" component="p">{client.deceased}</Typography>)}
                <div style={{ marginTop: "10px" }}>
                    <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => selectClient(client)}
                    />
                    <Button
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleDeleteClient(client.client_id)}
                    />
                </div>
                {successString && <Alert severity="success">{successString}</Alert>}
                {errorString && <Alert severity="error">{errorString}</Alert>}
            </CardContent>
        </Card>
    );
};

export default Client;
