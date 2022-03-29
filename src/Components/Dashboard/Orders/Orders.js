import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
// orders page 
const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const url = `https://young-badlands-33283.herokuapp.com/orders?email=${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])
    // Delete Order
    const handleDeleteOrder = id => {
        const proceed = window.confirm('Are you sure! You want to delete?');
        if (proceed) {
            const url = `https://young-badlands-33283.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully')
                        const remainingOrders = orders.filter(order => order._id !== id);
                        setOrders(remainingOrders);
                    }
                });
        }

    }

    return (
        <div>
            {/* orders table  */}
            <h2 style={{ paddingTop: "60px", marginBottom: "50px", fontSize: "25px", fontWeight: "bold" }}>My Orders : {orders.length}</h2>
            <Table striped bordered hover size="sm" style={{ marginLeft: "80px", marginBottom:"50px"}}>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Drone Model</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((row) => (
                        <tr
                            key={row._id}
                        >
                            <td>{row.customerName}</td>
                            <td>{row.product}</td>
                            <td>{row.email}</td>
                            <td>{row.phone}</td>
                            <td>{row.address}</td>
                            <td>{row.quantity}</td>
                            <td>{row.status}</td>
                            <td><button className="btn-danger border-0 rounded" onClick={() => handleDeleteOrder(row._id)}>Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Orders;