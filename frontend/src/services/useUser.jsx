import {useState} from 'react';

export default function useUser() {
  const [user, setUserState] = useState();

  const setUser = () => {
    // setState(localStorage.getItem('user'));

    setUserState({email: '',
      password: '',
      id: 2,
      isadmin: true}); // dummy user object for develepment

    console.log('User set', user);
  };

  const destroyUser = () => {
    setUserState();
  };

  return {user, setUser, destroyUser};
}
