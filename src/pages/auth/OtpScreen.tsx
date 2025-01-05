import { useState } from "react";
import { verifyAccount } from "../../API/userApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./styles.css";

const Otp = () => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams(); // Extract userID from URL params
  const navigate = useNavigate(); // Correct placement of useNavigate

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!id) {
      toast.error("User ID not found");
      setLoading(false);
      return;
    }

    verifyAccount(id, otp)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.message);
          navigate("/auth/login");
        } else {
          return toast.error(res.message || "Error verifying user");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="w-full h-screen bg-gray-950 justify-center flex flex-col gap-3 items-center">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-50 cursor-not-allowed "></div>
        )}
        <div className="w-[100%] md:h-[60%] sm:w-[60%] sm:h-[70%] rounded-md md:w-[50%] lg:w-[35%] lg:h-[50%] justify-center flex items-center p-5 min-h-[60%]">
          <div className="w-[90%] h-[80%] p-2 flex flex-col gap-[20px] rounded-md bg-[lightblue] text-center shadow0 shadow">
            <div className="text-[15px] font-medium">
              A one-time password was sent to your email. Enter the code below
              to complete your verification.
            </div>
            <form onSubmit={handleSubmit}>
              {" "}
              <div>
                <input
                  placeholder="OTP"
                  className="border w-[90%] h-[40px] mt-7 p-3 rounded-md border-white outline-none bg-purple-900 placeholder-white text-white focus:ring-4 focus:border-none focus:ring-indigo-900"
                  type="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  className="border rounded-md w-[90%] h-[35px] mt-7 bg-purple-900 text-[13px] text-white uppercase"
                  type="submit"
                >
                  {loading ? `Loading` : `Verify`}
                </button>
                <p className="mt-5">
                  Don't have an account?{" "}
                  <Link to="/auth/" className="text-blue-700">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
