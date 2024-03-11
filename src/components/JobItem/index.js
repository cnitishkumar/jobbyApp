import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdLocalPostOffice} from 'react-icons/md'

import './index.css'

import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobsDescription,
    id,
  } = jobDetails

  return (
    <li className="jobItem-list">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-container">
          <div className="job-header-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
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
          <h2>Description</h2>
          <p>{jobsDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
