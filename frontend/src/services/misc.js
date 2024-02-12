export const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const diffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const emptyClient = {
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
};