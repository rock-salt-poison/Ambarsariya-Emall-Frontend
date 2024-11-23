import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Button2 from '../../Components/Home/Button2';
import gif from '../../Utils/gifs/community-people-dancing.gif';
import mail from '../../Utils/images/Serve/emotional/campaign/community/create_community/mail.png';
import sms from '../../Utils/images/Serve/emotional/campaign/community/create_community/sms.png';
import whatsapp from '../../Utils/images/Serve/emotional/campaign/community/create_community/whatsapp.png';
import linkedin from '../../Utils/images/Serve/emotional/campaign/community/create_community/linkedin.png';
import facebook from '../../Utils/images/Serve/emotional/campaign/community/create_community/facebook.png';
import social_media from '../../Utils/images/Serve/emotional/campaign/community/icon_1.webp';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import FormField from '../../Components/Form/FormField';
import contacts_img from '../../Utils/images/Serve/emotional/campaign/community/create_community/people-global-communication-illustration.webp';
import { Link } from 'react-router-dom';

function Discussion(props) {
    const themeProps = {
        popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
        scrollbarThumb: 'var(--brown)'
    };

    const theme = createCustomTheme(themeProps);

    const data = [
        { id: 1, imgSrc: mail, alt: 'mail' },
        { id: 2, imgSrc: sms, alt: 'sms' },
        { id: 3, imgSrc: whatsapp, alt: 'whatsapp' },
        { id: 4, imgSrc: linkedin, alt: 'linkedin' },
        { id: 5, imgSrc: facebook, alt: 'facebook' },
        { id: 6, imgSrc: social_media, alt: 'social media' },
    ];

    const contactsData = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Johnson" },
        { id: 4, name: "Emily Davis" },
        { id: 5, name: "William Brown" },
        { id: 6, name: "Olivia Wilson" },
        { id: 7, name: "James Taylor" },
        { id: 8, name: "Sophia Martinez" },
        { id: 9, name: "Benjamin Anderson" },
        { id: 10, name: "Charlotte Thomas" },
    ];

    const [contacts, setContacts] = useState([]);
    const [communityName, setCommunityName] = useState("Community");
    const [currentPage, setCurrentPage] = useState(0);
    const contactsPerPage = 4;

    const [formData, setFormData] = useState({
        community: '',
        create: '',
        topic: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    
        // Clear the error for the specific field if there's a value
        if (value) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };
    

    const validate = (data = formData) => {
        const newErrors = {};
        if (!data.community) newErrors.community = 'Community is required';
        if (data.community === "Create" && !data.create) newErrors.create = 'Community name is required';
        if (!data.topic) newErrors.topic = 'Topic is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const newCommunityName = formData.community === "Create" && formData.create 
                ? formData.create 
                : formData.community;
            setCommunityName(newCommunityName);
            setContacts(contactsData);
        }
    };

    const startIndex = currentPage * contactsPerPage;
    const displayedContacts = contacts.slice(startIndex, startIndex + contactsPerPage);

    const handleNext = () => {
        if (startIndex + contactsPerPage < contacts.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="discussion_wrapper">
                <Box className="row">
                    <Box className="col">
                        <Button2 text="Back" redirectTo={-1} />
                        <Link className="title_container" to="../emotional">
                            <Box component="img" src={gif} alt="community" className='title_gif' />
                            <Typography variant='h2' className='title'>{communityName}</Typography>
                        </Link>
                        <Button2 text="Next" redirectTo={-1} />
                    </Box>
                    <Box className="col">
                        <Box className="col-1">
                            {data.map((item) => (
                                <Box key={item.id} component="img" src={item.imgSrc} alt={item.alt} className='social_links' />
                            ))}
                        </Box>
                        <Box className="col-8">
                            <Box component="form" className="form_container" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <FormField
                                    name="community"
                                    type="select"
                                    label="Community"
                                    value={formData.community}
                                    onChange={handleChange}
                                    options={['Transportation & logistics', 'Healthcare', 'Stationary', 'Real estate services', 'Utility services', 'Create']}
                                    placeholder="Select sector"
                                    error={!!errors.community}
                                    errorMessage={errors.community}
                                />
                                {formData.community === "Create" && (
                                    <FormField
                                        name="create"
                                        type="text"
                                        label="Create"
                                        value={formData.create}
                                        onChange={handleChange}
                                        placeholder="Create Community"
                                        error={!!errors.create}
                                        errorMessage={errors.create}
                                    />
                                )}
                                <FormField
                                    name="topic"
                                    type="text"
                                    label="Topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    placeholder="Enter topic"
                                    error={!!errors.topic}
                                    errorMessage={errors.topic}
                                />
                                <Box className="submit_button_container">
                                    <Button type="submit" variant="contained" className="submit_button">
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                            {
                                contacts.length>0 &&  <Box className="member_container">
                                <Box className="image_container">
                                    <Box component="img" src={contacts_img} alt="people-global-communication" className='contacts_img'/>
                                </Box>
                                <Box className="contacts_container">
                                    <Typography variant='h3' className='member_heading'>
                                        Community Members
                                    </Typography>
                                    {displayedContacts.map((contact) => (
                                        <Box className="contacts" key={contact.id}>
                                            <Box className="circle"/>
                                            <Typography className='contact_name'>{contact.name}</Typography>
                                        </Box>
                                    ))}
                                <Box className="pagination_buttons">
                                    <IconButton onClick={handlePrev} disabled={currentPage === 0} className='prev'>
                                        <ArrowBack />
                                    </IconButton>
                                    <IconButton onClick={handleNext} disabled={startIndex + contactsPerPage >= contacts.length} className='next'>
                                        <ArrowForward />
                                    </IconButton>
                                </Box>
                                </Box>
                            </Box>
                            }
                           
                        </Box>
                        <Box className="col-1"></Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Discussion;
