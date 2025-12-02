import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin';

const testAdmin = {
    name: 'Test Admin',
    email: `testadmin_${Date.now()}@example.com`,
    password: 'password123',
    role: 'admin'
};

async function verify() {
    try {
        console.log('1. Registering new admin...');
        const registerRes = await axios.post(`${API_URL}/register`, testAdmin);
        console.log('Register success:', registerRes.data.message);

        console.log('2. Logging in (Requesting OTP)...');
        const loginRes = await axios.post(`${API_URL}/login`, {
            email: testAdmin.email,
            password: testAdmin.password
        });
        console.log('Login success, OTP sent.');
        
        const otp = loginRes.data.otp;
        if (!otp) {
            throw new Error('OTP not received in response (Make sure it is exposed for testing)');
        }
        console.log('OTP received:', otp);

        console.log('3. Verifying OTP...');
        const verifyRes = await axios.post(`${API_URL}/verify-otp`, {
            email: testAdmin.email,
            otp: otp
        });
        const token = verifyRes.data.token;
        console.log('OTP verified, token received.');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log('4. Fetching all admins (protected)...');
        const getAllRes = await axios.get(API_URL, config);
        console.log('Fetch all success, count:', getAllRes.data.length);

        const adminId = registerRes.data.admin._id;

        console.log('5. Fetching admin by ID (protected)...');
        const getByIdRes = await axios.get(`${API_URL}/${adminId}`, config);
        console.log('Fetch by ID success:', getByIdRes.data.name);

        console.log('6. Updating admin (protected)...');
        const updateRes = await axios.put(`${API_URL}/${adminId}`, { name: 'Updated Admin' }, config);
        console.log('Update success:', updateRes.data.admin.name);

        console.log('7. Deleting admin (protected)...');
        const deleteRes = await axios.delete(`${API_URL}/${adminId}`, config);
        console.log('Delete success:', deleteRes.data.message);

        console.log('8. Verifying unauthorized access...');
        try {
            await axios.get(API_URL);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized access blocked correctly.');
            } else {
                console.error('Unexpected error for unauthorized access:', error.message);
            }
        }

        console.log('Verification completed successfully!');
    } catch (error: any) {
        console.error('Verification failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

verify();
