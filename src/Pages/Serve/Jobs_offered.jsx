import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Header from '../../Components/Serve/SupplyChain/Header'
import frame from '../../Utils/images/Serve/emotional/eshop/jobs_offered/frame.webp';
import { Link } from 'react-router-dom';
import hornSound from '../../Utils/audio/horn-sound.mp3';

function Jobs_offered() {

  const [audio] = useState(new Audio(hornSound));

  const job_types = [
    {id:1, type:'Freelance Writing or Editing'},
    {id:2, type:'Virtual Assistance'},
    {id:3, type:'Graphic Design'},
    {id:4, type:'Social Media Management'},
    {id:5, type:'Online Tutoring or Teaching'},
    {id:6, type:'E-commerce Management'},
    {id:7, type:'Web Development or Programming'},
    {id:8, type:'Data Entry or Analysis'},
    {id:9, type:'Digital Marketing'},
    {id:10, type:'Customer Support'},
  ]

  const handleClick=(e)=>{
    e.preventDefault();
    const container = e.target.closest('.container');
    container.classList.add('reduceSize3');
    setTimeout(()=>{
      container.classList.remove('reduceSize3');
    }, 300);
    audio.play();
  }
  return (
    <Box className="jobs_offered_wrapper">
        <Box className="row">
            <Header back_btn_link={-1} next_btn_link='' title_container={true} title="Jobs offered by Ambarsariya Mall" redirectTo='../emotional'/>

            <Box className="col col-9">
              <Box className="col-5">
              {
                job_types.slice(0,5).map((job)=>{
                  return <Link className="container" key={job.id} onClick={(e)=>handleClick(e)}>
                  <Box component="img" src={frame} alt="frame" className='frame'/>
                  <Typography className='job_type'>{job.type}</Typography>
                </Link>
                })
              }
                </Box>
                <Box className="col-5">
              {
                job_types.slice(5).map((job)=>{
                  return <Link className="container" key={job.id} onClick={(e)=>handleClick(e)}>
                  <Box component="img" src={frame} alt="frame" className='frame'/>
                  <Typography className='job_type'>{job.type}</Typography>
                </Link>
                })
              }
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Jobs_offered