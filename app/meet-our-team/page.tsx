"use client";
import ResponsiveNav from "../components/ResponsiveNav";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MeetOurTeam() {
  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNav />
      {/* Gamusa Side Strips - Left */}
      <div className="fixed left-0 top-0 w-6 sm:w-4 md:w-8 lg:w-12 h-full bg-red-600 z-40">
        <div className="w-full h-full bg-white" style={{
          backgroundImage: `
            linear-gradient(0deg, #dc2626 0%, #dc2626 10%, white 10%, white 20%, #dc2626 20%, #dc2626 30%, white 30%, white 40%, #dc2626 40%, #dc2626 50%, white 50%, white 60%, #dc2626 60%, #dc2626 70%, white 70%, white 80%, #dc2626 80%, #dc2626 90%, white 90%, white 100%),
            linear-gradient(90deg, #dc2626 0%, #dc2626 8.33%, white 8.33%, white 16.66%, #dc2626 16.66%, #dc2626 25%, white 25%, white 33.33%, #dc2626 33.33%, #dc2626 41.66%, white 41.66%, white 50%, #dc2626 50%, #dc2626 58.33%, white 58.33%, white 66.66%, #dc2626 66.66%, #dc2626 75%, white 75%, white 83.33%, #dc2626 83.33%, #dc2626 91.66%, white 91.66%, white 100%)
          `,
          backgroundSize: '6px 30px, 6px 6px',
        }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 3px 15px, #dc2626 0.5px, transparent 1px),
              radial-gradient(circle at 3px 45px, #dc2626 0.5px, transparent 1px),
              radial-gradient(circle at 3px 75px, #dc2626 0.5px, transparent 1px),
              radial-gradient(circle at 3px 105px, #dc2626 0.5px, transparent 1px)
            `,
            backgroundSize: '6px 60px'
          }}></div>
          <div className="absolute inset-0 opacity-70" style={{
            backgroundImage: `
              conic-gradient(from 45deg at 3px 7px, #dc2626 0deg 90deg, transparent 90deg 180deg, #dc2626 180deg 270deg, transparent 270deg 360deg),
              conic-gradient(from 45deg at 3px 22px, transparent 0deg 90deg, #dc2626 90deg 180deg, transparent 180deg 270deg, #dc2626 270deg 360deg)
            `,
            backgroundSize: '6px 15px'
          }}></div>
        </div>
      </div>
      {/* Gamusa Side Strips - Right */}
      <div className="fixed right-0 top-0 w-6 sm:w-4 md:w-8 lg:w-12 h-full bg-red-600 z-40">
        <div className="w-full h-full bg-white" style={{
          backgroundImage: `
            linear-gradient(0deg, #dc2626 0%, #dc2626 10%, white 10%, white 20%, #dc2626 20%, #dc2626 30%, white 30%, white 40%, #dc2626 40%, #dc2626 50%, white 50%, white 60%, #dc2626 60%, #dc2626 70%, white 70%, white 80%, #dc2626 80%, #dc2626 90%, white 90%, white 100%),
            linear-gradient(90deg, #dc2626 0%, #dc2626 8.33%, white 8.33%, white 16.66%, #dc2626 16.66%, #dc2626 25%, white 25%, white 33.33%, #dc2626 33.33%, #dc2626 41.66%, white 41.66%, white 50%, #dc2626 50%, #dc2626 58.33%, white 58.33%, white 66.66%, #dc2626 66.66%, #dc2626 75%, white 75%, white 83.33%, #dc2626 83.33%, #dc2626 91.66%, white 91.66%, white 100%)
          `,
          backgroundSize: '6px 30px, 6px 6px',
        }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 3px 15px, #dc2626 0.5px, transparent 1px),
              radial-gradient(circle at 3px 45px, #dc2626 0.5px, transparent 1px),
              radial-gradient(circle at 3px 75px, #dc2626 0.5px, transparent 1px),
              radial-gradient(circle at 3px 105px, #dc2626 0.5px, transparent 1px)
            `,
            backgroundSize: '6px 60px'
          }}></div>
          <div className="absolute inset-0 opacity-70" style={{
            backgroundImage: `
              conic-gradient(from 45deg at 3px 7px, #dc2626 0deg 90deg, transparent 90deg 180deg, #dc2626 180deg 270deg, transparent 270deg 360deg),
              conic-gradient(from 45deg at 3px 22px, transparent 0deg 90deg, #dc2626 90deg 180deg, transparent 180deg 270deg, #dc2626 270deg 360deg)
            `,
            backgroundSize: '6px 15px'
          }}></div>
        </div>
      </div>
      {/* Main Content */}
      <div className="ml-6 sm:ml-4 md:ml-8 lg:ml-12 mr-6 sm:mr-4 md:mr-8 lg:mr-12 text-base sm:text-sm md:text-base">
        <div className="max-w-4xl mx-auto py-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-red-700 mb-12">Meet Our Team</h1>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Anish Aich */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-red-200">
                <Image src="/assets/images/anish aich.jpg" alt="Anish Aich" width={300} height={300} className="object-cover w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Anish Aich</h2>
              <p className="text-red-600 font-semibold mb-2">Co-founder, CEO</p>
              <p className="text-gray-600 text-center text-sm">Visionary leader and entrepreneur, Anish drives the company’s mission and growth with a passion for innovation and excellence.</p>
            </div>
            {/* Darshan Jyoti Bordoloi */}
            <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-red-200">
                <Image src="/assets/images/darshan .jpg" alt="Darshan Jyoti Bordoloi" width={300} height={300} className="object-cover w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Darshan Jyoti Bordoloi</h2>
              <p className="text-red-600 font-semibold mb-2">Co-founder, CTO</p>
              <p className="text-gray-600 text-center text-sm">Tech innovator and architect, Darshan leads the technology vision, product development, and engineering excellence at HOHAI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 