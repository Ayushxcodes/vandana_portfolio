"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { Scale, Home, TrendingUp, Shield } from 'lucide-react'

const PortHero = () => {
  const specializations = [
    {
      icon: Scale,
      title: 'Tax Law',
      description: 'Expert guidance on income tax, GST, and corporate tax matters',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Home,
      title: 'Family Law',
      description: 'Compassionate representation in divorce, custody, and inheritance cases',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Tax Planning',
      description: 'Strategic tax optimization and compliance solutions',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Legal Protection',
      description: 'Comprehensive legal defense and dispute resolution',
      color: 'from-green-500 to-green-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      ></motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
            Portfolio of
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-2">
              Expertise & Excellence
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Specialized legal services in Tax Law and Family Law with a track record of successful case resolutions
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Specialized Legal <span className="text-purple-400">Services</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                With extensive experience in tax law and family law, I provide comprehensive legal solutions tailored to your specific needs.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you need expert guidance on complex tax matters or compassionate representation in family disputes, I'm here to help.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition duration-300"
            >
              Schedule Consultation
            </motion.button>
          </motion.div>

          {/* Right Section - Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { label: 'Tax Cases Resolved', value: '200+' },
              { label: 'Family Law Cases', value: '300+' },
              { label: 'Client Satisfaction', value: '98%' },
              { label: 'Years of Experience', value: '10+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-purple-400/50 transition duration-300"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-semibold">{stat.label}</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Specializations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {specializations.map((spec, index) => {
            const Icon = spec.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                className={`bg-gradient-to-br ${spec.color} rounded-xl p-8 text-white shadow-lg cursor-pointer group`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="mb-4"
                >
                  <Icon size={40} />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{spec.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{spec.description}</p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="h-1 bg-white/50 mt-4 rounded"
                ></motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default PortHero