
export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-32 h-32">
                {/* <!-- Outer circle --> */}
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-cyan-500 animate-spin"></div>

                {/* <!-- Middle circle --> */}
                <div className="absolute top-5 left-4 w-16 h-16 rounded-full border-t-4 border-rose-500 animate-reverse-spin"></div>

                {/* <!-- Inner circle --> */}
                <div className="absolute top-8 left-7 w-10 h-10 rounded-full border-t-4 border-emerald-500 animate-spin"></div>
            </div>
        </div>
    )
}
