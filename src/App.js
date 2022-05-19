import { Routes, Route } from 'react-router-dom';
import './App.css';
import PlaceList from './components/PlaceList/PlaceList';
import AddReview from './components/AddReview/AddReview';
import Layout from './components/Layout';
import ReviewList from './components/ReviewList/ReviewList';
import AllReviews from './components/AllReviews/AllReviews';
import Login from './components/Login/Login';
import AddPlace from './components/AddPlace/AddPlace';

function App() {

  
  return (
      <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ReviewList />}/>
                <Route path="login" element={<Login />}/>
                <Route path="place/:placeId" element={<PlaceList/>}>
                </Route>
                <Route path="addReview" element={<AddReview />}/>
                <Route path="addPlace" element={<AddPlace />}/>
                <Route path="allReviews/:placeId" element={<AllReviews />}/>
                {/* <Route path="*" element={<Home />}/> */}
                {/* <Route path="home" element={<Home />}/>
                 */}
            </Route>
        </Routes>
      </div>
  );
}

export default App;
