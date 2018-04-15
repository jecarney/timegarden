db = db.getSiblingDB("timegarden");

db.dropDatabase();

db.projects.insert([
  {
    _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
    projectName: "gardening",
    description: "start seeds indoors",
    goalProportionEffort: 0.2,
    inProgress: true,
    absoluteEffortMins: 0
  },
  {
    _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
    projectName: "learning guitar",
    description: "practice using book",
    goalProportionEffort: 0.4,
    inProgress: true,
    absoluteEffortMins: 0
  },
  {
    _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
    projectName: "walking dog",
    description: "30 mins at park",
    goalProportionEffort: 0.2,
    inProgress: true,
    absoluteEffortMins: 0
  }
]);

db.snapshots.insert([
  {
    date: 20180413,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 20
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 40
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 20
      }
    ]
  },
  {
    date: 20180412,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  },
  {
    date: 20180411,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 40
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 20
      }
    ]
  },
  {
    date: 20180410,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  },
  {
    date: 20180409,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  },
  {
    date: 20180408,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  },
  {
    date: 20180407,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  },
  {
    date: 20180406,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  },
  {
    date: 20180405,
    freeMins: 120,
    projects: [
      {
        _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
        absoluteEffortMins: 10
      },
      {
        _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
        absoluteEffortMins: 30
      },
      {
        _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
        absoluteEffortMins: 10
      }
    ]
  }
]);
