import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {ChatApp} from './ChatApp.jsx';

const Dashboard = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Chat Room"
      
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'orange' }}>{secretData}</CardText>}
  	<ChatApp />
  </Card>




);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
