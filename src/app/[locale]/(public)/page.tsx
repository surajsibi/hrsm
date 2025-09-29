/* eslint-disable max-len */
import { type JSX, use } from 'react';

import { setRequestLocale } from 'next-intl/server';

import PublicHomePage from '@/components/defaults/public/public-homepage';

// import HomeIndex from '@/components/pages/HomeIndex';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }): JSX.Element {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    // <div>
    //   <div>
    //     <section className="bg-gray-100 py-16 text-center">
    //       <h1 className="text-4xl font-bold mb-4">Your All-in-One HR Management Solution</h1>
    //       <p className="text-lg text-gray-600 mb-6">
    //         Automate your HR processes, from hiring to payroll.
    //       </p>
    //      // <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
    //         Get Started
    //       </button>
    //     </section>
    //     <section className="py-12 bg-white">
    //       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    //         <div>
    //           <div className="text-blue-600 text-4xl mb-4">📋</div>
    //           <h3 className="font-semibold text-xl mb-2">Employee Management</h3>
    //           <p className="text-gray-500">
    //             Track records, performance, and profiles in one place.
    //           </p>
    //         </div>
    //         <div>
    //           <div className="text-green-600 text-4xl mb-4">💰</div>
    //           <h3 className="font-semibold text-xl mb-2">Payroll Automation</h3>
    //           <p className="text-gray-500">
    //             Simplify and automate salary payments with compliance.
    //           </p>
    //         </div>
    //         <div>
    //           <div className="text-purple-600 text-4xl mb-4">📈</div>
    //           <h3 className="font-semibold text-xl mb-2">Analytics Dashboard</h3>
    //           <p className="text-gray-500">
    //             Get real-time insights into HR metrics and performance.
    //           </p>
    //         </div>
    //       </div>
    //     </section>
    //     <section className="bg-gray-50 py-12">
    //       <h2 className="text-center text-2xl font-bold mb-6">Trusted by HR teams worldwide</h2>
    //       <div className="max-w-4xl mx-auto text-center text-gray-600">
    //         <p>
    //           “This HRMS platform saved us hundreds of hours and improved employee satisfaction.”
    //         </p>
    //         <p className="mt-2 font-semibold">– Jane Doe, HR Director at Acme Corp</p>
    //       </div>
    //     </section>
    //     <footer className="bg-gray-800 text-white py-8 text-center">
    //       <p>&copy; 2025 YourCompany. All rights reserved.</p>
    //       <div className="mt-4 space-x-4 text-sm">
    //         <a href="#" className="hover:underline">
    //           Login
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Privacy
    //         </a>
    //         <a href="#" className="hover:underline">
    //           Terms
    //         </a>
    //       </div>
    //     </footer>
    //   </div>
    //   {/* <HomeIndex /> */}
    //   <div className="w-full min-h-screen bg-white text-gray-900">
    //     {/* Header Section */}
    //     <header className="flex justify-between items-center px-10 py-6 border-b">
    //       <div className="text-2xl font-bold text-orange-600">Insperity</div>
    //       <nav className="flex gap-6 text-sm font-medium">
    //         <a href="#" className="hover:text-orange-500">
    //           HR Solutions
    //         </a>
    //         <a href="#" className="hover:text-orange-500">
    //           About Us
    //         </a>
    //         <a href="#" className="hover:text-orange-500">
    //           Resources
    //         </a>
    //         <a href="#" className="hover:text-orange-500">
    //           Who We Serve
    //         </a>
    //         <a href="#" className="hover:text-orange-500">
    //           Customer Service
    //         </a>
    //       </nav>
    //       <Button className="bg-orange-500 hover:bg-orange-600 text-white">Contact Sales</Button>
    //     </header>

    //     {/* Hero Section */}
    //     <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-16">
    //       <div className="max-w-xl space-y-4">
    //         <h1 className="text-4xl font-bold leading-snug">
    //           <span className="text-orange-600">HR Solutions</span> That Scale With Your Business
    //         </h1>
    //         <p className="text-gray-600">
    //           Streamlining your business operations crucial for efficiency, and one way to achieve
    //           this is by managing your HR and payroll in a single system.
    //         </p>
    //         <Button className="bg-orange-500 hover:bg-orange-600 text-white">Contact Sales</Button>
    //       </div>
    //       <div className="mt-10 lg:mt-0">
    //         <Image src="/Hrsolution.png!bw700" alt="HR Professional" width={700} height={400} />
    //       </div>
    //     </section>

    //     {/* Services Section */}
    //     <section className="text-center py-16 px-10 bg-gray-50">
    //       <h2 className="text-3xl font-semibold mb-4">
    //         Our Full-Service <span className="text-orange-600">HR Solution</span> Delivers
    //       </h2>
    //       <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
    //         <Card>
    //           <CardContent className="p-6">
    //             <div className="text-pink-600 font-semibold mb-2">Employee Benefits</div>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardContent className="p-6">
    //             <div className="text-blue-600 font-semibold mb-2">HR Admin and Payroll</div>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardContent className="p-6">
    //             <div className="text-purple-600 font-semibold mb-2">Risk Management</div>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardContent className="p-6">
    //             <div className="text-cyan-600 font-semibold mb-2">HR Support and Technology</div>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardContent className="p-6">
    //             <div className="text-orange-500 font-semibold mb-2">Browse All</div>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </section>

    //     {/* Support Section */}
    //     <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
    //       <div className="max-w-lg mb-10 md:mb-0">
    //         <h2 className="text-3xl font-bold">
    //           Unbeatable Support Meets <span className="text-orange-600">Innovative</span>{' '}
    //           Technology
    //         </h2>
    //       </div>
    //       <Image src="/Hrsolution.png!bw700" alt="Team working" width={800} height={300} />
    //     </section>
    //   </div>
    // </div>
    <div>
      <PublicHomePage />
    </div>
  );
}
