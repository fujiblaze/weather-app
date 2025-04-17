import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTheme } from "./themes/theme-provider";
import Moon from "./svgs/moon";
import Sun from "./svgs/sun";
import SearchLocation from "./SearchLocation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const darkmode = theme === "dark";

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-3 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img src={logo} alt="Weather" className="h-16" />
        </Link>

        <div className="flex gap-8">
          {/* search */}
          <SearchLocation />

          {/* theme toggle */}
          <div
            onClick={() => setTheme(darkmode ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-1000 ${
              darkmode ? "rotate-180" : "rotate-0"
            }`}
          >
            {darkmode ? (
              <Sun className={`h-9 w-9 text-yellow-200 transition-all`} />
            ) : (
              <Moon className={`h-9 w-9 text-blue-300 transition-all`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
