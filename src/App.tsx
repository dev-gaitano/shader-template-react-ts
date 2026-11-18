import { useEffect, useRef } from "react";
import { init } from "./scene";

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = init(containerRef.current);
    return cleanup;
  }, []);

  return <div ref={containerRef}></div>;
}

export default App;
