import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../../Form/GeneralLedgerForm';
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import { get_googleContacts, getUser, post_memberRelations } from '../../../../API/fetchExpressAPI';
import CustomSnackbar from '../../../CustomSnackbar';
import { useSelector } from 'react-redux';

function Tab_content() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        relation:'',
        other_relation:'',
        place_name:'',
        address:'',
        work_yrs:'',
        ongoing_or_left:'',
        people:'',
        group:'',
        mentor:'',
        member_phone_no:'',
        people_list:'',
        community:'',
        last_topic:'',
        last_event:'',
        total_score:'',
        position_score:'',
        arrange_event:'',
        next_event:'',
        passed_event:'',
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

      const fetch_googleContacts = async (member_id, user_id) => {
        try{
            setLoading(true);
            const resp = await get_googleContacts(member_id, user_id);
            if(resp.success){
                setContacts(resp.contacts);
                console.log(resp.contacts);
            }            
        }catch(e){
            console.error(e);
        }finally{
            setLoading(false);
        }
      }
    
      useEffect(() => {
        if (token) {
          fetchCurrentUserData(token);
        }
      }, [token])

      useEffect(()=>{
        if(user){
            fetch_googleContacts(user.member_id, user.user_id);
        }
      }, [user])

    const formFields = [
        {
            id: 1,
            label: 'Relation',
            placeholder:'Select Relation',
            name: 'relation',
            type: 'select',
            options: ['All Buddies', 'Children', 'Couples', 'Direct Friends', 'Neighbors', 'Parents', 'Siblings', 'Recommended People', 'Others']
        },
        ...(formData.relation === 'Others' ? [{
            id: '1.1',
            label: 'Specify Relation',
            name: 'other_relation',
            type: 'text',
            placeholder: 'Enter custom relation'
        }] : []),
        {
            id: 2,
            label: 'Name of the place',
            placeholder:'name',
            name: 'place_name',
            type: 'text',
        },
        {
            id: 3,
            label: 'Address',
            name: 'address',
            type: 'address',
            placeholder:'Address',
        },
        {
            id: 4,
            label: 'Work Years',
            name: 'work_yrs',
            type: 'number',
        },
        {
            id: 5,
            label: 'On going / left',
            name: 'ongoing_or_left',
            type: 'radio',
            radioItems: [
                {id:1, value:'On going'},
                {id:2, value:'Left'},
            ]
        }, 
        {
            id: 6,
            label: 'People',
            name: 'people',
            type: 'select-check',
            options: contacts ? contacts.map((contact)=>`${contact.name}`) : [],
            placeholder:'Add from gmail contacts',
        },    
        {
            id: 7,
            label: 'Name of group',
            name: 'group',
            type: 'text',
        },
        {
            id: 8,
            label: 'Mentor',
            name: 'mentor',
            type: 'text',
            placeholder:'mentor name',
        },
        {
            id: 9,
            label: 'Member phone no.',
            name: 'member_phone_no',
            type: 'phone_number',
        },
        {
            id: 10,
            label: 'Show people',
            name: 'people_list',
            type: 'select-check',
            placeholder:'List of people',
            options:['Person 1','Person 2','Person 3','Person 4','Person 5'],
        },
        {
            id: 11,
            label: 'Community',
            name: 'community',
            type: 'select',
            placeholder:'Create or Select community',
            options:['Community 1','Community 2','Community 3','Community 4','Create community'],
        },    
        {
            id: 12,
            label: 'Last topic (s)',
            name: 'last_topic',
            type: 'select',
            options:['Cigarettes in office is necessity'],
        },    
        {
            id: 13,
            label: 'Last event',
            name: 'last_event',
            type: 'text',
        },    
        {
            id: 14,
            label: 'Total Score',
            name: 'total_score',
            type: 'text',
            behavior:'numeric',
        },    
        {
            id: 15,
            label: 'Position Score',
            name: 'position_score',
            type: 'text',
        },  
        {
            id: 16,
            label: 'Arrange Event',
            name: 'arrange_event',
            type: 'text',
        },  
        {
            id: 17,
            label: 'Next Event',
            name: 'next_event',
            type: 'text',
        }, 
        {
            id: 18,
            label: 'Passed Event',
            name: 'passed_event',
            type: 'text',
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

export default Tab_content;
