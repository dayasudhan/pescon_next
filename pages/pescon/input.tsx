import React, { useState } from 'react';
import { Form, Input, TextArea, Select, Button,Checkbox  } from 'semantic-ui-react';
// import './PestControlForm.css';

function PestControlForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    personToContact: "",
    personToContactPhone: "",
    serviceBeginDate: "",
    serviceExpirationDate: "",
    pestsToControl: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const [serviceOptions] = useState([
    { key: "ants", value: "ants", text: "Ants" },
    { key: "bedbugs", value: "bedbugs", text: "Bed Bugs" },
    { key: "cockroaches", value: "cockroaches", text: "Cockroaches" },
    { key: "termites", value: "termites", text: "Termites" },
    { key: "rodents", value: "rodents", text: "Rodents" },
  ]);
  const handleServiceChange = (_, { value }) => {
    setFormData({ ...formData, pestsToControl: value });
  };
  return (
    <div className="pest-control-form">
      <h1>Pest Control Service Contract Input Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Name</label>
            <Input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            </Form.Field>
         
          <Form.Field>
            <label>Address :</label>
            <TextArea n
            ame="address" 
            placeholder="Address" 
            value={formData.address} 
            onChange={handleInputChange}
            rows={4}
            cols={40} />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Phone</label>
            <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input name="email" placeholder="Email" type="email" value={formData.name} onChange={handleInputChange} />
          </Form.Field>
        </Form.Group>
        {/* <Form.Field>
          <label>Service</label>
          <Select name="service" options={services} placeholder="Select Service" value={formData.service} onChange={(e, { value }) => setFormData({ ...formData, service: value })} />
        </Form.Field> */}
        <Form.Group widths="equal">
          <Form.Field>
            <label>Start Date</label>
            <Input name="startDate" type="date" value={formData.serviceBeginDate} onChange={handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <Input name="endDate" type="date" value={formData.serviceExpirationDate} onChange={handleInputChange} />
          </Form.Field>
        </Form.Group>

          <Form.Field>
          <label>Pests to Control</label>
          <Checkbox
            label="Ants"
            name="pestsToControl"
            value="ants"
            onChange={handleServiceChange}
            checked={formData.pestsToControl.includes("ants")}
          />
          <Checkbox
            label="Bed Bugs"
            name="pestsToControl"
            value="bedbugs"
            onChange={handleServiceChange}
            checked={formData.pestsToControl.includes("bedbugs")}
          />
          <Checkbox
            label="Cockroaches"
            name="pestsToControl"
            value="cockroaches"
            onChange={handleServiceChange}
            checked={formData.pestsToControl.includes("cockroaches")}
            />
             <Checkbox
            label="termites"
            name="pestsToControl"
            value="termites"
            onChange={handleServiceChange}
            checked={formData.pestsToControl.includes("termites")}
            />
             <Checkbox
            label="rodents"
            name="pestsToControl"
            value="rodents"
            onChange={handleServiceChange}
            checked={formData.pestsToControl.includes("rodents")}
            />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default PestControlForm;
