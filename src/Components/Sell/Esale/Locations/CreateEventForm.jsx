import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../../Form/GeneralLedgerForm';
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import { getUser, post_memberRelations } from '../../../../API/fetchExpressAPI';
import CustomSnackbar from '../../../CustomSnackbar';
import { useSelector } from 'react-redux';

function CreateEventForm() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        event_type:'',
        event_purpose:'',
        event_engagement:'',
        event_name:'',
        mentor_name:'',
        relations:'',
        groups:'',
        location:'',
        date:'',
        time:'',
        rules_or_description:'',
        file:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = useSelector((state) => state.auth.userAccessToken);
    const [user, setUser] = useState({});
    const [contacts, setContacts] = useState([]);

    const fetchCurrentUserData = async (token) => {
        if (token) {
          try {
            setLoading(true);
            const resp = await getUser(token);
            if (resp?.[0].user_type === "member") {
              const userData = resp?.[0];
              setUser(userData);
      
            }
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }
      };      

    
      useEffect(() => {
        if (token) {
          fetchCurrentUserData(token);
        }
      }, [token])

      
    const event = {
        public: [
            {id: 1, name :'Entertainment Events', engagement: [
                'Concerts & Music Festivals', 'Film Screenings & Film Festivals', 'Comedy Shows', 'Cultural Performances'
            ]},
            {id: 2, name :'Commercial & Promotional Events', engagement: [
                'Trade Shows and Expos', 'Product Launches', 'Pop-up Shops & Markets', 'Brand Activations'
            ]},
            {id: 3, name :'Cultural & Religious Events', engagement: [
                'Cultural Festivals', 'Religious Gatherings or Processions', 'Traditional Ceremonies', 'Food or Craft Fairs'
            ]},
            {id: 4, name :'Educational Events', engagement: [
                'Public Lectures & Talks', 'Workshops & Seminars', 'Science Fairs', 'Exhibitions'
            ]},
            {id: 5, name :'Civic & Political Events', engagement: [
                'Political Rallies', 'Town Halls', 'Public Protests or Demonstrations', 'Awareness Campaigns'
            ]},
            {id: 6, name :'Sports & Recreational Events', engagement: [
                'Marathons & Runs', 'Sports Matches & Tournaments', 'Fitness Bootcamps or Zumba in the park', 'Esports Tournaments'
            ]},
            {id: 7, name :'Community & Volunteer Events', engagement: [
                'Clean-Up Drives', 'Tree Planting Events', 'Fundraisers', 'Charity Walks or Bike Rides'
            ]},
            {id: 8, name :'Virtual or Hybrid Events', engagement: [
                'Webinars', 'Virtual Conferences', 'Online Live Concerts or Streams', 'Online Game Nights or Hackathons'
            ]},
        ],
        private : [
            {id: 1, name :'Social Events', engagement: [
                'Meetups', 'Parties', 'Game nights', 'Movie watch parties'
            ]},
            {id: 2, name :'Professional or Work-Related Events', engagement: [
                'Team meetings', 'Workshops or training sessions', 'Brainstorming Sessions', 'Webinars or presentations', 'Deadlines or project milestones'
            ]},
            {id: 3, name :'Educational Events', engagement: [
                'Study groups', 'Tutoring sessions', 'Q&A sessions with experts', 'Book club discussions', 'Book club discussions', 'Online classes or lectures'
            ]},
        ]
    }

    const formFields = [
        {
            id: 1,
            label: 'Select event type',
            placeholder:'Select event type',
            name: 'event_type',
            type: 'select',
            options: ['Public', 'Private']
        },
        // ...(formData.relation === 'Others' ? [{
        //     id: '1.1',
        //     label: 'Specify Relation',
        //     name: 'other_relation',
        //     type: 'text',
        //     placeholder: 'Enter custom relation'
        // }] : []),
        {
            id: 2,
            label: 'Select event purpose',
            placeholder:'Select event purpose',
            name: 'event_purpose',
            type: 'select',
            options: ['Entertainment Events', 'Commercial & Promotional Events']
        },
        {
            id: 3,
            label: 'Event engagement',
            name: 'event_engagement',
            type: 'text',
            placeholder:'Event Engagement',
        },
        {
            id: 4,
            label: 'Event Name',
            name: 'event_name',
            type: 'text',
        },
        {
            id: 5,
            label: 'Mentor Name',
            name: 'mentor_name',
            type: 'text',
            placeholder:'Mentor Name'
        }, 
        {
            id: 6,
            label: 'Add Relations',
            name: 'relations',
            type: 'select-check',
            options: ['abc'],
            placeholder:'Add Relations',
        },    
        {
            id: 7,
            label: 'Add groups',
            name: 'groups',
            type: 'select-check',
            options:['abc'],
            placeholder:'Add groups'
        },
        {
            id: 8,
            label: 'Select location',
            name: 'location',
            type: 'address',
            placeholder:'Select location',
        },
        {
            id: 9,
            label: 'Set date',
            name: 'date',
            type: 'date',
        },
        {
            id: 9,
            label: 'Set time',
            name: 'time',
            type: 'time',
        },
        {
            id: 10,
            label: 'Rules or Description',
            name: 'rules_or_description',
            type: 'text',
            placeholder:'Rules or Description',
        },
        {
            id: 11,
            label: 'Upload File',
            name: 'file',
            type: 'file',
            placeholder:'Upload File',
        },            
    ];

        
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value });

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Validate main fields
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            console.log(formData);
                try{
                    setLoading(true);

                    const selectedPeople = formData.people.map((personName) => {
                        return contacts.find((contact) => contact.name === personName);
                      });
                      
                    const data = {
                        member_id: user.member_id,
                        user_id: user.user_id, 
                        relation: formData.relation,
                        other_relation: formData.other_relation || null,
                        place_name: formData.place_name,
                        address: formData.address.description,
                        latitude: formData.address.latitude,
                        longitude: formData.address.longitude,
                        work_yrs: formData.work_yrs,
                        ongoing_or_left: formData.ongoing_or_left,
                        people: JSON.stringify(selectedPeople),
                        name_group: formData.group,
                        mentor: formData.mentor,
                        member_phone_no: formData.member_phone_no,
                        people_list: formData.people_list,
                        community: formData.community,
                        last_topic: formData.last_topic,
                        last_event: formData.last_event,
                        total_score: formData.total_score,
                        position_score: formData.position_score,
                        arrange_event: formData.arrange_event,
                        next_event: formData.next_event,
                        passed_event: formData.passed_event
                    };

                    const resp = await post_memberRelations(user.member_id, user.user_id, data);
                    console.log(resp);
                    setSnackbar({ open: true, message: resp.message, severity: 'success' });                   
                }catch(e){
                    console.error(e);
                    setSnackbar({ open: true, message: e.response.data.message, severity: 'error' });

                }finally{
                    setLoading(false);
                }
        } else {
            console.log(errors);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {loading && <Box className="loading"><CircularProgress/></Box> }
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
            submitBtnVisibility={true}
            // submit button text 
        />
        <CustomSnackbar
            open={snackbar.open}
            handleClose={() => setSnackbar({ ...snackbar, open: false })}
            message={snackbar.message}
            severity={snackbar.severity}
        />
        </ThemeProvider>
    );
}

export default CreateEventForm;
