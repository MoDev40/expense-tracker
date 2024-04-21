import Image from 'next/image';
import Link from 'next/link';

const UnAuth = () => {
    return (
		<div className="w-full flex flex-col gap-10 h-screen pt-10 p-5 overflow-hidden">
			<div className="flex flex-col gap-10">
				<div className="flex items-center gap-10">
					<Image
						src="/icon-192x192.png"
						alt=""
						width={80}
						height={80}
					/>
					<h1 className=" font-black text-4xl">Daily Expense</h1>
				</div>
				<div>
					<h1 className="text-3xl font-semibold">
						Track and analyze your expense today.
					</h1>
					<p className="mt-5 text-gray-500">
						offer away to keep track of your financial expenses in a
						convenient and organized way. It typically allows you to
						input information about your expenses and provides tools
						for analyzing and categorizing this information to help
						you better understand your spending habits.
					</p>
				</div>
				<Link href='/api/auth/signin'
					className="mx-auto w-full hover:ring-2 ring-1 py-2 rounded-sm ring-zinc-600 flex items-center gap-3 px-4 group"
				> 
                {
					<span className="flex-1 group-hover:tracking-wider transition-all">
						Login to continue
					</span>
                }
				</Link>
			</div>
			<div className="flex justify-center items-center">
				<Image
					src="/landing.png"
					alt="demo"
					width={450}
					height={400}
				/>
			</div>
		</div>
        )
}

export default UnAuth