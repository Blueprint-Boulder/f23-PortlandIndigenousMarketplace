import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/footer.jsx';
// import Header from '../components/headervendor';
import Alert from '../components/alert.jsx';
import {Context} from '../services/context.jsx';
import Cookies from 'js-cookie';
import User from '../objects/User';
import BackButton from '../components/backbutton.jsx';
import {useNavigate} from 'react-router-dom';
// import {ErrorBoundary} from 'react-error-boundary';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  goBack() {
    this.setState({hasError: false});
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p className='text-blue' onClick = {() => {
            this.goBack();
          }}>Go back</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Root() {
  const [message, setMessage] = useState('');
  const [bad, setBad] = useState(false);
  const [user, setUser] = useState(false);
  const [cookie, setCookie] = useState(null);
  setTimeout(() => {
    setMessage(''); setBad(false);
  }, 5000);

  useEffect(() => {
    const checkCookie = () => {
      const currentCookie = Cookies.get('auth') || Cookies.get('auth_pim');
      if (currentCookie !== cookie && currentCookie !== undefined) {
        setCookie(currentCookie);
        setUser(User.newUserFromCookie(currentCookie));
        console.log(User.newUserFromCookie(currentCookie));
      }
    };

    // Check immediately
    checkCookie();

    // Then check every second
    const intervalId = setInterval(checkCookie, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [cookie]);

  return (
    <Context.Provider value = {{message, setMessage, bad, setBad, user, setUser}}>
      <div className="bg-grey-1 w-screen flex min-h-screen flex-col pt-10">
        {message && <Alert content = {message} bad ={bad}/>}
        {/* <Header /> */}
        <BackButton/>
        <ErrorBoundary>
          <Outlet/>
        </ErrorBoundary>
        <Footer/>
      </div>
    </Context.Provider>

  );
}


