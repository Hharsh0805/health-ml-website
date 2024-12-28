'use client'

import { motion } from 'framer-motion'
import { Heart, Activity, Brain, Utensils } from 'lucide-react'
import HealthCarousel from './HealthCarousel'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
      <div className="container mx-auto px-6">
        {/* Hero Text Section */}
        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
              Your Health Journey,{' '}
              <span className="text-green-600">Powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized health insights and recommendations using cutting-edge machine learning technology.
            </p>
            <button className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300 shadow-lg">
              Start Your Journey
            </button>
          </div>
          
        </div>
        
        {/* Health Carousel */}
        <div className="lg:w-1/1 mx-auto mb-12">
          <HealthCarousel />
        </div>

        {/* Health Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            { icon: Heart, title: "Heart Health", description: "Monitor and improve cardiovascular health" },
            { icon: Activity, title: "Fitness Tracking", description: "Track your workouts and daily activity" },
            { icon: Brain, title: "Mental Wellness", description: "Enhance your mental health and reduce stress" },
            { icon: Utensils, title: "Nutrition Guide", description: "Personalized meal plans and nutrition advice" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              <item.icon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
