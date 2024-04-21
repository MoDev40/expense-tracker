import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = cookies().get('token')?.value
    if(!token){
        return NextResponse.redirect("https://expense-tracker-gray-seven.vercel.app/api/auth/signin")    
    }
}
 
export const config = {
    matcher: ['/tags', '/summary'],
  }