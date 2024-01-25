import { useEffect, useState } from "react";
import DataTableComponet from "./DataTableComponet";
import { fetch_donation_requests, review_request } from "../api/donation-request-api";

const DonationRequestsComponent = ({setCriticalCases}) => {
  
  const load_requests =() =>{
    (async () =>{
      const {status, message, result} =await fetch_donation_requests();
      setCriticalCases([...result].filter(({status, urgency}) =>status.toLowerCase() =='pending' && urgency.toLowerCase() =='critical'))
      const data =[...result].filter(({status}) =>status =='pending').map(({_id, urgency, bloodType, patient: {first_name, last_name}}) =>{
        return {id: _id, patient: `${first_name} ${last_name}`, 'Blood Type': bloodType, urgency}
      })
      if(status ==200) setRequests(data);
      else alert(message || "An error ocurred")
    })();
  }
  const onApprove =async id =>{
    const {message} =await review_request(id, 'approved');
      alert(message);
      load_requests();
  }
  const onDecline =async id =>{
    if(confirm("Are you sure to decline this request?")){
      const {message} =await review_request(id, 'declined');
      alert(message);
      load_requests();
    }
  }

  const [requests, setRequests] =useState([]);
  useEffect(() =>{
    load_requests();
  }, []);
  
  return (
    <div className="flex flex-col gap-3 py-5">
      <DataTableComponet data={requests} actions={[
        {label: 'Approve', className: 'bg-teal-700 hover:bg-teal-900', command: onApprove},
        {label: 'Decline', className: 'bg-red-700 hover:bg-red-900', command: onDecline},
      ]}/>
    </div>
  )
}

export default DonationRequestsComponent;