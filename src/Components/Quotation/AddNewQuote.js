import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// import { message } from 'antd';
function AddNewQuote() {
    // date
    const currentDate = new Date().toISOString().split('T')[0];

    const [data, setData] = useState({
        "name": "",
        "location": "",
        "date": currentDate,
        "product_type": "",
        "door_pr_set": 0,
        "all_door_paterns_same": "",
        "door_patter1": "",
        "profile": "",
        "locks": 0,
        "loock_type": "",
        "soft_close": 0,
        "middle_soft_close": 0,
        "room": "",
        "design_collection": "",
        "type_of_customer": "",
        "customer_category": "",
        "expacted_delivery_date": "",
        products: [
            {
                product_type: "",
                door_pr_set: null,
                door_patter1: "",
                profile: "",
                loock_type: "",
                room: "",
                design_collection: "",
                type_of_customer: "",
            },
        ],
    });
    let history = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    // handleProductinput change    
    const handleProductInputChange = (e, productIndex) => {
        const { name, value } = e.target;
        setData((prevData) => {
            const newProducts = [...prevData.products];
            newProducts[productIndex][name] = value;
            return {
                ...prevData,
                products: newProducts,
            };
        });
    };



    // post api
    const handleAddCustomer = () => {
        axios.post('http://localhost:8000/api/quotation', data)
            .then(response => {
                console.log("data::::::", data);
                history("/quote1");
                // success();
            })
            .catch(error => {
                console.error('Error adding customer:', error);
            });
    }

    // todo: product field
    const addProductField = () => {
        setData((prevData) =>
        ({
            ...prevData,
            products: [
                ...prevData.products,
                {
                    product_type: "",
                    door_pr_set: 0,
                    door_1_pattern: "",
                    profile: "",
                    loock_type: "",
                    room: "",
                    email: "",
                    design_collection: "",
                    type_of_customer: "",
                }
            ]
        })
        )
    }


    // todo: auto suggestion feature
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (data.name.length > 0) {
            axios.get(`http://localhost:8000/api/allCustomer?customer_name=${data.name}`)
                .then(response => {
                    console.log(response.data.data);
                    setSuggestions(response.data.data); // Assuming the API response is an array of names
                    setShowSuggestions(true);
                })
                .catch(error => {
                    console.error('Error fetching suggestions:', error);
                });
        } else {
            setShowSuggestions(false);
        }
    }, [data.name]);

    // todo: product type
    const [productTypes, setProductTypes] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/product")
            .then(res => {
                console.log(res.data.data);
                setProductTypes(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);
    // todo: door pattern
    const [designs, setDesigns] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/door1")
            .then(res => {
                console.log("pattern::::", res.data.data);
                setDesigns(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    // todo:profile
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/profile")
            .then(res => {
                console.log("profile::::", res.data.data);
                setProfile(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    // todo:room
    const [Room, setRoom] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/room")
            .then(res => {
                console.log("room::::", res.data.data);
                setRoom(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    // todo:design collection
    const [design1, setDesign1] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/design")
            .then(res => {
                console.log("design collection::::", res.data.data);
                setDesign1(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-y-10 text-xl border rounded-md p-5 hover:shadow-md">
            <div className='border-b-2 rounded-md  text-gray-500'>
                <p className='text-xl font-bold px-2'>Add New Quote</p>
            </div>
            <div className="grid grid-cols-3 gap-5">

                <div>
                    <p className='text-lg'>Customer Name</p>
                    <input type="text" className='border-2 w-full p-2 rounded-sm hover:border-[#1b98f5] outline-none' value={data.name}
                        onChange={handleInputChange} name="name" />

                    {showSuggestions && (
                        <ul className='border border-gray-300 rounded-md bg-white mt-1'>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className='p-1 hover:bg-gray-100 cursor-pointer'
                                    onClick={() => {
                                        setData(prevData => ({
                                            ...prevData,
                                            name: suggestion.customer_name
                                        }));
                                        setShowSuggestions(false);
                                    }}
                                >
                                    {suggestion.customer_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <p className='text-lg'>Location</p>
                    <input type="text" className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none' value={data.location}
                        onChange={handleInputChange} name="location" />
                </div>
                <div>
                    <p className='text-lg'>Date</p>
                    <input type="text"
                        className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none' value={data.date}
                        onChange={handleInputChange}
                        readOnly
                        name="date" />
                </div>
            </div>
            {/* todo: select size */}
            

            {/* todo product div */}
            {data.products.map((product, index) =>
                <div className="grid grid-cols-3 gap-5 border-t-2 border-black">

                    {/*todo: product type  */}
                    <div>
                        <p className='text-lg'>Product type</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.product_type}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="product_type"
                        >
                            <option value=""></option>
                            {productTypes.map((productType, index) => (
                                <option key={index} value={productType.name}>
                                    {productType.name}
                                </option>
                            ))}
                        </select>
                        {/* <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.product_type}
                            onChange={(e) => handleInputChange(e)}
                            name={`products[${index}].product_type`}
                        >
                            <option value=""></option>
                            {productTypes.map((productType, index) => (
                                <option key={index} value={productType.name}>
                                    {productType.name}
                                </option>
                            ))}
                        </select> */}

                    </div>

                    {/* todo: door per set */}
                    <div>
                        <p className='text-lg'>Door per Set</p>
                        {/* <input type='text' className='border-2 w-full h-[45px] p-2 rounded-sm focus:border-[#1b98f5] outline-none' value={data.door_pr_set}
                            onChange={(e) => handleProductInputChange(e, index)} name="door_pr_set" /> */}
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.door_pr_set}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="door_pr_set"
                        >
                            <option value=""></option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>


                    {/* todo:door pattern */}
                    <div>
                        <p className='text-lg'>Door Pattern 1</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.door_patter1}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="door_patter1"
                        >
                            <option value=""></option>
                            {designs.map((pattern, index) => (
                                <option key={index} value={product.door_patter1}>
                                    {pattern.door_patter1}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* todo: profile */}
                    <div>
                        <p className='text-lg'>Profile</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.profile1}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="profile"
                        >
                            <option value=""></option>
                            {profile.map((pattern, index) => (
                                <option key={index} value={product.profile1}>
                                    {pattern.profile1}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* todo: lock type */}
                    <div>
                        <p className='text-lg'>Lock Type</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.loock_type}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="loock_type"
                        >
                            <option value=""></option>
                            <option value="universal">Universal</option>
                            <option value="system">System Specifi</option>
                        </select>
                    </div>

                    {/* todo: room */}
                    <div>
                        <p className='text-lg'>Room</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.room}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="room"
                        >
                            <option value=""></option>
                            {Room.map((rooms, index) => (
                                <option key={index} value={product.room}>
                                    {rooms.room}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* todo: quantity */}
                    {/* <div>
                        <p className='text-lg'>Quantity</p>
                        <input type="text" className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none' value={data.email}
                             onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }} name="email" />
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.type_of_customer}
                             onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="type_of_customer"
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div> */}
                    {/* todo:collection */}
                    <div>
                        <p className='text-lg'>Design Collection</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.design_collection}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="design_collection"
                        >
                            <option value=""></option>
                            {design1.map((pattern, index) => (
                                <option key={index} value={product.design}>
                                    {pattern.design}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* todo: type of customer */}
                    <div>
                        <p className='text-lg'>Type_of Customer</p>
                        <select
                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none'
                            value={product.type_of_customer}
                            onChange={(e) => {
                                handleProductInputChange(e, index);
                                handleInputChange(e);
                            }}
                            name="type_of_customer"
                        >
                            <option value=""></option>
                            <option value="b2b">B2B</option>
                            <option value="b2c">B2C</option>
                        </select>
                    </div>
                </div>
            )}
            {/* div */}
            <button className='border-2' onClick={addProductField}>+ Add Field</button>

            <div className='flex justify-start items-center'>
                <Link to="/customer">
                    <button className='text-black px-3 shadow-md py-1 me-5 rounded-md border hover:border-[#f52d1b]'>Cancle</button>
                </Link>
                <Link to="/customer">
                    <button onClick={handleAddCustomer} className='text-black px-3 shadow-md py-1 rounded-md border bg-[#1b98f5]'>Save Quote</button>
                </Link>
            </div>
            {/* {contextHolder} */}
        </div >
    )
}

export default AddNewQuote