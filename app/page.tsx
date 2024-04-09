import Home from "./_components/Home";
import ExpenseLists from "./_components/expenses/ExpenseLists";

export const dynamic = 'force-dynamic'

export default function page() {
  return (
    <div className='mx-auto h-screen space-y-4 mt-5 p-2 lg:max-w-[1120px] max-w-lg'>
      <Home/>
      <ExpenseLists/>
    </div>
  );
}
