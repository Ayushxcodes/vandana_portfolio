"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Award, Briefcase } from 'lucide-react'

const Timeline = () => {
  const timelineData = [
    {
      year: '2014-17',
      title: 'B.Com Honors',
      description: 'Completed Bachelor of Commerce with honors, building strong foundational knowledge in business and commerce.',
      icon: BookOpen,
      color: 'from-blue-400 to-blue-600',
      number: 1
    },
    {
      year: '2018-21',
      title: 'Bachelor of Laws (LLB)',
      description: 'Pursued three years of intensive legal education, developing expertise in various branches of law.',
      icon: Award,
      color: 'from-purple-400 to-purple-600',
      number: 2
    },
    {
      year: '2021-24',
      title: 'Rahuls IAS Coaching Institute',
      description: 'Advanced training and preparation at a premier coaching institute, enhancing professional capabilities.',
      icon: Briefcase,
      color: 'from-pink-400 to-pink-600',
      number: 3
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Education & <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Training</span>
            </h2>
            <p className="text-gray-600 text-lg">Journey of continuous learning and professional growth</p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-400"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {timelineData.map((item, index) => {
                const Icon = item.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex gap-4 md:gap-0 items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <motion.div
                        whileHover={{ translateY: -5 }}
                        className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${isEven ? 'md:border-l-0 md:border-r-4' : ''} border-purple-600`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`bg-gradient-to-br ${item.color} p-3 rounded-full flex-shrink-0`}>
                            <Icon className="text-white" size={20} />
                          </div>
                          <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </motion.div>
                    </div>

                    {/* Center Number Circle */}
                    <div className="hidden md:flex md:w-2/12 justify-center relative z-10">
                      <motion.div
                        whileInView={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-white rounded-full shadow-xl flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{item.number}</span>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 w-14 h-14 border-4 border-purple-600 rounded-full opacity-30"
                        ></motion.div>
                      </motion.div>
                    </div>

                    {/* Mobile Number */}
                    <div className="md:hidden flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 border-3 border-white rounded-full shadow-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{item.number}</span>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
