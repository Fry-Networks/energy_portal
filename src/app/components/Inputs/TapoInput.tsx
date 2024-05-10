const TapoInput = ({
    token,
    setToken,
    placeholder,
    inputType,
  }: {
    token: string;
    setToken: Function;
    placeholder: string;
    inputType: string;
  }) => (
    <input
      type={inputType}
      value={token}
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
      onChange={(e) => setToken(e.target.value)}
      placeholder={placeholder}
      className="appearance-none border h-11 w-[300px] border-gray-300 text-black rounded-md py-2 px-4 mb-6 leading-tight focus:outline-none focus:border-blue-500"
    />
  );
  
  export default TapoInput;
  