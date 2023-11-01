import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Inserts() {
    const [room, setDoorPattern1] = useState(''); // Changed state variable name
    const [designs, setDesigns] = useState([]);

    const handleAdd = () => {
        if (designs.some(existingDesign => existingDesign.room === room)) {
            console.error('Pattern with the same name already exists.');
            return;
        }

        axios.post(`http://localhost:8000/api/room`, { room })
            .then(response => {
                console.log('Post successful', response);
                setDoorPattern1(''); // Clear the input field
            })
            .catch(error => {
                console.error('Error posting data', error);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/room")
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
                    <input type="text" className='px-2 py-1 rounded-md w-full border border-black outline-none ' placeholder='add design type' value={room} onChange={(e) => setDoorPattern1(e.target.value)} /><br /><br />
                    <button className='border-2 px-2 py-1 rounded-md border-black min-w-[200px]' onClick={handleAdd}>Add Pattern</button>
                </div>

                <div className='border-2 p-5 shadow-md'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Added Insert Type</th>
                            </tr>
                            {designs.map((existingDesign, index) => (
                                <tr key={index} className='text-xl'>
                                    <td className='text-xl'>{existingDesign.room}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Inserts;
