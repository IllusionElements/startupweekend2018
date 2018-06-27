const getPercentageFromLength = (a, b) => a.length / b.length

const sortDescending = (a, b) => {
  const { similarityRate: aSR } = a;
  const { similarityRate: bSR } = b;

  return bSR - aSR;
}

export default class AnalysisAIService {
  constructor(db, events) {
    this.db = db
    this.events = events.eventList
    this.eventStore = events.Store
    this.store = new WeakMap()
  }

  /* eslint-disable-next-line class-methods-use-this */
  filterKeywords({ keywordList, keywords }) {
    return keywords.filter(word => keywordList.includes(word))
  }

  mapKeywordToList(job, keywords) {
    const mapped = job.map(career => ({
      ...career,
      matches: this.filterKeywords({ career, keywords }),
    }))

    this.store.set(this, mapped)

    this.eventStore.dispatch(this.events.JOB_ISMAPPED, {
      user: Meteor.userId(),
      mapped,
    })

    return this
  }

  matchKeywords = () => {
    const matched = this.store.get(this).map(({ keywordList, matches, ...rest }) => ({
      ...rest,
      similarityRate: getPercentageFromLength(matches, keywordList),
    }))

    this.store.set(this, matched)

    return matched
  }

  _sort = (arr, sorter) => [...arr].sort(sorter);

  sortMatches() {
    const matches = this.store.get(this)
    const sorted = this._sort(matches, sortDescending) // eslint-disable-line no-underscore-dangle
    this.store.delete(this)
    return sorted
  }
}
