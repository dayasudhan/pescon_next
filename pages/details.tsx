import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { Segment, Input, Label, Form, Button } from 'semantic-ui-react';

const SegmentExampleNestedSegments = () => {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [phone, setPhone] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    land_mark:"",
    city:"",
    personToContact: "",
    personToContactPhone: "",
    serviceBeginDate: '',
    serviceExpirationDate: '',
    pestsToControl: [],
  });

  const handleInputChange = (event) => {
    console.log("event",event)
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("formData",formData)
    axios.post('/leads', formData)
    .then(response => {
      console.log("response",response);
    })
    .catch(error => {
      console.error("error",error);
    });
    // console.log(`Submitted form with name: ${name}, email: ${email}, and phone: ${phone}`)
  }
  return (
  <Segment.Group>
    <Segment.Group horizontal>
      <Segment>
         <h3>Service Contract Input Form</h3>
        <p></p>{' '}
        <Form onSubmit={handleSubmit}>
        <Form.Field>
        <Input name="name" 
          focus placeholder="Name..."
          value={formData.name} 
          onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="phone"
           focus placeholder="Phone Number"
           value={formData.phone} 
           onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="land_mark"
          focus placeholder="Land Mark..." 
          value={formData.land_mark} 
          onChange={handleInputChange}
          />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="city"
          focus placeholder="Village/City..." 
          value={formData.city} 
          onChange={handleInputChange}
          />
          </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="address"
          focus placeholder="Address..." 
          value={formData.address} 
          onChange={handleInputChange}
          />
        </Form.Field>
        <p></p>
        <Form.Field>
          <label>Start Date</label>
          <Input name="serviceBeginDate" 
            type="date"
            focus placeholder="Start Date" 
            value={formData.serviceBeginDate} 
            onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <label>End Date</label>
          <Input name="serviceExpirationDate" 
          type="date" 
          value={formData.serviceExpirationDate} 
          onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <div style={{ display: 'flex' }}>
        <a href="/buyer/home/home">
          <Button color="primary" style={{ marginLeft: 'auto' }}>
            Submit
          </Button>
        </a>
        </div>
        </Form>
      </Segment>

      {/* <Segment>
        Payment Method (Future mPurpose)
        <Segment.Group>
          <Segment>Middle</Segment>
          <Segment>Middle</Segment>
        </Segment.Group>
      </Segment> */}
    </Segment.Group>
    {/* <Segment.Group horizontal>
      <Segment>
        Delivery Address
        <Segment.Group>
          <Segment>Middle</Segment>
          <Segment>Middle</Segment>
        </Segment.Group>
      </Segment>
      <Segment>
        Shipping Method
        <Segment.Group>
          <Segment>Middle</Segment>
          <Segment>Middle</Segment>
        </Segment.Group>
      </Segment>
    </Segment.Group> */}
  </Segment.Group>
)};

export default SegmentExampleNestedSegments;
