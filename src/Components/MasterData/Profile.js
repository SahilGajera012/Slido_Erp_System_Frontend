import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile1, setDesign] = useState('');
    const [profile, setDesigns] = useState([]);

    const handleAdd = () => {
        if (profile.some(existingDesign => existingDesign.profile1 === profile1)) {
            console.error('Design with the same name already exists.');
            return;
        }

        axios.post(`http://localhost:8000/api/profile`, { profile1 })
            .then(response => {
                console.log('Post successful', response);
                setDesign('');
            })
            .catch(error => {
                console.error('Error posting data', error);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/profile")
            .then(res => {
                console.log(res.data.data);
                setDesigns(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    return (
        <div className="container min-w-full">
            <div className="grid grid-cols-2 gap-5 ">
                <div className='border-2 p-5 shadow-md'>
                    <input type="text" className='px-2 py-1 rounded-md w-full border border-black outline-none ' placeholder='add design type' value={profile1} onChange={(e) => setDesign(e.target.value)} /><br /><br />
                    <button className='border-2 px-2 py-1 rounded-md border-black min-w-[200px]' onClick={handleAdd}>Add Design Type</button>
                </div>

                <div className='border-2 p-5 shadow-md'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Added Design Type</th>
                            </tr>
                            {profile.map((existingDesign, index) => (
                                <tr key={index} className='text-xl'>
                                    <td className='text-xl'>{existingDesign.profile1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Profile;
