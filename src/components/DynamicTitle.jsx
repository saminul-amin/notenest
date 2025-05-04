import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "Home | NoteNest",
      "/sign-in": "Sign In | NoteNest",
      "/sign-up": "Sign Up | NoteNest",
    };

    document.title = titleMap[location.pathname] || "NoteNest";
  }, [location]);

  return null;
};

export default DynamicTitle;
