import TypeAnimation from "react-type-animation";
import * as React from "react";

export const Navigation = (props) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const position = window.pageYOffset;
      setScrollPosition(position);
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [window]);
  return (
    <nav
      id="menu"
      className={`navbar navbar-default navbar-fixed-top ${
        scrollPosition < 150 ? "transparent" : ""
      }`}
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a href="#">
            <TypeAnimation
              cursor={true}
              sequence={["RKTUTORS", 1000, "RKTUTORS"]}
              wrapper="a"
              href="#"
              className="navbar-brand page-scroll"
            />
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                href="#about"
                className={`page-scroll ${
                  scrollPosition < 150 ? "transparent" : ""
                }`}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#start"
                className={`page-scroll ${
                  scrollPosition < 150 ? "transparent" : ""
                }`}
              >
                Start Today
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className={`page-scroll ${
                  scrollPosition < 150 ? "transparent" : ""
                }`}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`page-scroll ${
                  scrollPosition < 150 ? "transparent" : ""
                }`}
              >
                Contact
              </a>
            </li>
            <li>
              <div>
                <a
                  style={{
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "25px",
                    margin: "9px 20px 0 20px",
                  }}
                  href="http://academy.rktutors.co.uk"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Login
                </a>{" "}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
