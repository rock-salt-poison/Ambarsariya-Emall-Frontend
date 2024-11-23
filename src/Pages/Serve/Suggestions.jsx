import React from 'react'
import lead_qualification from'../../Utils/images/Serve/unexpected/confirmation/lead_confirmation_process.webp'
import referral_programs from'../../Utils/images/Serve/unexpected/capture/referral_programs.webp'
import needs_and_pain_points from'../../Utils/images/Serve/unexpected/suggestions/needs_and_pain_points.webp'
import budget from'../../Utils/images/Serve/unexpected/suggestions/budget.webp'
import authority from'../../Utils/images/Serve/unexpected/suggestions/authority.webp'
import interest_level from'../../Utils/images/Serve/unexpected/suggestions/interest_level.webp'
import timeline from'../../Utils/images/Serve/unexpected/suggestions/timeline.webp'
import communication_history from'../../Utils/images/Serve/unexpected/suggestions/communication_history.webp'
import lead_score from'../../Utils/images/Serve/unexpected/suggestions/lead_score.webp'
import competitor_involvement from'../../Utils/images/Serve/unexpected/suggestions/competitor_involvement.webp'
import commitment_indicators from'../../Utils/images/Serve/unexpected/suggestions/commitment_indicators.webp'
import risk_assessment from'../../Utils/images/Serve/unexpected/suggestions/risk_assessment.png'
import legal_and_compliance_considerations from'../../Utils/images/Serve/unexpected/suggestions/legal_and_compliance_considerations.png'
import final_validation from'../../Utils/images/Serve/unexpected/suggestions/final_validation.webp'
import CardsGrid from '../../Components/Serve/Unexpected/CardsGrid'

function Suggestions() {

  const cards_data = [
    {id:1, imgSrc : lead_qualification, title:'Lead Qualification'},
    {id:2, imgSrc : needs_and_pain_points, title:'Needs and Pain points'},
    {id:3, imgSrc : budget, title:'Budget'},
    {id:4, imgSrc : authority, title:'Authority'},
    {id:5, imgSrc : interest_level, title:'Interest Level'},
    {id:6, imgSrc : timeline, title:'Timeline'},
    {id:7, imgSrc : communication_history, title:'Communication History'},
    {id:8, imgSrc : lead_score, title:'Lead Score'},
    {id:9, imgSrc : competitor_involvement, title:'Competitor Involvement'},
    {id:10, imgSrc : commitment_indicators, title:'Commitment Indicators'},
    {id:11, imgSrc : referral_programs, title:'Referrals and Recommendations'},
    {id:12, imgSrc : risk_assessment, title:'Risk Assessment'},
    {id:13, imgSrc : legal_and_compliance_considerations, title:'Legal and Compliance Considerations'},
    {id:14, imgSrc : final_validation, title:'Final Validation'},
  ]

  return (
    <CardsGrid component_className="suggestions_wrapper" backLink="../unexpected/lead_generation" nextLink="../unexpected/capture" title="Suggestions" cards_data={cards_data} redirectTo='../unexpected'/>
  )
}

export default Suggestions