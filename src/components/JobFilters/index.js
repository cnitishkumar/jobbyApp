import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobFilters = props => {
  const {onChangeSalaryRange, onChangeEmploymentType} = props

  const salaryFilter = salaryFilterDetails => {
    const {label, salaryRangeId} = salaryFilterDetails

    const onChangeSalaryFilter = () => {
      onChangeSalaryRange(salaryRangeId)
    }

    return (
      <li className="filters-list" key={salaryRangeId}>
        <input
          type="radio"
          name="salary"
          id={salaryRangeId}
          value={salaryRangeId}
          onChange={onChangeSalaryFilter}
        />
        <label htmlFor={salaryRangeId} className="filter-label-el">
          {label}
        </label>
      </li>
    )
  }

  const employmentTypeFilter = filterDetails => {
    const {label, employmentTypeId} = filterDetails
    const onChangeEmploymentFilter = event => {
      onChangeEmploymentType(event)
    }

    return (
      <li className="filters-list" key={employmentTypeId}>
        <input
          type="checkbox"
          onChange={onChangeEmploymentFilter}
          id={employmentTypeId}
          value={employmentTypeId}
        />
        <label htmlFor={employmentTypeId} className="filter-label-el">
          {label}
        </label>
      </li>
    )
  }
  return (
    <>
      <div>
        <h2 className="filters-heading">Type of Employment</h2>
        <ul className="filters-ul-el">
          {employmentTypesList.map(each => employmentTypeFilter(each))}
        </ul>
        <hr className="hr" />
      </div>

      <div>
        <h2 className="filters-heading">Salary Range</h2>

        <ul className="filters-ul-el">
          {salaryRangesList.map(each => salaryFilter(each))}
        </ul>

        <hr className="hr" />
      </div>
    </>
  )
}

export default JobFilters
