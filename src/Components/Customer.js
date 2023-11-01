import React, { useEffect, useState } from 'react'
import "./Style.css";
import { Pagination, Button } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';


// drop down for action

function Customer() {
    // TABLE API 
    const [data1, setData1] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        axios.get('http://localhost:8000/api/allCustomer', {
            params: {
                _start: startIndex,
                _limit: itemsPerPage,
            }
        })
            .then(response => {
                console.log('API response:', response.data.data);
                setData1(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleRefreshClick = () => {
        setFilterData("");
        setFilteredData([]);
        fetchData(); // Fetch the original data
    };
    // todo:delete
    // const handleDelete = (customerId) => {
    //     console.log("Deleting customer with ID:", customerId);
    //     axios.delete(`http://localhost:8000/api/deleteCustomer/${customerId}`)
    //         .then(response => {
    //             console.log('Customer deleted:', customerId);
    //             // fetchData();
    //             const updatedData = data1.filter(customer => customer._id !== customerId);
    //             setData1(updatedData);
    //         })
    //         .catch(error => {
    //             console.error('Error deleting customer:', error);
    //         });
    // };
    // different table
    // const b2cCustomers = data1.filter(customer => customer.customer_type === 'B2C');
    // const b2bCustomers = data1.filter(customer => customer.customer_type === 'B2B');


    // todo filter
    const [filteredData, setFilteredData] = useState([]);
    const [filterData, setFilterData] = useState("");


    const handleFilter = () => {
        if (filterData.trim() === "") {
            setFilteredData([]);
        } else {
            const filteredCustomers = data1.filter(
                customer =>
                    (customer.email && customer.email.toLowerCase().includes(filterData.toLowerCase())) ||
                    (customer.profession && customer.profession.toLowerCase().includes(filterData.toLowerCase())) ||
                    (customer.pincode && customer.pincode.toString().includes(filterData)) || // Convert to string before comparing
                    (customer.contact && customer.contact.toString().includes(filterData)) // Convert to string before comparing
            );
            setFilteredData(filteredCustomers);
        }
    };






    return (
        <div className="container min-w-full">
            <div className="grid ">
                <div className="grid grid-cols-4 p-4">
                    <Link to="/">
                        <div className='flex justify-start items-center hover:text-[#1b98f5]'>
                            <i class="fa fa-arrow-left me-2" aria-hidden="true"></i>
                            <p className='text-xl font-medium'>Customer</p>
                        </div>
                    </Link>

                    <div>
                        <button className='text-black px-3 shadow-md py-2 text-xl rounded-md border hover:border-[#1b98f5]' onClick={handleRefreshClick}>Refresh</button>
                    </div>
                    <div>
                        <Link to="/addCustomer">
                            <button className='text-white text-xl px-3 shadow-md py-2 rounded-md border bg-[#1b98f5]'>Add new customer</button>
                        </Link>
                    </div>
                    {/* todo filter global */}
                    <div>
                        <div className='flex justify-start items-center'>
                            <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={filterData}
                                onChange={(e) => setFilterData(e.target.value)} name="pincode" />
                            <button className='border-2 p-2  rounded-sm focus:border-[#1b98f5] outline-none' onClick={handleFilter}>Filter</button>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>(Filter by Email,Profession,Pincode,Contact)</p>
                        </div>
                    </div>
                    {/* todo filter for column */}
                    {/* <div>
                        <div className='flex justify-start items-center'>
                            <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={filterData}
                                onChange={(e) => setFilterData(e.target.value)} name="pincode" />
                            <button className='border-2 p-2  rounded-sm focus:border-[#1b98f5] outline-none' onClick={handleFilter}>Filter</button>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>(Filter by more than one parameter)</p>
                        </div>
                    </div> */}


                </div>

                <div className='overflow-x-scroll drawer bg-white p-5 rounded-md  border hover:shadow-md'>
                    <table className='w-full'>
                        <thead className=''>
                            <tr className='bg-[#f6f6f6] text-lg font-light text-black shrink-0'>
                                <th className='py-5 text-start border-e  px-1'>First Name</th>
                                <th className=''>Last Name</th>
                                <th className=''>Dealer Address</th>
                                <th className=''>City</th>
                                <th className=''>State</th>
                                <th className=''>Pincode</th>
                                <th className=''>Phone No.</th>
                                <th className=''>Email</th>
                                <th className=''>Profession</th>
                                <th className=''>At Home</th>
                                <th className=''>GSTN</th>
                                <th className=''>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filteredData.length > 0 ? filteredData : data1).map((customer, index) => (
                                <tr key={index} className='border-b'>
                                    {/* onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} */}
                                    <td className='text-lg py-4'>{customer.surname}</td>
                                    <td className='text-lg py-4'>{customer.name}</td>
                                    <td className='text-lg py-4 px-2'>{customer.dealer_address}</td>
                                    <td className='text-lg py-4'>{customer.city}</td>
                                    <td className='text-lg py-4'>{customer.state}</td>
                                    <td className='text-lg py-4'>{customer.pincode}</td>
                                    <td className='text-lg py-4'>{customer.contact}</td>
                                    <td className='text-lg py-4'>{customer.email}</td>
                                    <td className='text-lg py-4'>{customer.profession}</td>
                                    <td className='text-lg py-4'>{customer.at_home}</td>
                                    <td className='text-lg py-4'>{customer.gst_number}</td>

                                    <td className='text-lg py-2'>
                                        <div className='flex justify-around items-center'>
                                            <Button className='border-none'>
                                                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                            </Button>
                                            {/* {hoveredIndex === index && (
                                                <div className="action-buttons flex justify-around items-center">
                                                    <button className="update-button me-2 border border-black px-1 rounded-md">Update</button>
                                                    <button className="delete-button me-2 border border-black px-1 rounded-md" onClick={() => handleDelete(customer._id)}>Delete</button>
                                                </div>
                                            )} */}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>


                    <div className='flex justify-end items-center my-3'>
                        <Pagination
                            current={currentPage}
                            onChange={page => setCurrentPage(page)}
                            total={50} // Total number of items in your data
                            pageSize={itemsPerPage}
                        />
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Customer