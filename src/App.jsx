import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import PersistentDrawerLeft from './Components/SideBar/SideBar';
import Loader from './Components/Loader/Loader';
import Auth from './Components/Auth/Auth';
import { showLoader, hideLoader } from './slices/loadingSlice';
import { login } from './slices/authSlice'; // Import the login action

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Use user from Redux state
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(showLoader());
      setTimeout(() => {
        dispatch(hideLoader());
        dispatch(login(JSON.parse(storedUser))); // Update the Redux state based on localStorage
      }, 1000);
    }
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(showLoader());
    setTimeout(() => {
      const user = { name: 'John Doe' }; // Replace with actual user data
      localStorage.setItem('user', JSON.stringify(user)); // Store user data
      dispatch(login(user)); // Use login action with user data
      dispatch(hideLoader());
    }, 1000);
  };

  return (
    <div className="App">
      {isLoading && <Loader />}
      {!user ? ( // Check if user is null
        <div className="Wrapper2">
          <div className="leftContainer">
            {/* Add any left container content if needed */}
          </div>
          <div className="rightContainer">
            <Auth onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <PersistentDrawerLeft />
      )}
    </div>
  );
}

export default App;
