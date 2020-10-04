import React from 'react';

const Dashboard = React.lazy(() => import('./containers/Dashboard/Dashboard'));
const Profile = React.lazy(() => import('./containers/Profile'));
const ChangePass = React.lazy(() => import('./containers/Profile/ChangePassword'));
const MovieForm = React.lazy(() => import('./containers/Movies/MovieForm'));
const MovieList = React.lazy(() => import('./containers/Movies/MovieList'));
const MovieDetails = React.lazy(() => import('./containers/Movies/MovieDetails'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Prifile', component: Profile },
  { path: '/change-password', name: 'Change Password', component: ChangePass },

  //------------------------------ Manage Movies --------------------------------
  { path: '/movies', exact: true, name: "Movies", component: MovieList },
  { path: '/movies/add', name: "Add", component: MovieForm },
  { path: '/movies/edit/:movieId', name: "Edit", component: MovieForm },
  { path: '/movies/list', name: "List", component: MovieList },
  { path: '/movies/details/:movieId', name: "Details", component: MovieDetails },

];

export default routes;
