import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import hanging_board from '../../Utils/images/Serve/emotional/eshop/hanging_board.webp';
import hanging_board2 from '../../Utils/images/Serve/emotional/eshop/hanging_board2.webp';
import { Link } from 'react-router-dom';
import campaign_name from '../../Utils/images/Serve/emotional/merchant_campaign/campaign_name.webp';
import pdf_icon from '../../Utils/images/Serve/emotional/merchant_campaign/pdf.png';
import main_content from '../../Utils/images/Serve/emotional/merchant_campaign/main_content.png';
import header_icon from '../../Utils/images/Serve/emotional/merchant_campaign/header.png';
import cta_icon from '../../Utils/images/Serve/emotional/campaign/community/icon_1.webp';
import result_icon from '../../Utils/images/Serve/emotional/merchant_campaign/res.png';
import submit_icon from '../../Utils/images/Serve/emotional/merchant_campaign/submit.png';
import FormField from '../../Components/Form/FormField';
import CardBoardPopup from '../../Components/CardBoardPopupComponents/CardBoardPopup';
import CampaignHeader_PopupContent from '../../Components/Serve/MerchantCampaign/CampaignHeader_PopupContent';
import CampaignCTA_PopupContent from '../../Components/Serve/MerchantCampaign/CampaignCTA_PopupContent';
import dummy_img from '../../Utils/images/aqi-bg2.webp';
import CampaignResult_PopupContent from '../../Components/Serve/MerchantCampaign/CampaignResult_PopupContent';
import CampaignPreview_PopupContent from '../../Components/Serve/MerchantCampaign/CampaignPreview_PopupContent';

function MerchantCampaign() {
    const [formData, setFormData] = useState({
        campaign_name: '',
        usp: '',
        main_content: '',
        shop_name: '',
        domain: '',
        sector: '',
        date_time:'',
        groups:'',
        contacts:'',
        media:'',
        repeat_action: false,
        repeat_action_date_time:''
    });

    const [errors, setErrors] = useState({});
    const [openPopupId, setOpenPopupId] = useState(null);

    const handleClose = () => {
        setOpenPopupId(null); // Close popup
    };

    const handlePopup = (e, id) => {
        setOpenPopupId((prev) => (prev === id ? null : id));
    };

    const updateFormDataFromHeader = (headerFormData) => {
        setFormData({
            ...formData,
            ...headerFormData,
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file input separately
        if (files) {
            setFormData({
                ...formData,
                [name]: files[0] ? files[0] : '', // Store the file object
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        setErrors({
            ...errors,
            [name]: '', // Clear error for the specific field
        });
    };

    const validateForm = () => {
        const newErrors = {};

        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            handleClose();
            // Reset formData if needed
            // setFormData({  campaign_name: '',
            //     usp: '',
            //     main_content: '',
            //     shop_name: '',
            //     domain: '',
            //     sector: '',
            //     date_time:'',
            //     groups:'',
            //     contacts:'',
            //     media:'',
            //     repeat_action:false,
            //     repeat_action_date_time:'' });
        } else {
            console.log("Validation errors:", errors);
        }
    };

    const btnData = [
        {
            id: 1,
            name: 'campaign_name',
            label: 'Create campaign name',
            iconSrc: campaign_name,
            type: 'text',
        },
        {
            id: 2,
            name: 'usp',
            label: 'Select Shop Description & Attributes or Upload USP',
            iconSrc: pdf_icon,
            type: 'file',
            accept: 'application/pdf',
        },
        {
            id: 3,
            name: 'main_content',
            label: 'Main Content',
            iconSrc: main_content,
            type: 'file',
            accept: 'image/jpg, image/jpeg, image/png, video/mp4',
        },
        {
            id: 4,
            name: 'shop_name',
            label: 'Header',
            iconSrc: header_icon,
            type: 'popup',
            popupBodyContent: (
                <CampaignHeader_PopupContent 
                    formData={formData} 
                    setFormData={updateFormDataFromHeader} 
                    handleClose={handleClose} 
                />
            ),
        },
        {
            id: 5,
            name: 'media',
            label: 'Call to action',
            iconSrc: cta_icon,
            type: 'popup',
            popupBodyContent: (
                <CampaignCTA_PopupContent 
                    formData={formData} 
                    setFormData={updateFormDataFromHeader} 
                    handleClose={handleClose} 
                />
            ),
        },
    ];

    const btns = (id, name, label, iconSrc, type, accept, popupContent) => {
        const uploadedFileName = formData[name] && typeof formData[name] === 'object' ? formData[name].name : label;

        return (
            <React.Fragment key={id}>
                <Box className='btn'>
                    <Box className="btn_container">
                        <Box className="icon_container">
                            <Box component="img" src={iconSrc} alt="icon" className="icon" />
                        </Box>
                        {type !== 'popup' ? (
                            <FormField
                                name={name}
                                placeholder={uploadedFileName}
                                type={type}
                                value={formData[name] ? (typeof formData[name] === 'object' ? '' : formData[name]) : ''} 
                                onChange={handleChange}
                                accept={accept}
                            />
                        ) : (
                            <Typography className="btn_value" onClick={(e) => handlePopup(e, id)}>
                                {id === 4 
                                ? `${(formData.shop_name || formData.domain || formData.sector) 
                                    ? `Shop Name: ${formData.shop_name} | Domain: ${formData.domain} | Sector: ${formData.sector}` : label }` 
                                : id === 5 
                                ? `${(formData.media || formData.groups || formData.contacts) 
                                    ? `Media: ${formData.media} | Groups: ${formData.groups} | Contacts: ${formData.contacts}` : label}` 
                                : label}
                                
                            </Typography>
                        )}
                        <CardBoardPopup
                            open={openPopupId === id}
                            handleClose={handleClose}
                            title={label}
                            body_content={popupContent}
                            texturedSheet={true}
                            optionalCName='campaign'
                            iconSrc={iconSrc}
                        />
                    </Box>
                </Box>
                {errors[name] && (
                    <Typography variant="caption" color="error" className='error_message'>
                        {errors[name]}
                    </Typography>
                )}
            </React.Fragment>
        );
    };

    return (
        <Box className="merchant_campaign_wrapper">
            <Box className="row">
                <Box className="col d-md-none">
                    <Box className="title_container">
                        <Box component="img" src={hanging_board} alt="board" className='hanging_board' />
                        <Typography className='title'>Shop No. 00001</Typography>
                    </Box>
                    <Link to='../emotional'>
                        <Typography variant='h2' className='heading'>Campaign</Typography>
                    </Link>
                    <Box className="title_container">
                        <Box component="img" src={hanging_board} alt="board" className='hanging_board' />
                        <Typography className='title'>Domain: Wholesaler</Typography>
                    </Box>
                </Box>

                <Box className="col d_lg_none">
                    <Link to='../emotional'>
                        <Typography variant='h2' className='heading'>Campaign</Typography>
                    </Link>
                    <Box className="title_container">
                        <Box component="img" src={hanging_board2} alt="board" className='hanging_board2' />
                        <Typography className='title' variant='h2'>
                            <Typography className="heading" variant='span'>
                                Shop No: <Typography variant='span' className='values'>001</Typography>
                            </Typography>
                            <Typography className="heading" variant='span'>
                                Domain: <Typography variant='span' className='values'>Wholesale</Typography>
                            </Typography>
                        </Typography>
                    </Box>
                </Box>

                <Box className="col">
                    <Box className="col-8">
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>

                        <Box className="container">
                            <Box className="sub-col-6">
                                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    {btnData.map((btn) => {
                                        return btns(btn.id, btn.name, btn.label, btn.iconSrc, btn.type, btn.accept,btn.popupBodyContent );
                                    })}
                                    <Box className="btn_group" display="flex">
                                        
                                    {btns(6, 'result', 'Result', result_icon, 'popup', '',<CampaignResult_PopupContent/> )}

                                        <Button className='btn' key={5} type="submit">
                                            <Box className="btn_container">
                                                <Box className="icon_container">
                                                    <Box component="img" src={submit_icon} alt="icon" className="icon" />
                                                </Box>
                                                <Typography className='btn_value'>Submit</Typography>
                                            </Box>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="sub-col-4">
                                {formData.shop_name || formData.main_content ? (
                                      <Link className="campaign_preview"  onClick={(e) => handlePopup(e, 7)}>
                                      <Box className="campaign_preview_body">
                                      {formData.shop_name && <Link to='../../AmbarsariyaMall/sell/support/stationary'><Typography className='text'>Shop Name : 
                                              <Typography variant='span'>
                                             {formData.shop_name}
                                              </Typography>
                                          </Typography></Link>}
                                      {formData.domain && <Typography className='text'>Domain : 
                                              <Typography variant='span'>
                                              {formData.domain}
                                              </Typography>
                                          </Typography>}
                                      {formData.sector && <Typography className='text'>Sector : 
                                          <Typography variant='span'>
                                          {formData.sector}
                                          </Typography>
                                      </Typography>}
                                      {formData.main_content && <Box component="img" src={dummy_img} alt="bg_img" className='uploaded_post'/> }
                                      </Box>
                                  </Link>
                                ) : (
                                    <Typography className='text'>Preview</Typography>
                                )}
                              
                            </Box>
                        </Box>
                        <Box className="board_pins">
                            <Box className="circle"></Box>
                            <Box className="circle"></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CardBoardPopup
                open={openPopupId === 7}
                handleClose={handleClose}
                title={formData.campaign_name}
                body_content=<CampaignPreview_PopupContent formData={formData}/>
                texturedSheet={true}
                optionalCName='campaign'
                iconSrc={campaign_name}
            />
        </Box>
    );
}

export default MerchantCampaign;
