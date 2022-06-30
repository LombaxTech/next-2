export const About = (props) => {
  return (
    <div id="start">
      <div className="container">
        <div className="row">
          <div style={{padding: '16px'}} className="col-xs-12 col-md-6">
            <img
              src="img/steps.svg"
              style={{ boxShadow: "none" }}
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Start Today</h2>

              {/* <p>{props.data ? props.data.paragraph : "loading..."}</p> */}
              <h3>As Easy As 1-2-3?</h3>
              <div className="list-style">
                <div className="col-lg-12 col-sm-12 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <div>
                            <div style={{display: 'flex'}}>
                              <div
                                style={{
                                  background:
                                    "linear-gradient(to right, #38B2AC 0%, #5ca9fb 100%)",
                                  color: "white",
                                  borderRadius: "50%",
                                  width: "40px",
                                  height: "40px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginRight: '16px'
                                }}
                              >
                                <i className={"fa fa-search"}></i>
                              </div>
                              <h4>{d}</h4>
                            </div>
                            <hr
                              style={{ width: "100%", background: "#beced4" }}
                            />
                          </div>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
