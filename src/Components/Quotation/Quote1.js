import React, { useEffect, useState } from 'react'
import "../Style.css";
import { Modal } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfImg from './Image/pdfImage.png'

// todo: in modal, there are need to do change in input field

function Quote1() {
    //add customer
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };


    const [quotation, setQuotaion] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:8000/api/viewQuote")
            .then(res => {
                setQuotaion(res.data.data);
                console.log(res.data.data, "quotation");
            })
            .catch(err => {
                console.error('error fetching data:', err);
            });
    }
    const handleRefreshClick = () => {
        setFilterData("");
        setFilteredData([]);
        fetchData();
    }

    console.log(quotation, "quotation");


    // filter
    const [filteredData, setFilteredData] = useState([]);
    const [filterData, setFilterData] = useState("");


    const handleFilter = () => {
        if (filterData.trim() === "") {
            setFilteredData([]);
        } else {
            const filteredCustomers = quotation.filter(
                customer =>
                    (customer.Customer_name && customer.Customer_name.toLowerCase().includes(filterData.toLowerCase()))

            );
            setFilteredData(filteredCustomers);
        }
    };

    // Modify the handlePDF function to check if panelText exists
    const handlePDF = (quotationData) => {
        const pdf = new jsPDF();

        const concatenateUserData = (quotationData) => {
            let description = '';

            description += `Pattern: ${quotationData.Pattern}\n`;
            description += `Panel: ${quotationData.panelText}\n`;
            description += `Material: ${quotationData.selectedMaterial}\n`;

            return description;
        };
        const concatenateUserDimension = (quotationData) => {
            let description = '';

            description += `${quotationData.Width}(mm)Width\n`;
            description += `${quotationData.Height}(mm)Height\n`;

            return description;
        };

        // Define the table columns and data for Project Details
        const projectDetailsColumns = ['Description', 'Dimension', 'MRP price(INR)', 'Discounted Price(INR) 35%' /* Add more columns as needed */];
        const projectDetailsData = [
            [concatenateUserData(quotationData), concatenateUserDimension(quotationData), quotationData.total_cost /* Add more data fields as needed */],
            // Add more rows as needed
        ];

        // Add a title to the PDF
        pdf.text('Quotation Details', 10, 10);

        // Manually control the positioning of Project Details
        pdf.autoTable({
            head: [projectDetailsColumns],
            body: projectDetailsData,
        });
        const projectDetailsY = pdf.autoTable.previous.finalY + 10;

        // Manually control the positioning of Terms & Conditions
        pdf.text('Terms & Conditions:', 10, projectDetailsY);
        const termsAndConditions = [
            '1. Prices are inclusive of taxes',
            '2. Quotation valid 7 working days.',
            '3. 50% advance payment to be made to place the order & Balance amount to be paid before delivery.',
            '4. Delivery within 15 working days from the date of advance receipt and confirmation of specifications.',
            '5. Specifications (Insert materials, Sizes) cannot be changed once approved since every order is custom made.',
            '6. Outside Hyderabad city - sliding door Installation charges are extra on actuals.',
            '7. The company is not responsible for any damage of insert materials supplied by the buyer during transportation, fabrication & installation of goods.',
            '8. Dispatch of goods from the factory will be done in 24 hours after the final payment is received by us.',
        ];

        pdf.setFontSize(10);
        pdf.text(termsAndConditions, 10, projectDetailsY + 10);

        // Manually control the positioning of Payment Details
        pdf.setFontSize(16);
        pdf.text('Payment Details:', 10, pdf.internal.pageSize.height - 200);
        const paymentDetails = [
            'Payee Name: SLIDO',
            'Current Account No: 50200037101691 | IFSC Code: HDFC0004277',
            'Bank: HDFC | Branch: Madhapur | City: Hyderabad',
        ];

        pdf.setFontSize(10);
        pdf.text(paymentDetails, 10, pdf.internal.pageSize.height - 192);

        // Manually control the positioning of Address
        pdf.setFontSize(16);
        const Address = [
            'SLIDO',
            'Gayatri Heights, 1st floor, Plot No. 9, Survey No. 11/17, Jaihind Enclave, Jaihind Gandhi Road, Ayyapa Society, Madhapur, Hyderabad, Telangana 500081',
            'Mob: +91 9676551234 | Email: info@slido.in',
        ];

        pdf.setFontSize(10);
        pdf.text(Address, 10);
      
        // Add an image below the address
        // pdf.addImage(imgData, 'PNG', 10, pdf.internal.pageSize.height - 150, 80, 40); // Adjust the coordinates and dimensions for the image

        // Save or open the PDF
        pdf.save('quotation.pdf');
    };




    const [selectedOption123, setSelectedOption] = useState('');

    const handleChangeOption = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div className="container min-w-full">
            <div className="grid ">
                <div className="grid grid-cols-4 gap-5 p-4">
                    <Link to="/">
                        <div className='flex justify-start items-center hover:text-[#1b98f5]'>
                            <i class="fa fa-arrow-left me-2" aria-hidden="true"></i>
                            <p className='text-xl font-medium'>Quote</p>
                        </div>
                    </Link>
                    <div>
                        <div className='flex justify-start items-center'>
                            <input type="text" className='border-2 p-2 w-full rounded-sm focus:border-[#1b98f5] outline-none' value={filterData}
                                onChange={(e) => setFilterData(e.target.value)} name="pincode" />
                            <button className='border-2 p-2  rounded-sm focus:border-[#1b98f5] outline-none' onClick={handleFilter}>Filter</button>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>(Filter by Name)</p>
                        </div>
                    </div>
                    <div>
                        <button className='text-black px-3 shadow-md py-1 rounded-md border hover:border-[#1b98f5]' onClick={handleRefreshClick}>Refresh</button>
                    </div>
                    <div>
                        <Link to="/addNewQuote">
                            <button className='text-black px-3 shadow-md py-1 rounded-md border bg-[#1b98f5] text-white' onClick={showModal1}>+ Add New Quotation</button>
                        </Link>
                        <Modal title="Add New Payment" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                            <div className="grid grid-cols-1 gap-3">

                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <p>Number</p>
                                        <input type="text" className='border w-full rounded-sm' />
                                    </div>
                                    <div>
                                        <p>Date</p>
                                        <input type="text" className='border w-full rounded-sm' />
                                    </div>


                                </div>


                                <div className="grid grid-cols-1 gap-2">
                                    <div>
                                        <p>Amount</p>
                                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>


                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <p>Payment Mode</p>
                                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>

                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <p>Reference</p>
                                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>

                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <p>Description</p>
                                        <textarea type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>


                            </div>
                        </Modal>
                    </div>
                </div>

                <div className='drawer bg-white p-5 rounded-md overflow-x-scroll  border hover:shadow-md'>
                    <table className='w-full '>
                        <thead>
                            <tr className='bg-[#f6f6f6] text-lg font-light text-black'  >
                                <th className='py-5 text-start border-e  px-1'>Customer Name</th>
                                <th className='py-2 text-start border-e  px-1'>Location Name</th>
                                <th className='py-2 text-start border-e  px-1'>Date</th>
                                <th className='py-2 text-start border-e  px-1'>Number of Door</th>
                                <th className='py-2 text-start border-e  px-1'>Width(mm)</th>
                                <th className='py-2 text-start border-e  px-1'>Height(mm)</th>
                                <th className='py-2 text-start border-e  px-1'>Pattern</th>
                                <th className='py-2 text-start border-e  px-1'>Panel Text</th>
                                <th className='py-2 text-start border-e  px-1'>Profile</th>
                                <th className='py-2 text-start border-e  px-1'>Total Cost</th>
                                <th className='py-2 text-start border-e  px-1'>Generate Quatation</th>

                            </tr>
                        </thead>
                        {(filteredData.length > 0 ? filteredData : quotation).map((quotation, index) =>
                            <tr key={index} className='border-b'>
                                <td className='text-lg py-4'>{quotation.Customer_name}</td>
                                <td className='text-lg py-4'>{quotation.Location_Name}</td>
                                <td className='text-lg py-4'>{quotation.Date}</td>
                                <td className='text-lg py-4 px-3'> {quotation.Number_of_Door}</td>
                                <td className='text-lg py-4'>{quotation.Width}</td>
                                <td className='text-lg py-4'>{quotation.Height}</td>
                                <td className='text-lg py-4'>{quotation.Pattern}</td>
                                <td className='text-lg py-4'>
                                    {Array.isArray(quotation.panelText) &&
                                        quotation.panelText.map((nestedArray, doorIndex) => (
                                            <div key={doorIndex}>
                                                <h2>Door {doorIndex + 1}</h2>
                                                {Array.isArray(nestedArray) &&
                                                    nestedArray.map((item, panelIndex) => (
                                                        <p key={panelIndex}>Panel {panelIndex + 1}: {item}</p>
                                                    ))}
                                            </div>
                                        ))}
                                </td>

                                <td className='text-lg py-4'>{quotation.selectedSubOption}</td>
                                <td className='text-lg py-4'>{quotation.total_cost}</td>
                                <td className='text-lg py-4'>
                                    <button className='px-3 py-1 bg-lime-500 rounded-md' onClick={() => handlePDF(quotation)}>Generate</button>
                                </td>
                            </tr>)}
                    </table>

                    <div className='flex justify-end items-center my-3'>
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Quote1