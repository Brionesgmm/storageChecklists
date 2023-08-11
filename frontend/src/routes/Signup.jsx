import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

function Signup() {
  const { setUser, setMessages } = useOutletContext();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  // Add your property names here
  // const properties = [
  //   "Property Alpha",
  //   "Property Beta",
  //   "Property Gamma",
  //   "Property Delta",
  //   "Property Epsilon",
  // ];

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      console.log(data);
      setProperties(data);
    };

    fetchProperties();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)),
    });
    const json = await response.json();
    if (json.messages) {
      setMessages({});
      setTimeout(() => {
        setMessages(json.messages);
      }, 0);
    }
    if (json.user) {
      setUser(json.user);
      navigate("/profile");
    }
  };

  return (
    <main className="container">
      <div className="row justify-content-center">
        <section className="col-6 mt-5">
          <form action="/api/signup" method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="property" className="form-label">
                Property
              </label>
              <select className="form-select" id="property" name="property">
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option value={property._id} key={property._id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="signupCode" className="form-label">
                Signup Code
              </label>
              <input
                type="text"
                className="form-control"
                id="signupCode"
                name="signupCode"
                placeholder="Enter signup code"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Signup;
