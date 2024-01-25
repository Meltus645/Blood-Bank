import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const DataTableComponet = ({data =[], onDelete =null, onEdit =null, actions =[], allowActions =true}) => {
    const [columns, setColumns] =useState([]);
    const doNothing =id =>id;

    const actionBtns =actions.length? actions: [
        {
            label: 'Edit',
            className: 'bg-blue-500 hover:bg-blue-700',
            command: onEdit || doNothing,
        },
        {
            label: 'Delete',
            className: 'bg-red-500 hover:bg-red-700',
            command: onDelete || doNothing,
        },

    ]
    useEffect(() =>{
        if(data.length){

            const cols =[...Object.keys(data[0])].filter(col =>col.toLowerCase() !='id' && col.toLowerCase() !='logo').map(item =>{
                return {name: item[0].toUpperCase()+item.slice(1,), selector: row =>row[item], sortable: true};
            });
            setColumns([...cols, ...[allowActions &&{name: 'Action', cell: row =>(<div className='flex items-center gap-4'>
                {allowActions && (actionBtns.map(({label, command, className}, index) =>(<button key={index} className={`text-white px-5 py-3 rounded transition-all block ${className}`} onClick={() =>command(row.id)}>{label}</button>)))}
            </div>)}]])
        }
    }, [data]);
    return data.length? (<DataTable data={data} columns={columns} pagination sortActive={true}/>): (<div className='p-4 text-center bg-white shadow rounded'>No data found</div>)
}

export default DataTableComponet;