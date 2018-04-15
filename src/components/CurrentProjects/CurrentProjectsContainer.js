import React, { Component } from "react";
// import axios from "axios";

export default function CurrentProjectsContainer(WrappedComponent) {
  return class extends Component {
    render() {
      // const currentProjects = this.props.projects.filter(
      //   project => project.inProgress
      // );
      const { projects, snapShots } = this.props;

      const avgEffortProportion = project => {
        //TODO: clean up
        let averages = [];
        snapShots.forEach(snapShot => {
          const freeMins = snapShot.freeMins;
          if (freeMins) {
            let absoluteEffortMins = 0;
            if (snapShot.projects && snapShot.projects.length) {
              const projectSnapShot = snapShot.projects.find(
                snapShotProject => {
                  return project._id === snapShotProject._id;
                }
              );
              absoluteEffortMins = projectSnapShot
                ? projectSnapShot.absoluteEffortMins
                : 0;
            }
            averages.push(absoluteEffortMins / freeMins);
          } else {
            averages.push(0);
          }
        });
        const sum = averages.reduce((total, avg) => total + avg, 0);
        const result = sum && averages.length ? sum / averages.length : 0; //TODO: if either are zero return 0... so messy
        return { ...project, avgEffortProportion: result };
      };

      const currentProjects = projects.reduce((updated, project) => {
        if (project.inProgress) {
          updated.push(avgEffortProportion(project));
        }
        return updated;
      }, []);

      return <WrappedComponent currentProjects={currentProjects} />;
    }
  };
}
