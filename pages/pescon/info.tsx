import React , { useState, useEffect } from 'react';
import { Table,Button,Container, Divider, Grid, Header, Image,Segment } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function CustomerInfoPage() {
  const [data, setData] = useState(null);
  const [id, setId] = useState(0);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    console.log('id:', id);
    setId(parseInt(id))
    const newPageUrl = '/leads/' + id;
    axios.get(newPageUrl)
    .then(response => {
      setData(response.data);
      console.log("data",data)
     //setData(data)
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  const customer = {
    name: data?.name,
    phone: data?.phone,
    address: '123 Main St, City, State',
    contactPerson: 'Jane Smith',
    contactPhone: '987-654-3210',
    propertyType: 'Commercial',
    serviceBeginDate: '2023-06-01',
    serviceExpirationDate: '2024-05-31',
    renewal: 'Yes',
    serviceType: 'Monthly',
    pestsToControl: 'Ants, Cockroaches, Rodents',
    paymentTerms: 'Net 30 Days',
    billingInstructions: 'Send invoices via email',
    signatoryName: 'John Doe',
    signatoryDesignation: 'Owner',
    customerSignature: 'John Doe',
  };
  const handleButtonClick = () => {
    // Make API call using fetch
    axios.get('/pdf')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };


    return (
      <div className="contract-container">

      <Header as='h2' content='Pest Control Service Contract'  textAlign='center' />

      
    <Grid container columns={2} stackable>
      <Grid.Column>
        <Segment> <div className="grid-item">
          {/* <h2>Customer Information</h2> */}
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Contact Person:</strong> {customer.contactPerson}</p>
          <p><strong>Contact Phone:</strong> {customer.contactPhone}</p>
          
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment> <div className="grid-item">
          <h3>To,</h3>
          <p><strong>PESCON - Pest Control Services</strong></p>
          <p><strong>Address:</strong> Rashmi Arcade , Opp Lakshmi Theater</p>
          <p><strong></strong> Jail Road, Shivamogga -577201</p>
          <p><strong>Contact Phone:</strong> {customer.contactPhone}</p>
          {/* <p><strong>Secondary Phone:</strong> {customer.contactPhone}</p> */}
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          {/* <h2>Customer Information</h2> */}
          <p><strong>Person to be contacted: </strong> {customer.name}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>          
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          {/* <h2>Customer Information</h2> */}
          <p><strong>Property to be serviced:</strong> {customer.propertyType}</p>
          <p><strong>Notes:</strong> {customer.notes}</p>          
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment> <div className="grid-item">
          <h3>Service Details</h3>
          <p><strong>Service Begin Date:</strong> {customer.serviceBeginDate}</p>
          <p><strong>Service Expiration Date:</strong> {customer.serviceExpirationDate}</p>
          <p><strong>Renewal:</strong> {customer.renewal}</p>
          <p><strong>Service Type:</strong> {customer.serviceType}</p>
          <p><strong>Other:</strong> {customer.otherservicedetails}</p>
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          <h3>Pests to be controlled</h3>
          <p><strong>Service Begin Date:</strong> {customer.serviceBeginDate}</p>
          <p><strong>Service Expiration Date:</strong> {customer.serviceExpirationDate}</p>
          <p><strong>Renewal:</strong> {customer.renewal}</p>
          <p><strong>Service Type:</strong> {customer.serviceType}</p>
          <p><strong>Other:</strong> {customer.otherservicedetails}</p>
        </div></Segment>
      </Grid.Column>
     
    </Grid>
    <Grid container columns={1} stackable>
    <Grid.Column>
        <Segment> <div className="grid-item">
          <h3>Payment Terms</h3>
          <p>Rs 18000 (for  level of services) Major soil treatment, Compound level and Plumbing and electrical spray <br/>
          </p>
        
         
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          <h3>Billing Instructions</h3>
          <p>For Major soil treatment Rs 10000<br/>
          For Compound treatment Rs 40000 <br/>
          For Spraying treatment Rs 50000</p>
          
        </div></Segment>
      </Grid.Column>
      </Grid>
      <Grid container columns={1} stackable>
       <div className="grid-item">
          <h4>SERVICES CHARGES :</h4>
          <p>We hereby agreed to pay your charges of rupees 18000 only (Rupees Eighteen Thousand rupees only) and Service tax whenever applicable, for this contract prior to commencement of the initial treatment, for management of pests as specified herein and or in the schedule to the extent necessary to reasonable free the said promises from their presence 
Your contact terms and requirement for the treatment as mentioned overleaf. (Please sign and return copy of this agreement in acceptance) We accept the agreement with thanks.</p>
          <p><strong>Service Expiration Date:</strong> {customer.serviceExpirationDate}</p>
          
        </div>
        </Grid>
        <br></br>
        <Grid container columns={2} stackable>
        <Grid.Column>
       <div className="grid-item">
          {/* <h2>Customer Information</h2> */}
          <p><strong>For:</strong> PESCON(PEST CONTROL SERVICES)</p>
          <p>(Name and Designation of signatory)</p>          
        </div>
      </Grid.Column>
      <Grid.Column>
       <div className="grid-item">
          {/* <h2>Customer Information</h2> */}
          <p>Yours Truly,</p>
          <p>(Customer's Signature and Office Stamp)</p>          
        </div>
      </Grid.Column>
      </Grid>
    </div>
    );
  
}

export default CustomerInfoPage;
