import { Box } from '@mui/material'
import React from 'react'
import logo from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/diet_plan_logo.svg'
import monday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/monday.svg'
import tuesday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/tuesday.svg'
import wednesday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/wednesday.svg'
import thursday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/thursday.svg'
import friday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/friday.svg'
import saturday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/saturday.svg'
import funday from '../../../Utils/images/Serve/emotional/eshop_member/diet_plan/funday.webp'

function DietPlan() {

    const grid_data = [
        { id: 1, cName:'ad'},
        { id: 2, imgsrc: logo, alt: 'logo', cName: 'logo' },
        { id: 3, cName:'ad'},
        { id: 4, imgsrc: monday, alt: 'monday', cName: 'day1' },
        { id: 5, imgsrc: tuesday, alt: 'tuesday', cName: 'day2' },
        { id: 6, imgsrc: wednesday, alt: 'wednesday', cName: 'day3' },
        { id: 7, imgsrc: thursday, alt: 'thursday', cName: 'day4' },
        { id: 8, imgsrc: friday, alt: 'friday', cName: 'day5' },
        { id: 9, imgsrc: saturday, alt: 'saturday', cName: 'day6' },
        { id: 10, cName:'ad'},
        { id: 11, imgsrc: funday, alt: 'funday', cName: 'funday' },
        { id: 12, cName:'ad'},
    ]

    return (
        <Box className="diet_plan_wrapper">
            <Box className="row">
                <Box className="col">
                    {grid_data.map((data) => {
                        return <Box key={data.id} className={data.imgsrc ? "card" : 'card ad'}>
                            {data.imgsrc &&  <Box component="img" src={data.imgsrc} alt={data.alt} className={data.cName} />}
                           
                        </Box>
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default DietPlan