import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pattern() {
    const [door_patter1, setDesign] = useState('');
    const [designs, setDesigns] = useState([]);

    const handleAdd = () => {
        if (designs.some(existingDesign => existingDesign.door_patter1 === door_patter1)) {
            console.error('Design with the same name already exists.');
            return;
        }

        axios.post(`http://localhost:8000/api/door1`, { door_patter1 })
            .then(response => {
                console.log('Post successful', response);
                setDesign('');
            })
            .catch(error => {
                console.error('Error posting data', error);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/door1")
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
                    <input type="text" className='px-2 py-1 rounded-md w-full border border-black outline-none ' placeholder='add design type' value={door_patter1} onChange={(e) => setDesign(e.target.value)} /><br /><br />
                    <button className='border-2 px-2 py-1 rounded-md border-black min-w-[200px]' onClick={handleAdd}>Add Pattern</button>
                </div>

                <div className='border-2 p-5 shadow-md'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Added Design Type</th>
                            </tr>
                            {designs.map((existingDesign, index) => (
                                <tr key={index} className='text-xl'>
                                    <td className='text-xl'>{existingDesign.door_patter1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Pattern;
