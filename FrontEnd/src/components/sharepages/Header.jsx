import PopupHeader from "./PopupHeader";

const Header = () => {
  return (
    <header id="main-header">
      <div className="headerbar bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="leftMenu flex flex-col items-left w-[30%] ml-5">
            <div className="flex flex-row items-center space-x-2">
              <a href="/pages/rewards" className="logoSmall">
                <img
                  src="//www.stevemadden.com/cdn/shop/files/LOGO_ON_WHITE_fca4eb23-117e-48ff-9180-16c8855258ef_100x.png?v=1647854305"
                  alt="Go to SM PASS"
                  width="100"
                  height="100"
                  loading="lazy"
                  className="opacity-100"
                />
              </a>

              <div className="flex items-center space-x-2">
                <a href="/account/login" className="text-sm">
                  Sign In
                </a>
                <span className="text-sm">or</span>
                <a href="/account/register" className="text-sm">
                  Join Now
                </a>
              </div>
              </div>

              <div className="site-page-menu flex items-center space-x-2">
                <ul className="flex items-center space-x-2">
                  <li>
                    <a href="/" className="text-sm">
                      Women
                    </a>
                  </li>
                  <li className="text-sm">|</li>
                  <li>
                    <a href="/pages/mens" className="text-sm">
                      Men
                    </a>
                  </li>
                </ul>
              </div>
          </div>

          <div className="logo text-center">
            <a href="/" className="site-logo-new">
              <div className="normal-logo">
                <img
                  className="max-h-11"
                  src="//www.stevemadden.com/cdn/shop/files/SM_logo_SansSerif-01.png?v=6595209249868950888"
                  alt="Steve Madden Logo"
                />
              </div>
            </a>
          </div>

          <div className="rightMenu flex justify-end text-right mr-5 space-x-4 w-[30%]">
            <div className="wishlist_main_header">
              <a href="/pages/wishlist" className="swym-wishlist">
                <svg
                  alt="Wishlist"
                  aria-labelledby="wishlist-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <title id="wishlist-icon">Wishlist</title>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </a>
            </div>

            <div className="SearchForm">
              <form
                action="/pages/ssr-search-results"
                className="fast-simon-form flex items-center border border-gray-300 rounded overflow-hidden"
              >
                <input
                  type="text"
                  id="search_input"
                  name="q"
                  placeholder="Search"
                  aria-label="Search and use arrows or TAB to navigate results"
                  className="fast-autocomplete-input px-2 py-1 w-full"
                  autoComplete="off"
                />
                <button type="submit" className="px-2 py-1">
                  <svg
                    alt="Search"
                    aria-label="search"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="search-black"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </form>
            </div>

            <div className="cartTop cartOuter relative">
              <a href="/cart" className="relative">
                <span className="cartCount absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  0
                </span>
                <svg
                  alt="Cart"
                  aria-label="cart"
                  width="24"
                  height="24"
                  viewBox="0 0 80 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.5 24H0V76H80V24H56C55.3333 16 51.2707 0 41 0C29 0 25.5 16.5 24.5 24ZM4 28V72H76V28H4ZM52 24H29C30.1667 16.5 34.5 4 41 4C46.5 4 51 16 52 24Z"
                    fill="black"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <PopupHeader />
      </div>
    </header>
  );
};

export default Header;
