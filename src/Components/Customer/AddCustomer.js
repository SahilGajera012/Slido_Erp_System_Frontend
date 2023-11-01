import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';


// import { message } from 'antd';
function AddCustomer() {
    const [data, setData] = useState({
        surname: '',
        name: '',
        dealer_address: '',
        city: '',
        state: '',
        pincode: '',
        contact: '',
        email: '',
        profession: '',
        at_home: "",
        gst_number: '',
        customer_type: ''
    });

    let history = useNavigate();
    // todo get
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'surname' || name === 'name') {
            const onlyTextValue = value.replace(/[^a-zA-Z ]/g, ''); // Remove non-letter characters
            setData(prevData => ({
                ...prevData,
                [name]: onlyTextValue,
            }));
        } else if (name === 'email') {
            setData(prevData => ({
                ...prevData,
                [name]: value,
            }));
            setIsEmailValid(isValidEmail(value));
        } else if (name === 'contact') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) {
                setData(prevData => ({
                    ...prevData,
                    [name]: numericValue,
                }));
            }
        } else if (name === 'pincode') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 6) {
                setData(prevData => ({
                    ...prevData,
                    [name]: numericValue,
                }));
            }
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };




    //todo validations
    const [isEmailValid, setIsEmailValid] = useState(true);

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    //todo post api
    const handleAddCustomer = () => {
        if (!data.surname || !data.name || !data.contact || !data.email) {
            alert('Required fields are empty.');
            return;
        }
        axios.post('http://localhost:8000/api/customer', data)
            .then(response => {
                console.log(data);
                // history("/customer");
            })
            .catch(error => {
                console.error('Error adding customer:', error);
            });
    };


    // todo: Check boxes
    const [isB2CSelected, setIsB2CSelected] = useState(false);
    const [isB2BSelected, setIsB2BSelected] = useState(false);

    const onChangeB2C = (e) => {
        setIsB2CSelected(e.target.checked);
        setIsB2BSelected(false);
        setData({ ...data, customer_type: 'B2C' });

    };

    const onChangeB2B = (e) => {
        setIsB2BSelected(e.target.checked);
        setIsB2CSelected(false);
        setData({ ...data, customer_type: 'B2B' });
    };
    // todo: pincode


    const handlePincode = async (pincode) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            if (response.data && response.data.length > 0) {
                const postOffices = response.data[0].PostOffice;
                console.log("postman", { postOffices });
                if (postOffices && postOffices.length > 0) {
                    const firstPostOffice = postOffices[0];
                    const { District, State } = firstPostOffice;
                    setData(prevData => ({
                        ...prevData,
                        city: District,
                        state: State,
                    }));
                }
            }
            return null;
        } catch (error) {
            console.error('Error fetching pincode data:', error);
            return null;
        }
    };
    return (
        <div className="grid grid-cols-1 gap-3 border rounded-md p-5 shadow-md">
            <div className='border-b'>
                <p className='text-xl font-bold'>Add Customer</p>
            </div>

            {/* todo: check box */}

            <div>
                <Checkbox onChange={onChangeB2C} checked={isB2CSelected} className='text-xl'>B2C Customer</Checkbox>
                <Checkbox onChange={onChangeB2B} checked={isB2BSelected} className='text-xl'>B2B Customer</Checkbox>
            </div>
            <div>
                {/* todo b2c */}
                {isB2CSelected && (
                    <>
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>First Name</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.surname}
                                    onChange={handleInputChange} name="surname" />
                            </div>
                            <div>
                                <p className='text-xl'>Last Name</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.name}
                                    onChange={handleInputChange} name="name" />
                            </div>

                        </div>
                        <div className="grid grid-cols-4 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>Dealer Address</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.dealer_address}
                                    onChange={handleInputChange} name="dealer_address" />
                            </div>
                            <div>
                                <p className='text-xl'>City</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.city}
                                    onChange={handleInputChange} name="city" />
                            </div>
                            <div>
                                <p className='text-xl'>State</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.state}
                                    onChange={handleInputChange} name="state" />
                            </div>
                            <div>
                                <p className='text-xl'>Pincode</p>
                                <div className='flex justify-start items-center'>
                                    <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.pincode}
                                        onChange={handleInputChange} name="pincode" />
                                    <button className='border-2 p-2  rounded-sm focus:border-[#1b98f5] outline-none' onClick={() => handlePincode(data.pincode)}>Add</button>
                                </div>
                            </div>
                        </div>
                        {/* todo */}
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>Contact</p>
                                <input
                                    type="text"
                                    className={`border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none`}
                                    value={data.contact}
                                    onChange={handleInputChange}
                                    name="contact"
                                />
                            </div>
                            <div>
                                <p className='text-xl'>Email</p>
                                <input
                                    type="email"
                                    className=
                                    {`border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none ${!isEmailValid ? 'border-red-500' : ''
                                        }`}
                                    value={data.email}
                                    onChange={handleInputChange}
                                    name="email"
                                />
                                {!isEmailValid && <p className="text-red-500 mt-1">Invalid email address</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>Profession</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.profession}
                                    onChange={handleInputChange} name="profession" />
                            </div>
                            <div>
                                <p className='text-xl'>At House/Apartment/Building</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.at_home}
                                    onChange={handleInputChange} name="at_home" />
                            </div>
                        </div>

                        <div className='flex justify-start items-center'>
                            <Link to="/customer">
                                <button className='bg-[#080808] me-2 text-white p-1 rounded-sm'>Cancle</button>
                            </Link>
                            {/* <Link to="/customer">
                                <button onClick={handleAddCustomer} className={`bg-[#1b98f5] text-white p-1 rounded-sm `}>Add Customer</button>
                            </Link> */}
                            <button onClick={handleAddCustomer} className={`bg-[#1b98f5] text-white p-1 rounded-sm `}>Add Customer</button>

                        </div>
                    </>
                )}
                {/* todo b2b */}
                {isB2BSelected && (
                    <>
                        <div className="grid grid-cols-3 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>GST Number</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.gst_number}
                                    onChange={handleInputChange} name="gst_number" />
                            </div>
                            <div>
                                <p className='text-xl'>Sur Name</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.surname}
                                    onChange={handleInputChange} name="surname" />
                            </div>
                            <div>
                                <p className='text-xl'>Name</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.name}
                                    onChange={handleInputChange} name="name" />
                            </div>

                        </div>
                        <div className="grid grid-cols-4 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>Dealer Address</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.dealer_address}
                                    onChange={handleInputChange} name="dealer_address" />
                            </div>
                            <div>
                                <p className='text-xl'>City</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.city}
                                    onChange={handleInputChange} name="city" />
                            </div>
                            <div>
                                <p className='text-xl'>State</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.state}
                                    onChange={handleInputChange} name="state" />
                            </div>
                            <div>
                                <p className='text-xl'>Pincode</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.pincode}
                                    onChange={handleInputChange} name="pincode" />
                            </div>
                        </div>
                        {/* todo */}
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>Phone No</p>
                                <input
                                    type="text"
                                    className={`border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none`}
                                    value={data.contact}
                                    onChange={handleInputChange}
                                    name="contact"
                                />
                            </div>
                            <div>
                                <p className='text-xl'>Email</p>
                                <input
                                    type="email"
                                    className={`border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none`}
                                    value={data.email}
                                    onChange={handleInputChange}
                                    name="email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div>
                                <p className='text-xl'>Profession</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.profession}
                                    onChange={handleInputChange} name="profession" />
                            </div>
                            <div>
                                <p className='text-xl'>At House/Apartment/Building</p>
                                <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.at_home}
                                    onChange={handleInputChange} name="at_home" />
                            </div>
                        </div>

                        <div className='flex justify-start items-center'>
                            <Link to="/customer">
                                <button className='bg-[#080808] me-2 text-white p-1 rounded-sm'>Cancle</button>
                            </Link>
                            <Link to="/customer">
                                <button onClick={handleAddCustomer} className={`bg-[#1b98f5] text-white p-1 rounded-sm `}>Add Customer</button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div >
    )
}
export default AddCustomer;