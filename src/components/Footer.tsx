const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-sm m-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a
            href='https://flowbite.com/'
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
          >
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-white'>
              Developed by Thejas
            </span>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0'>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Github
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
        <span className='block text-sm text-white sm:text-center'>
          © 2023{" "}
          <a href='/' className='hover:underline'>
            Thejas
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
