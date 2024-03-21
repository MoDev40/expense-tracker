'use client'
import { BarChart3Icon, Plus, ReceiptPoundSterling, Tags } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUser } from '../context/UserContext'

const BottomNav = () => {
	const {user} = useUser()
	const pathName = usePathname()
  return (
	user ?
    <div className="fixed p-5 flex flex-row justify-between   pt-5  bottom-0 left-0 right-0 z-10 container mx-auto lg:max-w-[1120px] w-full sm:max-w-lg pb-5 border-t">
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
				pathName == "/expenses" ?
				<Plus/>
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
		:
		<>{JSON.stringify(user)}</>  
    )
}

const AddExpenseNav = () => {
	return (
		<Button variant="outline"
			className="flex justify-center items-center flex-col group cursor-pointer"
		>
			<Link href="/expenses" className="shadow-sm transition-all">
				<ReceiptPoundSterling size={10} className="h-8 w-8 hover:scale-125 transition-all" />
			</Link>
		</Button>
	);
};

export default BottomNav