import React from 'react';
import { Switch } from 'react-router-dom';

import Landing from '../pages/Landing';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import SingnUpConcluded from '../pages/SingnUpConcluded';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/concluded" component={SingnUpConcluded} />
      <Route path="/landing" component={Landing} isPrivate/>
      <Route path="/study" component={TeacherList} isPrivate/>
      <Route path="/give-classes" component={TeacherForm} isPrivate/>
    </Switch>
  )
}

export default Routes;