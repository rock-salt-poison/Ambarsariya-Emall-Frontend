import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import like from '../../Utils/gifs/like.gif';
import comment_bg_1 from '../../Utils/images/Sell/like_share/comment_bg.png';
import comment_bg_2 from '../../Utils/images/Sell/like_share/comment_bg_2.png';
import share from '../../Utils/gifs/share.gif';
import MessageIcon from '@mui/icons-material/Message';
import shareBg from '../../Utils/images/Sell/like_share/share_bg.png';
import contacts_img from '../../Utils/images/Sell/like_share/contacts.png';
import social_media_img from '../../Utils/images/Sell/like_share/social_media.webp';
import budget_img from '../../Utils/images/Sell/like_share/budget.webp';
import vector_line from '../../Utils/images/Sell/like_share/vector_line.png';
import arrow_icon from '../../Utils/images/Sell/like_share/arrow.svg';
import UserBadge from '../../UserBadge';
import ShopNameAndNo from '../../Components/Cart/ShopNameAndNo';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getMemberEshopReview, getUser } from '../../API/fetchExpressAPI';
import { useSelector } from 'react-redux';

function Like_share() {
  const { owner } = useParams();
  const token = useSelector((state) => state.auth.userAccessToken);
  const [comments, setComments] = useState('');
  const [reply, setReply] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [review, setReview] = useState(null);
  const [sellerData, setSellerData] = useState(null);
    const [buyerData, setBuyerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

  const get_buyer_data = async (buyer_token) => {
      try{
        setLoading(true);
        const resp = (await getUser(buyer_token))?.find((u)=>u.member_id !== null);
        setBuyerData(resp);      
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
    
    const get_seller_data = async (seller_token) => {
      try{
        setLoading(true);
        const resp = (await getUser(seller_token))?.find((u)=>u.shop_no !== null);
        setSellerData(resp);
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
  
    const get_member_shop_reviews = async (data) => {
      try{
        setLoading(true);
        
        const resp = await getMemberEshopReview(data);
        if(resp?.data){
            setReview(resp?.data);      
        }
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
  
    useEffect(()=>{
      if(token){
        get_buyer_data(token);
      }
    },[token]);
  
    useEffect(()=>{
      if(sellerData && buyerData){
        get_member_shop_reviews({shop_no: sellerData?.shop_no, reviewer_id: buyerData?.member_id });
      }
    }, [sellerData, buyerData])
  
    useEffect(()=>{
      if(owner){
        get_seller_data(owner);
      }
    },[owner]);

  const [allComments, setAllComments] = useState([
    {
      user: 'User 1',
      text: 'Great product! Really loved the quality.',
      replies: [
        { user: 'Owner', text: 'Thanks a lot!' },
        { user: 'Owner', text: 'Glad you liked it!' },
      ],
    },
    {
      user: 'User 2',
      text: 'Is there a return policy for this item?',
      replies: [
        { user: 'Owner', text: 'Yes, 7-day return policy.' },
        { user: 'Owner', text: 'Please keep the invoice safe.' },
      ],
    },
    {
      user: 'User 3',
      text: 'I received the order today, very satisfied.',
      replies: [
        { user: 'Owner', text: 'Thanks for the feedback!' },
        { user: 'Owner', text: 'Hope to serve you again.' },
      ],
    },
  ]);

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comments.trim()) {
      const newComment = {
        user: 'New User', // Replace with dynamic user if available
        text: comments,
        replies: [],
      };
      const updatedComments = [...allComments, newComment];
      console.log(newComment);
      
      setAllComments(updatedComments);
      setCurrentCommentIndex(updatedComments.length - 1);
      setComments('');
      setReply('');
      setCurrentReplyIndex(0);
      setShowReplyBox(false);
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      const updatedComments = [...allComments];
      updatedComments[currentCommentIndex].replies.push({
        user: 'Owner', // Replace with dynamic user if available
        text: reply,
      });

      console.log(updatedComments);
      
      setAllComments(updatedComments);
      setReply('');
      setShowReplyBox(false);
      setCurrentReplyIndex(updatedComments[currentCommentIndex].replies.length - 1);
    }
  };

  const handleMessageIconClick = () => {
    setShowReplyBox(true);
  };

  const handlePrevComment = () => {
    if (currentCommentIndex > 0) {
      setShowCommentBox(false);
      setCurrentCommentIndex(currentCommentIndex - 1);
      setCurrentReplyIndex(0);
      setShowReplyBox(false);
    }
  };

  const handleNextComment = () => {
    if (currentCommentIndex < allComments.length - 1) {
      setCurrentCommentIndex(currentCommentIndex + 1);
      setCurrentReplyIndex(0);
      setShowReplyBox(false);
      setShowCommentBox(false);
    }
  };

  const handlePrevReply = () => {
    if (currentReplyIndex > 0) {
      setCurrentReplyIndex(currentReplyIndex - 1);
    }
  };

  const handleNextReply = () => {
    const replies = allComments[currentCommentIndex]?.replies || [];
    if (currentReplyIndex < replies.length - 1) {
      setCurrentReplyIndex(currentReplyIndex + 1);
    }
  };

  const currentReplies = allComments[currentCommentIndex]?.replies || [];

  const share_type_data = [
    {
      id: 1,
      type: 'Contacts',
      alt: 'contacts',
      imgSrc: contacts_img,
      linkTo: 'https://contacts.google.com/',
      openInNewTab: true,
    },
    {
      id: 2,
      type: 'Social Media',
      alt: 'social-media',
      imgSrc: social_media_img,
      linkTo: '../user',
    },
    {
      id: 3,
      type: 'Budget',
      alt: 'budget',
      imgSrc: budget_img,
      linkTo: `../${owner}/budget`,
    },
  ];

  return (
    <Box className="like_share_wrapper">
        {loading && <Box className="loading"><CircularProgress/></Box> }
      <Box className="row">
        <Box className="col">
            <Box></Box>
          <Box className="container">
            <ShopNameAndNo token={owner} />
          </Box>
          <Box className="container">
            <UserBadge
              handleBadgeBgClick={`../${owner}/review`}
              handleLogin="../login"
              handleLogoutClick="../../"
            />
          </Box>
        </Box>

        <Box className="col">
          <Box className="container col-6">
            <Box className="row">
              <Box component="img" src={like} className="like_gif" alt="like" />

              <Box className="comment">
                <Box component="img" src={comment_bg_1} className="comment_bg_1" alt="comment" />
                <Box component="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                  {allComments?.length > 0 && !showCommentBox && (
                    <>
                      <Typography className="comments">
                        {allComments?.[currentCommentIndex]?.text}
                      </Typography>
                      <Typography className="commented_by">
                        ~{allComments?.[currentCommentIndex]?.user}
                      </Typography>
                    </>
                  )}
                  {showCommentBox && (
                    <TextField
                      multiline
                      rows={5}
                      value={comments}
                      onChange={handleCommentsChange}
                      variant="outlined"
                      placeholder="Add comment..."
                      sx={{ height: 'auto', width: '100%' }}
                      required
                    />
                  )}
                  <Box
                    className="submit_button_container"
                    sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
                  >
                    <Box className="pagination">
                      <Button
                        onClick={handlePrevComment}
                        disabled={currentCommentIndex === 0}
                        size="small"
                        variant="outlined"
                        className="prevButton"
                        sx={{ opacity: currentCommentIndex === 0 ? 0.8 : 1 }}
                      >
                        <ChevronLeftIcon />
                      </Button>
                      <Button
                        onClick={handleNextComment}
                        disabled={currentCommentIndex >= allComments.length - 1}
                        size="small"
                        variant="outlined"
                        className="nextButton"
                        sx={{
                          ml: 1,
                          opacity: currentCommentIndex >= allComments.length - 1 ? 0.8 : 1,
                        }}
                      >
                        <ChevronRightIcon />
                      </Button>
                    </Box>
                    <Box>
                      {showCommentBox ? (
                        <Button
                          type="submit"
                          variant="contained"
                          className="submit_button"
                          onClick={handleCommentSubmit}
                        >
                          Comment
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="contained"
                          className="submit_button"
                          onClick={() => {
                            setShowCommentBox(true);
                          }}
                        >
                          Comment
                        </Button>
                      )}
                      <Button className="reply_button" onClick={handleMessageIconClick}>
                        <MessageIcon />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="row">
              <Box className="comment">
                <Box component="img" src={comment_bg_2} className="comment_bg_2" alt="comment" />
                {currentReplies.length > 0 && !showReplyBox ? (
                  <>
                    <Box className="replies_container">
                      <Typography className="replies">
                        {currentReplies[currentReplyIndex]?.text}
                      </Typography>
                      <Typography className="replied_by">
                        ~{currentReplies[currentReplyIndex]?.user}
                      </Typography>
                    </Box>
                    <Box className="pagination">
                      <Button
                        onClick={handlePrevReply}
                        disabled={currentReplyIndex === 0}
                        className="prevButton"
                        sx={{ opacity: currentReplyIndex === 0 ? 0.8 : 1 }}
                      >
                        <ChevronLeftIcon />
                      </Button>
                      <Button
                        onClick={handleNextReply}
                        disabled={currentReplyIndex === currentReplies.length - 1}
                        className="prevButton"
                        sx={{ opacity: currentReplyIndex === currentReplies.length - 1 ? 0.8 : 1 }}
                      >
                        <ChevronRightIcon />
                      </Button>
                    </Box>
                  </>
                ) : showReplyBox ? (
                  <Box component="form" noValidate autoComplete="off" onSubmit={handleReplySubmit}>
                    <TextField
                      multiline
                      rows={5}
                      value={reply}
                      onChange={handleReplyChange}
                      variant="outlined"
                      placeholder="Add reply..."
                    />
                    <Box className="submit_button_container">
                      <Button type="submit" variant="contained" className="submit_button">
                        Reply
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="vector_line">
          <Box component="img" src={vector_line} alt="line" className="vector_line" />
        </Box>

        <Box className="col">
          <Box className="container share_wrapper">
            <Box component="img" src={shareBg} className="share_bg" alt="share_bg" />
            <Box className="share_gif" component="img" src={share} alt="share" />
            <Box className="share_row">
              {share_type_data.map((item) => (
                <Box className="card" key={item.id}>
                  <Box className="card_img">
                    <Box component="img" src={item.imgSrc} alt={item.alt} className="img" />
                  </Box>
                  <Link to={item.linkTo} target={item.openInNewTab ? '_blank' : '_self'}>
                    <Typography className="title" variant="h3">
                      {item.type}
                      <Box component="img" src={arrow_icon} alt="arrow" className="arrow_icon" />
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Like_share;
