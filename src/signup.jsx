import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const data = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };

  const [inputData, setInputData] = useState(data);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (phone) => {
    if (!phone) {
      setErrors({ ...errors, phoneNumber: "Phone Number is required" });
    }else {
      setInputData({ ...inputData, phoneNumber: phone });
      setErrors({ ...errors, phoneNumber: "" });
    }};
  

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!email.endsWith(".com")) return "Email must end with .com";
    return "";
  };

  const submit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!inputData.name) validationErrors.name = "Name is required";
    if (!inputData.email) validationErrors.email = "Email is required";

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!inputData.password) validationErrors.password = "Password is required";
    else if (!passwordRegex.test(inputData.password)) {
      validationErrors.password = "Password must be at least 8 characters long containing numbers, letters, and special characters";
    }

    if (!inputData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (inputData.password !== inputData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (!inputData.phoneNumber) {
      validationErrors.phoneNumber = "Phone Number is required";
    }

    const emailError = validateEmail(inputData.email);
    if (emailError) validationErrors.email = emailError;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        {msg ? inputData.name + " signed successfully!" : null}
        <h3>Signup</h3>
        <form onSubmit={submit}>
          <div>
            <input type="text" placeholder="Name" name="name" value={inputData.name} onChange={handleInput} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input type="email" placeholder="Email" name="email" value={inputData.email} onChange={handleInput} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <input type="password" placeholder="Password" name="password" value={inputData.password} onChange={handleInput} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={inputData.confirmPassword} onChange={handleInput} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <div>
            <PhoneInput country={"us"} value={inputData.phoneNumber} onChange={handlePhoneChange} containerClass="phone-container"
  inputClass="phone-input"/>
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
