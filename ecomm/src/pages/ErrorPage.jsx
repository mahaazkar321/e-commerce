export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong</h1>
      <p>We're working to fix this issue.</p>
      <button onClick={() => window.location.href = '/'}>
        Return to Home
      </button>
    </div>
  );
}