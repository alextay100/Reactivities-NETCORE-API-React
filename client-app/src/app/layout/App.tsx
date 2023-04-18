import React, { useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';

function App() {
    const { activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
      <Fragment>
          <NavBar />
          <Container style={{ marginTop: '3%' }} >
              <ActivityDashboard />
          </Container>     
    </Fragment>
  );
}

export default observer(App);
