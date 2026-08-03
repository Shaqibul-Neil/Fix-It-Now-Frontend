"use client";

interface IGlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

// Last resort — the root layout itself failed, so this file replaces it and
// has to ship its own document. It renders outside the app's stylesheet, which
// is why every rule here is inline and the palette is hard-coded.
const GlobalError = ({ error, unstable_retry }: IGlobalErrorProps) => {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          background: "#faf6f2",
          color: "#2a211a",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "32rem",
            padding: "2.5rem",
            textAlign: "center",
            border: "1px solid rgba(176, 74, 58, 0.3)",
            background: "rgba(176, 74, 58, 0.05)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            FixItNow could not start
          </h1>

          <p
            style={{
              margin: "0.75rem 0 0",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              color: "#7d6d60",
            }}
          >
            The page failed before anything could render. Reloading usually
            clears it.
          </p>

          {error.digest && (
            <p
              style={{
                margin: "1rem 0 0",
                fontSize: "0.75rem",
                fontFamily: "ui-monospace, monospace",
                color: "#7d6d60",
                wordBreak: "break-word",
              }}
            >
              {`Reference ${error.digest}`}
            </p>
          )}

          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              color: "#fffaf5",
              background: "#8a6b4e",
              border: "1px solid #8a6b4e",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
