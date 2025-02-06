import CustomWalletButton from "./CustomWalletButton";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-900 text-white'>
      <h1 className='text-xl font-bold'>Solana Wallet App</h1>
      <div className='flex gap-4'>
        <CustomWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
