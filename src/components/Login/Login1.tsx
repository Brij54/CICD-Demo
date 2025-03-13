import "../../App.css";

interface Login1Props {
  formData: { email_id: string; password: string };
  setFormData: React.Dispatch<React.SetStateAction<{ email_id: string; password: string }>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEmailValid: () => boolean;
  isPasswordValid: () => boolean;
}

export default function Login1({
  formData,
  setFormData,
  error,
  handleSubmit,
  isEmailValid,
  isPasswordValid,
}: Login1Props) {
  return (
    <div className="d-flex flex-column" style={{ height: 800 }}>
      <form
        className="border w-15 d-flex flex-column m-auto shadow-sm"
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        onSubmit={handleSubmit}
      >
        <div
          className=" d-flex justify-content-center"
          style={{
            background: "#DCDCDC",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <h3 className="fs-5 fw-light p-2">Sign in</h3>
        </div>
        <div className=" d-flex flex-column gap-4 p-4 align-items-center">
          <div className="d-flex gap-4 justify-content-end">
            <input
              type="email"
              className="form-control bg-light border-1"
              name="email_id"
              placeholder="Email"
              value={formData.email_id}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
              }
            />
          </div>
          <div className="d-flex gap-4 justify-content-start">
            <input
              type="password"
              className="form-control bg-light border-1"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
              }
            />
          </div>
          <div className="text-center col-sm-10">
            <button
              type="submit"
              className="btn text-white w-100"
              style={{
                background: "#2D88D4",
                fontSize: "18px",
                borderRadius: "10px",
              }}
              disabled={!isEmailValid() || !isPasswordValid()}
            >
              Login
            </button>
          </div>

          {error && <div className="fs-6 text-danger">{error}</div>}

          <div className="fs-6 d-flex flex-column align-items-center">
            <button type="button" className="btn btn-link p-0">Forgot Password</button>
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-decoration-none">
                Click Me
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
