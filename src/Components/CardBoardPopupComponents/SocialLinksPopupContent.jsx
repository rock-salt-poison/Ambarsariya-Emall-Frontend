import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import youtube from '../../Utils/images/social_links/youtube.png';
import snap from '../../Utils/images/social_links/snap.png';
import instagram from '../../Utils/images/social_links/instagram.webp';
import facebook from '../../Utils/images/social_links/facebook.png';
import link from '../../Utils/images/social_links/link.png';
import FormField from '../Form/FormField';
import { Link } from 'react-router-dom';

function SocialLinksPopupContent() {
    const initialFormData = {
        youtube: '',
        snap: '',
        instagram: '',
        facebook: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateURL = (url) => {
        const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
        return urlPattern.test(url);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let validationErrors = {};
        
        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                validationErrors[field] = `URL is required`;
            } else if (!validateURL(formData[field])) {
                validationErrors[field] = `Invalid URL`;
            }
        });

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted:', formData);
        }
    };

    const linksData = [
        { name: 'youtube', label: 'Youtube', icon: youtube, placeholder: 'Enter Youtube URL' },
        { name: 'snap', label: 'Snap', icon: snap, placeholder: 'Enter Snap URL' },
        { name: 'instagram', label: 'Instagram', icon: instagram, placeholder: 'Enter Instagram URL' },
        { name: 'facebook', label: 'Facebook', icon: facebook, placeholder: 'Enter Facebook URL' }
    ];
    
    const [socialLinks, setSocialLinks] = useState(linksData);

    const handleAddMore = () => {
        const newLink = {
            name: `link${socialLinks.length + 1}`,  
            label: `Link ${socialLinks.length + 1}`, 
            icon: link, 
            placeholder: 'Enter URL'
        };
        setSocialLinks([...socialLinks, newLink]);  
        setFormData({
            ...formData,
            [newLink.name]: ''
        });
    };

    return (
        <Box 
            component="form" 
            noValidate 
            autoComplete="off" 
            className="social_links_popup_form" 
            onSubmit={handleSubmit}
        >
            {socialLinks.map(({ name, label, icon, placeholder }) => (
                <Box className="form-group" key={name}>
                    <Box component="img" src={icon} alt="icon" className="icon" />
                    <label className='label'>{label}</label>

                    <FormField
                        id={name}
                        name={name}
                        type="url"
                        value={formData[name]}
                        onChange={handleChange}
                        error={!!errors[name]}
                        errorMessage={errors[name]}
                        placeholder={placeholder}
                    />
                </Box>
            ))}

            <Link className="addmore" onClick={handleAddMore}>Click here to add more</Link>
            
            <Box className="submit_button_container">
                <Button type="submit" variant="contained" className="submit_button">
                Submit
                </Button>
            </Box>
        </Box>
    );
}

export default SocialLinksPopupContent;
