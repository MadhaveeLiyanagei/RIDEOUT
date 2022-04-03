import React,{useState} from 'react'

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainContext } from './Contexts/MainContext';
import {Container,Row,Col, Image } from 'react-bootstrap'
import NewCar from './Components/NewCar';
import Booking from './Components/Booking';
import Payment from './Components/Payment';
import User from './Components/User';
import Driver from './Components/Driver';
import banner from './imgs/banner.png';
import UpdateCar from './Components/UpdateCar';



import Navbarv from './Components/Navbarv';
import AddDriver from './Components/AddDriver';
import DriverDetails from './Components/DriverDetails';
import Driverhome from './Components/DriverHome';
import EditDriver from './Components/EditDriver';


function App() {
  const [CounCar, setCounCar] = useState(4);

  const [cars, setCars] = useState([
    {           
      id: 1,
      modelName: 'Premio',
      brandName: 'Toyota',
      price: "9000",
      manufactureYear: '2019',
      urlImg: 'https://www.carsfordiplomats.net/wp-content/uploads/2019/03/Brand-New-2019-Toyota-Premio-2.jpg'
  },
  {
      id: 2,
      modelName: 'Wagon-R',
      brandName: 'Suzuki',
      price: '6000',
      manufactureYear: '2018',
      urlImg: 'https://static.india.com/wp-content/uploads/2018/09/e2a7548dae3f0dbe5a7c7631dfb63f13_555X416_1.jpg'
  },
  { 
      id: 3,
      modelName: 'Aqua',
      brandName: 'Toyota',
      price: "7000",
      manufactureYear: '2020',
      urlImg: 'https://i0.wp.com/easycars.jp/wp-content/uploads/2021/07/AquaX-Urban-Kaki.png?resize=640%2C456&ssl=1'
  },
  { 
      id: 4,
      modelName: 'Raize',
      brandName: 'Toyota',
      price: "10000",
      manufactureYear: '2020',
      urlImg: 'https://global.toyota/pages/news/images/2019/11/05/1100/rendition/20191105_02_32_W610_H407.jpg'
  },
  ])
  return (

      <MainContext.Provider value={{cars, setCars, CounCar, setCounCar}}>
        <Router>
        <div className="App">
          <NavBar />
          <Container fluid style={{padding:"0"}}>
            <Image src={banner} fluid style={{width:"100%"}}/>
          </Container>
          <Container className="mt-5 mb-5">
            <Switch>
              <Route exact path="/" component={Home}/>            
              <Route path="/create" component={NewCar}/> 
              <Route path="/booking" component={Booking}/>
              <Route path="/payment" component={Payment}/>        
              <Route path="/user" component={User}/>  
              <Route path="/driver" component={Driver}/>     
              <Route path="/update/:id" component={UpdateCar}/>      

                    <Route path="/NavBarv" component={Navbarv}></Route>
                    <Route path="/mah" component={Driverhome}></Route>
                    <Route path="/post/:id" component={DriverDetails}></Route>
                    <Route path="/edit/:id" component={EditDriver}></Route>
                    <Route path="/Madd" component={AddDriver}></Route>

            </Switch>
            </Container>
            <Container fluid className="bg-dark text-white text-center pt-3 pb-3">
              <Row>
                <Col>
                  <p class="fs-5">RIDEOUT Car Rentals</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p class="fs-6">All Right Reserved by rideout.com </p>
                </Col>
              </Row>
            </Container>
        </div>
      </Router>
    </MainContext.Provider>
  );
}

export default App;
