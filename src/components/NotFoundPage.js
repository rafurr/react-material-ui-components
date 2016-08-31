import React from 'react';
import {Link} from 'react-router';

// Since this component is simple and static, there's no parent container for it.
const NotFoundPage = () => {
  return (
    <div>
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;
