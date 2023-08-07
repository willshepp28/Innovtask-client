import { useState } from "react"

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });

    return (
        <div>
            <h2>Signup for Innovtask</h2>
            <form onSubmit={() => console.log('submit')}>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={() => console.log('changed email')}
                    required 
                />
                <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    placeholder="First Name"
                    onChange={() => console.log('changed first name')}
                    required 
                />
                <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    placeholder="Last Name"
                    onChange={() => console.log('changed last name')}
                    required 
                />
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={() => console.log('changed passwrd')}
                    required 
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}