export default function Loading({ label = 'Finding something delicious' }) {
  return <div className="loading-state" role="status"><span className="loader-orbit"><i/><i/><i/></span><p>{label}<span className="loading-dots">...</span></p></div>
}
