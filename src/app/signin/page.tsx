import SignIn from "../(components)/sign-in";

const page = () => {
  return (
    <div className="flex bg-gray-200 cursor-pointer m-1 p-1 w-fit">
      <div className="flex bg-blue-600  cursor-pointer m-1 p-2 text-white rounded-lg w-fit text-1">
        <SignIn prov="github"></SignIn>
      </div>
      <div className="flex bg-orange-400  cursor-pointer m-1 p-2 text-white rounded-lg w-fit text-1">
        <SignIn prov="slack"></SignIn>
      </div>
      <div className="flex bg-green-700  cursor-pointer m-1 p-2 text-white rounded-lg w-fit text-1">
       <SignIn prov="google"></SignIn>
      </div>
    </div>
  );
};
export default page;
