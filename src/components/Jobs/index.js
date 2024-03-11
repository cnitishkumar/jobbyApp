import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import JobFilters from '../JobFilters'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {salaryRange, employmentType, searchInput} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log(jobsApi)
    const response = await fetch(jobsApi, options)

    const getFormattedData = data => {
      const formattedData = data.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobsDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      return formattedData
    }

    if (response.ok === true) {
      const data = await response.json()
      const jobsData = data.jobs

      const formattedJobsData = getFormattedData(jobsData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsData: formattedJobsData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryBtn = () => {
    this.getJobsData()
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobsData)
  }

  onChangeEmploymentType = event => {
    const {employmentType} = this.state
    const filterEmploymentTypeList = employmentType.filter(
      each => each !== event.target.value,
    )
    if (employmentType.includes(event.target.value) === false) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobsData,
      )
    } else {
      this.setState(
        {employmentType: filterEmploymentTypeList},
        this.getJobsData,
      )
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    const onChangeSearchInput = event => {
      this.setState({searchInput: event.target.value})
    }

    const onClickSearchBtn = () => {
      this.getJobsData()
    }

    return (
      <>
        <input
          type="search"
          className="job-search-input"
          value={searchInput}
          onChange={onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={onClickSearchBtn}
        >
          <BsSearch className="search-icon" alt="searchIcon" />
        </button>
      </>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-failure-image"
        alt="failure view"
      />

      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="jobs-failure-image"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    return (
      <ul className="jobs-ul-el">
        {jobsData.map(each => (
          <JobItem jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderJobsData = () => {
    const {apiStatus, jobsData} = this.state

    const jobsDataLength = jobsData.length

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.success:
        if (jobsDataLength === 0) {
          return this.renderNoJobsView()
        }
        return this.renderJobsSuccessView()

      default:
        return null
    }
  }

  render() {
    const {salaryRange, employmentType, searchInput} = this.state
    console.log(salaryRange)

    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="job-filters-sections">
            <Profile />
            <JobFilters
              onChangeSalaryRange={this.onChangeSalaryRange}
              onChangeEmploymentType={this.onChangeEmploymentType}
            />
          </div>
          <div className="search-input-container-mobile">
            {this.renderSearchBar()}
          </div>
          <div className="jobs-view-container">
            <div className="search-input-container-desktop">
              {this.renderSearchBar()}
            </div>
            {this.renderJobsData()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
