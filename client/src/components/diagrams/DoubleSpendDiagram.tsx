import { useEffect, useRef } from 'react';

export default function DoubleSpendDiagram() {
  return (
    <div className="my-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-center items-center w-full">
        <svg
          viewBox="0 0 800 400"
          className="w-full max-w-3xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Participants */}
          <g className="participants">
            {/* User */}
            <rect x="100" y="40" width="120" height="50" rx="6" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2"/>
            <text x="160" y="70" textAnchor="middle" fill="#1e88e5" fontSize="16" fontWeight="500">User</text>
            <line x1="160" y1="90" x2="160" y2="340" stroke="#e3f2fd" strokeWidth="1" strokeDasharray="4"/>

            {/* Network */}
            <rect x="340" y="40" width="120" height="50" rx="6" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2"/>
            <text x="400" y="70" textAnchor="middle" fill="#1e88e5" fontSize="16" fontWeight="500">Network</text>
            <line x1="400" y1="90" x2="400" y2="340" stroke="#e3f2fd" strokeWidth="1" strokeDasharray="4"/>

            {/* Blockchain */}
            <rect x="580" y="40" width="120" height="50" rx="6" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2"/>
            <text x="640" y="70" textAnchor="middle" fill="#1e88e5" fontSize="16" fontWeight="500">Blockchain</text>
            <line x1="640" y1="90" x2="640" y2="340" stroke="#e3f2fd" strokeWidth="1" strokeDasharray="4"/>
          </g>

          {/* Arrows and Labels */}
          <g className="arrows">
            {/* Submit Transaction */}
            <line x1="160" y1="120" x2="400" y2="120" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="280" y="110" textAnchor="middle" fill="#424242" fontSize="14">1. Submit Transaction</text>

            {/* Verify No Previous Spend */}
            <path d="M 400,140 Q 460,170 400,200" fill="none" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="500" y="170" textAnchor="middle" fill="#424242" fontSize="14">2. Verify No Previous Spend</text>

            {/* Add to Block */}
            <line x1="400" y1="220" x2="640" y2="220" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="520" y="210" textAnchor="middle" fill="#424242" fontSize="14">3. Add to Block</text>

            {/* Confirm Transaction */}
            <line x1="640" y1="260" x2="400" y2="260" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="520" y="250" textAnchor="middle" fill="#424242" fontSize="14">4. Confirm Transaction</text>

            {/* Transaction Complete */}
            <line x1="400" y1="300" x2="160" y2="300" stroke="#1e88e5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <text x="280" y="290" textAnchor="middle" fill="#424242" fontSize="14">5. Transaction Complete</text>
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
      <div className="mt-6 text-sm text-gray-600 text-center font-medium">
        Double Spend Prevention Flow Diagram
      </div>
    </div>
  );
}