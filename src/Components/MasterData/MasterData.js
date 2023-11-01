import React from 'react'
import { Link } from 'react-router-dom'

function MasterData() {
    return (
        <>
            <div className="container min-w-full">
                <p className='text-2xl font-bold border-b border-black mb-5'>Master Data</p>
                <div className="grid grid-cols-3 gap-10">
                    <Link to="/productTypeMD">
                        <div className=' rounded-md border border-black text-2xl  flex justify-center items-center shadow-md font-bold p-1 h-[100px]'>
                            <p>Product Type</p>
                        </div>
                    </Link>

                    <Link to="/profileMD">
                        <div className=' rounded-md border border-black text-2xl  flex justify-center items-center shadow-md font-bold p-1 h-[100px]'>
                            <p>Profile</p>
                        </div>
                    </Link>

                    <Link to="/patternMD">
                        <div className=' rounded-md border border-black text-2xl  flex justify-center items-center shadow-md font-bold p-1 h-[100px]'>
                            <p>Pattern</p>
                        </div>
                    </Link>

                    <Link to="/roomMD">
                        <div className=' rounded-md border border-black text-2xl  flex justify-center items-center shadow-md font-bold p-1 h-[100px]'>
                            <p>Room</p>
                        </div>
                    </Link>

                    <Link to="/designMD">
                        <div className=' rounded-md border border-black text-2xl  flex justify-center items-center shadow-md font-bold p-1 h-[100px]'>
                            <p>Design</p>
                        </div>
                    </Link>

                    <Link to="/insertMD">
                        <div className=' rounded-md border border-black text-2xl  flex justify-center items-center shadow-md font-bold p-1 h-[100px]'>
                            <p>Inserts</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MasterData