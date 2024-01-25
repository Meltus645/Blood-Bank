import { useContext, useEffect, useState } from "react";
import { Form, Modal, Table } from "../components";
import { add_center, delete_center, fetch_centers, update_center } from "../api/center-api";
import AuthContext from "../context/auth-context";
import { Helmet } from "react-helmet";

const DonationCentersPage = () => {
  const {name} =useContext(AuthContext);
  const ACTIONS ={ REGISTER: 0,  UPDATE: 1,}
  const [defaultFormValues, setDefautFormValues] =useState({});
  const [formAction, setFormAction] =useState(ACTIONS.REGISTER);
  const [centerOriginalDetails, setCenterOriginalDetails] =useState({});
  const fields =[
    [
    {name: 'name', type: 'text', placeholder: 'Enter center name', label: 'Center', validations: {
      required: {
        value: true,
        message: 'Center name required*',
      }
    }},
    {name: 'location', type: 'text', placeholder: 'Enter center location', label: 'Location', validations: {
      required: {
        value: true,
        message: 'Center location required*',
      }
    }}],
    [{name: 'logo', type: 'file',  label: 'Logo', validations: {
      required: formAction ==ACTIONS.REGISTER? {value: true, message: 'Logo required'} : {}
    }},
    {name: 'operationHours', type: 'text', placeholder: 'Enter center operation hours', label: 'Operation Hours', validations: {
      required: {
        value: true,
        message: 'Hours of operation required*',
      }
    }}],
  ];
  const [centersData, setCentersData] =useState([])
  useEffect(() =>{
    (async () =>{
      const {result, status} =await fetch_centers();
      if(status ==200){
        const centers =[...result].map(({_id, name, logo, location, operationHours}) =>({id: _id, name, logo, location, 'operation Hours': operationHours}));
        setCentersData(centers);
      }
    })();
  }, []);

  const [modalVisible, setModalVisible] =useState(false);
  const saveCenter =async values =>{
    const {logo, name, location, operationHours} =values;
    const file =new FileReader();
    file.onload =async () =>{
      const {data, message, status} =await add_center({logo: file.result, name, location, operationHours});
      if(status ==201){
        if(data){
          const {_id, name, logo, location, operationHours} =data;
          setCentersData([...centersData, {id: _id, name, logo, location, 'operation Hours': operationHours}]);
          setModalVisible(false);
          return true;
        }
      }else alert(message);
    }
    file.readAsDataURL(logo[0]);
  }
  
  const updateCenter =async values =>{
    const {name, location, logo, operationHours} =values;
    if(logo?.length){
      const file =new FileReader();
      file.onload =async () =>{
        const {status, message} =await update_center(centerOriginalDetails._id, {_id: centerOriginalDetails._id, name, location, operationHours, logo: file.result});
        if(status !=200) alert(message);
      }
      file.readAsDataURL(logo[0]);
    }
    else{
      const details ={...centerOriginalDetails, name, location, operationHours};
      const {message, status} =await update_center(centerOriginalDetails._id, details);
      if(status !=200) alert(message);
    }
    setModalVisible(false);
    setFormAction(ACTIONS.REGISTER);
  }
  const handleDelete =async id =>{
    if(confirm("Are you sure? This action cannot be undone!")){
      const {status, message} =await delete_center(id);
      if(status ==200) {
        alert(message);
        setCentersData([...centersData].filter(center =>center.id !=id));
      }
      else alert(message);
    }
  }

  const handleEdit =async id =>{
    const {message, status, result} =await fetch_centers(id);
    if(status ==200){
      setFormAction(ACTIONS.UPDATE);
      const {name, operationHours, location} =result;
      setCenterOriginalDetails(result);
      setDefautFormValues({name, operationHours, location});
      setModalVisible(true);
    }else alert(message);
  }

  return (
    <>
    <Helmet>
      <title>Donation Centers</title>
    </Helmet>
    <main className='h-full p-8 grid grid-rows-[max-content_max-content_auto] gap-5'>
      <div className="bg-white shadow p-3 rounded flex items-center justify-between"><h1 className='text-lg font-[600]'>Donation Centers</h1> <p className='text-sm'>Welcome {name}</p></div>
      <div className="flex bg-white rounded shadow justify-between items-center px-5 py-3">
        <h2 className='font-bold text-xl'>Manage Centers</h2>
        <button onClick={() =>setModalVisible(true)} className='bg-blue-500 text-white font-bold uppercase text-center px-4 py-2 rounded block w-max'>Add +</button>
      </div>
      <div className="">
        <Table data={centersData} onDelete={handleDelete} onEdit={handleEdit}/>
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <Form fields={fields} title={'New Center'} onSubmit={formAction ==ACTIONS.REGISTER? saveCenter: updateCenter} defaultValues={defaultFormValues}>
        <button type='submit' className="block text-center bg-blue-500 text-white uppercase py-2">Save</button>
        </Form>
      </Modal>
    </main>
    </>
  )
}

export default DonationCentersPage;