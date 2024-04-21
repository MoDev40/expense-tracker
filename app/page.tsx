import { cookies } from "next/headers";
import ExpenseLists from "./_components/expenses/ExpenseLists";
import UnAuth from "./_components/UnAuth";
export const dynamic = 'force-dynamic'

export default function page() {
  const token = cookies().get('token')?.value
  return (
    <div className='mx-auto h-screen space-y-4 mt-5 p-2 lg:max-w-[1120px] max-w-lg'>
      {
        token ? <ExpenseLists/> : <UnAuth/>
      }
    </div>
  );
}
