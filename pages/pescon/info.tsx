import React , { useState, useEffect } from 'react';
import { Table,Button,Container, Divider, Grid, Header, Image,Segment } from 'semantic-ui-react';

import axios from 'axios';
function dataInfoPage() {
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
    })
    .catch(error => {
      console.log(error);
    });
  });

    return (
      <div className="contract-container">

      <Header as='h2' content='Pest Control Service Contract'  textAlign='center' />

      
    <Grid container columns={2} stackable>
      <Grid.Column>
        <Segment> <div className="grid-item">
          {/* <h2>data Information</h2> */}
          <p><strong>Name:</strong> {data?.name}</p>
          <p><strong>Phone:</strong> {data?.phone}</p>
          <p><strong>Address:</strong> {data?.address}</p>
          <p><strong>Contact Person:</strong> {data?.personToContact}</p>
          <p><strong>Contact Phone:</strong> {data?.personToContactPhone}</p>
          
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment> <div className="grid-item">
          <h3>To,</h3>
          <p><strong>PESCON - Pest Control Services</strong></p>
          <p><strong>Address:</strong> Rashmi Arcade , Opp Lakshmi Theater</p>
          <p><strong></strong> Jail Road, Shivamogga -577201</p>
          <p><strong>Contact Phone:</strong> {data?.personToContactPhone}</p>
          {/* <p><strong>Secondary Phone:</strong> {data?.personToContactPhone}</p> */}
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          {/* <h2>data Information</h2> */}
          <p><strong>Person to be contacted: </strong> {data?.name}</p>
          <p><strong>Phone:</strong> {data?.phone}</p>          
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          {/* <h2>data Information</h2> */}
          <p><strong>Property to be serviced:</strong> {data?.propertyType}</p>
          <p><strong>Notes:</strong> {data?.notes}</p>          
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment> <div className="grid-item">
          <h3>Service Details</h3>
          <p><strong>Service Begin Date:</strong> {data?.serviceBeginDate}</p>
          <p><strong>Service Expiration Date:</strong> {data?.serviceExpirationDate}</p>
          <p><strong>Reneval:</strong> {data?.reneval}</p>
          <p><strong>Service Type:</strong> {data?.serviceFrequency}</p>
          <p><strong>Other:</strong> {data?.otherservicedetails}</p>
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          <h3>Pests to be controlled</h3>
          <p>{data?.pestsToControl} <br/>
          </p>
        </div></Segment>
      </Grid.Column>
     
    </Grid>
    <Grid container columns={1} stackable>
    <Grid.Column>
        <Segment> <div className="grid-item">
          <h3>Payment Terms</h3>
          <p>{data?.paymentTerms} <br/>
          </p>
        
         
        </div></Segment>
      </Grid.Column>
      <Grid.Column>
      <Segment> <div className="grid-item">
          <h3>Billing Instructions</h3>
          <p>{data?.billingInstructions} <br/>
          </p>
        </div></Segment>
      </Grid.Column>
      </Grid>
      <Grid container columns={1} stackable>
       <div className="grid-item">
          <h4>SERVICES CHARGES :</h4>
          <p>We hereby agreed to pay your charges of rupees 18000 only (Rupees Eighteen Thousand rupees only) and Service tax whenever applicable, for this contract prior to commencement of the initial treatment, for management of pests as specified herein and or in the schedule to the extent necessary to reasonable free the said promises from their presence 
Your contact terms and requirement for the treatment as mentioned overleaf. (Please sign and return copy of this agreement in acceptance) We accept the agreement with thanks.</p>
          <p><strong>Service Expiration Date:</strong> {data?.serviceExpirationDate}</p>
          
        </div>
        </Grid>
        <br></br>
        <Grid container columns={2} stackable>
        <Grid.Column>
       <div className="grid-item">
          {/* <h2>data Information</h2> */}
          <p><strong>For:</strong> PESCON(PEST CONTROL SERVICES)</p>
          <p>(Name and Designation of signatory)</p>          
        </div>
      </Grid.Column>
      <Grid.Column>
       <div className="grid-item">
          {/* <h2>data Information</h2> */}
          <p>Yours Truly,</p>
          <p>(data's Signature and Office Stamp)</p>          
        </div>
      </Grid.Column>
      </Grid>
    </div>
    );
  
}

export default dataInfoPage;
