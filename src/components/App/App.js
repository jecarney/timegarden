import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import FlatButton from "material-ui/FlatButton";

import appStyle from "./AppStyles.js";

import Auth from "../Auth/Auth";
import BacklogListLayout from "../BacklogList/BacklogListLayout";
import CurrentProjects from "../CurrentProjects/CurrentProjects";
import Log from "../Log/Log";
import ProjectEditor from "../ProjectEditor/ProjectEditor";
import ProtectedRoute from "../Auth/ProtectedRoute";

const App = props => {
  const {
    backlogListActive,
    componentShow,
    currentPercentEffort,
    editingProject,
    editingProjectDeselect,
    editingProjectSelect,
    erase,
    freeMinsGlobal,
    logActive,
    projectEditorActive,
    projectEditorClose,
    projects,
    refresh,
    sliderChange,
    sliderChangeValue,
    sliderDragStop,
    snapShotDailyRefresh,
    snapShots,
    user,
    userGet,
    userLogout,
    userSet
  } = props;

  const getSkyImg = () => {
    if (currentPercentEffort > 0.75) {
      return "rainbow";
    } else if (currentPercentEffort > 0.5) {
      return "sun";
    } else if (currentPercentEffort > 0.25) {
      return "rain";
    } else {
      return "cloudy";
    }
  };
  const skyImg = 'url("/' + getSkyImg() + '.jpg")';
  return (
    <Router>
      <div style={{ ...appStyle.global, ...appStyle.font }}>
        <header style={{ ...appStyle.header, ...{ backgroundImage: skyImg } }}>
          <h1 style={{ ...appStyle.font, ...appStyle.title }}>TimeGarden</h1>
          <div style={appStyle.logout}>
            <FlatButton
              label="Logout"
              onClick={userLogout}
              style={appStyle.font}
            />
          </div>

          {user && (
            <div style={appStyle.linkHolder}>
              <Link to="/" style={appStyle.links}>
                Garden
              </Link>
              <Link to="/backlog" style={appStyle.links}>
                Seed List
              </Link>
              <Link to="/log" style={appStyle.links}>
                Today's Log
              </Link>
            </div>
          )}
        </header>

        <Switch>
          {projectEditorActive && (
            <ProtectedRoute
              path="/"
              component={ProjectEditor}
              isAuthenticated={user ? true : false}
              componentShow={componentShow}
              editingProject={editingProject}
              editingProjectDeselect={editingProjectDeselect}
              projectEditorClose={projectEditorClose}
              refresh={refresh}
            />
          )}
          <Route
            exact
            path="/login"
            render={() => {
              if (user) {
                return <Redirect to="/" />;
              } else {
                return (
                  <Auth route={"login"} userSet={userSet} userGet={userGet} />
                );
              }
            }}
          />
          <Route
            exact
            path="/signup"
            render={() =>
              user ? (
                <Redirect to="/" />
              ) : (
                <Auth route={"signup"} userSet={userSet} userGet={userGet} />
              )
            }
          />
          <ProtectedRoute
            exact
            path="/backlog"
            component={BacklogListLayout}
            isAuthenticated={user ? true : false}
            componentShow={componentShow}
            editingProjectSelect={editingProjectSelect}
            erase={erase}
            projects={projects}
            projectEditorActive={projectEditorActive}
          />
          <ProtectedRoute
            exact
            path="/log"
            component={Log}
            isAuthenticated={user ? true : false}
            componentShow={componentShow}
            freeMinsGlobal={freeMinsGlobal}
            projects={projects}
            refresh={refresh}
            sliderChange={sliderChange}
            sliderChangeValue={sliderChangeValue}
            sliderDragStop={sliderDragStop}
          />
          <ProtectedRoute
            path="/"
            component={CurrentProjects}
            isAuthenticated={user ? true : false}
            editingProject={editingProject}
            freeMinsGlobal={freeMinsGlobal}
            projects={projects}
            refresh={refresh}
            snapShotDailyRefresh={snapShotDailyRefresh}
            snapShots={snapShots}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
