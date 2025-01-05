import { useState } from "react";
import { verifyAccount } from "../../API/userApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
      <div className="w-full h-screen bg-[darkblue] justify-center flex flex-col gap-3 items-center">
        <div className="w-[100%] h-[40%] sm:w-[30%] sm:h-[60%] rounded-md justify-center flex items-center">
          <div className="w-[90%] h-[80%] p-2 flex flex-col gap-[20px] rounded-md bg-white text-center">
            <div className="text-[15px] font-medium">
              A one-time password was sent to your email. Enter the code below
              to complete your verification.
            </div>
            <form onSubmit={handleSubmit}>
              {" "}
              <div>
                <input
                  placeholder="OTP"
                  className="border w-[90%] h-[35px] mt-5 outline-none bg-gray-100"
                  type="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  className="border rounded-md w-[90%] h-[35px] mt-3 bg-green-400 text-[13px] text-white"
                  type="submit"
                >
                  {loading ? `Loading` : `Verify`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
