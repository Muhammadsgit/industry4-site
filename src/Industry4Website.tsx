import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Mail, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Industry4Website() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="text-4xl font-bold mb-4">
          Welcome to Industry 4.0 Insights
        </motion.h1>
        <p className="text-lg text-gray-600">
          Explore the future of smart manufacturing, automation, and digital transformation.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">What is Industry 4.0?</h2>
            <p className="text-gray-700">
              Industry 4.0 refers to the fourth industrial revolution driven by technologies like IoT, AI, cloud computing,
              and robotics, enabling smart factories and connected systems.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Introduction to Cyber-Physical Systems</li>
              <li>IoT and Smart Sensors in Manufacturing</li>
              <li>AI & Machine Learning Applications</li>
              <li>Edge & Cloud Computing</li>
              <li>Digital Twins & Simulation</li>
            </ul>
            <div className="mt-4">
              <a
                href="https://www.youtube.com/results?search_query=industry+4.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-600 hover:underline text-sm"
              >
                <Youtube className="w-4 h-4 mr-1" /> Visit our YouTube Channel
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-16 max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold text-center mb-4">Stay Updated</h3>
        <p className="text-gray-600 text-center mb-6">Sign up to receive the latest news and updates about Industry 4.0</p>
        {submitted ? (
          <p className="text-green-600 text-center">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Subscribe
            </Button>
          </form>
        )}
      </section>
    </main>
  );
} 