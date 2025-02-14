import "./loader.css";

type Props = {};

const MyLoader = (props: Props) => {
  return (
    <div className="min-w-screen fixed inset-0 flex min-h-screen items-center justify-center bg-transparent backdrop-blur-md">
      <span className="loader"></span>
    </div>
  );
};

export default MyLoader;
