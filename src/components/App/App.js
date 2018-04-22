import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import FlatButton from "material-ui/FlatButton";

import "../tempStyles.css";
import appStyle from "./AppStyles.js";

import Auth from "../Auth/Auth";
import Backlog from "../BacklogList/Backlog/Backlog";
import BacklogListLayout from "../BacklogList/BacklogListLayout";
import CurrentProjects from "../CurrentProjects/CurrentProjects";
import Log from "../Log/Log";
import ProjectEditor from "../ProjectEditor/ProjectEditor";

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
      <div className="App">
        <header
          style={{
            backgroundImage: skyImg,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% "
          }}
        >
          <h1>TimeGarden</h1>
          <div style={appStyle.logout}>
            <FlatButton label="Logout" onClick={userLogout} />
          </div>

          {user && (
            <div>
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
        <div className="screenHolder" style={appStyle.screenHolder}>
          {projectEditorActive && (
            <div className="page projectEditor">
              <ProjectEditor
                componentShow={componentShow}
                editingProject={editingProject}
                editingProjectDeselect={editingProjectDeselect}
                projectEditorClose={projectEditorClose}
                refresh={refresh}
              />
            </div>
          )}
          <Switch>
            <Route
              exact
              path="/login"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                } else {
                  return (
                    <Auth
                      route={"login"}
                      snapShotDailyRefresh={snapShotDailyRefresh}
                      userSet={userSet}
                      userGet={userGet}
                    />
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

            <Route
              path="/backlog"
              render={() => {
                //TODO: find a less repetitive way
                if (user) {
                  return (
                    <div className="page backLogList">
                      <BacklogListLayout
                        componentShow={componentShow}
                        projects={projects}
                        projectEditorActive={projectEditorActive}
                      >
                        {projects.map((project, i) => (
                          <Backlog
                            {...project}
                            editingProjectSelect={editingProjectSelect}
                            erase={erase}
                            key={project._id}
                          />
                        ))}
                      </BacklogListLayout>
                    </div>
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            <Route
              path="/log"
              render={() => {
                //TODO: find a less repetitive way
                if (user) {
                  return (
                    <div className="page log">
                      <Log
                        componentShow={componentShow}
                        freeMinsGlobal={freeMinsGlobal}
                        projects={projects}
                        refresh={refresh}
                        sliderChange={sliderChange}
                        sliderChangeValue={sliderChangeValue}
                        sliderDragStop={sliderDragStop}
                      />
                    </div>
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            <Route
              path="/"
              render={() => {
                if (user) {
                  return (
                    <CurrentProjects
                      editingProject={editingProject}
                      freeMinsGlobal={freeMinsGlobal}
                      projects={projects}
                      refresh={refresh}
                      snapShots={snapShots}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
