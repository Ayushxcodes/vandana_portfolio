import React from 'react'
import { CheckCircle, Award, Users, Briefcase } from 'lucide-react'

const AboutHero = () => {
  const expertise = [
    'Civil Litigation',
    'Criminal Law',
    'Tax Law',
    'Family Law',
    'Intellectual Property',
    'Contract Drafting'
  ]

  const achievements = [
    { icon: Briefcase, label: 'Cases Won', value: '100+' },
    { icon: Users, label: 'Clients Served', value: '1000+' },
    { icon: Award, label: 'Years Experience', value: '10+' },
    { icon: CheckCircle, label: 'Success Rate', value: '95%' }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">
            About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Vandana Mishra</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A dedicated legal professional committed to justice and excellence
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Bio Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                With over 10 years of experience in the legal field, I have built a reputation for providing exceptional advocacy and legal counsel. My passion for justice and commitment to my clients' interests drives every case I undertake.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I believe in combining legal expertise with personalized attention, ensuring that each client receives the best possible representation tailored to their unique circumstances.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">Mission</h3>
                <p className="text-gray-600 text-sm">To provide accessible, ethical, and effective legal services that protect rights and achieve justice.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">Vision</h3>
                <p className="text-gray-600 text-sm">To be a trusted advocate known for integrity, expertise, and client success.</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl blur-2xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl overflow-hidden shadow-xl aspect-square flex items-center justify-center">
                <img
                  src="./profile.png"
                  alt="Vandana Mishra"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition duration-300">
                <Icon className="text-purple-600 mx-auto mb-3" size={32} />
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                <p className="text-gray-600 text-sm mt-2">{item.label}</p>
              </div>
            )
          })}
        </div>

        {/* Expertise */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Areas of Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-purple-600 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero