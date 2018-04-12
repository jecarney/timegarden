import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import CurrentProjectsContainer from "../CurrentProjects/CurrentProjectsContainer";
import Log from "../Log/Log";
import ProjectEditor from "../ProjectEditor/ProjectEditor";
import Backlog from "../BacklogList/Backlog/Backlog";
import BacklogListLayout from "../BacklogList/BacklogListLayout";

const App = props => {
  const {
    backlogListActive,
    componentShow,
    editingProject,
    editingProjectDeselect,
    editingProjectSelect,
    erase,
    logActive,
    projectEditorActive,
    projectEditorClose,
    projects,
    refresh,
    sliderChange,
    sliderChangeValue,
    sliderDragStop,
    snapShotUpdate,
    todayFreeMins
  } = props;

  return (
    <div className="App">
      <h1>TimeGarden</h1>
      <RaisedButton
        label="Seed List"
        onClick={() => componentShow("backlogListActive", true)}
      />
      <RaisedButton
        label="Today's Log"
        onClick={() => componentShow("logActive", true)}
      />
      {projectEditorActive && (
        <ProjectEditor
          componentShow={componentShow}
          editingProject={editingProject}
          editingProjectDeselect={editingProjectDeselect}
          projectEditorClose={projectEditorClose}
          refresh={refresh}
          snapShotUpdate={snapShotUpdate}
        />
      )}
      {backlogListActive && (
        <BacklogListLayout componentShow={componentShow} projects={projects}>
          <ul>
            {projects.map((project, i) => (
              <li key={project._id}>
                <Backlog
                  {...project}
                  editingProjectSelect={editingProjectSelect}
                  erase={erase}
                />
              </li>
            ))}
          </ul>
        </BacklogListLayout>
      )}
      {logActive && (
        <div>
          <Log
            componentShow={componentShow}
            projects={projects}
            sliderChange={sliderChange}
            sliderChangeValue={sliderChangeValue}
            sliderDragStop={sliderDragStop}
            todayFreeMins={todayFreeMins}
          />
        </div>
      )}
      <CurrentProjectsContainer
        projects={projects}
        refresh={refresh}
        editingProject={editingProject}
      />
      <div>
        <ul>
          <li>
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/turkkub"
                title="turkkub"
              >
                turkkub
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>{" "}
              is licensed by{" "}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
              >
                CC 3.0 BY
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
