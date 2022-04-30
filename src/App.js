import { Route, Switch } from 'react-router-dom';
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
import { Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { CyberBugsTemplate } from './templates/HomeTemplate/CyberBugTemplate';
import IndexCyberBug from './redux/saga/CyberBugs/IndexCyberBug'
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import ModalCyberbug from './HOC/CyberBugHOC/ModalCyberbug';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import DemoBeatifulDnd from './pages/DemoDragDrop/DemoBeatifulDnd'
function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history
    })
  }, [])


  return (
    <>
      <ModalCyberbug />
      <LoadingComponent></LoadingComponent>
      <Modal></Modal>

      <Switch>

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
        <HomeTemplate exact path='/DemoDragDrop' Component={DemoDragDrop}></HomeTemplate>
        <HomeTemplate exact path='/DemoBeatifulDnd' Component={DemoBeatifulDnd}></HomeTemplate>

        <CyberBugsTemplate exact path='/cyberbug' Component={IndexCyberBug}></CyberBugsTemplate>
        <CyberBugsTemplate exact path='/createProject' Component={CreateProject}></CyberBugsTemplate>
        <CyberBugsTemplate exact path='/projectmanage' Component={ProjectManagement}></CyberBugsTemplate>
        <CyberBugsTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBug}></CyberBugsTemplate>

        <Router path="*" Component={PageNotFound}></Router>
      </Switch>
    </>
  );
}

export default App;
