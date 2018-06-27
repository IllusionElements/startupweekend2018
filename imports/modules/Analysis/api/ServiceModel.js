// @flow

import AnalysisAIService from './Service'

const createEvent = (...names) => (...actions) => names.reduce((event, name, i) => ({
  ...event,
  [name]: actions[i],
}), {})

export const events = {
  eventList: createEvent('JOB_ISMAPPED')('job_mapped'),
  Store: {
    dispatch(arg: string, ...args: any) {
      return [arg, ...args]
    },
  },
}

export default AnalysisAIService
