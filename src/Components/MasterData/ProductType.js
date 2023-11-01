import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useEffect and useState

function ProductType() {
    const [name, setProductType] = useState('');
    const [productTypes, setProductTypes] = useState([]); // Renamed state variable

    const handleAdd = () => {
        // Check if the product type with the same name already exists
        if (productTypes.some(productType => productType.name === name)) {
            console.error('Product type with the same name already exists.');
            return;
        }

        axios.post(`http://localhost:8000/api/product`, { name })
            .then(response => {
                console.log('Post successful', response);
                setProductType('');
            })
            .catch(error => {
                console.error('Error posting data', error);
            });
    };


    useEffect(() => {
        axios.get("http://localhost:8000/api/product")
            .then(res => {
                console.log(res.data.data);
                setProductTypes(res.data.data); // Update state variable
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    return (
        <div className="container min-w-full">
            <div className="grid grid-cols-2 gap-5 ">
                <div className='border-2 p-5 shadow-md'>
                    <input type="text" className='px-2 py-1 rounded-md w-full border border-black outline-none ' placeholder='add product type' value={name} onChange={(e) => setProductType(e.target.value)} /><br /><br />
                    <button className='border-2 px-2 py-1 rounded-md border-black min-w-[200px]' onClick={handleAdd}>Add Product Type</button>
                </div>

                <div className='border-2 p-5 shadow-md'>
                    <table>
                        <tbody> {/* Add tbody wrapper */}
                            <tr>
                                <th>Added product Type</th>
                            </tr>
                            {productTypes.map((productType, index) => (
                                <tr key={index} className='text-xl'>
                                    <td className='text-xl'>{productType.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductType;
