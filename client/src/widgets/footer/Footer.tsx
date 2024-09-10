import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <div className='flex justify-center items-center bg-[#ff2400] py-4 w-full'>
           <h3>GitHub:</h3> <Link className="text-white pl-3 hover:opacity-50 duration-300" to='https://github.com/dkn1fe'>dkn1fe</Link>
        </div>
    )
}
