'use client'

import { motion } from 'framer-motion'
import { Activity, Brain, Shield } from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'Real-time Health Monitoring',
    description: 'Track your vital signs and health metrics in real-time with our advanced sensors and AI algorithms.',
  },
  {
    icon: Brain,
    title: 'Personalized Insights',
    description: 'Receive tailored health recommendations based on your unique data and lifestyle patterns.',
  },
  {
    icon: Shield,
    title: 'Preventive Health Measures',
    description: 'Stay ahead of potential health issues with our predictive analytics and early warning system.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <feature.icon className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

