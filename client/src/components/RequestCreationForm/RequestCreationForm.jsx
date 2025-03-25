import React from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createParcel } from '../../redux/parcel/operations';

const { Option } = Select;
const { TextArea } = Input;

const RequestCreationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async values => {
    try {
      setIsSubmitting(true);
      const parcelData = {
        originCity: values.fromCity,
        destinationCity: values.toCity,
        parcelType: values.parcelType,
        date: values.dispatchDate.format('YYYY-MM-DDTHH:mm:ssZ'),
        parcelDescription: values.description,
      };

      await dispatch(createParcel(parcelData)).unwrap();

      message.success('Parcel created successfully!');
      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Failed to create parcel');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formItemStyle = {
    marginBottom: 4,
  };

  return (
    <Form
      form={form}
      name="request_creation"
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: 600, minWidth: 400 }}
    >
      <Form.Item
        name="fromCity"
        label="City From"
        rules={[{ required: true, message: 'Please select departure city!' }]}
        style={formItemStyle}
      >
        <Input placeholder="Enter departure city" />
      </Form.Item>

      <Form.Item
        name="toCity"
        label="City To"
        rules={[{ required: true, message: 'Please select destination city!' }]}
        style={formItemStyle}
      >
        <Input placeholder="Enter destination city" />
      </Form.Item>

      <Form.Item
        name="parcelType"
        label="Type of Parcel"
        rules={[{ required: true, message: 'Please select parcel type!' }]}
        style={formItemStyle}
      >
        <Select placeholder="Select parcel type">
          <Option value="gadgets">Gadgets</Option>
          <Option value="drinks">Drinks</Option>
          <Option value="clothes">Clothes</Option>
          <Option value="medicines">Medicines</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dispatchDate"
        label="Date of Dispatch"
        rules={[{ required: true, message: 'Please select dispatch date!' }]}
        style={formItemStyle}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Parcel Description"
        rules={[
          { required: true, message: 'Please enter parcel description!' },
        ]}
        style={formItemStyle}
      >
        <TextArea
          rows={4}
          placeholder="Describe the parcel contents and any special instructions"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 5 }}>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Create Parcel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestCreationForm;
