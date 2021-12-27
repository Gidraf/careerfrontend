import axios from 'axios'

export const FETCH_ALL_ORDERS = `FETCH_ALL_ORDERS`
export const FETCH_ALL_CUSTOMERS = `FETCH_ALL_CUSTOMERS`
export const FETCH_ALL_PERMISSIONS = `FETCH_ALL_PERMISSIONS`
export const FETCH_MORE_CUSTOMERS = `FETCH_ALL_CUSTOMERS`
export const FETCH_MORE_ORDERS = `FETCH_MORE_ORDERS`
export const ADMIN_SELECTED = `ADMIN_SELECTED`
export const DASHBOARD_SELECTED = `DASHBOARD_SELECTED`
export const REPORTS_SELECTED = `REPORTS_SELECTED`
export const BASE_URL = `https://winning-cv.com/`
// export const BASE_URL = `http://localhost:7000/`
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_ALL_WORKGROUPS = 'FETCH_ALL_WORKGROUPS'
export const FETCH_ALL_BOOKINGS = 'FETCH_ALL_BOOKINGS'
export const FETCH_ALL_ROLES = 'FETCH_ALL_ROLES'
export const FETCH_ALL_SERVICES = 'FETCH_ALL_SERVICES'
export const FETCH_USER_ROLES = 'FETCH_USER_ROLES'
export const FETCH_USER_WORKGROUPS = 'FETCH_USER_WORKGROUP'
export const FETCH_ROLE_PERMISSIONS = 'FETCH_ROLE_PERMISSIONS'
export const FETCH_ALL_REQUEST = 'FETCH_ALL_REQUEST'
export const FETCH_ALL_JOBS = 'FETCH_ALL_JOBS'
export const FETCH_ALL_JOBS_MORE = 'FETCH_ALL_JOBS_MORE'
export const CLEAR_ALL_REQUEST = 'CLEAR_ALL_REQUEST'
export const FETCH_GOLD_ANALYTICS = 'FETCH_GOLD_ANALYTICS'
export const FETCH_SILVER_ANALYTICS = 'FETCH_SILVER_ANALYTICS'
export const FETCH_BRONZE_ANALYTICS = 'FETCH_BRONZE_ANALYTICS'
export const FETCH_NORMAL_ANALYTICS = 'FETCH_NORMAL_ANALYTICS'
export const FETCH_ALL_REQUEST_MORE = 'FETCH_ALL_REQUEST_MORE'

export const provideToken = () => {
  const user = localStorage.getItem('AUTH')

  if (user) {
    // const { access_token } = user;
    const token = JSON.parse(user).access_token
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export const INITIAL_DRAFT_MESSAGE =
  'Greetings [name],' +
  '\n' +
  'Thank you for entrusting me to do your [service_name], Kindly find attached the initial draft of your [service_name].' +
  '\n' +
  'Please share the following additional information.' +
  '\n' +
  'Your timely cooperation and submission will be highly appreciated to avoid any inconvenience.' +
  '\n' +
  'The additional information required includes:' +
  '\n' +
  '1. Relevant add-ons in your resume.' +
  '\n' +
  '- Any volunteering work service.' +
  '\n' +
  '- Any certifications and/or training, online or otherwise.' +
  '\n' +
  '2. Please share an updated summary of your CV.' +
  '\n' +
  '3. Share some strengths, passions, and/or interests you find relevant in the intended job.' +
  '\n' +
  '4. A passport photo (Not Mandatory).' +
  '\n' +
  '5. A list of your favourite books (2 books maximum). This is also not mandatory.' +
  '\n' +
  '6. As for publications please provide the names of the authors, the title of the article, the title of the journal, the date published, and the URL.' +
  '\n' +
  '7. Share if any, some key achievements in your career so far in terms of:' +
  '\n' +
  'a)How did you re-organize something to make it work better?' +
  '\n' +
  'b) Have you identified any problem in your organization and solved it?' +
  '\n' +
  'c) Have you come up with a new idea that improved things for your organization?' +
  '\n' +
  'd) Have you developed or implemented new procedures or systems?' +
  '\n' +
  'e) Have you increased revenue or sales, saved money/time for your organization?' +
  '\n' +
  '8. Awards/recognitions from your industry or organization.' +
  '\n' +
  '9. Key recent achievements you are most proud of.' +
  '\n' +
  '10. The role you are applying for' +
  '\n' +
  '11. Skills relevant to the position you are applying for.' +
  '\n' +
  '12. Have you worked on any special projects? ' +
  '\n' +
  '13. What would you consider your Industry Expertise?' +
  '\n' +
  '14. What would you consider your Strengths/ Passions?' +
  '\n' +
  '15. Updated Referees' +
  '\n' +
  'Quantify the achievements, if possible. You can use the PAR (Problem Action and Result) approach in giving feedback on the achievements.' +
  '\nBest Regard'

export const FINAL_DRAFT_MESSAGE =
  'Hello [name],' +
  "Doing business with you in the past (amount of time) has been great. (I've learned so much from you and have" +
  'made several updates to our services based on your thorough, thoughtful feedback. I appreciate everything' +
  "you've done to make our company the best it can be.) –include based on the interaction with the client" +
  "As you set onto a new path, don't forget about us! I'd love to hear about your successes in the future and the" +
  'exciting growth your career inevitably will have.' +
  '\nAttached herewith are the final drafts in the following order: (List the attachments)' +
  '\nPlease keep in touch. Good luck with everything!' +
  '\n\nCheers,'
