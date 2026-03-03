export default function Footer() {
  return (
    <footer
      className="app-footer"
      style={{
        padding: "1rem",
        textAlign: "center",
        color: "var(--muted)",
      }}
    >
      <small>© {new Date().getFullYear()} Weather App</small>
    </footer>
  );
}
