import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { message } from 'antd';
function UpdateCustomer() {
    const [data, setData] = useState({
        id:'',
        customer_name: '',
        dealer_address: '',
        contact: '',
        email: '',
    });
    let history = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // post api
    const handleAddCustomer = () => {
        axios.put('http://localhost:8000/api/updateCustomer/:id', data)
            .then(response => {
                console.log(data);
                history("/customer");
                // success();
            })
            .catch(error => {
                console.error('Error adding customer:', error);
            });
    }

    // message
    // const [messageApi, contextHolder] = message.useMessage();
    // const success = () => {
    //     messageApi.open({
    //         type: 'success',
    //         content: 'Customer added successfully',
    //     });
    // };

    return (
        <div className="grid grid-cols-1 gap-3 border rounded-md p-5 shadow-md">
            <div className='border-b'>
                <p className='text-xl font-bold'>Add Customer</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div>
                    <p className='text-xl'>Customer Id</p>
                    <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.id}
                        onChange={handleInputChange} name="id" />
                </div>
                <div>
                    <p className='text-xl'>Customer Name</p>
                    <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.customer_name}
                        onChange={handleInputChange} name="customer_name" />
                </div>
                <div>
                    <p className='text-xl'>Dealer Address</p>
                    <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.dealer_address}
                        onChange={handleInputChange} name="dealer_address" />
                </div>
                <div>
                    <p className='text-xl'>Contact</p>
                    <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.contact}
                        onChange={handleInputChange} name="contact" />
                </div>
                <div>
                    <p className='text-xl'>Email</p>
                    <input type="email" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={data.email}
                        onChange={handleInputChange} name="email" />
                </div>
            </div>

            <div className='flex justify-start items-center'>
                <Link to="/customer">
                    <button className='bg-[#080808] me-2 text-white p-1 rounded-sm'>Cancle</button>
                </Link>
                <Link to="/customer">
                    <button onClick={handleAddCustomer} className='bg-[#1b98f5] text-white p-1 rounded-sm'>Add Customer</button>
                </Link>
            </div>
            {/* {contextHolder} */}
        </div >
    )
}

export default UpdateCustomer