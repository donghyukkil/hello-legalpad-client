import NavBar from "../../components/NavBar";
import LegalPadTextarea from "../../components/LegalPadTextArea";
import SubNavBar from "../../components/SubNavBar";

const Create = () => {
  return (
    <div className="flex">
      <NavBar />
      <div className="bg-yellow-300 w-screen h-screen flex flex-col">
        <SubNavBar />
        <div className="flex bg-teal-950 w-3/4 h-3/4 m-auto py-0 justify-center rounded-md">
          <LegalPadTextarea />
        </div>
      </div>
    </div>
  );
};

export default Create;
