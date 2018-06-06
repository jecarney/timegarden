import React, { Component } from "react";
// import axios from "axios";

export default function CurrentProjectsContainer(WrappedComponent) {
  return class extends Component {
    // componentDidMount() {
    //   this.props.snapShotDailyRefresh();
    // }

    render() {
      const { freeMinsGlobal, projects, snapShots } = this.props;

      const age = project => {
        const diff = datesDifference(
          new Date(project.progressStart),
          new Date(Date.now())
        );
        return { age: diff };
      };

      //return an object with the average proportion of free time spent on a project calculated from the absolute effort and free time stored in the snapshot
      const avgEffortProportion = project => {
        const effortProportions = dailyEffortProportions(project);
        const sum = effortProportions.reduce((total, avg) => total + avg, 0);
        const result =
          sum && effortProportions.length ? sum / effortProportions.length : 0; //TODO: if either are zero return 0... so messy
        return { avgEffortProportion: result };
      };

      const dailyEffortProportions = project => {
        return snapShots.map(snapShot => {
          return snapShotProportionByProject(snapShot, project._id);
        });
      };

      const datesDifference = (date1, date2) => {
        const one_day = 1000 * 60 * 60 * 24;
        const progressStart_ms = date1.getTime();
        const now_ms = date2.getTime();
        const difference_ms = now_ms - progressStart_ms; // Convert back to days and return
        return Math.round(difference_ms / one_day);
      };

      //gets proportion of free time spent on a given project on a given day
      const snapShotProportionByProject = (snapShot, projectid) => {
        const freeMins = snapShot.freeMins;
        if (freeMins) {
          if (snapShot.projects && snapShot.projects.length) {
            const projectSnapShot = snapShotProjectGet(projectid, snapShot);
            if (projectSnapShot) {
              const absoluteEffortMins = projectSnapShot.absoluteEffortMins;
              return absoluteEffortMins / freeMins;
            }
          }
        }
        return 0;
      };

      const snapShotProjectGet = (id, snapShot) => {
        return snapShot.projects.find(snapShotProject => {
          return id === snapShotProject._id;
        });
      };

      const rewardForDay = project => {
        if (freeMinsGlobal && project.absoluteEffortMins) {
          return (
            project.absoluteEffortMins / freeMinsGlobal >=
            project.goalProportionEffort
          );
        }
        return false;
      };

      const rewardForWeek = project => {
        // console.log('project in rewardForWeek');
        // console.log(project.projectName);
        // console.log(snapShots);
        return snapShots.slice(0, 7).every(snapShot => {
          const proportionEffort = snapShotProportionByProject(
            snapShot,
            project._id
          );
          // if(project.projectName==='learning guitar'){
          //   console.log('snapShot in rewardForWeek');
          //   console.log(snapShot);
          //   console.log('proportionEffort');
          //   console.log(proportionEffort);
          //   console.log('proportionEffort >= project.goalProportionEffort');
          //   console.log(proportionEffort >= project.goalProportionEffort);
          // }
          return proportionEffort >= project.goalProportionEffort;
        });
      };

      const rewards = project => {
        const rewardThisWeek = rewardForWeek(project);
        const rewardToday = rewardForDay(project);
        return { rewardToday, rewardThisWeek };
      };

      /*RETURN FORMATTED VERSION OF CURRENT PROJECTS WITH CALCULATIONS FOR DISPLAY*/
      const currentProjects = projects.reduce((updated, project) => {
        // rewards(project, snapShots);

        if (project.inProgress) {
          updated.push({
            ...avgEffortProportion(project),
            ...age(project),
            ...rewards(project),
            ...project
          });
        }
        return updated;
      }, []);

      return <WrappedComponent currentProjects={currentProjects} />;
    }
  };
}
