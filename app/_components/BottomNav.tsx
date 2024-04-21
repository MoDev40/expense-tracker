'use client'
import { BarChart3Icon, ReceiptPoundSterling, Tags } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import CreateExpense from './expenses/CreateExpense'
import Cookies from 'js-cookie'

const BottomNav = () => {
	const token = Cookies.get('token')
	const pathName = usePathname()
  return (
	token &&
    <div className="fixed p-5 flex bg-white flex-row justify-between   pt-5  bottom-0 left-0 right-0 z-10 container mx-auto lg:max-w-[1120px] w-full sm:max-w-lg pb-5 border-t">
			<Link href="/summary">
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<div
						className="flex items-center flex-col  justify-center"
					>
						<BarChart3Icon className="h-6 w-6 group-hover:scale-125 transition-all " />
						<span className="text-sm ">Analytic</span>
					</div>
				</div>
			</Link>
			{
				pathName == "/" ?
				<CreateExpense/>
				:
				<AddExpenseNav/>
			}
			<Link href="/tags">
				<div className="flex justify-center items-center flex-col group cursor-pointer">
					<div
						className="flex items-center flex-col  justify-center "
					>
						<Tags className="h-6 w-6 group-hover:scale-125 transition-all" />
						<span className="text-sm">Tags</span>
					</div>
				</div>
			</Link>
		</div>
    )
}

const AddExpenseNav = () => {
	return (
		<Link  href="/" className="shadow-sm transition-all">
			<ReceiptPoundSterling size={10} className="h-8 w-8 hover:scale-125 transition-all" />
		</Link>
	);
};

export default BottomNav