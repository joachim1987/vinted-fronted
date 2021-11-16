const Input = ({ title, setValue }) => {
  return (
    <div>
      <h4>{title}</h4>
      <input onChange={(event) => setValue(event.target.value)} type="text" />
    </div>
  );
};

export default Input;
