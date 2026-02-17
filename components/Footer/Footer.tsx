import { faFacebookF, faInstagram, faTwitter, faPinterestP } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import logo from '../../public/images/freshcart-logo.svg'
import minLogo from '../../public/images/mini-logo.png'
import Image from "next/image";
export default function Footer() {
    return (
        <>
            <footer className="py-5 border-t border-gray-400/20">
                <div className="container mx-auto px-6">

                    <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-6 py-8">
                        <div className=" xl:col-span-2 space-y-3">
                            <h1>
                                <Link className="text-2xl font-semibold" href={'/'}>
                                    <Image src={logo} alt='logo'/>
                                </Link>
                            </h1>
                            <p >
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Blanditiis repudiandae officia non architecto
                                suscipit eos nihil tenetur ipsum modi!
                            </p>

                            <ul className="flex items-center gap-4 *:text-gray-500 *:hover:text-[#16a34b] *:transition-colors *:duration-500 *:text-lg">
                                <li>
                                    <Link href={''}>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={''}>
                                        <FontAwesomeIcon icon={faPinterestP} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className='text-xl font-bold mb-4 '>Categories</h2>
                            <ul className='space-y-3 *:hover:text-[#16a34b] *:transition-colors *:duration-500'>
                                <li>
                                    <Link href={''}>
                                        Men's Fashion
                                    </Link>
                                </li>


                                <li>
                                    <Link href={''}>
                                        Women's Fashion
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Baby & Toys
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Beauty & health
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Elictronics
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <h2 className='text-xl font-bold mb-4 '>Quick Links</h2>
                            <ul className='space-y-3 *:hover:text-[#16a34b] *:transition-colors *:duration-500'>
                                <li>
                                    <Link href={''}>
                                        About Us
                                    </Link>
                                </li>


                                <li>
                                    <Link href={''}>
                                        Contact Us
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Termes of Service
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Shipping Policy
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <h2 className='text-xl font-bold mb-4 '>Custumer Service</h2>
                            <ul className='space-y-3 *:hover:text-[#16a34b] *:transition-colors *:duration-500'>
                                <li>
                                    <Link href={''}>
                                        My Account
                                    </Link>
                                </li>


                                <li>
                                    <Link href={''}>
                                        My Orders
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Wishlist
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Returns & Refunds
                                    </Link>
                                </li>

                                <li>
                                    <Link href={''}>
                                        Help Center
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-400/30">
                        <p>  {new Date().getFullYear()} FreshCart. All rights reserved.</p>
                        <Image className="size-6" src={minLogo} alt='mini-logo'/>
                    </div>
                </div>
            </footer>
        </>
    )
}
