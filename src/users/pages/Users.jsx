import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'example name',
      image:
        'https://codechacha.com/static/653ef1438ef7c8ed7104a02a0583f949/8c76f/ko-653ef143.png',
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
