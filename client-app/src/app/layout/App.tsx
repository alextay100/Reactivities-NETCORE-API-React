import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponent';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        agent.Activities.list()
            .then(response => {
                let activities: Activity[] = [];
                response.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    activities.push(activity);
                })
                setActivities(activities);
                setLoading(false);
          })
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        setSubmitting(true);

        if (activity.id) {
            agent.Activities.update(activity).then(() => {

                setActivities([...activities.filter(x => x.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);

            })
        }
        else
        {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function handleDeleteActivity(id: string) {
        setDeleting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setDeleting(false);
        })
    }

  if (loading) return <LoadingComponents content='Loading app...' />

  return (
      <Fragment>
          <NavBar openForm={handleFormOpen} />
          <Container style={{ marginTop: '3%' }} >
              <ActivityDashboard
                  activities={activities}
                  selectedActivity={selectedActivity}
                  selectActivity={handleSelectActivity}
                  cancelSelectActivity={handleCancelSelectActivity}
                  editMode={editMode}
                  openForm={handleFormOpen}
                  closeForm={handleFormClose}
                  createOrEdit={handleCreateOrEditActivity}
                  deleteActivity={handleDeleteActivity}
                  submitting={submitting}
                  deleting={deleting}
              />
          </Container>     
    </Fragment>
  );
}

export default App;
