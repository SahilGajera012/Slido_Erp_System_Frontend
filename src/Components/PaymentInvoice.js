import React, { useState } from 'react'
import "./Style.css";
import { Modal } from 'antd';
import { Pagination } from 'antd';


// todo: in modal, there are need to changes in input field

function PaymentInvoice() {
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
          <div className='flex justify-start items-center'>
            <i class="fa fa-arrow-left me-2" aria-hidden="true"></i>
            <p className='text-xl font-medium'>Invoice</p>
          </div>
          <div></div>
          <div></div>
          <div>
            <button className='text-black px-3 shadow-md py-1 rounded-md border hover:border-[#1b98f5]'>Refresh</button>
          </div>
          <div>
            <button className='text-black px-3 shadow-md py-1 rounded-md border hover:border-[#1b98f5]' onClick={showModal1}>+ Add New Payment</button>
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
                    <input type="text" className='border w-full rounded-sm' />
                  </div>

                </div>


                <div className='grid grid-cols-1 gap-2'>

                  <div>
                    <p>Payment Mode</p>
                    <input type="text" className='border w-full rounded-sm' />
                  </div>

                </div>

                <div className='grid grid-cols-1 gap-2'>

                  <div>
                    <p>Reference</p>
                    <input type="text" className='border w-full rounded-sm' />
                  </div>

                </div>

                <div className='grid grid-cols-1 gap-2'>

                  <div>
                    <p>Description</p>
                    <textarea type="text" className='border w-full rounded-sm' />
                  </div>

                </div>


              </div>
            </Modal>
          </div>
          {/* <div>
            <button className='bg-[#1b98f5] px-3 py-1 shadow-md rounded-md text-white' onClick={showModal2}>Add new Business</button>
            <Modal title="Basic Modal" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
              <div className="grid grid-cols-1 gap-3">

                <div>
                  <p>company Name</p>
                  <input type="text" className='border w-full rounded-sm' />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p>Sur-Name</p>
                    <input type="text" className='border w-full rounded-sm' />
                  </div>
                  <div>
                    <p>Name</p>
                    <input type="text" className='border w-full rounded-sm' />
                  </div>
                </div>
                <div>
                  <p>Phone</p>
                  <input type="text" className='border w-full rounded-sm' />
                </div>
                <div>
                  <p>Email</p>
                  <input type="text" className='border w-full rounded-sm' />
                </div>

              </div>
            </Modal>
          </div> */}

        </div>

        <div className=''>
          <table className='w-full border '>
            <tr className=' bg-[#cfcfcf] text-white'>
              <th>Number</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Invoice Number</th>
              <th>Invoice Year</th>
              <th>Payment Mode</th>

            </tr>
            <tr>
              <td>Test User</td>
              <td>Test</td>
              <td>User</td>
              <td>Test@email.com</td>
              <td>Test User</td>
              <td>Test</td>
              <td>User</td>

            </tr>
            <tr>
              <td>Test User</td>
              <td>Test</td>
              <td>User</td>
              <td>Test@email.com</td>
              <td>Test User</td>
              <td>Test</td>
              <td>User</td>

            </tr>
            <tr>
              <td>Test User</td>
              <td>Test</td>
              <td>User</td>
              <td>Test@email.com</td>
              <td>Test User</td>
              <td>Test</td>
              <td>User</td>

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

export default PaymentInvoice