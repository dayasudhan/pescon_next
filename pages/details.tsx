import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { Segment, Input, Label, Form, Button ,Checkbox,TextArea} from 'semantic-ui-react';

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
    serviceFrequency:'Monthly',
    propertyType:'Commercial',
    renewal:false,
    pestsToBeControlled:"",
    paymentTerms:"",
    billingInstructions:""
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
      <Segment textAlign='center'> <h3>Service Contract Input Form</h3></Segment>
        <p></p>{' '}
        <Form onSubmit={handleSubmit}>
        <Form.Field>
        <label>Customer Details</label>
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
          <label>Person To be Contacted</label>
        <Input name="personToContact" 
          focus placeholder="Contact name..."
          value={formData.personToContact} 
          onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <Input name="personToContactPhone"
           focus placeholder="Phone Number"
           value={formData.personToContactPhone} 
           onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
        Property to be serviced: <b>{formData.propertyType}</b>
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Commercial'
          name='propertyType'
          value='this'
          checked={formData.propertyType['propertyType'] === 'this'}
          onChange={handleInputChange} />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Residential'
          name='propertyType'
          value='that'
          checked={formData.propertyType === 'this'}
          onChange={handleInputChange} />  
      </Form.Field>
        <p></p>
        <Form.Field>
        Service Frequeny: <b>{formData.serviceFrequency}</b>
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Monthly'
          name='checkboxRadioGroup'
          value='this'
          checked={formData.serviceFrequency === 'this'}
          onChange={handleInputChange} />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Quarterly'
          name='checkboxRadioGroup'
          value='that'
          checked={formData.serviceFrequency === 'this'}
          onChange={handleInputChange} />  
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='AMC'
          name='checkboxRadioGroup'
          value='this'
          checked={formData.serviceFrequency === 'this'}
          onChange={handleInputChange} />
      </Form.Field>
        <p></p>
        <Form.Field>
          <label>Service Start Date</label>
          <Input name="serviceBeginDate" 
            type="date"
            focus placeholder="Start Date" 
            value={formData.serviceBeginDate} 
            onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
          <label>Service End Date</label>
          <Input name="serviceExpirationDate" 
          type="date" 
          value={formData.serviceExpirationDate} 
          onChange={handleInputChange} />
        </Form.Field>
        <p></p>
        <Form.Field>
       Renewal: 
      </Form.Field>
      <Form.Field>
        <Checkbox
          label='Renewal'
          checked={formData.renewal}
          onChange={handleInputChange} />
      </Form.Field>
        <p></p>
        <Form.Field>
          <label>Pests to be Controlled</label>
          <TextArea name="pestsToBeControlled"
          rows={2} 
          placeholder='Describe...' 
          value={formData.pestsToBeControlled} 
          onChange={handleInputChange}/>
        </Form.Field>
        <p></p>
        <Form.Field>
          <label>Payment Terms</label>
          <TextArea name="paymentTerms"
          rows={2} 
          placeholder='Describe...' 
          value={formData.paymentTerms} 
          onChange={handleInputChange}/>
        </Form.Field>
        <p></p>
        <Form.Field>
          <label>Billing Instructions </label>
          <TextArea name='billingInstructions'
          rows={2} 
          placeholder='Describe...' 
          value={formData.billingInstructions} 
          onChange={handleInputChange}/>
        </Form.Field>
        <div style={{ display: 'flex' }}>
        <a href="/buyer/home/home">
          <Button color="primary" style={{ marginLeft: 'auto' }}>
            Submit
          </Button>
        </a>
        </div>
        </Form>
      </Segment>
    </Segment.Group>
  </Segment.Group>
)};

export default SegmentExampleNestedSegments;
