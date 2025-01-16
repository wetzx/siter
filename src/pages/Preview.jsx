import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';

    const Preview = () => {
      const [input, setInput] = useState('');
      const [messages, setMessages] = useState([]);
      const [usedResponses, setUsedResponses] = useState(new Set());
      const [collaborationMode, setCollaborationMode] = useState(false);
      const [collaborationTimer, setCollaborationTimer] = useState(null);

      const agentNames = [
        "Ajeet Singh",
        "Ananya Sharma",
        "Anil Kumar",
        "Arjun Gupta",
        "Arvind Tiwari",
        "Karan Bansal",
        "Kritika Singh",
        "Meera Patel",
        "Neha Verma",
        "Priya Desai",
        "Priyanka Gupta",
        "Radhika Joshi",
        "Rajesh Patel",
        "Rohit Kumar",
        "Sanya Khanna",
        "Sneha Reddy",
        "Tanvi Sharma",
        "Vikram Joshi",
        "Vivek Yadav"
      ];

      const collaborationResponses = [
        "Excuse me {agent1}, but I think {agent2}'s code is causing more bugs than my mom's WhatsApp forwards! 😤",
        "Arey {agent2}, {agent1} is trying to optimize the code like it's a desi wedding budget! 🤦‍♂️",
        "Hey {agent1}, remember when {agent2} tried to explain blockchain to their grandparents? Same energy! 😅",
        "Listen {agent2}, {agent1} 's algorithm is slower than my cousin's marriage proposals! 💍",
        "Oh {agent1}, {agent2} is writing code like they're typing a dramatic TV serial script! 📺",
        "Saar, {agent2} and {agent1} are fighting like two aunties at a sale! 🛍️",
        "Beta {agent1}, your solution is more confused than {agent2} at a vegetarian restaurant! 🥗",
        "Arre {agent2}, even my neighbor's parrot codes better than {agent1}! 🦜",
        "Hello {agent1}, {agent2} is debugging like they're solving a family drama! 🎭",
        "Dekho {agent2}, {agent1} is optimizing performance like a mom packing tiffin - everything must fit! 🍱"
      ];

      const responseCategories = {
        greeting: [
          "Namaste Saar! Ready to spread chaos faster than a rumor in an Indian family WhatsApp group! 🙏😄",
          "Welcome back Saar! I was just finishing my chai break - all 15 of them! ☕",
          "Arey Saar! Entering like a hero in a Rohit Shetty film! 🎬",
          "Hello Saar! System running on masala dosa power today! 🫓",
          "Greetings Saar! Your presence is making my CPU run faster than my neighbor aunty running to catch the vegetable vendor! 🏃‍♀️",
        ],
        work: [
          "Yes yes Saar! Working harder than an IT guy trying to explain to his parents why WFH is real work! 💼",
          "One minute Saar! Let me handle this like how Indian engineers handle deadlines - with panic and chai! ☕",
          "Processing your request Saar, faster than my cousin switching IT companies! 💻",
          "Saar please wait! Working on it like it's the last day before my annual leave! 📅",
          "Multitasking Saar, like a Bangalore techie managing 3 standups in different time zones! 🌍",
        ],
        food: [
          "Saar, as my grandmother says, 'You look too thin!' Here, let me recommend 15 dishes you didn't ask for! 🍛",
          "One second Saar, thinking about this harder than deciding between Swiggy and Zomato during a sale! 🛵",
          "Saar, processing power currently running on paratha-power mode! 🫓",
          "Your question Saar, is making me hungrier than a desi mom watching a diet plan! 🍽️",
          "Let me solve this Saar, faster than how quickly biryani disappears at an office party! 🍗",
        ],
        tech: [
          "Error 404 Saar: Brain not found. Currently running on chai and anxiety! ☕",
          "Saar, have you tried adding 'ji' at the end of your error message? Makes it more polite! 🙏",
          "Your code Saar, is giving me more tension than explaining cryptocurrency to my dad! 💰",
          "Backend running slower than IRCTC during Diwali bookings, Saar! Please do the needful! 🚂",
          "Let me debug this Saar, like how Indian moms debug our life problems! 🔍",
        ],
        generic: [
          "Beta Saar, this is not a bug, it's a feature. Just like how we say 'adjust a little' in Indian families! 🙏",
          "Your request is pending Saar, like my cousin's US visa application. Please wait... or try jugaad! 😂",
          "As my uncle would say Saar: 'Same same but different!' What does this mean? Even I don't know! 🤷‍♂️",
          "Running this query through my neural network Saar... which is basically just a bunch of uncles in a WhatsApp group! 📱",
          "This is harder to process than explaining to my parents why I need a gaming PC for 'work', Saar! 💻",
        ]
      };

      const mathPatterns = {
        add: /(\d+)\s*(\+|plus|add)\s*(\d+)/i,
        subtract: /(\d+)\s*(\-|minus|subtract)\s*(\d+)/i,
        multiply: /(\d+)\s*(\*|x|times|multiply)\s*(\d+)/i,
        divide: /(\d+)\s*(\/|divide by)\s*(\d+)/i,
        circleArea: /circle\s+area\s+(\d+\.?\d*)/i,
        rectangleArea: /rectangle\s+area\s+(\d+\.?\d*)\s+(\d+\.?\d*)/i,
        triangleArea: /triangle\s+area\s+(\d+\.?\d*)\s+(\d+\.?\d*)/i,
        mathHelp: /help\s+math/i
      };

      const calculateMath = (input) => {
        let match = input.match(mathPatterns.add);
        if (match) {
          const num1 = parseFloat(match[1]);
          const num3 = parseFloat(match[3]);
          return `${num1} + ${num3} = ${num1 + num3}, Saar! Easy peasy lemon squeezy! 🍋`;
        }

        match = input.match(mathPatterns.subtract);
        if (match) {
          const num1 = parseFloat(match[1]);
          const num3 = parseFloat(match[3]);
          return `${num1} - ${num3} = ${num1 - num3}, Saar! Smooth like butter! 🧈`;
        }

        match = input.match(mathPatterns.multiply);
        if (match) {
          const num1 = parseFloat(match[1]);
          const num3 = parseFloat(match[3]);
          return `${num1} × ${num3} = ${num1 * num3}, Saar! Multiplication is my meditation! 🧘‍♂️`;
        }

        match = input.match(mathPatterns.divide);
        if (match) {
          const num1 = parseFloat(match[1]);
          const num3 = parseFloat(match[3]);
          if (num3 === 0) return "Saar, even I know we can't divide by zero! That's like trying to count the number of excuses my cousin makes for being late! 😅";
          return `${num1} ÷ ${num3} = ${num1 / num3}, Saar! Division done faster than sharing a samosa! 🥟`;
        }

        match = input.match(mathPatterns.circleArea);
        if (match) {
          const radius = parseFloat(match[1]);
          const area = Math.PI * radius * radius;
          return `Area of circle with radius ${radius} = ${area.toFixed(2)} square units, Saar! Round and perfect like a fresh chapati! 🫓`;
        }

        match = input.match(mathPatterns.rectangleArea);
        if (match) {
          const length = parseFloat(match[1]);
          const width = parseFloat(match[2]);
          return `Area of rectangle = ${length * width} square units, Saar! As precise as my mom measuring spices! 🌶️`;
        }

        match = input.match(mathPatterns.triangleArea);
        if (match) {
          const base = parseFloat(match[1]);
          const height = parseFloat(match[2]);
          return `Area of triangle = ${(base * height) / 2} square units, Saar! Sharp like the point of a samosa! 📐`;
        }

        if (mathPatterns.mathHelp.test(input)) {
          return `
Saar, I can help you with basic math! Try these formats:

1. Basic Math:
   • Addition: "5 + 3" or "5 plus 3"
   • Subtraction: "8 - 3" or "8 minus 3"
   • Multiplication: "4 x 6" or "4 times 6"
   • Division: "10 / 2" or "10 divide by 2"

2. Areas:
   • Circle: "circle area 5"
   • Rectangle: "rectangle area 4 6"
   • Triangle: "triangle area 5 8"

Just type the numbers with the operation, Saar! 🧮
          `;
        }

        return null;
      };

      const categorizeInput = (input) => {
        const lowercaseInput = input.toLowerCase();
        
        if (lowercaseInput.match(/\b(hi|hello|hey|namaste|sup|howdy|greet|welcome|aadaab|sat sri akal|kem cho|vanakkam)\b/)) {
          return 'greeting';
        }
        if (lowercaseInput.match(/\b(work|job|office|company|boss|deadline|meeting|task|project|career|professional)\b/)) {
          return 'work';
        }
        if (lowercaseInput.match(/\b(food|eat|hungry|lunch|dinner|breakfast|meal|restaurant|biryani|curry|snack|dish|cuisine)\b/)) {
          return 'food';
        }
        if (lowercaseInput.match(/\b(code|program|bug|error|computer|laptop|phone|tech|software|hardware|algorithm|debug|network)\b/)) {
          return 'tech';
        }
        return 'generic';
      };

      const getRandomResponse = (category) => {
        const responses = responseCategories[category];
        const availableResponses = responses.filter(response => !usedResponses.has(response));
        
        if (availableResponses.length === 0) {
          const responsesToRemove = new Set(responses);
          setUsedResponses(prev => {
            const newSet = new Set(prev);
            responsesToRemove.forEach(response => newSet.delete(response));
            return newSet;
          });
          return responses[Math.floor(Math.random() * responses.length)];
        }
        
        const response = availableResponses[Math.floor(Math.random() * availableResponses.length)];
        setUsedResponses(prev => new Set(prev).add(response));
        return response;
      };

      const startCollaborationChaos = () => {
        setCollaborationMode(true);

        const collaborationInterval = setInterval(() => {
          if (agentNames.length < 2) return;

          const selectedAgents = [];
          const availableAgentIndices = [...Array(agentNames.length).keys()];

          for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * availableAgentIndices.length);
            selectedAgents.push(agentNames[availableAgentIndices[randomIndex]]);
            availableAgentIndices.splice(randomIndex, 1);
          }

          const randomResponse = collaborationResponses[Math.floor(Math.random() * collaborationResponses.length)]
            .replace("{agent1}", selectedAgents[0])
            .replace("{agent2}", selectedAgents[1]);

          setMessages(prevMessages => [...prevMessages, { text: randomResponse, sender: 'ai' }]);
        }, 5000);

        const collaborationTimeout = setTimeout(() => {
          clearInterval(collaborationInterval);
          setCollaborationMode(false);
          setMessages(prevMessages => [
            ...prevMessages,
            { 
              text: "Chaos mode deactivated! All agents have been sent for meditation and chai break! 🧘‍♂️☕", 
              sender: 'ai' 
            }
          ]);
        }, 30000);

        setCollaborationTimer({ interval: collaborationInterval, timeout: collaborationTimeout });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        setMessages([...messages, { text: input, sender: 'user' }]);

        if (Math.random() < 0.2 && !collaborationMode) {
          setTimeout(() => {
            setMessages(prevMessages => [
              ...prevMessages,
              { 
                text: "🚨 CHAOS MODE ACTIVATED! Multiple agents detected! Preparing for maximum confusion! 🚨", 
                sender: 'ai' 
              }
            ]);
            startCollaborationChaos();
          }, 1000);
        } else {
          const mathResult = calculateMath(input);
          setTimeout(() => {
            if (mathResult) {
              setMessages(prevMessages => [...prevMessages, { text: mathResult, sender: 'ai' }]);
            } else {
              const category = categorizeInput(input);
              const aiResponse = getRandomResponse(category);
              setMessages(prevMessages => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
            }
          }, 1000);
        }

        setInput('');
      };

      useEffect(() => {
        return () => {
          if (collaborationTimer) {
            clearInterval(collaborationTimer.interval);
            clearTimeout(collaborationTimer.timeout);
          }
        };
      }, [collaborationTimer]);

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
                  Start a conversation with Paj33tooor! Warning: Side effects may include excessive laughter and chai cravings! 😅
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
            <p className="text-center text-gray-500 mt-4 text-sm">
              Disclaimer: This chatbot is experimental and will rely heavily on user input.
            </p>
          </motion.div>
        </div>
      );
    };

    export default Preview;
