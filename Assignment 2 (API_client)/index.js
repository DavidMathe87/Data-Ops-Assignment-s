const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'users.csv',
    header: [
        {id: 'first_name', title: 'First Name'},
        {id: 'last_name', title: 'Last Name'},
        {id: 'gender', title: 'Gender'},
        {id: 'email', title: 'Email'},
        {id: 'phone', title: 'Phone'},
        {id: 'cell', title: 'Cell'},
        {id: 'street', title: 'Street'},
        {id: 'city', title: 'City'},
        {id: 'state', title: 'State'},
        {id: 'postcode', title: 'Postcode'},
        {id: 'username', title: 'Username'},
        {id: 'password', title: 'Password'},
        {id: 'dob', title: 'Date of Birth'},
        {id: 'registered', title: 'Registered Date'}
    ]
});


const fetchData = async (numUsers) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${numUsers}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
};


const processAndWriteData = async (numUsers) => {
    const users = await fetchData(numUsers);

    const records = users.map(user => ({
        first_name: user.name.first,
        last_name: user.name.last,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        cell: user.cell,
        street: `${user.location.street.number} ${user.location.street.name}`,
        city: user.location.city,
        state: user.location.state,
        postcode: user.location.postcode,
        username: user.login.username,
        password: user.login.password,
        dob: user.dob.date,
        registered: user.registered.date
    }));

    csvWriter.writeRecords(records)
        .then(() => {
            console.log('CSV file was written successfully');
        })
        .catch(error => {
            console.error('Error writing CSV file:', error);
        });
};

processAndWriteData(10);
