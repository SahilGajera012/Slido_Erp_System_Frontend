import React, { useEffect, useState } from 'react'
import MaterialOption from './MaterialOption';
import Profiles from './Profiles';
import axios from 'axios';

function Quatation() {
    // todo state management
    const [userData, setUserData] = useState({
        Customer_name: '',
        Location_Name: '',
        Date: '',
        Number_of_Door: '',
        Width: '',
        Height: '',
        Pattern: '',
        panelText: [],
        profileData: {
            selectedMaterial: '',
            selectedProject: '',
        },
        total_cost: ''
    });

    const [selectedProfile, setSelectedProfile] = useState('');

    const handleUserDataChange = (field, value) => {
        setUserData(prevData => ({
            ...prevData,
            [field]: value,
            Pattern: selectedPattern
        }));
        console.log(userData);
    };
    const handlePanelTextChange = (panelTextData) => {
        setUserData(prevData => ({
            ...prevData,
            panelText: panelTextData
        }));
    };
    const [selectedPattern, setSelectedPattern] = useState("AJAX");
    const handlePatternChange = (pattern) => {
        setSelectedPattern(pattern);
        console.log('Selected Pattern:', pattern);
    };
    const [Number_of_Door, setSelectedDoors] = useState("");
    const handleDoorsChange = (doors) => {
        setSelectedDoors(doors);
        // Use the updater function to ensure you log the updated state
        setSelectedDoors((prevDoors) => {
            // Update the userData state here
            setUserData((prevUserData) => ({
                ...prevUserData,
                Number_of_Door: prevDoors // Update the Number_of_Door field in userData
            }));
            console.log("doors", doors);
        });
    }



    const handleQuotation = () => {
        const userDataWithPattern = {
            ...userData,
            Pattern: selectedPattern,
            total_cost: totalCost.toFixed(2)
            // Add the selected pattern to userData
        };

        axios.post('http://localhost:8000/api/quotation', userDataWithPattern)
            .then(response => {
                console.log('Quotation submitted successfully:', response.data);
            })
            .catch(err => { console.log(err) });

        console.log("quotation 123", userDataWithPattern);

        setUserData(
            {
                Customer_name: '',
                Location_Name: '',
                Date: '',
                Number_of_Door: '',
                Width: '',
                Height: '',
                Pattern: '',
                panelText: [],
                selectedMaterial: '',
                selectedProject: '',
                total_cost: ''
            }
        )
    }

    // const handleProfileChange = (material, project) => {
    //     setSelectedProfile(project);
    //     console.log(selectedProfile, "sccsc");
    //     setUserData(prevData => ({
    //         ...prevData,
    //         selectedMaterial: material,
    //         selectedProject: project
    //     }));
    // };


    const handleProfileChange = (material, project) => {
        setSelectedProfile(project);
        console.log(selectedProfile, "sccsc");
        setUserData(prevData => ({
            ...prevData,
            profileData: {
                selectedMaterial: material,
                selectedProject: project
            }
        }));
    };

    // todo search functionality
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (userData.Customer_name.length > 0) {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [userData.Customer_name]);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/allCustomer`, {
                params: {
                    query: userData.Customer_name
                }
            });
            setSuggestions(response.data.data.map(customer => customer.name));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };


    const handleSuggestionSelect = async (selectedSuggestion) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/allCustomer`, {
                params: {
                    query: selectedSuggestion
                }
            });
            const selectedCustomer = response.data.data[0];
            const { dealer_address, pincode, city } = selectedCustomer;
            const Address = `${dealer_address}, ${pincode}, ${city}`;
            // console.log(Address, "adsdads");
            // console.log('Selected Customer Location:', selectedCustomer);

            setUserData(prevData => ({
                ...prevData,
                Customer_name: selectedSuggestion,
                Location_Name: Address
            }));

            setSuggestions([]);
        } catch (error) {
            console.error('Error fetching selected customer:', error);
        }
    };

    // todo for Date
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10);
        setUserData(prevData => ({
            ...prevData,
            Date: formattedDate // Change 'date' to 'Date'
        }));
    }, []);



    // todo costing area
    const [totalCost, setTotal_cost] = useState(0);
    console.log(userData.panelText, "pattern");

    const handleCost = () => {
        if (selectedPattern === 'AJAX') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    setTotal_cost(((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]);
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    setTotal_cost(((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2));
                }

            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    setTotal_cost(((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]);
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    setTotal_cost(((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2));
                }
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1602,
                    'SMF-2': 1720,
                    'SMF-3': 1823,
                    'SMF-4': 2052,
                    'SMF-5': 2180,
                    'SMF-6': 2427,
                    'SMF-7': 3880
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    setTotal_cost(((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]);
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    setTotal_cost(((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2));
                }
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    setTotal_cost(((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]);
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    setTotal_cost(((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2));
                }
            }


            // todo: BECK
        } else if (selectedPattern === 'BECK') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const materialOption1Door1 = userData.panelText[0][0];
                const materialOption2Door1 = userData.panelText[1][0];
                const materialOption1Door2 = userData.panelText[0][1];
                const materialOption2Door2 = userData.panelText[1][1];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                setTotal_cost(totalCost);
                // todo lux and flora
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const materialOption1Door1 = userData.panelText[0][0];
                const materialOption2Door1 = userData.panelText[1][0];
                const materialOption1Door2 = userData.panelText[0][1];
                const materialOption2Door2 = userData.panelText[1][1];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                setTotal_cost(totalCost);
                // todo szafir and lazuryt
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1602,
                    'SMF-2': 1720,
                    'SMF-3': 1823,
                    'SMF-4': 2052,
                    'SMF-5': 2180,
                    'SMF-6': 2427,
                    'SMF-7': 3880
                };

                const materialOption1Door1 = userData.panelText[0][0];
                const materialOption2Door1 = userData.panelText[1][0];
                const materialOption1Door2 = userData.panelText[0][1];
                const materialOption2Door2 = userData.panelText[1][1];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                setTotal_cost(totalCost);
                // todo: szafir ag and helio
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const materialOption1Door1 = userData.panelText[0][0];
                const materialOption2Door1 = userData.panelText[1][0];
                const materialOption1Door2 = userData.panelText[0][1];
                const materialOption2Door2 = userData.panelText[1][1];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                setTotal_cost(totalCost);
            }


            // todo: COKO 
        } else if (selectedPattern === 'COKO') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };
                const doorPanelOptions = userData.panelText[0];

                let totalCost = 0;

                for (let door1Panel of doorPanelOptions) {
                    for (let door2Panel of doorPanelOptions) {
                        const width = parseFloat(userData.Width);
                        const height = parseFloat(userData.Height);

                        const materialValue1 = materialOptionPrices[door1Panel];
                        const materialValue2 = materialOptionPrices[door2Panel];

                        const scenarioCost = ((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2);
                        totalCost = scenarioCost;
                    }
                }

                setTotal_cost(totalCost);
                // todo flora and lux
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const doorPanelOptions = userData.panelText[0];

                let totalCost = 0;

                for (let door1Panel of doorPanelOptions) {
                    for (let door2Panel of doorPanelOptions) {
                        const width = parseFloat(userData.Width);
                        const height = parseFloat(userData.Height);

                        const materialValue1 = materialOptionPrices[door1Panel];
                        const materialValue2 = materialOptionPrices[door2Panel];

                        const scenarioCost = ((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2);
                        totalCost = scenarioCost;
                    }
                }

                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1602,
                    'SMF-2': 1720,
                    'SMF-3': 1823,
                    'SMF-4': 2052,
                    'SMF-5': 2180,
                    'SMF-6': 2427,
                    'SMF-7': 3880
                };

                const doorPanelOptions = userData.panelText[0]; // Assuming both doors have the same panel options

                let totalCost = 0;

                for (let door1Panel of doorPanelOptions) {
                    for (let door2Panel of doorPanelOptions) {
                        const width = parseFloat(userData.Width);
                        const height = parseFloat(userData.Height);

                        const materialValue1 = materialOptionPrices[door1Panel];
                        const materialValue2 = materialOptionPrices[door2Panel];

                        const scenarioCost = ((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2);
                        totalCost = scenarioCost;
                    }
                }

                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };

                const doorPanelOptions = userData.panelText[0]; // Assuming both doors have the same panel options

                let totalCost = 0;

                for (let door1Panel of doorPanelOptions) {
                    for (let door2Panel of doorPanelOptions) {
                        const width = parseFloat(userData.Width);
                        const height = parseFloat(userData.Height);

                        const materialValue1 = materialOptionPrices[door1Panel];
                        const materialValue2 = materialOptionPrices[door2Panel];

                        const scenarioCost = ((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2);
                        totalCost = scenarioCost;
                    }
                }

                setTotal_cost(totalCost);
            }

            // todo duke 
        } else if (selectedPattern === 'DUKE') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };
                let totalCost = 0;


                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 8) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                let totalCost = 0;
                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 8) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                let totalCost = 0;
                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 8) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                let totalCost = 0;
                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 8) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            }
            // todo: EROS
        } else if (selectedPattern === 'EROS') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };
                let totalCost = 0;


                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 10) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                let totalCost = 0;
                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 10) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                let totalCost = 0;
                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 10) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                let totalCost = 0;
                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                let totalMaterialCost = 0;

                for (let panel of door1PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                for (let panel of door2PanelOptions) {
                    totalMaterialCost = materialOptionPrices[panel];
                }

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const scenarioCost = (totalArea / 10) * totalMaterialCost;
                totalCost = scenarioCost;
                setTotal_cost(totalCost);
            }
            // todo: FILO
        } else if (selectedPattern === 'FILO') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0];
                const door2PanelOptions = userData.panelText[1];


                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost1Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost2Door1 + materialCost2Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };


                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options


                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door1PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost1Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost2Door1 + materialCost2Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost1Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost2Door1 + materialCost2Door2));
                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };


                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost1Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost2Door1 + materialCost2Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
            // todo: GINO
        } else if (selectedPattern === 'GINO') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost3Door1 + materialCost2Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost3Door1 + materialCost2Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost3Door1 + materialCost2Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost3Door1 + materialCost2Door2 + materialCost3Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
            // todo: HERO
        } else if (selectedPattern === 'HERO') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2 + materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2 + materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2 + materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2 + materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
            // todo: IBEX
        } else if (selectedPattern === 'IBEX') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);


                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);


                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);


                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost2Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost1Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
            // todo: JAZZ
        } else if (selectedPattern === 'JAZZ') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost1Door1 + materialCost2Door2 + materialCost1Door2)) +
                    (largePanelArea * (materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost1Door1 + materialCost2Door2 + materialCost1Door2)) +
                    (largePanelArea * (materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost1Door1 + materialCost2Door2 + materialCost1Door2)) +
                    (largePanelArea * (materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost1Door1 + materialCost2Door2 + materialCost1Door2)) +
                    (largePanelArea * (materialCost3Door1 + materialCost3Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
            // todo: KENO
        } else if (selectedPattern === 'KENO') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost2Door2 + materialCost4Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost2Door2 + materialCost4Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost2Door2 + materialCost4Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost2Door2 + materialCost4Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
            // todo: LULU
        } else if (selectedPattern === 'LULU') {
            if (userData.selectedMaterial === 'LARA') {
                const materialOptionPrices = {
                    'SMF-1': 1075,
                    'SMF-2': 1193,
                    'SMF-3': 1296,
                    'SMF-4': 1525,
                    'SMF-5': 1653,
                    'SMF-6': 1900,
                    'SMF-7': 3553,
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost6Door1 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost6Door2 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost7Door1 = materialOptionPrices[door2PanelOptions[6]];
                const materialCost7Door2 = materialOptionPrices[door2PanelOptions[6]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost6Door1 + materialCost2Door2 + materialCost4Door2 + materialCost6Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2 + materialCost7Door1 + materialCost7Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'LUX' || userData.selectedMaterial === 'FLORA') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost6Door1 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost6Door2 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost7Door1 = materialOptionPrices[door2PanelOptions[6]];
                const materialCost7Door2 = materialOptionPrices[door2PanelOptions[6]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost6Door1 + materialCost2Door2 + materialCost4Door2 + materialCost6Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2 + materialCost7Door1 + materialCost7Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR' || userData.selectedMaterial === 'LAZURYT') {
                const materialOptionPrices = {
                    'SMF-1': 1154,
                    'SMF-2': 1272,
                    'SMF-3': 1375,
                    'SMF-4': 1604,
                    'SMF-5': 1732,
                    'SMF-6': 1979,
                    'SMF-7': 3432
                };

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost6Door1 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost6Door2 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost7Door1 = materialOptionPrices[door2PanelOptions[6]];
                const materialCost7Door2 = materialOptionPrices[door2PanelOptions[6]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost6Door1 + materialCost2Door2 + materialCost4Door2 + materialCost6Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2 + materialCost7Door1 + materialCost7Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            } else if (userData.selectedMaterial === 'SZAFIR AG(Gold)' || userData.selectedMaterial === 'HELIO') {
                const materialOptionPrices = {
                    'SMF-1': 1744,
                    'SMF-2': 1862,
                    'SMF-3': 1965,
                    'SMF-4': 2194,
                    'SMF-5': 2322,
                    'SMF-6': 2569,
                    'SMF-7': 4022
                };
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);

                let totalCost = 0;

                const door1PanelOptions = userData.panelText[0]; // Assuming door 1 panel options
                const door2PanelOptions = userData.panelText[1]; // Assuming door 2 panel options

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                const materialCost1Door1 = materialOptionPrices[door1PanelOptions[0]];
                const materialCost3Door1 = materialOptionPrices[door1PanelOptions[2]];
                const materialCost1Door2 = materialOptionPrices[door2PanelOptions[0]];
                const materialCost3Door2 = materialOptionPrices[door2PanelOptions[2]];
                const materialCost2Door1 = materialOptionPrices[door1PanelOptions[1]];
                const materialCost2Door2 = materialOptionPrices[door2PanelOptions[1]];
                const materialCost4Door1 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost4Door2 = materialOptionPrices[door2PanelOptions[3]];
                const materialCost5Door1 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost5Door2 = materialOptionPrices[door2PanelOptions[4]];
                const materialCost6Door1 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost6Door2 = materialOptionPrices[door2PanelOptions[5]];
                const materialCost7Door1 = materialOptionPrices[door2PanelOptions[6]];
                const materialCost7Door2 = materialOptionPrices[door2PanelOptions[6]];

                totalCost = (smallPanelArea * (materialCost2Door1 + materialCost4Door1 + materialCost6Door1 + materialCost2Door2 + materialCost4Door2 + materialCost6Door2)) +
                    (largePanelArea * (materialCost1Door1 + materialCost3Door1 + materialCost5Door1 + materialCost1Door2 + materialCost3Door2 + materialCost5Door2 + materialCost7Door1 + materialCost7Door2));


                setTotal_cost(totalCost);
                console.log('Total Cost:', totalCost);
            }
        }
    }
    useEffect(() => {
        console.log(totalCost); // Log the updated total_cost
    }, [totalCost]);


    return (
        <div className="container min-w-full grid gap-y-5 ">
            <h1 className='text-2xl font-bold text-center underline'>Create Quotation</h1>
            {/* todo user */}
            <div className='text-xl p-5 border rounded-lg shadow-lg'>

                <div className="grid grid-cols-3  pb-5 ">
                    <div className='col-span-3'>
                        <h2 className='font-bold border-b border-gray-300 mb-5'>User Information</h2>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p>Customer Name:</p>
                        <input
                            type="text"
                            className='border p-1 rounded-md border-black'
                            placeholder="Search by name..."
                            onChange={(e) => handleUserDataChange('Customer_name', e.target.value)}
                            value={userData.Customer_name}
                        />
                    </div>

                    <div className='flex flex-col justify-start items-start'>
                        <p>Address:</p>
                        <textarea name="" id="" cols="30" rows="10"
                            onChange={(e) => handleUserDataChange('Location_Name', e.target.value)}
                            value={userData.Location_Name}
                            className='h-14 border border-black rounded-md'>
                        </textarea>
                    </div>

                    <div className='flex flex-col justify-start items-start'>
                        <p>Date</p>
                        <input
                            type="date"
                            className='border p-1 rounded-md border-black'
                            value={userData.Date}
                            onChange={(e) => handleUserDataChange('Date', e.target.value)}
                        />
                    </div>
                    <div className="col-span-3">
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* todo size selection */}
                <div className="grid grid-cols-3 gap-5 pb-5  " >
                    <div className='col-span-3'>
                        <h2 className='font-bold border-b-2'>Enter Dimension</h2>
                    </div>
                    {/* <div className='flex flex-col justify-start items-start'>
                        <p>Number Of Door:</p>
                        <select name="" id="" className='border p-1 rounded-md border-black' value={userData.Number_of_Door}
                            onChange={(e) => handleUserDataChange('Number_of_Door', e.target.value)}>
                            <option value=""></option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div> */}
                    <div className='flex flex-col justify-start items-start'>
                        <p>Width(mm):</p>
                        <input
                            type="text"
                            className='border p-1 rounded-md border-black'
                            value={userData.Width}
                            onChange={(e) => handleUserDataChange('Width', e.target.value)}
                        />
                        <div>
                            <p className='text-xs' > (Range : 1200 mm to 2370 mm)</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p>Heigh(mm):</p>
                        <input
                            type="text"
                            className='border p-1 rounded-md border-black'
                            value={userData.Height}
                            onChange={(e) => handleUserDataChange('Height', e.target.value)}
                        />
                        <div>
                            <p className='text-xs'>(Range : 600 mm to 2700 mm)</p>
                        </div>
                    </div>
                </div >
                <div>
                    <MaterialOption onPanelTextChange={handlePanelTextChange} onPatternChange={handlePatternChange} onDoorsChange={handleDoorsChange} />
                </div>
                {/* todo Profiles section*/}
                <div className='pb-5 '>
                    <div className='mb-5'>
                        <h2 className='font-bold border-b-2'>Select Profile</h2>
                    </div>
                    <Profiles
                        selectedMaterial={userData.selectedMaterial}
                        selectedProject={userData.selectedProject}
                        onProfileChange={handleProfileChange}
                    />
                </div>

                {/* todo: costing table*/}
                <div className='flex  justify-end items-center mb-10'>
                    <div className='flex justify-start items-center me-5'>
                        <p className=''>MRP Price(INR):</p>
                        <p className='ms-5 border px-3 border-black rounded-lg'>&#8377;{(totalCost) + (8000)}
                        </p>
                    </div>
                    <button onClick={handleCost} className='border border-black rounded-md px-3 bg-green-300'>Estimated Cost</button>
                </div>

                <div className='flex justify-end items-center'>
                    <button className='border p-2 border-black  rounded-md px-3 bg-[#808080] text-white' onClick={handleQuotation}>Add Quotation</button>
                </div>
            </div>

        </div >
    )
}

export default Quatation;