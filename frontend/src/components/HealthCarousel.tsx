'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  { 
    src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1000", 
    alt: "Healthy eating", 
    caption: "Balanced Nutrition" 
  },
  { 
    src: "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg", 
    alt: "Exercise", 
    caption: "Regular Exercise" 
  },
  { 
    src: "https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_1280.jpg", 
    alt: "Mental health", 
    caption: "Mental Wellbeing" 
  },
  { 
    src: "https://images.pexels.com/photos/7938055/pexels-photo-7938055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    alt: "Sleep", 
    caption: "Quality Sleep" 
  },
]

export default function HealthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const navigate = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction
      if (newIndex < 0) return images.length - 1
      if (newIndex >= images.length) return 0
      return newIndex
    })
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <p className="text-white text-xl font-semibold">{images[currentIndex].caption}</p>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        onClick={() => navigate(-1)}
        title="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        onClick={() => navigate(1)}
        title="Next"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  )
}
