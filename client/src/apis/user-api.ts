import axios from 'axios';

type signUpType = {
    name: string;
    email: string;
    password: string;
}

export async function signUp(userData: signUpType): Promise<any> {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/signup', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Signup failed');
    }
}
