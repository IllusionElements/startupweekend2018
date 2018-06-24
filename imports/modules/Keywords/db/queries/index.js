import Careers from '..'

export default Careers.createQuery('career query', {
  name: 1,
  relatedCareers: 1,
})
