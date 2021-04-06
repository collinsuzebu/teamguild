export default {
  projects: [],
  todos: {}, // project Id as key here for efficient performance
  apiCallsInProgress: 0,
  lastExportedGist: null,
  user: {
    isAuthenticated: false,
    info: {},
  },
};
