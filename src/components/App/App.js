import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import "../tempStyles.css";

import CurrentProjects from "../CurrentProjects/CurrentProjects";
import Log from "../Log/Log";
import ProjectEditor from "../ProjectEditor/ProjectEditor";
import Backlog from "../BacklogList/Backlog/Backlog";
import BacklogListLayout from "../BacklogList/BacklogListLayout";

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
    snapShots
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
  console.log(skyImg);
  return (
    <div className="App">
      <header
        style={{
          backgroundImage: skyImg,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% "
        }}
      >
        <h1>TimeGarden</h1>
        <div>
          <RaisedButton
            style={{ margin: "5px" }}
            label="Seed List"
            onClick={() => componentShow("backlogListActive", true)}
          />
          <RaisedButton
            style={{ margin: "5px" }}
            label="Today's Log"
            onClick={() => componentShow("logActive", true)}
          />
        </div>
      </header>
      <div
        className="screenHolder"
        style={{ backgroundImage: 'url("/grass.jpg")' }}
      >
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
        {backlogListActive && (
          <div className="page backLogList">
            <BacklogListLayout
              componentShow={componentShow}
              projects={projects}
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
        )}
        {logActive && (
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
        )}
        <div className="page currentProjects">
          <CurrentProjects
            editingProject={editingProject}
            projects={projects}
            refresh={refresh}
            snapShots={snapShots}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
