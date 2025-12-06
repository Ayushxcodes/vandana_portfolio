import React from 'react'
import { ArrowRight, Award, Heart } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Section - Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-purple-600 font-semibold text-lg">Welcome</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Vandana Mishra
              </h1>
              <p className="text-2xl sm:text-3xl text-gray-700 font-semibold">
                Advocate & Legal Consultant
              </p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              With years of dedicated experience in law and advocacy, I am committed to providing exceptional legal guidance and representation. Specializing in civil and criminal law, I work tirelessly to protect your rights and interests.
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Award className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Legal Counsel</h3>
                  <p className="text-gray-600">Specialized in civil and criminal litigation</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Heart className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">Client-Focused Approach</h3>
                  <p className="text-gray-600">Dedicated to achieving the best outcomes for you</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition duration-300 flex items-center justify-center gap-2">
                Get in Touch <ArrowRight size={20} />
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl blur-2xl opacity-50"></div>
              
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl overflow-hidden shadow-2xl aspect-square flex items-center justify-center">
                <img
                  src="./profile.png"
                  alt="Vandana Mishra - Advocate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection