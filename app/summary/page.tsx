import React from 'react'
import Summary from '../_components/summary/Summary'

export const dynamic = 'force-dynamic'
function page() {
  return (
    <div className="mx-auto space-y-4 mt-5 p-2 lg:max-w-[1120px] max-w-lg">
    <Summary/>
    </div>
  )
}

export default page