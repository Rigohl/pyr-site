import './globals.css';
import { ReactNode } from 'react';
export const metadata = { title:'Pyr Entertainment MX', description:'Canciones personalizadas y más' };
export default function RootLayout({children}:{children:ReactNode}){return(<html lang='es'><body>{children}</body></html>);}
