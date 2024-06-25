import { useState } from 'react';
import { registerCustomer } from "@utils/sfcc-connector/dataService";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    console.log("Form Data: "+ body);
    try {
        const response = await registerCustomer({userData: body, method: "POST"});
        /*
      const response = await fetch('/api/sfcc/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });*/
      
      const data = await response.json();
      alert(response.status);
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Error submitting form: ' + data.message);
      }
    } catch (error) {
      setMessage('Error submitting form: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>First Name</label>
            <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />
        </div>
        <div>
            <label>Last Name</label>
            <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />
        </div>
        <div>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Signup</button>
        {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
