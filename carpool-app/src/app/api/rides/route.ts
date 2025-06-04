import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');
  const status = searchParams.get('status');
  const seats = searchParams.get('seats');

  
  // Forward the request to your backend
  const queryString = new URLSearchParams();
  if (from) queryString.append('from', from);
  if (to) queryString.append('to', to);
  if (date) queryString.append('date', date);
  if (status) queryString.append('status', status);
  if (seats) queryString.append('seats', seats);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';
  
  try {
    const response = await fetch(`${API_BASE_URL}/rides?${queryString.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        // Forward the authorization header if present
        ...(request.headers.get('Authorization') ? 
          { 'Authorization': request.headers.get('Authorization') as string } : {})
      }
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to backend:', error);
    return NextResponse.json(
      { message: 'Failed to fetch rides' },
      { status: 500 }
    );
  }
}