import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  AdminsPage,
  Dashboard,
  LoginPage,
  OrdersPage,
  PrivateRoute,
  ProductsPage,
  SingleOrderPage,
  SingleProductPage,
  // SingleContainerPage
} from './pages';
import SingleContainerPage from './pages/SingleContainerPage';
import SinglePathwayPage from './pages/SinglePathwayPage';
import SingleTruckPage from './pages/SingleTruckPage';
import SingleSchoolPage from './pages/SingleSchoolPage';
import SingleKitchenPage from './pages/SingleKitchenPage';
import ContainersPage from './pages/ContainersPage';
import PathwaysPage from './pages/PathwaysPage';
import SchoolsPage from './pages/SchoolsPage';
import TrucksPage from './pages/TrucksPage';
import KitchensPage from './pages/KitchensPage';
import ContainerAssigns from './pages/ContainersAssign';
import TrucksAssign from './pages/TrucksAssign';
import CookerAssign from './pages/ProductsAssign'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/orders'>
          <OrdersPage />
        </PrivateRoute>
        <PrivateRoute exact path='/orders/:id'>
          <SingleOrderPage />
        </PrivateRoute>
        <PrivateRoute exact path='/products'>
          <ProductsPage />
        </PrivateRoute>

        <PrivateRoute exact path='/kitchen'>
          <KitchensPage />
        </PrivateRoute>
        <PrivateRoute exact path='/trucks'>
          <TrucksPage />
        </PrivateRoute>
        <PrivateRoute exact path='/containers'>
          <ContainersPage />
        </PrivateRoute>
        <PrivateRoute exact path='/pathways'>
          <PathwaysPage />
        </PrivateRoute>
        <PrivateRoute exact path='/containerassign'>
          <ContainerAssigns />
        </PrivateRoute>
        <PrivateRoute exact path='/productassign'>
          <CookerAssign />
        </PrivateRoute>
        <PrivateRoute exact path='/truckassign'>
          <TrucksAssign />
        </PrivateRoute>

        <PrivateRoute exact path='/schools'>
          <SchoolsPage />
        </PrivateRoute>

        <PrivateRoute exact path='/products/:id'>
          <SingleProductPage />
        </PrivateRoute>
        <PrivateRoute exact path='/containers/:id'>
          <SingleContainerPage />
        </PrivateRoute>
        <PrivateRoute exact path='/pathways/:id'>
          <SinglePathwayPage />
        </PrivateRoute>
        <PrivateRoute exact path='/trucks/:id'>
          <SingleTruckPage />
        </PrivateRoute>
        <PrivateRoute exact path='/schools/:id'>
          <SingleSchoolPage />
        </PrivateRoute>
        <PrivateRoute exact path='/kitchens/:id'>
          <SingleKitchenPage />
        </PrivateRoute>
        <PrivateRoute exact path='/admins'>
          <AdminsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
