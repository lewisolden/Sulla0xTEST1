import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Hash, ArrowRight } from "lucide-react";

export default function HashFunctionDiagram() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const examples = [
    {
      input: "Hello, World!",
      output: "0x68e656b251e67e8358bef8483ab0d51c6619f3e7a1a9f0e75838d41ff368f728",
    },
    {
      input: "Hello, World?",
      output: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full py-8"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Hash Function Example (SHA-256)
        </h3>

        <div className="space-y-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">Input:</p>
                  <div className="bg-gray-100 p-3 rounded">
                    <code>{example.input}</code>
                  </div>
                </div>

                <div className="flex items-center">
                  <ArrowRight className="w-6 h-6 text-blue-500 mx-4" />
                  <Hash className="w-8 h-8 text-purple-600" />
                  <ArrowRight className="w-6 h-6 text-blue-500 mx-4" />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">Output:</p>
                  <div className="bg-gray-100 p-3 rounded">
                    <code className="text-xs break-all">{example.output}</code>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-6 bg-blue-50 p-4 rounded-lg"
        >
          <h4 className="font-medium mb-2">Key Properties:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Same input always produces the same output</li>
            <li>Small change in input produces completely different output</li>
            <li>Fixed output length regardless of input size</li>
            <li>One-way function (cannot derive input from output)</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
