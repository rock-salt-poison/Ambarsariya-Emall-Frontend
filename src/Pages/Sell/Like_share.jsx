import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import like from "../../Utils/gifs/like.gif";
import comment_bg_1 from "../../Utils/images/Sell/like_share/comment_bg.png";
import comment_bg_2 from "../../Utils/images/Sell/like_share/comment_bg_2.png";
import share from "../../Utils/gifs/share.gif";
import MessageIcon from "@mui/icons-material/Message";
import shareBg from "../../Utils/images/Sell/like_share/share_bg.png";
import contacts_img from "../../Utils/images/Sell/like_share/contacts.png";
import social_media_img from "../../Utils/images/Sell/like_share/social_media.webp";
import budget_img from "../../Utils/images/Sell/like_share/budget.webp";
import vector_line from "../../Utils/images/Sell/like_share/vector_line.png";
import arrow_icon from "../../Utils/images/Sell/like_share/arrow.svg";
import UserBadge from "../../UserBadge";
import ShopNameAndNo from "../../Components/Cart/ShopNameAndNo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getEshopCommentsAndReplies, getMemberEshopReview, getUser, postEshopReview, postEshopReviewComment, postEshopReviewCommentReply } from "../../API/fetchExpressAPI";
import { useSelector } from "react-redux";
import CustomSnackbar from "../../Components/CustomSnackbar";

function Like_share() {
  const { owner } = useParams();
  const token = useSelector((state) => state.auth.userAccessToken);
  const [comments, setComments] = useState("");
  const [reply, setReply] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [review, setReview] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetch_shop_comments_and_reviews = async (shop_no) => {
    try{
      setLoading(true);
      const resp = await getEshopCommentsAndReplies(shop_no);
      if(resp){
        setAllComments(resp);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(sellerData?.shop_no){
      fetch_shop_comments_and_reviews(sellerData?.shop_no);
    }
  },[sellerData?.shop_no])

  const [allComments, setAllComments] = useState([]);

  // const [allComments, setAllComments] = useState([
  //   {
  //     comment_id: 101,
  //     user: "Ashwani Kumar",
  //     text: "Great product! Really loved the quality.",
  //     replies: [
  //       { reply_id: 1, user: "Muskan", text: "Thanks a lot!" },
  //       { reply_id: 2, user: "ABC", text: "Glad you liked it!" },
  //     ],
  //   },
  //   {
  //     comment_id: 102,
  //     user: "Muskan",
  //     text: "Is there a return policy for this item?",
  //     replies: [
  //       { reply_id: 3, user: "ABC", text: "Yes, 7-day return policy." },
  //     ],
  //   },
  // ]);

  useEffect(() => {
    if (allComments.length > 0 && currentCommentId === null) {
      setCurrentCommentId(allComments[0].comment_id);
    }
  }, [allComments]);

  const get_buyer_data = async (buyer_token) => {
    try {
      setLoading(true);
      const resp = (await getUser(buyer_token))?.find(
        (u) => u.member_id !== null
      );

      console.log(resp);
      
      setBuyerData(resp);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const get_seller_data = async (seller_token) => {
    try {
      setLoading(true);
      const resp = (await getUser(seller_token))?.find(
        (u) => u.shop_no !== null
      );
      setSellerData(resp);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const get_member_shop_reviews = async (data) => {
    try {
      setLoading(true);
      const resp = await getMemberEshopReview(data);
      if (resp?.data) {
        setReview(resp?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) get_buyer_data(token);
  }, [token]);

  useEffect(() => {
    if (sellerData && buyerData) {
      get_member_shop_reviews({
        shop_no: sellerData?.shop_no,
        reviewer_id: buyerData?.member_id,
      });
    }
  }, [sellerData, buyerData]);

  useEffect(() => {
    if (owner) get_seller_data(owner);
  }, [owner]);

  const handleCommentsChange = (event) => setComments(event.target.value);
  const handleReplyChange = (event) => setReply(event.target.value);

  const currentCommentIndex = allComments.findIndex(
    (c) => c.comment_id === currentCommentId
  );
  const currentComment = allComments[currentCommentIndex] || {};
  const currentReplies = currentComment?.replies || [];

  const handleCommentSubmit = async (e) => {
  e.preventDefault();
  if (!comments.trim()) return;

  try {
    setLoading(true);

    let reviewId = review?.review_id;

    // 1. If review does not exist, create it
    if (!reviewId) {
      const shopReviewData = {
        shop_no: sellerData?.shop_no,
        reviewer_id: buyerData?.member_id,
        review_date: new Date().toLocaleDateString(),
        user_type: buyerData?.user_type,
      };

      const reviewResp = await postEshopReview(shopReviewData);

      if (reviewResp?.review_id) {
        reviewId = reviewResp.review_id;

        // 🔁 Fetch complete review object now
        const updatedReviewResp = await getMemberEshopReview({
          shop_no: sellerData?.shop_no,
          reviewer_id: buyerData?.member_id,
        });

        if (updatedReviewResp?.data) {
          setReview(updatedReviewResp.data);
        }

        setSnackbar({
          open: true,
          message: reviewResp?.message || "Review created successfully",
          severity: "success",
        });
      } else {
        throw new Error("Failed to create review");
      }
    }

    // 2. Now post the comment
    const commentData = {
      review_id: reviewId,
      commenter_id: buyerData?.member_id,
      commenter_name: buyerData?.name,
      comment: comments,
    };

    const commentResp = await postEshopReviewComment(commentData);

    if (commentResp?.comment_id) {
      const newComment = {
        comment_id: commentResp.comment_id,
        text: commentData.comment,
        user: commentData.commenter_name,
        commenter_id: commentData.commenter_id,
        replies: [],
      };
      setAllComments((prev) => [...prev, newComment]);
      setCurrentCommentId(commentResp.comment_id);

      setSnackbar({
        open: true,
        message: commentResp?.message || "Comment added",
        severity: "success",
      });
    } else {
      throw new Error("Failed to post comment");
    }
  } catch (error) {
    console.log(error);
    setSnackbar({
      open: true,
      message: error?.message || "Error occurred",
      severity: "error",
    });
  } finally {
    setLoading(false);
    setComments("");
    setReply("");
    setShowReplyBox(false);
    fetch_shop_comments_and_reviews(sellerData?.shop_no);
  }
};


  const handleReplySubmit = async (e) => {
  e.preventDefault();

  if (!reply.trim()) return;

  if (
    currentCommentIndex >= 0 &&
    allComments?.[currentCommentIndex]?.commenter_id !== buyerData?.member_id
  ) {
    try {
      setLoading(true);

      let reviewId = review?.review_id;

      // Step 1: Create review if it doesn't exist
      if (!reviewId) {
        const shopReviewData = {
          shop_no: sellerData?.shop_no,
          reviewer_id: buyerData?.member_id,
          review_date: new Date().toLocaleDateString(),
          user_type: buyerData?.user_type,
        };

        const reviewResp = await postEshopReview(shopReviewData);

        if (reviewResp?.review_id) {
          reviewId = reviewResp.review_id;

          // Step 2: Fetch complete review data
          const updatedReviewResp = await getMemberEshopReview({
            shop_no: sellerData?.shop_no,
            reviewer_id: buyerData?.member_id,
          });

          if (updatedReviewResp?.data) {
            setReview(updatedReviewResp.data);
          }

          setSnackbar({
            open: true,
            message: reviewResp?.message || "Review created successfully",
            severity: "success",
          });
        } else {
          throw new Error("Failed to create review before replying");
        }
      }

      // Step 3: Post reply
      const reply_data = {
        review_id: reviewId,
        comment_id: allComments?.[currentCommentIndex]?.comment_id,
        replier_id: buyerData?.member_id,
        replier_name: buyerData?.name,
        reply: reply,
      };

      const resp = await postEshopReviewCommentReply(reply_data);

      if (resp?.reply_id) {
        const newReply = {
          reply_id: resp.reply_id,
          text: reply_data.reply,
          user: reply_data.replier_name,
        };

        // Optimistic update
        setAllComments((prev) =>
          prev.map((c) =>
            c.comment_id === currentComment.comment_id
              ? { ...c, replies: [...(c.replies || []), newReply] }
              : c
          )
        );

        setCurrentReplyIndex(currentReplies.length);

        setSnackbar({
          open: true,
          message: resp?.message || "Reply added",
          severity: "success",
        });
      } else {
        throw new Error("Failed to post reply");
      }
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: error?.message || "An error occurred",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setReply("");
      setShowReplyBox(false);
      fetch_shop_comments_and_reviews(sellerData?.shop_no);
    }
  }
};


  const handleMessageIconClick = () => setShowReplyBox(true);

  const handlePrevComment = () => {
    if (currentCommentIndex > 0) {
      setCurrentCommentId(allComments[currentCommentIndex - 1].comment_id);
      setShowCommentBox(false);
      setShowReplyBox(false);
      setCurrentReplyIndex(0);
    }
  };

  const handleNextComment = () => {
    if (currentCommentIndex < allComments.length - 1) {
      setCurrentCommentId(allComments[currentCommentIndex + 1].comment_id);
      setShowCommentBox(false);
      setShowReplyBox(false);
      setCurrentReplyIndex(0);
    }
  };

  const handlePrevReply = () => {
    if (currentReplyIndex > 0) {
      setCurrentReplyIndex(currentReplyIndex - 1);
    }
  };

  const handleNextReply = () => {
    if (currentReplyIndex < currentReplies.length - 1) {
      setCurrentReplyIndex(currentReplyIndex + 1);
    }
  };

  const share_type_data = [
    {
      id: 1,
      type: "Contacts",
      alt: "contacts",
      imgSrc: contacts_img,
      linkTo: "https://contacts.google.com/",
      openInNewTab: true,
    },
    {
      id: 2,
      type: "Social Media",
      alt: "social-media",
      imgSrc: social_media_img,
      linkTo: "../user",
    },
    {
      id: 3,
      type: "Budget",
      alt: "budget",
      imgSrc: budget_img,
      linkTo: `../${owner}/budget`,
    },
  ];

  return (
    <Box className="like_share_wrapper">
      {loading && (
        <Box className="loading">
          <CircularProgress />
        </Box>
      )}
      <Box className="row">
        <Box className="col">
          <Box className="container"></Box>
          <Box className="container">
            <ShopNameAndNo token={owner} />
          </Box>
          <Box className="container">
            <UserBadge
              handleBadgeBgClick={-1}
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
                <Box
                  component="img"
                  src={comment_bg_1}
                  className="comment_bg_1"
                  alt="comment"
                />
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {allComments?.length > 0 && !showCommentBox && (
                    <>
                      <Typography className="comments">
                        {currentComment?.text}
                      </Typography>
                      <Typography className="commented_by">
                        ~{currentComment?.user}
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
                      sx={{ width: "100%" }}
                      required
                    />
                  )}
                  <Box
                    className="submit_button_container"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
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
                          opacity:
                            currentCommentIndex >= allComments.length - 1
                              ? 0.8
                              : 1,
                        }}
                      >
                        <ChevronRightIcon />
                      </Button>
                    </Box>
                    <Box>
                      {showCommentBox ? (
                        <Button
                          variant="contained"
                          onClick={handleCommentSubmit}
                          className="submit_button"
                        >
                          Comment
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => setShowCommentBox(true)}
                          className="submit_button"
                        >
                          Comment
                        </Button>
                      )}
                      {currentComment?.commenter_id !== buyerData?.member_id && <Button
                        className="reply_button"
                        onClick={handleMessageIconClick}
                      >
                        <MessageIcon />
                      </Button>}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="row">
              <Box className="comment">
                {(currentReplies.length > 0 || showReplyBox) && <Box
                  component="img"
                  src={comment_bg_2}
                  className="comment_bg_2"
                  alt="comment"
                />}
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
                        disabled={
                          currentReplyIndex === currentReplies.length - 1
                        }
                        className="prevButton"
                        sx={{ opacity: currentReplyIndex === currentReplies.length - 1 ? 0.8 : 1 }}
                      >
                        <ChevronRightIcon />
                      </Button>
                    </Box>
                  </>
                ) : showReplyBox ? (
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleReplySubmit}
                  >
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
          <Box
            component="img"
            src={vector_line}
            alt="line"
            className="vector_line"
          />
        </Box>

        <Box className="col">
          <Box className="container share_wrapper">
            <Box
              component="img"
              src={shareBg}
              className="share_bg"
              alt="share_bg"
            />
            <Box
              className="share_gif"
              component="img"
              src={share}
              alt="share"
            />
            <Box className="share_row">
              {share_type_data.map((item) => (
                <Box className="card" key={item.id}>
                  <Box className="card_img">
                    <Box
                      component="img"
                      src={item.imgSrc}
                      alt={item.alt}
                      className="img"
                    />
                  </Box>
                  <Link
                    to={item.linkTo}
                    target={item.openInNewTab ? "_blank" : "_self"}
                  >
                    <Typography className="title" variant="h3">
                      {item.type}
                      <Box
                        component="img"
                        src={arrow_icon}
                        alt="arrow"
                        className="arrow_icon"
                      />
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        disableAutoHide={true}
      />
    </Box>
  );
}

export default Like_share;
