import React from "react";

import CurrentProjectsContainer from "../CurrentProjects/CurrentProjectsContainer";
import Log from "../Log/Log";
import ProjectEditor from "../ProjectEditor/ProjectEditor";
import Backlog from "../BacklogList/Backlog/Backlog";
import BacklogListLayout from "../BacklogList/BacklogListLayout";

const App = props => {
  const {
    erase,
    editingProject,
    editingProjectDeselect,
    editingProjectSelect,
    logActive,
    logClose,
    projectEditorActive,
    projectEditorOpen,
    projectEditorClose,
    projects,
    refresh,
    backlogListActive,
    sliderChange,
    snapShotUpdate,
    todayFreeHours,
    todaysProjects
  } = props;

  if (projectEditorActive) {
    return (
      <div className="App">
        <ProjectEditor
          editingProject={editingProject}
          editingProjectDeselect={editingProjectDeselect}
          projectEditorClose={projectEditorClose}
          refresh={refresh}
          snapShotUpdate={snapShotUpdate}
        />
      </div>
    );
  } else if (backlogListActive) {
    return (
      <div className="App">
        <BacklogListLayout
          projectEditorOpen={projectEditorOpen}
          projects={projects}
        >
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
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>TimeCurrentProjects</h1>
        {
          //   logActive ? (
          //   <div>
          //     <Log
          //       logClose={logClose}
          //       projects={projects}
          //       sliderChange={sliderChange}
          //       todayFreeHours={todayFreeHours}
          //     />
          //     <CurrentProjectsContainer
          //       projects={projects}
          //       refresh={refresh}
          //       editingProject={editingProject}
          //     />
          //   </div>
          // ) : (
          <CurrentProjectsContainer
            projects={projects}
            refresh={refresh}
            editingProject={editingProject}
          />
          // )
        }
      </div>
    );
  }
};

export default App;
