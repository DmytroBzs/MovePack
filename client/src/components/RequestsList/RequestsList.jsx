import React from 'react';
import { Flex, Typography } from 'antd';
import RequestItem from '../RequestItem/RequestItem';
import css from './RequestsList.module.css';

const { Title } = Typography;

const RequestsList = ({ parcels }) => {
  return (
    <div className={css.container}>
      <Title level={3} className={css.title}>
        Parcels List
      </Title>

      <Flex gap="middle" wrap="wrap" justify="start" align="stretch">
        {parcels.map(parcel => (
          <Flex key={parcel._id} flex="1 1 350px">
            <RequestItem parcel={parcel} />
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default RequestsList;
