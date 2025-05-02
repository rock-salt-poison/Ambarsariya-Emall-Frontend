import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../../Form/GeneralLedgerForm';
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import { get_member_event_purpose, get_member_event_purpose_engagement, getUser, post_memberRelations } from '../../../../API/fetchExpressAPI';
import CustomSnackbar from '../../../CustomSnackbar';
import { useSelector } from 'react-redux';

function CreateEventForm() {

    const themeProps = {
        popoverBackgroundColor: '#fff',
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
    const [eventPurpose, setEventPurpose] = useState([]);
    const [eventEngagement, setEventEngagement] = useState([]);

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

      const fetchEventPurpose = async (event_type) => {
        if(event_type){
            try{
                setLoading(true);
                const resp = await get_member_event_purpose(event_type);
                if(resp.valid){
                    setEventPurpose(resp?.data);
                    console.log(resp?.data);
                    
                }
            }catch(e){
                console.error(e);
            }finally{
                setLoading(false);
            }
        }
      }


      const fetchEventPurposeEngagement = async (event_type, event_purpose_id) => {
        if(event_type && event_purpose_id){
            try{
                setLoading(true);   
                const resp = await get_member_event_purpose_engagement(event_type, event_purpose_id);
                if(resp.valid){
                    console.log(resp?.data);
                    setEventEngagement(resp?.data);
                }
            }catch(e){
                console.error(e);
            }finally{
                setLoading(false);
            }
        }
      }

    
      useEffect(() => {
        if (token) {
          fetchCurrentUserData(token);
        }
      }, [token])

      useEffect(()=> {
        if(formData.event_type){
            fetchEventPurpose((formData?.event_type).toLowerCase())            
        }
      }, [formData.event_type]);

      useEffect(()=> {
        if(formData.event_type && formData.event_purpose){
            console.log(formData?.event_type, formData?.event_purpose);

            const selectedEvent = eventPurpose?.filter((event)=>event.purpose===formData?.event_purpose && event.event_type === (formData?.event_type)?.toLowerCase());
            console.log(selectedEvent);
            
            if(selectedEvent){
                console.log(selectedEvent?.[0]?.event_type, selectedEvent?.[0]?.id);
                
                fetchEventPurposeEngagement(selectedEvent?.[0]?.event_type, selectedEvent?.[0]?.id);
            }
        }
      }, [formData.event_type, formData.event_purpose, eventPurpose]);
    

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
            options: eventPurpose?.map((event)=>event.purpose)
        },
        {
            id: 3,
            label: 'Event engagement',
            name: 'event_engagement',
            type: 'select',
            options:eventEngagement?.map((event)=>event?.engagement),
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
            id: 10,
            label: 'Set time',
            name: 'time',
            type: 'time',
        },
        {
            id: 11,
            label: 'Rules or Description',
            name: 'rules_or_description',
            type: 'text',
            placeholder:'Rules or Description',
        },
        {
            id: 12,
            label: 'Upload File',
            name: 'file',
            type: 'file',
            placeholder:'Upload File',
        },            
    ];

        
    const handleChange = (event) => {
        const { name, value } = event.target;

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
