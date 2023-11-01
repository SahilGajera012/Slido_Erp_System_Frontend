import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddBusiness() {
    const [data, setData] = useState({
        gstn_number: '',
        company_name: '',
        dealer_address: '',
        contact: '',
        email: '',
        preferred_time: '',
        cargo_vehicle: '',
    });

    const [gstnData, setGstnData] = useState(null);
    const history = useNavigate();

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === "gstn_number") {
            setData(prevData => ({
                ...prevData,
                [name]: value,
            }));

            try {
                const response = await axios.get(`http://localhost:8000/gstn/${value}`);
                if (response.data.valid) {
                    setGstnData(response.data.data);
                } else {
                    setGstnData(null);
                }
            } catch (error) {
                console.error('Error fetching GSTN data:', error);
                setGstnData(null);
            }
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleAddBusiness = () => {
        // Add logic to handle adding business data
        console.log(data);
        history('/customer'); // Redirect after adding business data
    };

    return (
        <div className="grid grid-cols-1 gap-3 border rounded-md p-5">
            <div className='border-b'>
                <p className='text-xl font-bold'>Add Business</p>
            </div>
            <div>
                <p>GSTN Number</p>
                <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.gstn_number}
                    onChange={handleInputChange} name="gstn_number" />
            
            </div>
            {gstnData && (
                <>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p>Dealer Address</p>
                            <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.dealer_address}
                                onChange={handleInputChange} name="dealer_address" />
                        </div>
                        <div>
                            <p>Contact</p>
                            <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.contact}
                                onChange={handleInputChange} name="contact" />
                        </div>
                    </div>
                    <div>
                        <p>Email</p>
                        <input type="email" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.email}
                            onChange={handleInputChange} name="email" />
                    </div>
                    <div>
                        <p>Preferred Time</p>
                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.preferred_time}
                            onChange={handleInputChange} name="preferred_time" />
                    </div>
                    <div>
                        <p>Cargo Vehicle allowed Time</p>
                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.cargo_vehicle}
                            onChange={handleInputChange} name="cargo_vehicle" />
                    </div>
                </>
            )}
            <div className='flex justify-start items-center'>
                <Link to="/customer">
                    <button className='bg-[#080808] me-2 text-white p-1 rounded-sm'>Cancel</button>
                </Link>
                {gstnData && (
                    <Link to="/customer">
                        <button onClick={handleAddBusiness} className='bg-[#1b98f5] text-white p-1 rounded-sm'>Add Business Data</button>
                    </Link>
                )}
            </div>
        </div >
    )
}

export default AddBusiness;
