import React from 'react'

const SearchBar = ({
  state,
  toggleAdvanceForm,
  handleChange,
  execSearch,
}) => (
  <div className='searchbar-container'>
    <div className='searchbar'>
      <input
        type="text"
        name="term"
        onFocus={toggleAdvanceForm.bind(this, false)}
        placeholder=""
        onChange={handleChange}
      />
      <button
        type="submit"
        onClick={execSearch}
      >
        <i className='icon-find' />
        Search
      </button>
    </div>
    <div
      
      className={`advancedsearch ${state.show ? 'show': 'hide'}`}
    >
      <div className='button-link'>
        <a href="" className="reiniciar">Reset search</a>
      </div>
      <div>
        <legend>Search by</legend>
        <label>
          <input
            name="kind"
            type="radio"
            value="eje,consultas"
            onChange={handleChange}
            checked={state.kind === 'eje,consultas'}
          />
            All results
        </label>
        <label>
          <input
            name="kind"
            type="radio"
            value="eje"
            onChange={handleChange}
            checked={state.kind === 'eje'}
          />
            Only axis and proposals
        </label>
        <label>
          <input
            name="kind"
            type="radio"
            value="consultas"
            onChange={handleChange}
            checked={state.kind === 'consultas'}
          />
            Only inquiries
        </label>
      </div>
      <div className="form-group item-form">
        <legend>Autor</legend>
        <select className="form-control">
          <option value="" defaultValue>All authors</option>
          {state.authors.map((author) =>
            <option key={author} value={author}>{author}</option>
          )}
        </select>
      </div>
      <div className="button-link form">
        <button
          className="btn btn-link"
          onClick={toggleAdvanceForm.bind(this, false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={execSearch}
        >
          Apply
        </button>
      </div>
    </div>
  </div>
)

export default SearchBar
