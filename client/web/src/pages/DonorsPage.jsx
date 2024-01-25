import AuthContext from "../context/auth-context";
import { Form, Modal, Table } from "../components";
import { useContext, useEffect, useState } from "react";
import { createUser, delete_user, fetch_donors, fetch_user, update_user } from "../api/account-api";
import { Helmet } from "react-helmet";

const DonorsPage = () => {
  const {name} =useContext(AuthContext);
  const ACTIONS ={ REGISTER: 0,  UPDATE: 1,};
  const [defaultFormValues, setDefautFormValues] =useState({});
  const [donorOriginalDetails, setDonorOriginalDetails] =useState({});
  const [formAction, setFormAction] =useState(ACTIONS.REGISTER);
  

  const fields =[
    [{name: 'first_name', type: 'text', label: 'First Name', placeholder: 'Enter first name', validations: {
      required: {
        value: true,
        message: 'First name required*',
      }
    }},
    {name: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Enter last name', validations: {
      required: {
        value: true,
        message: 'Last name required*',
      }
    }}],
    [{name: 'email', type: 'email', label: 'Email', placeholder: 'Enter email', validations: {
      required: {
        value: true,
        message: 'Email required*',
      }
    }},
    {name: 'location', type: 'text', label: 'Location', placeholder: 'Donor Location', validations: {
      required: {
        value: true,
        message: 'Donor Location required*',
      }
    }}],
    [{name: 'bloodGroup', type: 'select', label: 'Blood Group', options :[
      {value: '', label: '--- select blood group ---', disabled: true},
      {value: 'A', label: 'A'},
      {value: 'AB', label: 'AB'},
      {value: 'B', label: 'B'},
      {value: 'O', label: 'O'},
    ], validations: {
      required: {
        value: true,
        message: 'Donor blood group required*',
      }
    }},
    {name: 'rhesusFactor', type: 'select', label: 'Rhesus Factor', options :[
      {value: '', label: '--- select rhesus factor ---', disabled: true},
      {value: '+', label: '+'},
      {value: '-', label: '-'},
    ],validations: {
      required: {
        value: true,
        message: 'Donor blood rhesus required*',
      }
    }}
  ],
    [
      {name: 'profile_photo', type: 'file', label: 'Profile Photo', validations: {
        required: formAction ==ACTIONS.REGISTER? {value: true, message: 'Profile photo required'} : {}
      }},
      {name: 'password', type: 'password', label: 'Password', placeholder: 'Enter Password', validations: {
        required: {
          value: true,
          message: 'Password required*',
        }
      }}
    ],
  ];
  const [donorsData, setDonorsData] =useState([])
  useEffect(() =>{
    (async () =>{
      const {result, status} =await fetch_donors();
      if(status ==200){
        const donors =[...result].map(({_id, first_name, last_name, contact_details ={}, blood_type ={}}) =>({id: _id, name: `${first_name} ${last_name}`, email: contact_details.email, location:contact_details.location, 'blood Group': `${blood_type?.bloodGroup || 'O'}${blood_type?.rhesusFactor||'-'}`}));
        setDonorsData(donors);
      }
    })();
  }, [donorsData]);

  const [modalVisible, setModalVisible] =useState(false);
  const saveUser =async values =>{
    const {first_name, last_name, email, location, bloodGroup, rhesusFactor, profile_photo, password} =values;
      const file =new FileReader();
      file.onload =async () =>{
          const {status, message, data} =await createUser({role: 'donor', bio: {first_name, last_name}, contact: {email, location}, blood_type: {bloodGroup, rhesusFactor}, login: {password}, profile_photo: file.result});
          if(status ==201){
            const {_id, first_name, last_name, contact_details ={}, blood_type ={}} =data;
            setDonorsData([...donorsData, {id: _id, name: `${first_name} ${last_name}`, email: contact_details.email, location:contact_details.location, 'blood Group': `${blood_type?.bloodGroup || 'O'}${blood_type?.rhesusFactor||'-'}`}]);
            setModalVisible(false);
          }else alert(message);
        }
      file.readAsDataURL(profile_photo[0]);

  }

  const updateUser =async values =>{
    const {first_name, last_name, email, location, bloodGroup, rhesusFactor, profile_photo, password} =values;
    if(profile_photo.length){
      const file =new FileReader();
      file.onload =async () =>{
        const {status, message, data} =await createUser({role: 'donor', bio: {first_name, last_name}, contact: {email, location}, blood_type: {bloodGroup, rhesusFactor}, login: {password}, profile_photo: file.result});
        if(status ==200){bv 
          const {_id, first_name, last_name, contact_details ={}, blood_type ={}} =data;
          setDonorsData([...donorsData, {id: _id, name: `${first_name} ${last_name}`, email: contact_details.email, location:contact_details.location, 'blood Group': `${blood_type?.bloodGroup || 'O'}${blood_type?.rhesusFactor||'-'}`}]);
        }else alert(message);
      }
      file.readAsDataURL(profile_photo[0]);
    }else{
      const {first_name, last_name, email, location, bloodGroup, rhesusFactor, password} =values
      const details ={...donorOriginalDetails, login: {password}, bio: {first_name, last_name}, contact_details: {email, location}, blood_type: {bloodGroup, rhesusFactor}};
      const {message, status} =await update_user( details._id, details);
      if(status ==200){
        const updated_data ={id: details._id, name: `${first_name} ${last_name}`, email, location, 'blood Group': `${bloodGroup}${rhesusFactor}`}
        const donorFound =donorsData.find((donor, index) =>donor.id ==details.id? index: null);
        if(donorFound){
          const donor =[...donorsData]
          donor[donorFound] =updated_data;
          setDonorsData(donor);
        }
        setModalVisible(false);
      }else alert(message);
    }
    setModalVisible(false);
    setFormAction(ACTIONS.REGISTER);
  }

  const onEdit =async id =>{
    const {message, status, result} =await fetch_user(id);
    if(status ==200){
      setFormAction(ACTIONS.UPDATE);
      setDonorOriginalDetails(result);
      const {blood_type: {bloodGroup, rhesusFactor}, first_name, last_name, password, contact_details: {email, location}} =result;
      const defaultValues ={bloodGroup, rhesusFactor, first_name, last_name, email, location, password};
      setDefautFormValues(defaultValues);
      setModalVisible(true);
    }else alert(message);
  }
  const onDelete =async id =>{
    if(confirm("Are you sure to delete donor? This action cannot be undone!")){
      const {status, message} =await delete_user(id);
      if(status ==200){
        alert(message);
        setDonorsData([...donorsData].filter(donor =>donor.id !=id));
      }else alert(message);
    }
  }
  return (
    <>
      <Helmet>
        <title>Donors Page</title>
      </Helmet>
      <main className='h-full p-8 grid grid-rows-[max-content_max-content_auto] gap-5'>
        <div className="bg-white shadow p-3 rounded flex items-center justify-between"><h1 className='text-lg font-[600]'>Donation Centers</h1> <p className='text-sm'>Welcome {name}</p></div>
        <div className="flex bg-white rounded shadow justify-between items-center px-5 py-3">
          <h2 className='font-bold text-xl'>Manage Donors</h2>
          <button onClick={() =>setModalVisible(true)} className='bg-blue-500 text-white font-bold uppercase text-center px-4 py-2 rounded block w-max'>Add +</button>
        </div>
        <div className="">
          <Table data={donorsData} onDelete={onDelete} onEdit={onEdit}/>
        </div>
        <Modal visible={modalVisible} setVisible={setModalVisible}>
          <Form fields={fields} title={'New Donor'} onSubmit={formAction ==ACTIONS.REGISTER? saveUser: updateUser} defaultValues={defaultFormValues}>
          <button type='submit' className="block text-center bg-blue-500 text-white uppercase py-2">Save</button>
          </Form>
        </Modal>
      </main>
    </>
  )
}

export default DonorsPage;