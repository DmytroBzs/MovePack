import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Tag, Space, Button, Typography, Modal, message } from 'antd';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  TagOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import EditParcelModal from '../EditParcelModal/EditParcelModal';
import { updateParcel, deleteParcel } from '../../redux/parcel/operations';
import css from './RequestItem.module.css';

const { Text } = Typography;

const typeColors = {
  gadgets: 'blue',
  clothes: 'purple',
  medicines: 'red',
  drinks: 'green',
  other: 'orange',
};

const RequestItem = ({ parcel }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async updatedData => {
    try {
      await dispatch(updateParcel({ id: parcel._id, updatedData })).unwrap();
      message.success('Parcel updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.message || 'Failed to update parcel');
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: `Are you sure you want to delete Parcel #${parcel._id.slice(-6)}?`,
      content: 'This action cannot be undone.',
      okText: 'Yes, delete',
      cancelText: 'Cancel',
      okType: 'danger',
      async onOk() {
        try {
          await dispatch(deleteParcel(parcel._id)).unwrap();
          message.success('Parcel deleted successfully!');
        } catch (error) {
          message.error(error.message || 'Failed to delete parcel');
          console.error('Delete error:', error);
        }
      },
    });
  };

  return (
    <>
      <Card
        title={`Parcel №${parcel._id.slice(-6)}`}
        className={css.card}
        extra={
          <Tag color={typeColors[parcel.parcelType]}>{parcel.parcelType}</Tag>
        }
      >
        <Space direction="vertical" className={css.cardContent}>
          <div>
            <Text strong>
              <EnvironmentOutlined /> Route:{' '}
            </Text>
            {parcel.originCity} → {parcel.destinationCity}
          </div>

          <div>
            <Text strong>
              <CalendarOutlined /> Date:{' '}
            </Text>
            {moment(parcel.date).format('MMMM Do YYYY, h:mm a')}
          </div>

          <div>
            <Text strong>
              <TagOutlined /> Description:{' '}
            </Text>
            {parcel.parcelDescription}
          </div>
        </Space>

        <div className={css.actions}>
          <Button
            type="primary"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </Button>
          <Button size="small" danger onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card>

      <EditParcelModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parcel={parcel}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default RequestItem;
