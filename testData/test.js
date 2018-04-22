db = db.getSiblingDB("timegarden");

db.dropDatabase();

db.users.insert({
  _id: ObjectId("5adaa913669ad81c04bd114a"),
  email: "test@test.com",
  password: "$2b$10$uorFOYWdxq2tkTiCyMuqhO77V7KRrcggRhD.HX7NI8zKBgImSACOK",
  __v: 0
});

db.currentlogs.insert({
  _id: ObjectId("5adaba8e975aa5ea6ff992d6"),
  user: ObjectId("5adaa913669ad81c04bd114a"),
  __v: 0,
  freeMins: 0
});

db.projects.insert([
  {
    _id: ObjectId("5ad2a0f05ad56a2eb723a2c2"),
    projectName: "gardening",
    description: "start seeds indoors",
    goalProportionEffort: 0.2,
    inProgress: true,
    absoluteEffortMins: 0,
    progressStart: ISODate("2018-04-20T01:43:58.623Z"),
    user: ObjectId("5adaa913669ad81c04bd114a")
  },
  {
    _id: ObjectId("5ad2a10f5ad56a2eb723a2c3"),
    projectName: "learning guitar",
    description: "practice using book",
    goalProportionEffort: 0.4,
    inProgress: true,
    absoluteEffortMins: 0,
    progressStart: ISODate("2018-04-15T01:43:58.623Z"),
    user: ObjectId("5adaa913669ad81c04bd114a")
  },
  {
    _id: ObjectId("5ad2a1445ad56a2eb723a2c4"),
    projectName: "walking dog",
    description: "30 mins at park",
    goalProportionEffort: 0.2,
    inProgress: true,
    absoluteEffortMins: 0,
    progressStart: ISODate("2018-04-01T01:43:58.623Z"),
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
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
    ],
    user: ObjectId("5adaa913669ad81c04bd114a")
  }
]);
