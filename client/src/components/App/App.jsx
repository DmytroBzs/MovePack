import { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import RequestCreationForm from '../RequestCreationForm/RequestCreationForm';
import RequestsList from '../RequestsList/RequestsList';
import { useDispatch, useSelector } from 'react-redux';

import css from './App.module.css';
import { fetchAll } from '../../redux/parcel/operations';
import { selectLoading, selectParcels } from '../../redux/parcel/selectors';

function App() {
  const dispatch = useDispatch();
  const parcels = useSelector(selectParcels);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const [createParcel, setCreateParcel] = useState(true);

  return (
    <div className={css.container}>
      {isLoading && (
        <div className={css.loaderWrapper}>
          <Spin size="large" />
        </div>
      )}

      <Button onClick={() => setCreateParcel(prev => !prev)}>
        {createParcel ? 'Close creation form' : 'Open creation form'}
      </Button>

      {createParcel && <RequestCreationForm />}
      <RequestsList parcels={parcels} />
    </div>
  );
}

export default App;
