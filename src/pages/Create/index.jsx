import TextEditor from "../../components/TextEditor";

const Create = () => {
  return (
    <div className="flex">
      <div
        className="flex w-3/4 h-3/4 m-auto justify-center rounded-md"
        style={{ backgroundColor: "#DAC0A3" }}
      >
        <TextEditor />
      </div>
    </div>
  );
};

export default Create;
