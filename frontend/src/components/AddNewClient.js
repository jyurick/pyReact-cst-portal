import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Alert, Card, CardContent, Typography, Button, TextField, Chip, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { calculateAge } from '../services/misc';
import '../styles.css';
import { emptyClient } from '../services/misc';

function removeEmptyProperties(obj) {
    for (let key in obj) {
        if (
            obj[key] === undefined ||
            obj[key] === null ||
            obj[key] === '' 
        ) {
            delete obj[key];
        }
    }
    return obj;
}

const AddNewClient = ({ client }) => {
    const isEditMode = client.client_id;

    const [newClient, setNewClient] = useState(isEditMode ? client : emptyClient);

    const [errorString, setError] = useState('');
    const [successString, setSuccess] = useState('');

    useEffect(() => {
        setError('');
        setSuccess('');
        if (isEditMode) {
            setNewClient(client);
        } else {
            setNewClient(emptyClient);
        }
    }, [client]); 

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setNewClient({ ...newClient, [name]: inputValue });
    };

    const isBusPassEligible = () => {
        const { date_of_birth, pwd, indigenous } = newClient;
        const age = date_of_birth ? calculateAge(date_of_birth) : 0;
        return (age >= 60 || pwd || indigenous);
    };

    const isActiveEligible = () => {
        const { pssg, deceased } = newClient;

        return !pssg && !deceased;
    };

    const isClothingEligible = () => {
        return newClient.emergency_sheltered;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newClient.first_name || !newClient.last_name) {
            setError('First name and last name are required');
            setSuccess('');
            return;
        }
        // Convert date of birth to ISO format
        if (newClient.date_of_birth) {
            const dateOfBirth = new Date(newClient.date_of_birth).toISOString();
            newClient.date_of_birth = dateOfBirth.substring(0, 10); // Extract YYYY-MM-DD
        } else {
            delete newClient.date_of_birth;
        }

        if (newClient.deceased) {
            const deceased = new Date(newClient.deceased).toISOString();
            newClient.deceased = deceased.substring(0, 10); // Extract YYYY-MM-DD
        } else {
            delete newClient.deceased;
        }

        newClient.bus_pass = isBusPassEligible() && newClient.bus_pass;
        newClient.active = isActiveEligible() && newClient.active;

        for (let key in newClient) {
            if (
                newClient[key] === undefined ||
                newClient[key] === null ||
                newClient[key] === '' 
            ) {
                delete newClient[key];
            }
        }
        console.log(newClient);
        try {
            if (isEditMode) {
                await axios.put(`http://127.0.0.1:8000/client_data/${newClient.client_id}`, newClient);
            } else {
                await axios.post('http://127.0.0.1:8000/client_data', newClient);
            }
            
            console.log('Client data added successfully');
            // Clear form fields after successful submission

            isEditMode ? setSuccess(`${newClient.first_name} ${newClient.last_name} updated successfully`) :
                setSuccess(`${newClient.first_name} ${newClient.last_name} added successfully`);
            setError('');
            setNewClient({
                first_name: '',
                last_name: '',
                date_of_birth: '',
                indigenous: false,
                active: true,
                pwd: false,
                vet: false,
                emergency_sheltered: false,
                bus_pass: false,
                clothing_supplement: false,
                pet_deposit: false,
                pssg: false,

            });
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };


    return (
        <Card style={{ margin: '10px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {isEditMode ? 'Edit Client' : 'Add New Client'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="first_name"
                        label="First Name"
                        variant="outlined"
                        value={newClient.first_name}
                        onChange={handleInputChange}
                        style={{ margin: '10px' }}
                    />
                    <TextField
                        name="last_name"
                        label="Last Name"
                        variant="outlined"
                        value={newClient.last_name}
                        onChange={handleInputChange}
                        style={{ margin: '10px' }}
                    />
                    <FormControl variant="outlined" style={{ margin: '10px', minWidth: '100px' }}>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={newClient.gender}
                            onChange={handleInputChange}
                            label="Gender"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Non-binary">Non-binary</MenuItem>
                            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="status"
                        label="Status"
                        variant="outlined"
                        value={newClient.status}
                        onChange={handleInputChange}
                        style={{ margin: '10px' }}
                    />
                    <TextField
                        name="date_of_birth"
                        label="Date of Birth"
                        variant="outlined"
                        type="date"
                        value={newClient.date_of_birth}
                        onChange={handleInputChange}
                        style={{ margin: '10px' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="deceased"
                        label="Deceased"
                        variant="outlined"
                        type="date"
                        value={newClient.deceased}
                        onChange={handleInputChange}
                        style={{ margin: '10px' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Chip
                        label="Indigenous"
                        clickable
                        color={newClient.indigenous ? "primary" : "default"}
                        onClick={() => setNewClient({ ...newClient, indigenous: !newClient.indigenous })}
                        style={{ margin: '10px' }}
                    />
                    <Chip
                        label="PWD"
                        clickable
                        color={newClient.pwd ? "primary" : "default"}
                        onClick={() => setNewClient({ ...newClient, pwd: !newClient.pwd })}
                        style={{ margin: '10px' }}
                    />
                    <Chip
                        label="Vet"
                        clickable
                        color={newClient.vet ? "primary" : "default"}
                        onClick={() => setNewClient({ ...newClient, vet: !newClient.vet })}
                        style={{ margin: '10px' }}
                    />
                    <Chip
                        label="Emergency Sheltered"
                        clickable
                        color={newClient.emergency_sheltered ? "primary" : "default"}
                        onClick={() => setNewClient({ ...newClient, emergency_sheltered: !newClient.emergency_sheltered })}
                        style={{ margin: '10px' }}
                    />
                    <Chip
                        label="Pet Deposit"
                        clickable
                        color={newClient.pet_deposit ? "primary" : "default"}
                        onClick={() => setNewClient({ ...newClient, pet_deposit: !newClient.pet_deposit })}
                        style={{ margin: '10px' }}
                    />
                    <Chip
                        label="PSSG"
                        clickable
                        color={newClient.pssg ? "primary" : "default"}
                        onClick={() => setNewClient({ ...newClient, pssg: !newClient.pssg })}
                        style={{ margin: '10px' }}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <Chip
                            label="Clothing Supplement"
                            clickable
                            color={newClient.clothing_supplement && isClothingEligible() ? "primary" : "default"}
                            onClick={() => setNewClient({ ...newClient, clothing_supplement: !newClient.clothing_supplement })}
                            disabled={!isClothingEligible()}
                        />
                        {!isClothingEligible() ? (
                            <Typography variant="body2" color="error">
                                You cannot receive a Clothing Supplement outside of a special care facility.
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="green">
                                Available to clients who have been emergency sheltered in
                                special care facilities where clothing is not provided by the facility and no alternative resources
                                are available.
                            </Typography>
                        )}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Chip
                            label="Bus Pass"
                            clickable
                            color={newClient.bus_pass && isBusPassEligible() ? "primary" : "default"}
                            onClick={() => setNewClient({ ...newClient, bus_pass: !newClient.bus_pass })}
                            disabled={!isBusPassEligible()}
                        />
                        {!isBusPassEligible() ? (
                            <Typography variant="body2" color="error">
                                To be eligible for the bus pass, you must be 60 years of age or older, or a client with the Person with Disabilities (PWD) designation or identify as Indigenous.
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="green">
                                eligible
                            </Typography>
                        )}
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <Chip
                            label="Active"
                            clickable
                            color={newClient.active && isActiveEligible() ? "primary" : "default"}
                            onClick={() => setNewClient({ ...newClient, active: !newClient.active })}
                            disabled={!isActiveEligible()}
                        />
                        {!isActiveEligible() ? (
                            <Typography variant="body2" color="error">
                                To be eligible for active status, you must not have the PSSG designation or be deceased.
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="green">
                                eligible
                            </Typography>
                        )}
                    </div>




                    <Button type="submit" variant="contained" color="primary" style={{ margin: '10px' }}>
                        {isEditMode ? 'Update' : 'Add'}
                    </Button>
                </form>
                {successString && <Alert severity="success">{successString}</Alert>}
                {errorString && <Alert severity="error">{errorString}</Alert>}

            </CardContent>
        </Card>
    );
}

export default AddNewClient;
