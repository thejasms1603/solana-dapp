type InputBoxProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder: string;
};


const InputBox = ({ onChange, value, placeholder }: InputBoxProps) => {
  return (
    <div>
      <input
        type='text'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
