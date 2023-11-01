import React, { useState } from 'react'
import GeneralSettings from './Settings/GeneralSettings'
import PaymentMode from './Settings/PaymentMode'
import Roles from './Settings/Roles'

function Settings() {

    const [selectedOption, setSelected] = useState(null);

    const RenderSelectedOption = () => {
        switch (selectedOption) {
            case 'option1':
                return <GeneralSettings />;
            case 'option2':
                return <PaymentMode />;
            case 'option3':
                return <Roles />;
            default:
                return null;
        }
    }

    return (
        <div className="container min-w-full bg-white p-5 rounded-md shadow-md  border  hover:border-[#1b98f5]">
            <div className="grid grid-cols-3 ">


                <div className='border p-2 hover:translate-y-[-2px]' onClick={() => setSelected('option1')}>
                    <p>General Settings</p>
                </div>
                <div className='border p-2 hover:translate-y-[-2px]' onClick={() => setSelected('option2')}>
                    <p>Payment Mode</p>
                </div>
                <div className='border p-2 hover:translate-y-[-2px]' onClick={() => setSelected('option3')}>
                    <p>Role</p>
                </div>

            </div>
            {RenderSelectedOption()}

        </div >
    )
}

export default Settings