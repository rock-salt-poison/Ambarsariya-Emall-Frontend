import React from 'react'
import lead_creation from'../../Utils/images/Serve/unexpected/lead_generation/lead_creation.webp'
import create_compelling_offers from'../../Utils/images/Serve/unexpected/lead_generation/create_compelling_offers.webp'
import leverage_multiple_channels from'../../Utils/images/Serve/unexpected/lead_generation/leverage_multiple_channels.webp'
import seo from'../../Utils/images/Serve/unexpected/lead_generation/seo.webp'
import implement_lead_scoring from'../../Utils/images/Serve/unexpected/lead_generation/implement_lead_scoring.webp'
import retargeting_strategies from'../../Utils/images/Serve/unexpected/lead_generation/retargeting_strategies.webp'
import offer_free_trials_and_demo from'../../Utils/images/Serve/unexpected/lead_generation/offer_free_trials_and_demo.webp'
import build_strong_relationships from'../../Utils/images/Serve/unexpected/lead_generation/build_strong_relationships.webp'
import monitor_and_analyze_performance from'../../Utils/images/Serve/unexpected/lead_generation/monitor_and_analyze_performance.webp'
import CardsGrid from '../../Components/Serve/Unexpected/CardsGrid'

function LeadGeneration() {

  const cards_data = [
    {id:1, imgSrc : lead_creation, title:'Lead Creation'},
    {id:2, imgSrc : create_compelling_offers, title:'Create compelling offers'},
    {id:3, imgSrc : leverage_multiple_channels, title:'Leverage Multiple Channels'},
    {id:4, imgSrc : seo, title:'Use SEO and SEM'},
    {id:5, imgSrc : implement_lead_scoring, title:'Implement lead scoring'},
    {id:6, imgSrc : retargeting_strategies, title:'Retargeting strategies '},
    {id:7, imgSrc : offer_free_trials_and_demo, title:'Offer free trials and demo'},
    {id:8, imgSrc : build_strong_relationships, title:'Build strong relationships'},
    {id:9, imgSrc : monitor_and_analyze_performance, title:'Monitor and Analyze Performance'},
  ]

  return (
    <CardsGrid cards_data={cards_data} component_className="lead_generation_wrapper" title="Lead Generation" backLink='../unexpected' nextLink="../unexpected/suggestions" redirectTo='../unexpected'/>
  )
}

export default LeadGeneration