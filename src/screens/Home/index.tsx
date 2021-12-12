import React from 'react';
import { logUserOut } from '../../apollo';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome we did it!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
};
export default Home;
