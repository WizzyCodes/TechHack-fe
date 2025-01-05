import { useContext, useState } from "react";
import { GlobalContext } from "../../global/globalProvider";
import { logIn } from "../../API/userApi";
import toast, { Toaster } from "react-hot-toast";
import "./styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const { setUser }: any = useContext(GlobalContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    logIn({ email, password })
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          const getID: any = jwtDecode(res.data!);
          setUser(getID?.id);
          localStorage.setItem("auth", JSON.stringify(getID?.id));
          toast.success(res.message);
          navigate("/");
        } else {
          toast.error("Error logging in");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="shadow-inner ">
      <Toaster />
      <div className="w-full h-screen bg-neutral-950 justify-center flex flex-col  gap-3 items-center text-white shadow0">
        <div className="w-[90%] md:w-[40%] lg:w-[35%] md:h-[60%] h-[60%] sm:w-[50%] bg-gray-950 shadow shadow-purple-700 justify-center flex items-center flex-col shadow0 rounded-md ">
          <div className="text-[16px] font-medium mt-5">
            LOG IN TO YOUR ACCOUNT
          </div>

          <form
            onSubmit={handleLogin}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <div className="w-[90%] h-[80%] border rounded-md text-center p-5 ">
              <div>
                <input
                  className="h-[45px] py-3 md:py-0  md:min-h-[40px] lg:min-h-[50px]  flex-1 pl-2 border border-white text-white rounded-md bg-purple-900 outline-none mb-10 focus:ring-4 focus:ring-indigo-900 w-[98%] focus:border-none"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative  w-full">
                  {" "}
                  <input
                    className="h-[45px] py-3 md:py-0  md:min-h-[40px] lg:min-h-[50px]  flex-1 pl-2 border border-white text-white rounded-md bg-purple-900 outline-none focus:ring-4 focus:ring-indigo-900 w-[98%] focus:border-none"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[20px] text-white"
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className={`${
                  loading
                    ? "bg-neutral-900 cursor-not-allowed animate-pulse"
                    : "bg-black "
                } hover:bg-neutral-800 w-[60%] text-white py-4 ml-24 rounded-md mt-6 font-bold uppercase duration-300 transition-all`}
              >
                {loading ? `Logging In` : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
