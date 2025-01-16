export default function Loading() {
  return (
    <p
      data-testid="loading-indicator"
      className="text-gray-500 text-center mt-8 mb-8"
    >
      <span className="inline-block animate-spin">🌀</span>{" "}
      <span>Loading...</span>
    </p>
  );
}
