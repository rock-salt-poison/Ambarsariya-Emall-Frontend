import React from 'react'
import landing_pages_with_forms from'../../Utils/images/Serve/unexpected/capture/landing_pages_with_forms.webp'
import content_marketing from'../../Utils/images/Serve/unexpected/capture/content_marketing.webp'
import social_media_campaigns from'../../Utils/images/Serve/unexpected/capture/social_media_campaigns.webp'
import seo from'../../Utils/images/Serve/unexpected/lead_generation/seo.webp'
import email_marketing from'../../Utils/images/Serve/unexpected/capture/email_marketing.webp'
import webinars_and_live_events from'../../Utils/images/Serve/unexpected/capture/webinars_and_live_events.webp'
import referral_programs from'../../Utils/images/Serve/unexpected/capture/referral_programs.webp'
import loyalty_program from'../../Utils/images/Serve/unexpected/capture/loyalty_program.webp'
import lead_generation_tools from'../../Utils/images/Serve/unexpected/capture/lead_generation_tools.webp'
import CardsGrid from '../../Components/Serve/Unexpected/CardsGrid'

function Capture() {

  const cards_data = [
    {id:1, imgSrc : landing_pages_with_forms, title:'Landing pages with leads capture forms'},
    {id:2, imgSrc : content_marketing, title:'Content Marketing'},
    {id:3, imgSrc : social_media_campaigns, title:'Social Media Campaigns'},
    {id:4, imgSrc : email_marketing, title:'Email Marketing'},
    {id:5, imgSrc : webinars_and_live_events, title:'Webinars and Live Events'},
    {id:6, imgSrc : referral_programs, title:'Referral Programs'},
    {id:7, imgSrc : seo, title:'SEO and Paid Search (PPC)'},
    {id:8, imgSrc : loyalty_program, title:'Loyalty programs'},
    {id:9, imgSrc : lead_generation_tools, title:'Lead Generation tools'},
  ]

  return (
    <CardsGrid component_className="capture_wrapper" backLink="../unexpected/suggestions" nextLink="../unexpected/confirmation" title="Capture" cards_data={cards_data} redirectTo='../unexpected'/>
  )
}

export default Capture