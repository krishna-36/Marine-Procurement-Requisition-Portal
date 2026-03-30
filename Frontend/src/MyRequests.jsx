import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'reqNo',
        headerName: 'Order No',
        width: 150,
        editable: true,
    },
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        editable: true,
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: true,
    },
    {
        field: 'department',
        headerName: 'Department',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'buyerRemarks',
        headerName: 'Description',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'vesselName',
        headerName: 'Vessel Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function MyRequests() {

    const [orders, setOrders] = useState([]);

    function getMyOrders() {
        axios
            .get("http://localhost:7000/get-my-orders")
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch();
    }

    useEffect(() => {
        getMyOrders();
    }, []);

    return (
        <Box sx={{ height: "80vh", width: '100%' }}>
            <DataGrid
                rows={orders.map((ele, i) => ({ ...ele, id: i + 1 }))}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
