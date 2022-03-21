import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header/Header';
import login from './pages/Login/login';
import detail from './pages/DetailPage/detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoList from './pages/ToDoList/ToDoList'
import ToDoListRFC from './pages/ToDoList/ToDoListRFC'
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import BaiTapToDoListSaGa from './pages/ToDoListSaga/BaiTapToDoListSaga'
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
function App() {
  return (
    <BrowserRouter>

      <LoadingComponent></LoadingComponent>
      <Modal></Modal>
      <Switch>
        {/* <Route exact path={'/home'} render={(propsRoute) => {
          return <div>
            <Header></Header>
            <Home {...propsRoute}></Home>
          </div>
        }}></Route> */}
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate exact path='/contact' Component={Contact}></HomeTemplate>
        <HomeTemplate exact path={'/about'} Component={About}></HomeTemplate>
        <HomeTemplate exact path='/' Component={Home}></HomeTemplate>
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs}></UserLoginTemplate>
        <HomeTemplate exact path='/detail/:id' Component={detail}></HomeTemplate>
        <HomeTemplate exact path='/profile' Component={Profile}></HomeTemplate>
        <HomeTemplate exact path='/dotolist' Component={ToDoList}></HomeTemplate>
        <HomeTemplate exact path='/dotolistRFC' Component={ToDoListRFC}></HomeTemplate>
        <HomeTemplate exact path='/dotolistredux' Component={ToDoListRedux}></HomeTemplate>
        <HomeTemplate exact path='/dotolistSaga' Component={BaiTapToDoListSaGa}></HomeTemplate>
        <HomeTemplate exact path='/DemoHOCModal' Component={DemoHOCModal}></HomeTemplate>

        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
