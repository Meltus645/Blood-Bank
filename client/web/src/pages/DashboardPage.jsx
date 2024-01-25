import { fetch_centers } from "../api/center-api";
import { fetch_donors } from "../api/account-api";
import AuthContext from '../context/auth-context';
import { StatCard, Form, Modal, Requests } from "../components";
import { useContext, useEffect, useState } from "react";
import { add_donation, fetch_donations } from "../api/donation-api";
import AppointmentsComponent from "../components/AppointmentsComponent";
import { faChartLine, faDroplet, faHospitalAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
  const [donors, setDonors] =useState([]);
  const [centers, setCenters] =useState([]);
  const {name} =useContext(AuthContext);
  const [donations, setDonations] =useState([]);
  const [donationsNearingExpiry, setDonationsNearingExpiry] =useState([]);
  const [modalVisible, setModalVisible] =useState(false);
  const [critcalCases, setCriticalCases] =useState([])
  
  useEffect(() =>{
    (async () =>{
      const {status, result} =await fetch_donors();
      if(status ==200){
        const donorsDetails =[...result].map(({_id, first_name, last_name}) =>{
          return {value: _id.toString(), label: `${first_name} ${last_name}`};
        })
        setDonors(donorsDetails);
      }
    })();
    (async () =>{
      const {status, result} =await fetch_centers();
      if(status ==200){
        const centersDetails =[...result].map(({_id, name}) =>{
          return {value: _id.toString(), label: name};
        })
        setCenters(centersDetails);
      }
    })();
    (async () =>{
      const {status, result} =await fetch_donations();
      if(status ==200){
        const donationDetails =[...result].map(({_id, donated_on, expires_after}) =>{
          return {value: _id.toString(), donated_on, expires_after};
        })
        setDonationsNearingExpiry(donationDetails.filter(item =>{
          const {donated_on, expires_after} =item;
          const then =new Date(donated_on);
          const now =new Date(); 
          const expiry_date =new Date(then);
          expiry_date.setDate(then.getDate() +expires_after);
          if(Math.floor((now - expiry_date) / (1000 * 60 * 60 * 24)) >10) return item;
        }))
        setDonations(donationDetails);
      }
    })();
  }, []);

  const fields =[
    [{name: 'units', type: 'number', label: 'Units', placeholder: 'Enter units of blood donated', validations: {
      required: {
        value: true,
        message: 'Blood units required*',
      }
    }},],
    [{name: 'center', type: 'select', label: 'Center', options :[
      {value: '', label: '--- select center ---', disabled: true},
      ...centers
    ], validations: {
      required: {
        value: true,
        message: 'Center required*',
      }
    }},
    {name: 'donor', type: 'select', label: 'Donor', options :[
      {value: '', label: '--- select donor ---', disabled: true},
      ...donors
    ],validations: {
      required: {
        value: true,
        message: 'Donor required*',
      }
    }}
  ],
    [{name: 'donated_on', type: 'date', label: 'Donated on', validations: {
      required: {
        value: true,
        message: 'Date of donation required*',
      }
    }},
      {name: 'expires_after', type: 'number', label: 'Expires in', placeholder: 'Enter number of days before expiry', validations: {
      required: {
        value: true,
        message: 'Validity period required',
      }
    }}],
  ];
  const saveDonation =async values =>{
    const {status, message, data} =await add_donation(values)
    if(status ==201){
      setDonations([...donations, {id: data._id}])
      setModalVisible(false);
    }else alert(message)
  };

  return (
    <>
    <Helmet>
      <title>Admin Dashboard</title>
    </Helmet>
    <main className='h-full p-8 grid grid-rows-[max-content_max-content_auto] gap-8'>
      <div className="flex flex-col gap-4">
        <div className="bg-white shadow p-3 rounded flex items-center justify-between">
          <h1 className='text-lg font-[600]'>Stock</h1> 
          <p className='text-sm'>Welcome {name}</p>
          <button onClick={() =>setModalVisible(true)} className='bg-blue-500 text-white font-bold uppercase text-center px-4 py-2 rounded block w-max h-max'>Add +</button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <StatCard label={'In Stock'} value={donations.length} icon={faChartLine}/>
          <StatCard label={'Near Expiry'} value={donationsNearingExpiry.length} icon={faDroplet}/>
          <StatCard label={'Critical Requests'} value={critcalCases.length} icon={faDroplet}/>
          <StatCard label={'Donation Centers'} value={centers.length} icon={faHospitalAlt}/>
          <StatCard label={'Donors'} value={donors.length} icon={faUsers}/>
        </div>
      </div>
        <div className="">
          <div className="bg-white shadow p-3 rounded flex items-center justify-between"><h1 className='text-lg font-[600]'>Appointments</h1></div>
          <AppointmentsComponent />
          <div className="bg-white shadow p-3 rounded flex items-center justify-between"><h1 className='text-lg font-[600]'>Donation Requests</h1></div>
          <Requests setCriticalCases={setCriticalCases}/>
        </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <Form fields={fields} title={'New Donation'} onSubmit={saveDonation}>
        <button type='submit' className="block text-center bg-blue-500 text-white uppercase py-2">Save</button>
        </Form>
    </Modal>
    </main>
    </>
  )
}

export default DashboardPage;