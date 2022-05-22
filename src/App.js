// import './App.css'
import React, { useState, useEffect } from 'react'
import RepoDetails from './RepoDetails'
import axios from 'axios'

function App() {

  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [details, setDetails] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    setRepos([])
    setDetails({})
  }, [username])

  function handleSubmit(e) {
    e.preventDefault()
    searchRepos()
  }

  function searchRepos() {
    setLoading(true)
    axios({
      method: 'get',
      url: `https://api.github.com/users/${username}/repos`,
    }).then(res => {
      setLoading(false)
      setRepos(res.data)
    })
  }

  function renderRepo(repo) {
    return (
      <div className="" key={repo.id} onClick={() => getDetails(repo.name)}>
        <p style={{cursor:'pointer'}}>{repo.name}</p>
      </div>
    )
  }

  function getDetails(repoName) {
    setDetailsLoading(true)
    axios({
      method: 'get',
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then(res => {
      setDetailsLoading(false)
      setDetails(res.data)
    })
  }

  return (
    <div className="container p-3">
      <div className="row">
        <div className='col-md-7'>
          <form className="row g-3">
            <div className="col-auto">
              <input className='form-control' value={username} placeholder='Github Username'
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="col-auto">
              <button className='btn btn-primary' onClick={handleSubmit}>
                {loading ? 'Searching ...' : 'Search'}
              </button>     
            </div>
          </form>
          <div className="p-3 link-primary">
            {repos.map(renderRepo)}
          </div>
        </div>
        <div className="col-md-4">
          <RepoDetails details={details} loading={detailsLoading} />
        </div>
      </div>
    </div>

  )
}

export default App

// yard add axios