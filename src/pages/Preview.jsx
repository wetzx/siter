import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preview = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [usedResponses, setUsedResponses] = useState(new Set());

  const mathPatterns = {
    // Basic arithmetic
    add: /\b(add|sum|plus|\+)\s*(\d+)\s*(and|with|\+)?\s*(\d+)\b/i,
    subtract: /\b(subtract|minus|-)\s*(\d+)\s*(from|and|-)\s*(\d+)\b/i,
    multiply: /\b(multiply|times|x|\*)\s*(\d+)\s*(by|with|x|\*)?\s*(\d+)\b/i,
    divide: /\b(divide|÷|\/)\s*(\d+)\s*(by|with|÷|\/)?\s*(\d+)\b/i,
    
    // Area calculations
    circleArea: /\b(area\s+of\s+circle|circle\s+area)\s+(?:with\s+)?(?:radius|r)\s*=?\s*(\d+\.?\d*)\b/i,
    rectangleArea: /\b(area\s+of\s+rectangle|rectangle\s+area)\s+(?:with\s+)?(?:length|l)\s*=?\s*(\d+\.?\d*)\s+(?:and\s+)?(?:width|w)\s*=?\s*(\d+\.?\d*)\b/i,
    triangleArea: /\b(area\s+of\s+triangle|triangle\s+area)\s+(?:with\s+)?(?:base|b)\s*=?\s*(\d+\.?\d*)\s+(?:and\s+)?(?:height|h)\s*=?\s*(\d+\.?\d*)\b/i,
    
    // Perimeter calculations
    circlePerimeter: /\b(perimeter\s+of\s+circle|circle\s+perimeter|circumference)\s+(?:with\s+)?(?:radius|r)\s*=?\s*(\d+\.?\d*)\b/i,
    rectanglePerimeter: /\b(perimeter\s+of\s+rectangle|rectangle\s+perimeter)\s+(?:with\s+)?(?:length|l)\s*=?\s*(\d+\.?\d*)\s+(?:and\s+)?(?:width|w)\s*=?\s*(\d+\.?\d*)\b/i,
    
    // Volume calculations
    sphereVolume: /\b(volume\s+of\s+sphere|sphere\s+volume)\s+(?:with\s+)?(?:radius|r)\s*=?\s*(\d+\.?\d*)\b/i,
    cubeVolume: /\b(volume\s+of\s+cube|cube\s+volume)\s+(?:with\s+)?(?:side|s)\s*=?\s*(\d+\.?\d*)\b/i,
    cylinderVolume: /\b(volume\s+of\s+cylinder|cylinder\s+volume)\s+(?:with\s+)?(?:radius|r)\s*=?\s*(\d+\.?\d*)\s+(?:and\s+)?(?:height|h)\s*=?\s*(\d+\.?\d*)\b/i,
    
    // Pythagorean theorem
    pythagorean: /\b(pythagorean|hypotenuse)\s+(?:with\s+)?(?:a|side\s*a)\s*=?\s*(\d+\.?\d*)\s+(?:and\s+)?(?:b|side\s*b)\s*=?\s*(\d+\.?\d*)\b/i,
  };

  const mathHelp = `
Saar, I can help you with the following calculations:

1. Basic Arithmetic:
   - Add: "add 5 and 3" or "5 plus 3"
   - Subtract: "subtract 3 from 8"
   - Multiply: "multiply 4 by 6"
   - Divide: "divide 10 by 2"

2. Area Calculations:
   - Circle: "area of circle radius 5"
   - Rectangle: "area of rectangle length 4 width 6"
   - Triangle: "area of triangle base 5 height 8"

3. Perimeter Calculations:
   - Circle: "perimeter of circle radius 5"
   - Rectangle: "perimeter of rectangle length 4 width 6"

4. Volume Calculations:
   - Sphere: "volume of sphere radius 3"
   - Cube: "volume of cube side 4"
   - Cylinder: "volume of cylinder radius 3 height 6"

5. Other:
   - Pythagorean theorem: "pythagorean a=3 b=4"

Just type your question in a natural way, Saar! 🙏
  `;

  const calculateMath = (input) => {
    // Basic arithmetic
    let match = input.match(mathPatterns.add);
    if (match) {
      const num1 = parseFloat(match[2]);
      const num2 = parseFloat(match[4]);
      return `${num1} + ${num2} = ${num1 + num2}, Saar! Easy peasy lemon squeezy! 🍋`;
    }

    match = input.match(mathPatterns.subtract);
    if (match) {
      const num1 = parseFloat(match[2]);
      const num2 = parseFloat(match[4]);
      return `${num2} - ${num1} = ${num2 - num1}, Saar! Smooth like butter! 🧈`;
    }

    match = input.match(mathPatterns.multiply);
    if (match) {
      const num1 = parseFloat(match[2]);
      const num2 = parseFloat(match[4]);
      return `${num1} × ${num2} = ${num1 * num2}, Saar! Multiplication is my meditation! 🧘‍♂️`;
    }

    match = input.match(mathPatterns.divide);
    if (match) {
      const num1 = parseFloat(match[2]);
      const num2 = parseFloat(match[4]);
      if (num2 === 0) return "Saar, even I know we can't divide by zero! That's like trying to count the number of excuses my cousin makes for being late! 😅";
      return `${num1} ÷ ${num2} = ${num1 / num2}, Saar! Division done faster than sharing a samosa! 🥟`;
    }

    // Area calculations
    match = input.match(mathPatterns.circleArea);
    if (match) {
      const radius = parseFloat(match[2]);
      const area = Math.PI * radius * radius;
      return `Area of circle with radius ${radius} = ${area.toFixed(2)} square units, Saar! Round and perfect like a fresh chapati! 🫓`;
    }

    match = input.match(mathPatterns.rectangleArea);
    if (match) {
      const length = parseFloat(match[2]);
      const width = parseFloat(match[3]);
      return `Area of rectangle = ${length * width} square units, Saar! As precise as my mom measuring spices! 🌶️`;
    }

    match = input.match(mathPatterns.triangleArea);
    if (match) {
      const base = parseFloat(match[2]);
      const height = parseFloat(match[3]);
      return `Area of triangle = ${(base * height) / 2} square units, Saar! Sharp like the point of a samosa! 📐`;
    }

    // Perimeter calculations
    match = input.match(mathPatterns.circlePerimeter);
    if (match) {
      const radius = parseFloat(match[2]);
      const perimeter = 2 * Math.PI * radius;
      return `Circumference = ${perimeter.toFixed(2)} units, Saar! As endless as a family wedding celebration! 💃`;
    }

    match = input.match(mathPatterns.rectanglePerimeter);
    if (match) {
      const length = parseFloat(match[2]);
      const width = parseFloat(match[3]);
      return `Perimeter of rectangle = ${2 * (length + width)} units, Saar! All sides covered like security at a Bollywood party! 🎉`;
    }

    // Volume calculations
    match = input.match(mathPatterns.sphereVolume);
    if (match) {
      const radius = parseFloat(match[2]);
      const volume = (4/3) * Math.PI * Math.pow(radius, 3);
      return `Volume of sphere = ${volume.toFixed(2)} cubic units, Saar! As full as my mom's container of emotional blackmail! 😅`;
    }

    match = input.match(mathPatterns.cubeVolume);
    if (match) {
      const side = parseFloat(match[2]);
      return `Volume of cube = ${Math.pow(side, 3)} cubic units, Saar! Perfect cube like my neighbor aunty's gossip box! 📦`;
    }

    match = input.match(mathPatterns.cylinderVolume);
    if (match) {
      const radius = parseFloat(match[2]);
      const height = parseFloat(match[3]);
      const volume = Math.PI * radius * radius * height;
      return `Volume of cylinder = ${volume.toFixed(2)} cubic units, Saar! Tall like my dad's expectations! 📏`;
    }

    // Pythagorean theorem
    match = input.match(mathPatterns.pythagorean);
    if (match) {
      const a = parseFloat(match[2]);
      const b = parseFloat(match[3]);
      const c = Math.sqrt(a * a + b * b);
      return `Hypotenuse = ${c.toFixed(2)} units, Saar! Pythagoras would be proud, if he was Indian, which he probably was! 🤓`;
    }

    // Check if it's a help request
    if (input.toLowerCase().includes('help') && input.toLowerCase().includes('math')) {
      return mathHelp;
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);

    // First check for math calculations
    const mathResult = calculateMath(input);
    if (mathResult) {
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: mathResult, sender: 'ai' }]);
      }, 1000);
    } else {
      // If not a math question, handle as regular chat
      setTimeout(() => {
        const aiResponse = "Saar, I'm good at math! Try asking me to calculate something like 'add 5 and 3' or 'area of circle radius 5'. Type 'help math' for more examples! 🧮";
        setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
      }, 1000);
    }

    setInput('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center gradient-text">Paj33tooor Chatbot</h1>
        <div className="bg-gray-900/50 rounded-lg p-4 h-[32rem] overflow-y-auto mb-4 border border-[#FF9933]/20">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              Start a conversation with Paj33tooor! Try some math problems, Saar! 🧮
            </div>
          )}
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-[#FF9933] text-white'
                    : 'bg-[#138808] text-white'
                }`}
              >
                {message.text}
              </span>
            </motion.div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-3 rounded-lg bg-gray-800 text-white border border-[#FF9933]/20 focus:border-[#FF9933]/50 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Preview;
