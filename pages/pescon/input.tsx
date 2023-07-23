import React, { useState ,useRef , useEffect } from 'react'
import axios from 'axios';
import { Segment, Input, Form, Button ,Checkbox,TextArea,Modal } from 'semantic-ui-react';

const SegmentExampleNestedSegments = () => {
  const [showModal, setShowModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    landMark:"",
    city:"",
    personToContact: "",
    personToContactPhone: "",
    serviceBeginDate: '',
    serviceExpirationDate: '',
    pestsToControl: '',
    serviceFrequency:'Monthly',
    propertyType:'Commercial',
    reneval:false,
    pestsToBeControlled:"",
    paymentTerms:"",
    billingInstructions:""
  });

  const handleInputChange = (event) => {
    console.log("event",event.target)
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRadioInputChange = (name,value) => {
    console.log("handleRadioInputChange",name,value)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log("name",name)
    event.preventDefault()
    console.log("formData",formData)
    axios.post('/leads', formData)
    .then(response => {
      console.log("response1",response);
      console.log("response2",response?.data?.insertedId);
      setTimeout(() => {
        setResponseText(`Customer Inserted Successfully With Id : ${response?.data?.insertedId}`); // Set the response text to be shown in the modal
        setShowModal(true); // Show the modal
      }, 1000); // Delay of 1 second
    })
    .catch(error => {
      console.error("error",error);
    });
  }
  const closeModal = () => {
    setShowModal(false);
    location.reload();
  };
  return (
  <Segment.Group>
    <Segment.Group horizontal>
      <Segment>
      <Segment textAlign='center'> <h3>Service Contract Input Form</h3></Segment>
        <p></p>{' '}
        <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Input name="landMark"
          focus placeholder="Land Mark..." 
          value={formData.landMark} 
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
          value='Commercial'
          checked={formData.propertyType === 'Commercial'}
          onChange={(e, data) => handleRadioInputChange(data.name,data.value )} /> 
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Residential'
          name='propertyType'
          value='Residential'
          checked={formData.propertyType === 'Residential'}
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
          name='serviceFrequency'
          value='Monthly'
          checked={formData.serviceFrequency === 'Monthly'}
          onChange={(e, data) => handleRadioInputChange(data.name,data.value )} /> 
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Quarterly'
          name='serviceFrequency'
          value='Quarterly'
          checked={formData.serviceFrequency === 'Quarterly'}
          onChange={(e, data) => handleRadioInputChange(data.name,data.value )} />  
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='AMC'
          name='serviceFrequency'
          value='AMC'
          checked={formData.serviceFrequency === 'AMC'}
          onChange={(e, data) => handleRadioInputChange(data.name,data.value )} />  
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
       Reneval: 
      </Form.Field>
      <Form.Field>
        <Checkbox
          label='Reneval'
          name='Reneval'
          value='renewal'
          checked={formData.renewal}
          //checked={formData.renewal === 'Quarterly'}
          onChange={(e, data) => handleRadioInputChange(data.name,!data.value )} />  
         
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
        
          <Button primary style={{ marginLeft: 'auto' }}>
            Submit
          </Button>
       
        </div>
        </Form>
        <Modal open={showModal} onClose={closeModal}>
        <Modal.Header>Response</Modal.Header>
        <Modal.Content>
          <p>{responseText}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Actions>
      </Modal>
      </Segment>
    </Segment.Group>
  </Segment.Group>
)};

export default SegmentExampleNestedSegments;
