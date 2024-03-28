import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = cookies().get('token')?.value
    if(!token){
        return NextResponse.redirect("http://localhost:3000/")    
    }
}
 
export const config = {
    matcher: ['/tags', '/summary'],
  }