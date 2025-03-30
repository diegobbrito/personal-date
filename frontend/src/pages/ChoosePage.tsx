import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Meeting {
  id: string;
  receiverName: string;
  eventDate: string;
  eventTime: string;
  message: string;
  address: string;
}

const ChoosePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        console.log('Fetching data for inviteId:', id);
        const response = await axios.get( 
          `https://vs-invite-diegobrito-dev.apps.rm1.0a51.p1.openshiftapps.com/api/v1/invites/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Cookie': 'ba0ec03a9717cf7779ff5482913329a7=80dbce5928ef9b566736184a72c53718'
            }
          }
        );
        
        console.log('API Response:', response.data);
        setMeetings(response.data.meetings || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (id) {
      fetchMeetings();
    }
  }, [id]); 

  
  return (
    <div>
  
      <pre>{JSON.stringify(meetings, null, 2)}</pre>
      
      
    </div>
  );
};

export default ChoosePage;