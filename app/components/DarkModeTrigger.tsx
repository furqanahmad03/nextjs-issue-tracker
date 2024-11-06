import { useContext } from "react";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";
import { ThemeContext } from "./DarkModeContext";

const DarkModeTrigger = () => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  return (
    <button
      style={{ marginRight: "2rem", fontSize: "1.5rem", color: theme === "dark" ? "white" : "black", }}
      onClick={theme === "dark" ? switchLight : switchDark}
    >
      {theme === "dark" ? <MdBrightness7 /> : <MdBrightness4 />}
    </button>
  );
};

export default DarkModeTrigger;
