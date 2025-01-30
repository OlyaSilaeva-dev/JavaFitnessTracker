import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminRelevant from './bookings/AdminRelevant';
import AdminUsers from "./users/AdminUsers"
import Logs from './logs/Logs';

function AdminTabs() {
  const [key, setKey] = useState('allUsers');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="allUsers" title="Все пользователи">
        <AdminUsers/>
      </Tab>
      <Tab eventKey="allBookings" title="Все записи">
        <AdminRelevant/>
      </Tab>
      <Tab eventKey="logs" title="Логи">
        <Logs/>
      </Tab>
    </Tabs>
  );
}

export default AdminTabs;