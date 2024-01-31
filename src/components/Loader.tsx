// interface ILoaderProps {}

// const Loader: React.FunctionComponent<ILoaderProps> = () => {
const Loader = () => {
  return (
    <picture className="w-16">
      <img className="animate-spin" src="/load.png" alt="" />
    </picture>
  );
};

export default Loader;
