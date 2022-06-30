// import "./faq.css";

export const Testimonials = (props) => {
  return (
    <div id="faq">
      <div className="container">
        <div className="section-title text-center">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
          class="row"
        >
          <div style={{ padding: "16px" }} className="col-xs-12 col-md-6">
            <img
              src="img/faq.svg"
              style={{ boxShadow: "none" }}
              className="img-responsive"
              alt=""
            />{" "}
          </div>
          <div class="col-md-6 offset-md-3">
            <div class="faq" id="accordion">
              <div class="card">
                <div class="card-header" id="faqHeading-1">
                  <div class="mb-0">
                    <h5
                      class="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-1"
                      data-aria-expanded="true"
                      data-aria-controls="faqCollapse-1"
                    >
                      <span class="badge">1</span>How do I find the perfect
                      tutor?
                    </h5>
                  </div>
                </div>
                <div
                  id="faqCollapse-1"
                  class="collapse"
                  aria-labelledby="faqHeading-1"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <p>
                      Booking a free meeting with a tutor is a fast and
                      effective way of asking any questions you may have. This
                      can help you decide whether or not they’d be a good match
                      for you child.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="faqHeading-2">
                  <div class="mb-0">
                    <h5
                      class="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-2"
                      data-aria-expanded="false"
                      data-aria-controls="faqCollapse-2"
                    >
                      <span class="badge">2</span> How Can My Child Benefit From
                      Online Tutoring?
                    </h5>
                  </div>
                </div>
                <div
                  id="faqCollapse-2"
                  class="collapse"
                  aria-labelledby="faqHeading-2"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <p>
                      Online tutoring allows your child to receive undivided
                      attention in any subject of their choice. This is
                      particularly helpful for subjects in which they may be
                      struggling in. Our one on one tutoring allows for your
                      child to work at their own pace with complete attention
                      from our tutors which allows for optimal academic
                      improvement.
                    </p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="faqHeading-3">
                  <div class="mb-0">
                    <h5
                      class="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-3"
                      data-aria-expanded="false"
                      data-aria-controls="faqCollapse-3"
                    >
                      <span class="badge">3</span>How does it Work?
                    </h5>
                  </div>
                </div>
                <div
                  id="faqCollapse-3"
                  class="collapse"
                  aria-labelledby="faqHeading-3"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <p>
                      Search through our selection of tutors. Send a message to
                      any tutors that you’re interested in. Book a lesson. It’s
                      as simple as that!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
