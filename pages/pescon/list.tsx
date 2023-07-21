import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table,Button } from 'semantic-ui-react';
import {BrowserRouter, Link } from 'react-router-dom';
//import './table.css'
function CustomerListComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/leads')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const  handleDetailButtonClick = (id) => {
    // Make API call using fetch
   console.log("handleDetailButtonClick",id)
   const queryString = `?id=${id}`;
   const newPageUrl = '/buyer/home/info' + queryString;
   window.open(newPageUrl, '_blank');
  };
  return (
    <div>
   
    <h1>Data Table</h1>
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>#</Table.HeaderCell>
          <Table.HeaderCell width={5}>Name</Table.HeaderCell>
          <Table.HeaderCell width={4}>Phone</Table.HeaderCell>
          <Table.HeaderCell width={6}>Email</Table.HeaderCell>
          <Table.HeaderCell width={1}></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item, index) => (
          <Table.Row key={item.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.phone}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>
            <Button color="primary" onClick={() => handleDetailButtonClick(item._id)}>Detail</Button>
            
            </Table.Cell> {/* Add a button to each row */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
  );
}

export default CustomerListComponent;