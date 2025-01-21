function Input({ placeholder, type, name, register }) {
  return (
    <input
      type={type}
      id="adult"
      name={name}
      className="w-full px-4 py-2 border border-gray-300 rounded-md text-center"
      min="0"
      placeholder={placeholder}
      {...register(`${name}`)}
    ></input>
  );
}

export default Input;
