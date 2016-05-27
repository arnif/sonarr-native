function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function promiseMiddleware({dispatch}) {
  return next => action => {
    if (action.pending) {
      return next(action);
    }

    if (isPromise(action.payload)) {
      dispatch({type: action.type, payload: null, error: null, pending: true});

      return action.payload
        .then((result) => dispatch({...action, payload: result, pending: false}))
        .catch((error) => dispatch({...action, payload: null, error: error.error, pending: false}));
    }
    return next(action);
  };
}
