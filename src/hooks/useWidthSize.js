import { useState, useEffect } from "react";

function useWidthSize() {
    // Initialize state with undefined width
    const [widthSize, setWidthSize] = useState(undefined);
    useEffect(() => {
      // Handler to call on width resize
      function handleResize() {
        // Set window width to state
        setWidthSize(window.innerWidth);
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial width size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return widthSize;
  };

  export default useWidthSize;