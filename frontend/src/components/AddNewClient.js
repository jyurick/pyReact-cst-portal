import React, { useState } from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const AddNewClient = () => {
    const [newClient, setNewClient] = useState({
        first_name: '',
        last_name: '', 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert date string to ISO format if not empty
        if (newClient.date_of_birth) {
            newClient.date_of_birth = new Date(newClient.date_of_birth).toISOString();
        }

        try {
            await axios.post('http://127.0.0.1:8000/client_data', newClient);
            console.log('Client data added successfully');
            // Clear form fields after successful submission
            setNewClient({
                first_name: '',
                last_name: '',
            });
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <Card style={{ margin: '10px', width: '300px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Add New Client
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Other form fields */}
                    <TextField
                        name="first_name"
                        label="First Name"
                        variant="outlined"
                        value={newClient.first_name}
                        onChange={handleInputChange}
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        name="last_name"
                        label="Last Name"
                        variant="outlined"
                        value={newClient.last_name}
                        onChange={handleInputChange}
                        style={{ marginBottom: '10px' }}
                    />
                    
                    <Button type="submit" variant="contained" color="primary">
                        Add Client
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default AddNewClient;
