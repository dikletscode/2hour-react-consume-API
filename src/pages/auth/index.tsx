import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { background } from "../../assets";
import { API } from "../../config/axios";

interface Credential {
  data: {
    token: string;
  };
}

const Auth = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [msgError, setMsgError] = useState("");
  const history = useHistory();

  const login = async () => {
    try {
      let res = await API.post<Credential>("login", input);
      localStorage.setItem("credential", res.data.data.token);
      history.push("/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMsgError(error.response?.data.errorMessage);
      } else {
        setMsgError("terjadi error");
      }
    }
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-stretch text-white ">
      <div className="lg:flex w-1/2 bg-bgLeft hidden bg-gray-500 bg-no-repeat bg-cover relative items-center">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <p className="text-3xl my-4">Checklist Item</p>
        </div>
      </div>
      <div className="lg:w-1/2 bg-pink-900 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
        <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20">
          <p>{msgError}</p>
          <form
            action=""
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            onSubmit={submit}
          >
            <div className="pb-2 pt-4">
              <input
                type="text"
                value={input.username}
                onChange={handleChange}
                id="username"
                placeholder="username"
                className="block w-full p-4 text-lg rounded-sm bg-black"
              />
            </div>
            <div className="pb-2 pt-4">
              <input
                className="block w-full p-4 text-lg rounded-sm bg-black"
                type="password"
                onChange={handleChange}
                id="password"
                placeholder="Password"
              />
            </div>

            <div className="px-4 pb-2 pt-4">
              <button className="uppercase block w-full p-4 text-lg rounded-full bg-blue-400 hover:bg-indigo-600 focus:outline-none">
                sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Auth;
