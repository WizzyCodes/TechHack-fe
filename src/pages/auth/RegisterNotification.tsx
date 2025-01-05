import "./styles.css";

const RegisterNotification = () => {
  return (
    <div className="w-full bg-[indigo] h-screen flex justify-center items-center text-white shadow-inner shadow0">
      <div className="w-[50%] text-center font-semibold text-white shadow-inner">
        {" "}
        " Your account has been created successfully, An email has been sent to
        you, pls check your inbox and click on the verify button in the email to
        verify your account with your one time password
      </div>
    </div>
  );
};

export default RegisterNotification;
