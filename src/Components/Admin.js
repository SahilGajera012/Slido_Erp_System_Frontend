import React, { useState } from 'react'
import "./Style.css";
import { Modal } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';


// todo: in modal, there are need to changes in input field

function Admin() {
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


    return (
        <div className="container min-w-full">
            <div className="grid bg-white p-5 rounded-md shadow-md border hover:border-[#1b98f5]">
                <div className="grid grid-cols-5 p-4">
                    <Link to="/">
                        <div className='flex justify-start items-center hover:text-[#1b98f5]'>
                            <i class="fa fa-arrow-left me-2" aria-hidden="true"></i>
                            <p className='text-xl font-medium'>Admin</p>
                        </div>
                    </Link>
                    <div></div>
                    <div></div>
                    <div>
                        <button className='text-black px-3 shadow-md py-1 rounded-md border hover:border-[#1b98f5]'>Refresh</button>
                    </div>
                    <div>
                        <button className='text-black px-3 shadow-md py-1 rounded-md border hover:border-[#1b98f5]' onClick={showModal1}>+ Add New Admin</button>
                        <Modal title="Add New Payment" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                            <div className="grid grid-cols-1 gap-3">

                                <div className='grid grid-cols-1 gap-2'>
                                    <div>
                                        <p>Name</p>
                                        <input type="text" className='border w-full rounded-sm' />
                                    </div>
                                    <div>
                                        <p>Surname</p>
                                        <input type="text" className='border w-full rounded-sm' />
                                    </div>

                                    <div>
                                        <p>Email</p>
                                        <input type="date" className='border w-full rounded-sm' />
                                    </div>
                                    <div>
                                        <p>Password</p>
                                        <input type="password" className='border w-full rounded-sm' />
                                    </div>
                                    <div>
                                        <p>Role</p>
                                        <select name="" id="" className='border w-full rounded-sm'>
                                            <option value="">Finanace</option>
                                            <option value="">Manager</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>

                </div>

                <div className=''>
                    <table className='w-full border '>
                        <tr className=' bg-[#cfcfcf] text-white'>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        <tr>
                            <td>Test User</td>
                            <td>Test</td>
                            <td>User</td>
                            <td>Test@email.com</td>
                        </tr>
                        <tr>
                            <td>Test User</td>
                            <td>Test</td>
                            <td>User</td>
                            <td>Test@email.com</td>
                        </tr>
                    </table>

                    <div className='flex justify-end items-center my-3'>
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin