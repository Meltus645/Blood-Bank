import { useEffect, useState } from "react"
import { fetch_appointments, review_appointment } from "../api/appointments-api";
import DataTableComponet from "./DataTableComponet";

const AppointmentsComponent = () => {

  const load_appointments =async ()=>{
    (async () =>{
      const {status, message, result} =await fetch_appointments();
      console.log(result);
      const data =[...result].filter(({status}) =>status.toLowerCase() =='pending').map(({_id, center: {name}, client: {first_name, last_name}, reason}) =>{
        return {id: _id, user: `${first_name} ${last_name}`, center: name, reason}
      })
      if(status ==200) setAppointments(data);
      else alert(message || "An error ocurred")
    })();
  }
  const onApprove =async id =>{
    const {message} =await review_appointment(id, 'approved');
      alert(message);
      load_appointments();
  }
  const onDecline =async id =>{
    if(confirm("Are you sure to decline this appointment?")){
      const {message} =await review_appointment(id, 'declined');
      alert(message);
      load_appointments();
    }
  }
  const [appointments, setAppointments] =useState([]);
  useEffect(() =>{
    load_appointments();
  }, [])
  
  return (
    <div className="flex flex-col gap-3 py-5">
      <DataTableComponet data={appointments} actions={[
        {label: 'Approve', className: 'bg-teal-700 hover:bg-teal-900', command: onApprove},
        {label: 'Decline', className: 'bg-red-700 hover:bg-red-900', command: onDecline},
      ]}/>
    </div>
  )
}

export default AppointmentsComponent