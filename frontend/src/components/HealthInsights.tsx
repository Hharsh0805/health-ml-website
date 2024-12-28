import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale } from 'lucide-react';

const calculateBMI = (weight: number, height: number): { bmi: number; category: string } => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category: string;

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Healthy Weight';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return { bmi: parseFloat(bmi.toFixed(1)), category };
};

const generatePrompt = (age: number, weight: number, height: number, bmiData: { category: string; bmi: number }): string => {
  return `As a health expert, provide personalized health insights for a person with:
  Age: ${age} years
  Weight: ${weight} kg
  Height: ${height} cm
  BMI: ${bmiData.bmi} (${bmiData.category})

  Provide specific recommendations with icons and emojis in proper bullet points format with numbers in these areas:

  1. Diet recommendations (tailored to ${bmiData.category}).
  2. Exercise suggestions (tailored to ${bmiData.category}).
  3. Health considerations and lifestyle tips.
  
   Give results by analyzing all factors weight, height and age for example if the person is toddler, infant, child, teenager, adolescen, adult, old by conidering their weights and height
  Also, include URLs to articles and videos that are relevant to their BMI category:
 
  Format the response in HTML using <ul> and <li>, and display article links with a distinct color for better visibility.`;
};

export default function HealthInsights() {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [insight, setInsight] = useState<string>('');
  const [bmiInfo, setBmiInfo] = useState<{ bmi: number; category: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const weightNum = Number(weight);
    const heightNum = Number(height);
    const bmiData = calculateBMI(weightNum, heightNum);
    setBmiInfo(bmiData);

    try {
      const response = await fetch('https://health-ml-app-api.vercel.app/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: generatePrompt(Number(age), weightNum, heightNum, bmiData),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const cleanResponse = data.response.replace(/\*/g, ''); // Remove asterisks
      setInsight(cleanResponse);
    } catch (error) {
      console.error('Error:', error);
      setInsight('Sorry, there was an error generating your health insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="insights" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Get Your Health Insights</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                required
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                required
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300"
              disabled={loading}
            >
              {loading ? 'Generating Insights...' : 'Get Insights'}
            </button>
          </form>
        </div>
        {(bmiInfo || insight) && (
          <motion.div
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {bmiInfo && (
              <div className="mb-6 border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Details</h3>
                <p>Age: {age} years</p>
                <p>Weight: {weight} kg</p>
                <p>Height: {height} cm</p>
                <h4 className="text-lg font-semibold text-gray-800 mt-4">BMI Analysis</h4>
                <div className="flex items-center space-x-4 mt-2">
                  <Scale color="red" size={24} />
                  <span>Your BMI: {bmiInfo.bmi}</span>
                  <span>{bmiInfo.category}</span>
                </div>
              </div>
            )}
            {insight && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Health Insights</h3>
                <motion.ul
                  className="space-y-2 pl-6 list-disc text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: insight }}
                  />
                </motion.ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
