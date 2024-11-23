import React, { useState } from 'react';
import { Box, Button, ThemeProvider, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Button2 from '../../Components/Home/Button2';
import votes_icon from '../../Utils/images/Serve/emotional/campaign/community/votes/votes_icon.svg';
import social_media from '../../Utils/images/Serve/emotional/campaign/community/icon_1.webp';
import icon_2 from '../../Utils/images/Serve/emotional/campaign/community/icon_2.webp';
import discussion from '../../Utils/images/Serve/emotional/campaign/community/votes/discussion.webp';
import google_meet_link from '../../Utils/images/Serve/emotional/campaign/community/votes/google-meet-link.webp';
import createCustomTheme from '../../styles/CustomSelectDropdownTheme';
import votes_gif from '../../Utils/gifs/votes_gif.gif';
import { Link } from 'react-router-dom';

function Votes(props) {
    const themeProps = {
        popoverBackgroundColor: props.popoverBackgroundColor || 'var(--yellow)',
        scrollbarThumb: 'var(--brown)'
    };

    const theme = createCustomTheme(themeProps);

    const cardsData = [
        { id: 1, imgSrc: icon_2, title:'Choose community or create' },
        { id: 2, imgSrc: discussion, title:'Discussion Topic or Forum' },
        { id: 3, imgSrc: google_meet_link, title:'Send google meet link' },
        { id: 4, imgSrc: social_media, title:'Choose media to promote community' },
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

    const [contacts, setContacts] = useState(contactsData);
    const [currentPage, setCurrentPage] = useState(0);
    const contactsPerPage = 4;

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
            <Box className="votes_wrapper">
                <Box className="row">
                    <Box className="col">
                        <Button2 text="Back" redirectTo={-1} />
                        <Box className="title_container">
                            <Box component="img" src={votes_icon} alt="community" className='vote_icon' />
                        </Box>
                        <Button2 text="Next" redirectTo={-1} />
                    </Box>
                    <Box className="col">
                    <Box className="col-1"></Box>
                        
                        <Box className="col-8">
                            <Box className="community_member_container">
                            <Box className="board_pins">
                                <Box className="circle"></Box>
                                <Box className="circle"></Box>
                            </Box>
                            <Box className="member_container">

                                <Box className="image_container">
                                    <Box component="img" src={votes_gif} alt="people-global-communication" className='contacts_img'/>
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
                            <Box className="board_pins">
                                <Box className="circle"></Box>
                                <Box className="circle"></Box>
                            </Box>
                            </Box>
                                
                            <Box className="cards_container">
                                {cardsData.map((card)=>{
                                    return <Link key={card.id} className="card">
                                        <Box component="img" alt="icon" src={card.imgSrc} className="card_img"/>
                                        <Typography className='card_title' variant='h3'>{card.title}</Typography>
                                    </Link>
                                })}
                            </Box>
                        </Box>
                        <Box className="col-1"></Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Votes;
