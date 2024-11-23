import React from 'react'
import leads from'../../Utils/images/Serve/unexpected/lead_generation/create_compelling_offers.webp'
import sales_team from'../../Utils/images/Serve/unexpected/confirmation/sales_team.webp'
import crm_system from'../../Utils/images/Serve/unexpected/confirmation/crm_system.webp'
import communication_channels from'../../Utils/images/Serve/unexpected/confirmation/communication_channels.webp'
import lead_confirmation_process from'../../Utils/images/Serve/unexpected/confirmation/lead_confirmation_process.webp'
import marketing_materials from'../../Utils/images/Serve/unexpected/confirmation/marketing_materials.webp'
import lead_conversion_metrics from'../../Utils/images/Serve/unexpected/confirmation/lead_conversion_metrics.webp';
import CardsGrid from '../../Components/Serve/Unexpected/CardsGrid'

function Confirmation() {

  const cards_data = [
    {id:1, imgSrc : leads, title:'Leads'},
    {id:2, imgSrc : sales_team, title:'Sales Team / Representative'},
    {id:3, imgSrc : crm_system, title:'CRM System'},
    {id:4, imgSrc : communication_channels, title:'Communication Channels'},
    {id:5, imgSrc : lead_confirmation_process, title:'Lead Confirmation Process'},
    {id:6, imgSrc : marketing_materials, title:'Marketing Materials / Content'},
    {id:7, imgSrc : lead_conversion_metrics, title:'Lead Conversion Metrics'},
  ]

  return (
    <CardsGrid component_className="confirmation_wrapper" backLink="../unexpected/capture" nextLink="" title="Confirmation" cards_data={cards_data} redirectTo='../unexpected'/>
  )
}

export default Confirmation