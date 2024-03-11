import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdLocalPostOffice} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props

  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobsDescription,
    id,
  } = similarJobDetails

  console.log(similarJobDetails)

  return (
    <li className="similar-job-li-el">
      <div className="job-header-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="job-title-container">
          <h2 className="job-title">{title}</h2>

          <div className="rating-container">
            <FaStar className="rating-icon" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h2 className="description-heading">Description</h2>
      <p className="similar-job-description">{jobsDescription}</p>
      <div className="similar-job-footer-container">
        <div className="location-container">
          <MdLocationOn />
          <p className="location">{location}</p>
        </div>
        <div className="location-container">
          <MdLocalPostOffice />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
