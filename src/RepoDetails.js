function RepoDetails({ details, loading }) {
    if (loading) {
        return (
            <h4>Loading...</h4>
        )
    }
    return (
        <div>
            <div>
                <label className="fw-bold">Name : </label>
                <span> {details.name}</span>
            </div>
            <div>
                <label className="fw-bold">Fork Count :</label>
                <span> {details.forks}</span>
            </div>
            <div>
                <label className="fw-bold">Language :</label>
                <span> {details.language}</span>
            </div>
            <div>
                <label className="fw-bold">Stars :</label>
                <span> {details.stargazers_count}</span>
            </div>
        </div>
    )
}

export default RepoDetails