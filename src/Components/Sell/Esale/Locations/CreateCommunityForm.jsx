import React, { useEffect, useState } from 'react';
import GeneralLedgerForm from '../../../Form/GeneralLedgerForm';
import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../styles/CustomSelectDropdownTheme';
import { get_googleContacts, get_memberRelationSpecificGroups, get_memberRelationTypes, getUser, post_memberCommunity, post_memberRelations } from '../../../../API/fetchExpressAPI';
import CustomSnackbar from '../../../CustomSnackbar';
import { useSelector } from 'react-redux';

function CreateCommunityForm() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
    };
    
    const theme = createCustomTheme(themeProps);

    const initialData = {
        community:'',
        journal:'',
        relation:'',
        relation_id:'',
        group:'',
        media:'',
        file:''
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = useSelector((state) => state.auth.userAccessToken);
    const [user, setUser] = useState({});
    const [relationType, setRelationType] = useState([]);
    const [groups, setGroups] = useState([]);
    
    const fetchCurrentUserData = async (token) => {
        if (token) {
          try {
            setLoading(true);
            const resp = await getUser(token);
            if (resp?.[0].user_type === "member") {
              const userData = resp?.[0];
              setUser(userData);

              const relationTypeData = await get_memberRelationTypes(userData?.member_id);
              if(relationTypeData.valid){
                setRelationType(relationTypeData?.data);
              }
            }
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }
      };      
    
      const fetchMemberRelationSpecificGroups = async (member_id, selectedRelation) => {
        try{
            setLoading(true);
            const resp = await get_memberRelationSpecificGroups(member_id, selectedRelation);
            if(resp.valid){
                setGroups(resp.data);
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
      
      


    const formFields = [
        {
            id: 1,
            label: 'Community',
            placeholder:'Select Community',
            name: 'community',
            type: 'select',
            options: [
                'Local Issues and Solutions',
                'Creative Collaborations',
                'Wellness and Mindfulness',
                'Community Events and Gatherings',
                'Sustainability Initiatives',
                'Youth Empowerment',
                'Cultural Diversity Celebration',
                'Neighborhood Watch & Safety Tips',
                'Small Business Support Network',
                'Pet Lovers Corner'
            ]
        },
        {
            id: 2,
            label: 'Journal',
            placeholder:'Select Journal',
            name: 'journal',
            type: 'select',
            options: [
                'Community Newsletters',
                'Civic Engagement Journals',
                'Cultural or Heritage Journals',
                'Academic or Research-Based Community Journals',
                'Health and Wellness Journals',
                'Environmental or Sustainability Journals',
                'Youth or School Journals',
                'Faith-Based or Religious Community Journals'
            ]
        },
        {
            id: 3,
            label: 'Relation',
            placeholder: 'Select Relation',
            name: 'relation',
            type: 'select',
            options: relationType?.map((relation)=>relation.relation_name)
        },
        {
            id: 4,
            label: 'Group',
            placeholder: 'Select Group',
            name: 'group',
            type: 'select',
            options: groups?.map((group)=>`${group.id} | ${group.name_group}`)
        },
        {
            id: 5,
            label: 'Media',
            placeholder:'Choose media for spreading community',
            name: 'media',
            type: 'select',
            options:['Youtube', 'Snap', 'Instagram', 'Facebook']
        }, 
        {
            id: 6,
            label: 'Upload file',
            name: 'file',
            type: 'file',
            placeholder:'Upload file',
        },   
    ];

        
    const handleChange = (event) => {
        const { name, value, files, type } = event.target;
    
        let fieldValue = type === "file" ? files[0] : value;

        if (name === 'relation' && value) {
            // Extract the phone number from mentor field (split by "|")
            fetchMemberRelationSpecificGroups(user?.member_id, value);
        } 
        if (name === 'group') {
            console.log(value);
            const [relationId, groupName] = value.split(' | ');
            console.log(relationId);
            console.log(groupName);
            
            setFormData({
              ...formData,     // name for display
              [name]: fieldValue,
              relation_id: relationId      // id for backend
            });
          } else {
            setFormData({ ...formData, [name]: fieldValue });
          }         

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };


    console.log(formData?.member_phone_no);
    

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
                    
                    const groupName = formData?.group?.split(' | ')?.[1];
                    const data = {
                        member_id: user.member_id,
                        user_id: user.user_id, 
                        community : formData.community,
                        journal : formData.journal,
                        relation : formData.relation,
                        member_relation_id : formData.relation_id,
                        group_name : groupName,
                        media : formData.media,
                        file: formData.file
                    };

                    const resp = await post_memberCommunity(data);
                    console.log(resp);
                    setSnackbar({ open: true, message: resp.message, severity: 'success' });        
                    setFormData(initialData);           
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

export default CreateCommunityForm;
