import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Button2 from '../../Components/Home/Button2';
import { Link, useParams } from 'react-router-dom';
import like from '../../Utils/gifs/like.gif';
import comment_bg_1 from '../../Utils/images/Sell/like_share/comment_bg.png';
import comment_bg_2 from '../../Utils/images/Sell/like_share/comment_bg_2.png';
import share from '../../Utils/gifs/share.gif';
import MessageIcon from '@mui/icons-material/Message';
import shareBg from '../../Utils/images/Sell/like_share/share_bg.png'
import contacts_img from '../../Utils/images/Sell/like_share/contacts.png'
import social_media_img from '../../Utils/images/Sell/like_share/social_media.webp'
import budget_img from '../../Utils/images/Sell/like_share/budget.webp'
import vector_line from '../../Utils/images/Sell/like_share/vector_line.png';
import arrow_icon from '../../Utils/images/Sell/like_share/arrow.svg'

function Like_share() {
    const { owner } = useParams();
    const [comments, setComments] = useState('');
    const [replies, setReplies] = useState([]);
    const [showMessageRow, setShowMessageRow] = useState(false);
    const [showReplyIcon, setShowReplyIcon] = useState(false);
    const [reply, setReply] = useState('');
    const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
    const [showReplyBox, setShowReplyBox] = useState(false);

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comments.length > 0) {
            console.log('Comment:', comments);
            setShowReplyIcon(true);
            setShowMessageRow(true);
            setShowReplyBox(replies.length === 0);
        }
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (reply.length > 0) {
            setReplies([...replies, reply]);
            setReply('');
            setShowMessageRow(true);
            setShowReplyBox(false);
        }
    };

    const handleMessageIconClick = () => {
        setShowReplyBox(true);
    };

    const handlePrevReply = () => {
        if (currentReplyIndex > 0) {
            setCurrentReplyIndex(currentReplyIndex - 1);
        }
    };

    const handleNextReply = () => {
        if (currentReplyIndex < replies.length - 1) {
            setCurrentReplyIndex(currentReplyIndex + 1);
        }
    };

    const share_type_data = [
        {id:1, type:'Contacts', alt:"contacts", imgSrc:contacts_img, linkTo:'https://contacts.google.com/', openInNewTab:true},
        {id:2, type:'Social Media', alt:"social-media", imgSrc:social_media_img, linkTo:'../user'},
        {id:3, type:'Budget', alt:"budget", imgSrc:budget_img, linkTo:`../${owner}/budget`}
    ]

    return (
        <Box className="like_share_wrapper">
            <Box className="row">
                <Box className="col">
                    <Box className="container">
                        <Button2 text="Back" redirectTo={`../${owner}/review`} />
                    </Box>
                    <Box className="container">
                        <Typography variant='h2' className='heading'>
                            <Typography variant='span' className="span_1">Apna Departmental</Typography>
                            <Typography variant='span' className="span_1">
                                Shop No:
                                <Typography variant='span' className='span_2'>123</Typography>
                            </Typography>
                        </Typography>
                    </Box>
                    <Box className="container">
                        <Button2 text="Next" redirectTo={`../${owner}/subscribe`} />
                    </Box>
                </Box>

                <Box className="col">
                    <Box className="container"></Box>
                    <Box className="container col-6">
                        <Box className="row">
                            <Box component="img" src={like} className='like_gif' alt="like" />

                            <Box className="comment">
                                <Box className="comment_bg_1" component="img" src={comment_bg_1} alt="comment" />
                                <Box component="form" noValidate autoComplete="off" onSubmit={handleCommentSubmit}>
                                    <TextField
                                        multiline
                                        rows={5}
                                        value={comments}
                                        onChange={handleCommentsChange}
                                        variant="outlined"
                                        placeholder='Add comment...'
                                    />
                                    <Box className="submit_button_container">
                                        <Button type="submit" variant="contained" className="submit_button">
                                            Comment
                                        </Button>
                                        {showReplyIcon && (
                                            <Button className="reply_button" onClick={handleMessageIconClick}>
                                                <MessageIcon />
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {showMessageRow && (
                            <Box className="row">
                                <Box className="comment">
                                    <Box className="comment_bg_2" component="img" src={comment_bg_2} alt="comment" />
                                    {replies.length > 0 && !showReplyBox ? (
                                        <>
                                            <Typography className="replies">{replies[currentReplyIndex]}</Typography>
                                            <Box className="pagination">
                                                <Button onClick={handlePrevReply} disabled={currentReplyIndex === 0} className='prevButton'>
                                                    Prev
                                                </Button>
                                                <Button onClick={handleNextReply} disabled={currentReplyIndex === replies.length - 1} className='nextButton'>
                                                    Next
                                                </Button>
                                            </Box>
                                        </>
                                    ) : showReplyBox && (
                                        <Box component="form" noValidate autoComplete="off" onSubmit={handleReplySubmit}>
                                            <TextField
                                                multiline
                                                rows={5}
                                                value={reply}
                                                onChange={handleReplyChange}
                                                variant="outlined"
                                                placeholder='Add reply...'
                                            />
                                            <Box className="submit_button_container">
                                                <Button type="submit" variant="contained" className="submit_button">
                                                    Reply
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Box className="container"></Box>
                </Box>
                
                <Box className="vector_line">
                    <Box component="img" src={vector_line} alt="line" className='vector_line'/>
                </Box>

                <Box className="col">
                    <Box className="col-1"></Box>
                    <Box className="container share_wrapper">
                        <Box component="img" src={shareBg} className='share_bg' alt="share_bg"/>
                        <Box className="share_gif" component="img" src={share} alt="share"/>
                        <Box className="share_row">
                            {share_type_data.map((item)=>{
                                return <Box className="card" key={item.id}>
                                <Box className="card_img">
                                    <Box component="img" src={item.imgSrc} alt={item.alt} className='img'/>
                                </Box>
                                    <Link to={item.linkTo} target={item.openInNewTab? '_blank':'_self'}><Typography className='title' variant='h3'>{item.type}
                                            <Box component="img" src={arrow_icon} alt="arrow"className='arrow_icon'/>
                                        </Typography></Link>
                            </Box>
                            })}
                            
                        </Box>
                    </Box>
                    <Box className="col-1"></Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Like_share;
