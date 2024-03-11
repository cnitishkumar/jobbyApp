import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdLocalPostOffice} from 'react-icons/md'

import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobData: {}}

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const formatData = data => {
      const similarJobs = data.similar_jobs
      const jobDetails = data.job_details

      const formattedJobDetails = {
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),

        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const formattedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobsDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      return {
        jobDetails: {...formattedJobDetails},
        similarJobs: [...formattedSimilarJobs],
      }
    }

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = formatData(data)
      this.setState({jobData: formattedData})
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillList = skillsList => {
    const skillItem = skill => {
      const {imageUrl, name} = skill
      console.log(name)

      return (
        <li className="li-skill-item" key={name}>
          <img src={imageUrl} alt={name} className="skill-image" />
          <p className="skill-name">{name}</p>
        </li>
      )
    }

    return (
      <>
        <h2>Skills</h2>
        <ul className="skill-list-ul-el">
          {skillsList.map(eachSkill => skillItem(eachSkill))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {jobData} = this.state
    const {similarJobs, jobDetails} = jobData
    const {skills, lifeAtCompany, companyWebsiteUrl} = jobDetails
    const imageUrl = lifeAtCompany.image_url
    console.log(similarJobs)
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      id,
    } = jobDetails

    return (
      <>
        <div className="job-container">
          <div className="job-header-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-title-container">
              <h2 className="job-title">{title}</h2>

              <div className="rating-container">
                <FaStar className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employment-type-container">
              <div className="location-container">
                <MdLocationOn />
                <p className="location">{location}</p>
              </div>
              <div className="location-container">
                <MdLocalPostOffice />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-header-container">
            <h2>Description</h2>
            <a href={companyWebsiteUrl} className="company-website">
              Visit
            </a>
          </div>

          <p>{jobDescription}</p>

          {this.renderSkillList(skills)}
          <div className="life-at-company-container">
            <div>
              <h2 className="life-at-company-heading">Life At Company</h2>
              <p className="life-description">{lifeAtCompany.description}</p>
            </div>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div>
          <h2 className="similar-job-heading">Similar Jobs</h2>
          <ul className="similar-jobs-ul-el">
            {similarJobs.map(each => (
              <SimilarJobs similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onClickRetryBtn = () => {
    this.getJobData()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-main-container">{this.renderData()}</div>
      </>
    )
  }
}

export default JobItemDetails
