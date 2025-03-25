import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const EditParcelModal = ({ open, onClose, parcel, onUpdate }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={`Edit Parcel #${parcel._id.slice(-6)}`}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      okText="Save"
      cancelText="Cancel"
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          originCity: parcel?.originCity || '',
          destinationCity: parcel?.destinationCity || '',
          parcelType: parcel?.parcelType || 'other',
          parcelDescription: parcel?.parcelDescription || '',
        }}
      >
        <Form.Item
          name="originCity"
          label="From City"
          rules={[{ required: true, message: 'Please input departure city!' }]}
        >
          <Input placeholder="Enter departure city" />
        </Form.Item>

        <Form.Item
          name="destinationCity"
          label="To City"
          rules={[
            { required: true, message: 'Please input destination city!' },
          ]}
        >
          <Input placeholder="Enter destination city" />
        </Form.Item>

        <Form.Item
          name="parcelType"
          label="Parcel Type"
          rules={[{ required: true, message: 'Please select parcel type!' }]}
        >
          <Select placeholder="Select parcel type">
            <Option value="gadgets">Gadgets</Option>
            <Option value="clothes">Clothes</Option>
            <Option value="medicines">Medicines</Option>
            <Option value="drinks">Drinks</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="parcelDescription"
          label="Description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <TextArea rows={4} placeholder="Enter parcel description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditParcelModal;
