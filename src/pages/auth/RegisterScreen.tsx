import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../../API/userApi";
import toast, { Toaster } from "react-hot-toast";
// import { nav } from "framer-motion/client";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [avatar, setAvatar] = useState<string>("");
  const [myImage, setMyImage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const validateUser = () => {
    if (
      !email ||
      avatar === "" ||
      !password ||
      !firstName ||
      !lastName ||
      !userName
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };
  const handleImage = (e: any) => {
    let file = e.target.files[0];
    setMyImage(URL.createObjectURL(file));
    setAvatar(file);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateUser()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    createAccount(formData)
      .then((res) => {
        if (res.status === 201) {
          // console.log(res);

          toast.success(res.message);
          navigate("/auth/notification");
        } else {
          toast.error("Error creating user");
        }
      })
      .finally(() => {
        setLoading(false);
      });
    //
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: 5 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 2 }}
      className="flex justify-center items-center max-w-full min-h-screen bg-neutral-900  container"
    >
      {" "}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-50 cursor-not-allowed "></div>
      )}
      <Toaster
        toastOptions={{
          duration: 9000,
        }}
      />
      <div className="w-[85%]">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 min-h-[450px] ">
          <div className="col-span-1 text-[45px] leading-tight lg:text-[50px] xl:text-[60px] text-white">
            {" "}
            Register <br className="hidden md:block" />
            Your
            <br />
            Account
            <p className="text-[18px]">
              Already have an Account, <br />
              <Link
                to="/auth/login"
                className="text-blue-500 font-medium italic"
              >
                sign in Here
              </Link>
            </p>
          </div>
          <div className="col-span-1 md:col-span-2  min-h-[300px] border shadow-purple-900 rounded-md shadow-2xl text-white flex flex-col p-5">
            <form className="flex-col flex" onSubmit={handleSubmit}>
              <div className="flex mb-10  w-[300px]">
                <div className="flex items-center border justify-center h-[55px] w-[205px] text-[20px] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ">
                  <div className="h-full border-r flex justify-center items-center">
                    <MdPerson className="mr-5" />
                  </div>
                  <label
                    htmlFor="avatar"
                    className="uppercase font-semibold ml-5 text-[13px] w-[50%] h-full flex justify-center items-center"
                  >
                    Upload Avatar
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </div>
                {myImage && (
                  <div className="h-[55px] w-[55px] border-y border-r rounded-full bg-white ml-2">
                    <img
                      src={myImage}
                      className="h-full object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full mb-5 ">
                <input
                  className="h-[40px] py-3 md:py-0 md:min-h-[45px] lg:min-h-[60px] flex-1 pl-2 border border-white text-white rounded-md  bg-neutral-950 outline-none focus:ring focus:ring-purple-500"
                  placeholder="First Name"
                  type="name"
                  name="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="h-[45px] py-3 md:py-0 md:min-h-[45px] lg:min-h-[60px]  flex-1 pl-2 border border-white text-white outline-none bg-neutral-950 rounded-md focus:ring focus:ring-purple-500"
                  placeholder="Last Name"
                  type="name"
                  name="name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full mb-5">
                <input
                  className="h-[40px] py-3 md:py-0  md:min-h-[45px] lg:min-h-[60px]  flex-1 pl-2 border border-white text-white rounded-md bg-neutral-950 outline-none focus:ring focus:ring-purple-500"
                  placeholder="Username"
                  type="name"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  className="h-[40px] py-3 md:py-0  md:min-h-[45px] lg:min-h-[60px]  flex-1 pl-2 border border-white text-white rounded-md bg-neutral-950 outline-none focus:ring focus:ring-purple-500"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                {" "}
                <div className="relative bg-black lg:w-[50%] ">
                  {" "}
                  <input
                    className="h-[40px] py-3 md:py-0  md:min-h-[45px] lg:min-h-[60px]  flex-1 pl-2 border border-white text-white rounded-md bg-neutral-950 outline-none focus:ring focus:ring-purple-500 w-full "
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
                <input
                  className="h-[40px] py-3 md:py-0  md:min-h-[45px] lg:min-h-[60px]  flex-1 pl-2 border border-white text-white rounded-md bg-neutral-950 outline-none focus:ring focus:ring-purple-500"
                  placeholder="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                disabled={loading}
                className={`${
                  loading
                    ? "bg-neutral-900 cursor-not-allowed animate-pulse"
                    : "bg-black "
                } hover:bg-neutral-800 w-[60%] text-white py-4 ml-24 rounded-md mt-6 font-bold uppercase duration-300 transition-all`}
              >
                {loading ? `Registering` : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterScreen;
