import { faShieldHalved,  faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import avatar from '../../../public/images/R.png'
import Signupform from '@/app/(auth)/components/Signupform/Signupform'



export default function Signupscreen() {
  return (
        <div>
            <main className='py-12'>
                <div className="container mx-auto lg:px-6 grid lg:grid-cols-2 lg:gap-12 ">
                    {/* left */}
                    <div className='space-y-8 py-10 px-6'>
                        <div className="">
                            <h2 className='text-4xl font-semibold'>Welcome to <span className='text-[#16a34b]'>FreshCart</span></h2>
                            <p className='text-lg'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas quis

                            </p>
                        </div>
                        <div>
                            <ul className='*:flex *:items-center *:gap-3 space-y-5'>
                                <li>
                                    <div className='size-12 rounded-full bg-[#9edab5] text-xl flex justify-center items-center text-[#16a43b]'>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>Premium Quality</h3>
                                        <p className='text-gray-600'>
                                            Premium Quality products sourced from trusted
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className='size-12 rounded-full bg-[#9edab5] text-xl flex justify-center items-center text-[#16a43b]'>
                                        <FontAwesomeIcon icon={faTruckFast} />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>Fast Delivery</h3>
                                        <p className='text-gray-600'>
                                            same-day delivery avilable in most areas
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className='size-12 rounded-full bg-[#9edab5] text-xl flex justify-center items-center text-[#16a43b]'>
                                        <FontAwesomeIcon icon={faShieldHalved} />
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>Secure Shopping</h3>
                                        <p className='text-gray-600'>
                                            your data and payments are completely secure
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-xl">
                            <div className='flex items-center gap-3'>
                                <Image className='size-12 rounded-full' src={avatar} alt="avatar" />
                                <div>
                                    <h3>Sarah johnson</h3>
                                    <div className='text-yellow-400'>
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>
                            </div>
                            <blockquote className='text-gray-700 italic mt-4'>
                                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Recusandae iste corrupti perspiciatis ex odio vero,
                                ab fuga eius quo illo."
                            </blockquote>
                        </div>
                    </div>
                    {/*right */}
                    <Signupform/>
                </div>
            </main>
        </div>
    )
}

