import React from 'react';
import { Typography } from 'antd';
import RequestItem from '../RequestItem/RequestItem';
import css from './RequestsList.module.css';

const { Title } = Typography;

const RequestsList = ({ parcels }) => {
  return (
    <div className={css.container}>
      <Title level={3} className={css.title}>
        Parcels List
      </Title>

      <div className={css.grid}>
        {parcels.map(parcel => (
          <div key={parcel._id} className={css.gridItem}>
            <RequestItem parcel={parcel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsList;
