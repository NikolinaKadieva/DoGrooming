import "./Contact.css";

export const Contact = () => {
    return (
        <div className="container-fluid pt-5">

            <div className="d-flex flex-column text-center mb-5 pt-5">
                <h4 className="text-secondary mb-3">Contact Us</h4>
                <h1 className="display-4 m-0">
                    Contact For <span className="text-primary">Any Query</span>
                </h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 mb-5">
                    <div className="contact-form">
                        <div id="success" />
                        <form name="sentMessage" id="contactForm" noValidate="novalidate">
                            <div className="control-group">
                                <input
                                    type="text"
                                    className="form-control p-4"
                                    id="name"
                                    placeholder="Your Name"
                                    required="required"
                                    data-validation-required-message="Please enter your name"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <input
                                    type="email"
                                    className="form-control p-4"
                                    id="email"
                                    placeholder="Your Email"
                                    required="required"
                                    data-validation-required-message="Please enter your email"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <input
                                    type="text"
                                    className="form-control p-4"
                                    id="subject"
                                    placeholder="Subject"
                                    required="required"
                                    data-validation-required-message="Please enter a subject"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <textarea
                                    className="form-control p-4"
                                    rows={6}
                                    id="message"
                                    placeholder="Message"
                                    required="required"
                                    data-validation-required-message="Please enter your message"
                                    defaultValue={""}
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div>
                                <button
                                    className="btn btn-primary py-3 px-5"
                                    type="submit"
                                    id="sendMessageButton"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12 mb-n2 p-0">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d377268.8787577957!2d25.33647027186737!3d42.37634520080977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d42.6115072!2d25.385369599999997!4m3!3m2!1d42.138029599999996!2d25.8685112!5e0!3m2!1sen!2sat!4v1658313499128!5m2!1sen!2sat"
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="map">
                    </iframe>
                </div>
            </div>
        </div>
    );
};