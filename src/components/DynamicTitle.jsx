import { useEffect } from "react";
import { useLocation } from "react-router";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      "/": "Home | NoteNest",
      "/faq": "FAQ | NoteNest",
      "/sign-in": "Sign In | NoteNest",
      "/sign-up": "Sign Up | NoteNest",
      "/todo-list": "ToDo List | NoteNest",
      "/my-notes": "My Notes | NoteNest",
    };

    document.title = titleMap[location.pathname] || "NoteNest";
  }, [location]);

  return null;
};

export default DynamicTitle;
