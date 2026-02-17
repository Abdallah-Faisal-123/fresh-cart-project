"use client";
import Link from "next/link";
import { faAddressCard, faEnvelope, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBabyCarriage, faBars, faBolt, faCartShopping, faChevronDown, faEllipsis, faMagnifyingGlass, faPerson, faPersonDress, faPhone, faRightFromBracket, faShoppingBag, faSuitcaseMedical, faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from '../../public/images/freshcart-logo.svg'
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import useLogout from "@/hooks/useLogout";

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    const [menu, setMenu] = useState(false)
    const { isAuthenticated } = useSelector((appState: AppState) => appState.auth)
    const { logout } = useLogout()

    function toggelMenu() {
        setMenu(!menu)
    }
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">

            <div className=" container mx-auto px-4  sm:px-6 lg:px-8  ">
                {/*top nav */}
                <div className="hidden lg:flex justify-between  py-1 text-sm border-b border-gray-300/30">
                    <ul className=" flex justify-between gap-5">
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
                        </li>
                        <li >
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a href="mailto:support@freshcart.com">support@freshcart.com</a>
                        </li>
                    </ul>
                    <ul className="flex justify-between gap-4">
                        <li>
                            <Link href={'/track-order'}>Track Order</Link>
                        </li>

                        <li>
                            <Link href={'/about'}>About</Link>
                        </li>
                        <li>
                            <Link href={'/contact'}>Contact</Link>
                        </li>
                        <li>
                            <select >
                                <option >EGP</option>
                                <option >SAR</option>
                                <option >AED</option>
                            </select>
                        </li>
                        <li>
                            <select >
                                <option value="ar">العربيه</option>
                                <option value="en">English</option>
                            </select>
                        </li>
                    </ul>
                </div>
                {/*main navigation */}
                <nav className="flex justify-between items-center py-4">

                    <Link href={'/'}>
                        <Image src={logo} alt='logo' />

                    </Link>

                    <search className=" relative my-1  hidden lg:block">
                        <input className="border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md min-w-95 px-3 py-2   " type="text" placeholder="Search for products..." />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className=" absolute right-2 top-1/2 -translate-1/2 " />
                    </search>
                    <ul className="hidden lg:flex items-center gap-4 text-sm">
                        <li>
                            <Link className={isActive("/wishlist") ? "text-[#16a34b] flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 " : "flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 "} href={'/wishlist'}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>Wishlist</span>
                            </Link>
                        </li>

                        <li>
                            <Link className={isActive("/cart") ? "text-[#16a34b] flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 " : "flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 "} href={'/cart'}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span>Cart</span>
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <li>
                                <Link className={isActive("/orders") ? "text-[#16a34b] flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 " : "flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 "} href={'/orders'}>
                                    <FontAwesomeIcon icon={faShoppingBag} />
                                    <span>Orders</span>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link className={isActive("/account") ? "text-[#16a34b] flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 " : "flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 "} href={'/account'}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>Account</span>
                            </Link>
                        </li>
                        {isAuthenticated ? <>
                            <li onClick={logout} className="flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 hover:cursor-pointer">

                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span>Log Out</span>

                            </li>
                        </> :
                            <>
                                <li>
                                    <Link className={isActive("/signup") ? "text-[#16a34b] flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 " : "flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 "} href={'/signup'}>
                                        <FontAwesomeIcon icon={faUserPlus} />
                                        <span>Sign Up</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link className={isActive("/login") ? "text-[#16a34b] flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 " : "flex flex-col items-center text-lg hover:text-[#16a34b] transition-colors duration-500 "} href={'/login'}>
                                        <FontAwesomeIcon icon={faAddressCard} />
                                        <span>Login</span>
                                    </Link>
                                </li>

                            </>
                        }
                    </ul>
                    <button
                        onClick={toggelMenu}
                        className=" lg:hidden bg-[#16a34b] p-1.5 rounded-md text-xl text-white  cursor-pointer">
                        {menu ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                    </button>
                </nav>

            </div>
            {/*category nav */}
            <nav>
                <div className=" bg-gray-200 ps-9 py-4 w-full  hidden lg:block">
                    <div className="container flex gap-8 items-center mx-auto">
                        <div className="relative group">
                            <button className="bg-[#16a34b] flex items-center gap-3 text-white hover:bg-[#047730] hover:cursor-pointer transition-colors duration-500 rounded-lg font-semibold px-2 py-1.5">
                                <FontAwesomeIcon icon={faBars} />
                                <span>All Categories</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                            <menu className=" z-50 bg-white absolute top-9 min-w-60 hidden group-hover:block shadow *:px-3 *:py-3 *:hover:bg-gray-100 *:hover:cursor-pointer rounded-lg  divide-y divide-gray-300/40 ">
                                <li>
                                    <Link className='flex gap-2 items-center ' href={''}>

                                        <FontAwesomeIcon className='text-[#16c34b] text-xl fixedWidth' icon={faPerson} />
                                        <span>Men's Fashion</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link className='flex gap-2 items-center ' href={''}>

                                        <FontAwesomeIcon className='text-[#16c34b] text-xl fixedWidth' icon={faPersonDress} />
                                        <span>women's Fashion</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link className='flex gap-2 items-center ' href={''}>

                                        <FontAwesomeIcon className='text-[#16c34b] text-xl fixedWidth' icon={faBabyCarriage} />
                                        <span>Baby & Toys</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link className='flex gap-2 items-center ' href={''}>

                                        <FontAwesomeIcon className='text-[#16c34b] text-xl fixedWidth' icon={faSuitcaseMedical} />
                                        <span>Beauty & Health</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link className='flex gap-2 items-center ' href={''}>

                                        <FontAwesomeIcon className='text-[#16c34b] text-xl fixedWidth' icon={faBolt} />
                                        <span>Electronics</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link className='flex gap-2 items-center ' href={''}>

                                        <FontAwesomeIcon className='text-[#16c34b] text-xl fixedWidth' icon={faEllipsis} />
                                        <span>View All Categories</span>
                                    </Link>
                                </li>
                            </menu>
                        </div>
                        <ul className=" flex items-center gap-5 text-sm ">
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>

                            <li>
                                <Link href={'/recently-added'}>Recently Added</Link>
                            </li>
                            <li>
                                <Link href={'/reatured-products'}>Featured Produects</Link>
                            </li>
                            <li>
                                <Link href={'/offers'}>Offers</Link>
                            </li>
                            <li>
                                <Link href={'/brands'}>Brands</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            {/* offCanfas*/}
            {menu && <>



                <div className=" fixed inset-0 bg-black/50 z-30 cursor-pointer" onClick={toggelMenu} ></div>
                <div className=" animate-slide-in  fixed left-0 z-40 bg-white top-0 bottom-0 w-full max-w-80 p-5 space-y-5 overflow-y-auto">
                    <div className=" flex justify-between items-center border-b border-gray-300/50 pb-5">
                        <Link className="flex items-center gap-2" href={'/'}>
                            <Image src={logo} alt="logo" width={150} height={40} />
                        </Link>
                        <button onClick={toggelMenu} className="rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="relative">
                        <input className="w-full border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md px-3 py-2 pr-10" type="text" placeholder="Search for products..." />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">Main Menu</h2>
                        <ul className="*:hover:bg-gray-100 *:transition-colors *:duration-500 space-y-3 mt-3"><li>
                            <Link className={isActive("/wishlist") ? "text-[#16a34b] bg-[#bef0d1] flex  items-center text-lg px-2 py-3 gap-2 hover:text-[#16a34b] transition-colors duration-500" : "flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2 "} href={'/wishlist'}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>Wishlist</span>
                            </Link>
                        </li>

                            <li>
                                <Link className={isActive("/cart") ? "text-[#16a34b] bg-[#bef0d1] flex  items-center text-lg px-2 py-3 gap-2 hover:text-[#16a34b] transition-colors duration-500" : "flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2  "} href={'/cart'}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span>Cart</span>
                                </Link>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <Link className={isActive("/orders") ? "text-[#16a34b] bg-[#bef0d1] flex  items-center text-lg px-2 py-3 gap-2 hover:text-[#16a34b] transition-colors duration-500" : "flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2 "} href={'/orders'}>
                                        <FontAwesomeIcon icon={faShoppingBag} />
                                        <span>My Orders</span>
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link className={isActive("/account") ? "text-[#16a34b] bg-[#bef0d1] flex  items-center text-lg px-2 py-3 gap-2 hover:text-[#16a34b] transition-colors duration-500" : "flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2 "} href={'/account'}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Account</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className=" border-t border-gray-300/50 pt-5">
                        <h2 className="text-xl font-bold">Account</h2>
                        <ul className="*:hover:bg-gray-100 *:transition-colors *:duration-500 space-y-3 mt-3">
                            {isAuthenticated ? <>
                                <li onClick={logout} className="flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2 ">

                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    <span>Log Out</span>

                                </li>
                            </> :
                                <>
                                    <li>
                                        <Link className={isActive("/signup") ? "text-[#16a34b] bg-[#bef0d1] flex  items-center text-lg px-2 py-3 gap-2 hover:text-[#16a34b] transition-colors duration-500" : "flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2 "} href={'/signup'}>
                                            <FontAwesomeIcon icon={faUserPlus} />
                                            <span>Sign Up</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className={isActive("/login") ? "text-[#16a34b] bg-[#bef0d1] flex  items-center text-lg px-2 py-3 gap-2 hover:text-[#16a34b] transition-colors duration-500" : "flex  items-center text-lg px-2 py-3 hover:text-[#16a34b] transition-colors duration-500 gap-2 hover:cursor-pointer "} href={'/login'}>
                                            <FontAwesomeIcon icon={faAddressCard} />
                                            <span>Login</span>
                                        </Link>
                                    </li>
                                </>}


                        </ul>
                    </div>
                </div>

            </>}
        </header>
    )
}
