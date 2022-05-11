import { useEffect } from "react";

export default function useBody(styles) {
  useEffect(() => {
    const body = document.body;
    body.removeAttribute("style");

    if (typeof styles === "object") {
      const props = Object.entries(styles);
      for (const [k, v] of props) {
        body.style[k] = v;
      }
    }
    return () => {
      body.removeAttribute("style");
    };
  }, [styles]);
}
