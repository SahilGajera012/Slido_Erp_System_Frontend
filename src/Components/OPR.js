import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TimePicker, Select, DatePicker, AutoComplete } from 'antd';
import './Style.css';

const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
};




function OPR() {
    // todo: auto complete
    const [customerNames, setCustomerNames] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedCustomerData, setSelectedCustomerData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/allCustomer')
            .then(response => {
                console.log("customer detaisl:", response.data.data);
                setCustomerNames(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching customer names:', error);
            });
    }, []);

    // useEffect(() => {
    //     if (selectedCustomer) {
    //         axios.get(`http://localhost:8000/api/viewQuote?name=${selectedCustomer}`)
    //             .then(response => {
    //                 console.log(selectedCustomer);
    //                 console.log("selected::::::", response.data.data);
    //                 setSelectedCustomerData(response.data.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching customer data:', error);
    //             });
    //     }
    // }, [selectedCustomer]);
    useEffect(() => {
        if (selectedCustomer) {
            const selectedCustomerData = customerNames.find(customer => customer.customer_name === selectedCustomer);

            if (selectedCustomerData) {
                axios.get(`http://localhost:8000/api/viewQuote?name=${selectedCustomer}`)
                    .then(response => {
                        console.log("selected customer:", selectedCustomerData);
                        console.log("selected data:", response.data.data);
                        setSelectedCustomerData(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching customer data:', error);
                    });
            }
        }
    }, [selectedCustomer, customerNames]);

    // todo: date
    const [date, setDate] = useState("");
    const handleInputDate = () => {
        setDate(new Date().toISOString().split('T')[0]);
    }


    // todo highlight
    const [selectedHighlight, setSelectedHighlight] = useState('');
    const handleHighlight = (e) => {
        setSelectedHighlight(e.target.value);
    }
    return (
        <>

            <div className="container min-w-full">

                <div className="grid bg-white p-5 place-items-center rounded-md shadow-md border    overflow-x-scroll drawer hover:border-[#1b98f5]">

                    <div className="flex ">

                        <table className="max-w-[100%] overflow-x-auto shrink-0">
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <td colspan="15">
                                        <AutoComplete
                                            options={customerNames.map(name => ({ value: name.customer_name }))}
                                            value={selectedCustomer}
                                            onSelect={value => setSelectedCustomer(value)}
                                            onChange={value => setSelectedCustomer(value)}
                                            placeholder='Customer Name'
                                        />
                                    </td>
                                    <th>Date</th>
                                    <td colspan="2">
                                        <input type="text"
                                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none' value={date}
                                            onChange={handleInputDate}
                                            readOnly
                                            name="date" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Dealer Address</th>
                                    <td colspan="15">
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.location || ''}

                                        />
                                    </td>
                                    <th>Date</th>
                                    <td colspan="2">
                                        <input type="text"
                                            className='border-2 w-full p-2 rounded-sm focus:border-[#1b98f5] outline-none' value={date}
                                            onChange={handleInputDate}
                                            readOnly
                                            name="date" />

                                    </td>
                                </tr>
                                <tr>
                                    <th rowspan="2">Delivery Address</th>
                                    <td rowspan="2" colspan="7">
                                        <input type="text" className='w-full px-2 text-lg' placeholder='Delivery Address' />
                                    </td>
                                    <th>Flat No.</th>
                                    <td colspan="5">
                                        <input type="text" className='w-full px-2 text-lg' placeholder='Flat No' />
                                    </td>
                                    <th colspan="3">Service Lift Available</th>
                                    <td colspan="2">
                                        <Select
                                            defaultValue="Yes"
                                            style={{
                                                width: 120,
                                            }}

                                            options={[
                                                {
                                                    value: 'yes',
                                                    label: 'yes',
                                                },
                                                {
                                                    value: 'no',
                                                    label: 'no',
                                                },

                                            ]}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Floor No.</th>
                                    <td colspan="5">
                                        <input type="text" className='w-full px-2 text-lg' placeholder='Floor No.' />
                                    </td>
                                    <th colspan="3">Service Lift Timing</th>
                                    <td colspan="2">
                                        <TimePicker.RangePicker />
                                    </td>
                                </tr>
                                <tr>
                                    <th rowspan="">Contact Number</th>
                                    <td colspan="7">
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomer?.[0]?.contact || ''}
                                        />
                                    </td>
                                    <th>Preferred Time</th>
                                    <td colspan="5">
                                        <TimePicker.RangePicker />
                                    </td>
                                    <th colspan="3">Cargo vehicles allowed timing</th>
                                    <td colspan="2">
                                        <TimePicker.RangePicker />

                                    </td>
                                </tr>
                                <tr>
                                    <th>GST Number</th>
                                    <td colspan="18">
                                        <input type="text" className='w-full px-2 text-lg' placeholder='GST Number' />
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="19">
                                    </th>
                                </tr>

                                {/* todo: main table */}
                                <tr className='bg-[#cfcfcf] text-gray-500'>
                                    <th className='min-w-[200px]'>SI. No</th>
                                    <th className='min-w-[200px]'>Komandor Order No</th>
                                    <th className='min-w-[200px]'>Slido Order No</th>
                                    <th className='min-w-[200px]'>Product Type</th>
                                    <th className='min-w-[200px]'>Door Pattern</th>
                                    <th className='min-w-[200px]'>Profile</th>
                                    <th className='min-w-[200px]'>Collection</th>
                                    <th className='min-w-[200px]'>Hightlight</th>
                                    <th className='min-w-[200px]'>Match cust. Sample</th>
                                    <th className='min-w-[200px]'>Lock</th>
                                    <th className='min-w-[200px]'>Soft Closing</th>
                                    <th className='min-w-[200px]'>Height(mm)</th>
                                    <th className='min-w-[200px]'>Width(mm)</th>
                                    <th className='min-w-[200px]'>Doors per set</th>
                                    <th className='min-w-[200px]'>Room</th>
                                    <th className='min-w-[200px]'>Basic Value</th>
                                    <th className='min-w-[200px]'>Value After Discount</th>
                                    <th className='min-w-[200px]'>GST</th>
                                    <th className='min-w-[200px]'>Grand Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* todo: type */}
                                <tr className=''>
                                    <td className='text-lg'>1</td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>SL722-01/22</td>
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.product_type || ''}

                                        />
                                    </td>
                                    {/* <td className='text-lg'>
                                        <select name="" id="" >
                                            <option value="">Select</option>
                                            <option value="">1</option>
                                            <option value="">2</option>
                                        </select>
                                    </td> */}
                                    {/* todo: door pattern 1 */}
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.product_type || ''}

                                        />
                                    </td>

                                    {/* todo: profile */}
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.profile || ''}
                                        />
                                    </td>
                                    {/* todo: collection */}
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.design_collection
                                                || ''}

                                        />
                                    </td>
                                    {/* todo: highlight */}
                                    <td className='text-lg' >
                                        <select name="" id="" value={selectedHighlight} onChange={handleHighlight}>
                                            <option value="">select</option>
                                            <option value="">mosaic</option>
                                            <option value="">Charcoal</option>
                                        </select>
                                    </td>
                                    {/* todo match customer */}
                                    <td className='text-lg'>
                                        <select name="" id="">
                                            <option value="">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </td>
                                    {/* todo lock */}
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.loock_type || ''}
                                        />
                                    </td>
                                    {/* todo soft closing */}
                                    <td className='text-lg'>
                                        <select name="" id="">
                                            <option value="">0</option>
                                            <option value="">2</option>
                                            <option value="">4</option>
                                        </select>
                                    </td>
                                    <td className='text-lg'>
                                        <input type="number" className='w-20 border' />
                                    </td>
                                    <td className='text-lg'>
                                        <input type="number" className='w-20 border' />
                                    </td>
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.door_pr_set
                                                || ''}

                                        />
                                    </td>
                                    {/* todo mbr */}
                                    <td className='text-lg'>
                                        <input type="text"
                                            className='w-full px-2 text-lg'
                                            value={selectedCustomerData?.[0]?.room
                                                || ''}

                                        />
                                    </td>
                                    <td className='text-lg'>
                                        <input type="number" className='w-20 border' />

                                    </td>
                                    <td className='text-lg'>
                                        <input type="number" className='w-20 border' />
                                    </td>
                                    <td className='text-lg'>
                                        <input type="number" className='w-20 border' />
                                    </td>
                                    <td className='text-lg'>
                                        <input type="number" className='w-20 border' />
                                    </td>
                                </tr>
                                {/* <tr className=''>
                                    <td className='text-lg'>2</td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>SL722-01/22</td>
                                    <td className='text-lg'>slidding shutte</td>
                                    <td className='text-lg'>Duke</td>
                                    <td className='text-lg'>Szafir AG</td>
                                    <td className='text-lg'>Vibrant AG</td>
                                    <td className='text-lg'>Vibrant AG</td>
                                    <td className='text-lg'>No</td>
                                    <td className='text-lg'>1</td>
                                    <td className='text-lg'>4</td>
                                    <td className='text-lg'>2714</td>
                                    <td className='text-lg'>2514</td>
                                    <td className='text-lg'>1</td>
                                    <td className='text-lg'>MBR 3</td>
                                    <td className='text-lg'>1,59,897</td>
                                    <td className='text-lg'>1,20,200</td>
                                    <td className='text-lg'>18,213</td>
                                    <td className='text-lg'>1,22,454</td>
                                </tr> */}
                                <tr className=''>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                </tr>
                                <tr className=''>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                </tr>
                                <tr className=''>
                                    <td className='text-lg'>Total</td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>3,23,234</td>
                                </tr>
                                <tr className=''>
                                    <td className='text-lg'>Advance</td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>2,00,000</td>
                                </tr>
                                <tr className=''>
                                    <td className='text-lg'>Due Balance</td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'></td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>-</td>
                                    <td className='text-lg'>1,85,000</td>
                                </tr>
                                <tr>
                                    <td colspan="19" className='text-center text-lg font-bold'>Advance Details</td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Amount</td>
                                    <td colspan="18" className='text-end text-lg'>200000</td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Cheque No</td>
                                    <td colspan="18" className='text-end text-lg'>Deposit</td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Date</td>
                                    <td colspan="18" className='text-end text-lg'>13-dec-2023</td>
                                </tr>
                                {/* requested by */}
                                <tr>
                                    <td colspan="19" className='text-center text-lg font-bold'>Requested By</td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Name</td>
                                    <td colspan="18" className='text-end text-lg'>Srinivas B</td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Role</td>
                                    <td colspan="18" className='text-end text-lg'>Business Development Manager</td>
                                </tr>
                                <tr>
                                    <td colspan="19" className='text-center text-lg font-bold'> </td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Expected Date of delivery</td>
                                    <td colspan="18" className='text-end text-lg'>17-dec-2023</td>
                                </tr>
                                <tr>
                                    <td className='text-lg'>Installation note</td>
                                    <td className='text-end text-lg' colspan="18">17-dec-2023</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </>

    )
}

export default OPR