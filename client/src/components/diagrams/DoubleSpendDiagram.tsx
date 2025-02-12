import { useEffect, useRef } from 'react';

export default function DoubleSpendDiagram() {
  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <svg
          viewBox="0 0 800 300"
          className="w-full max-w-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Participants */}
          <g className="participants">
            {/* User */}
            <rect x="50" y="20" width="120" height="40" rx="5" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2"/>
            <text x="110" y="45" textAnchor="middle" fill="#1e88e5" fontSize="14">User</text>
            <line x1="110" y1="60" x2="110" y2="260" stroke="#e3f2fd" strokeWidth="1" strokeDasharray="4"/>

            {/* Network */}
            <rect x="340" y="20" width="120" height="40" rx="5" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2"/>
            <text x="400" y="45" textAnchor="middle" fill="#1e88e5" fontSize="14">Network</text>
            <line x1="400" y1="60" x2="400" y2="260" stroke="#e3f2fd" strokeWidth="1" strokeDasharray="4"/>

            {/* Blockchain */}
            <rect x="630" y="20" width="120" height="40" rx="5" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2"/>
            <text x="690" y="45" textAnchor="middle" fill="#1e88e5" fontSize="14">Blockchain</text>
            <line x1="690" y1="60" x2="690" y2="260" stroke="#e3f2fd" strokeWidth="1" strokeDasharray="4"/>
          </g>

          {/* Arrows and Labels */}
          <g className="arrows">
            {/* Submit Transaction */}
            <line x1="110" y1="80" x2="400" y2="100" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="255" y="85" textAnchor="middle" fill="#424242" fontSize="12">1. Submit Transaction</text>

            {/* Verify No Previous Spend */}
            <path d="M 400,120 Q 450,140 400,160" fill="none" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="480" y="145" textAnchor="middle" fill="#424242" fontSize="12">2. Verify No Previous Spend</text>

            {/* Add to Block */}
            <line x1="400" y1="180" x2="690" y2="200" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="545" y="185" textAnchor="middle" fill="#424242" fontSize="12">3. Add to Block</text>

            {/* Confirm Transaction */}
            <line x1="690" y1="220" x2="400" y2="240" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="545" y="225" textAnchor="middle" fill="#424242" fontSize="12">4. Confirm Transaction</text>

            {/* Transaction Complete */}
            <line x1="400" y1="260" x2="110" y2="240" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="255" y="265" textAnchor="middle" fill="#424242" fontSize="12">5. Transaction Complete</text>
          </g>

          {/* Arrow Marker Definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#1e88e5"/>
            </marker>
          </defs>
        </svg>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        Double Spend Prevention Flow Diagram
      </div>
    </div>
  );
}