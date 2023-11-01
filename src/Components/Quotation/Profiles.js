import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profiles({ onProfileChange }) {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');


    const handleProjectChange = (event) => {
        const newSelectedProject = event.target.value;
        setSelectedProject(newSelectedProject);
        setSelectedSubOption(''); // Reset sub-option when main option changes

        const profileData = {
            selectedProject: newSelectedProject,
            selectedSubOption: '', // Initialize with an empty string, you can set it to the appropriate sub-option later
        };

        onProfileChange(profileData);
    };

    const subOptionsMap = {
        LUX: ["Grey", "Black", "Rosegold"],
        LARA: ["Black", "Brown", "Champange"],
        FLORA: ["Grey", "Brown", "Black", "Rosegold"],
        SZAFIR: ["Grey"],
        LAZURYT: ["Grey", "Brown"],
        HELIO: ["Grey"],
    };

    const subOptions = subOptionsMap[selectedProject] || [];

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/profile')
            .then(res => {
                const profileData = res.data.data;

                const projectsArray = [];

                profileData.forEach(item => {
                    if (item.profile1 && item.profile1 !== "") {
                        projectsArray.push(item.profile1);
                    }
                });

                setProjects(projectsArray);
            })
            .catch(err => {
                console.log("err", err);
            })
    }, []);

    return (
        <div className="container grid grid-cols-2 min-w-full">
            <div className='flex flex-col justify-start items-start'>
                <label htmlFor="projectSelect">Profile:</label>
                <select
                    id="projectSelect"
                    className='border border-black rounded-md p-1'
                    value={selectedProject}
                    onChange={handleProjectChange}
                >
                    <option value=""></option>
                    {projects.map((project, index) => (
                        <option key={index} value={project}>
                            {project}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {selectedProject && (
                    <div>
                        <label htmlFor="subOptionSelect">Color:</label><br />
                        <select
                            id="subOptionSelect"
                            className='border border-black rounded-md p-1'
                            value={selectedSubOption}
                            onChange={(event) => setSelectedSubOption(event.target.value)}
                        >
                            <option value=""></option>
                            {subOptions.map((subOption, index) => (
                                <option key={index} value={subOption}>
                                    {subOption}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profiles;
