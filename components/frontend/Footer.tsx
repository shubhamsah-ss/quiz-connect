import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='w-full bg-white dark:bg-black border-t p-4'>
            <Link href={"https://next-feed.devss.in/u/quizzconnect"} className='text-blue-500 hover:text-blue-900 hover:underline underline-offset-4 text-xs font-normal float-right whitespace-nowrap'>
                Send anonymous message
            </Link>
            {/* <p className='text-xs font-normal text-center whitespace-nowrap dark:text-white'>
                &copy; Copyright {new Date().getFullYear()} DevSS.in. All rights reserved.
            </p> */}
        </footer>
    )
}

export default Footer