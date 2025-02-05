import React from "react";

const PosVsPowDiagram = () => {
  return (
    <svg className="w-full h-auto max-w-3xl mx-auto my-8" viewBox="0 0 800 400">
      {/* Background */}
      <rect width="800" height="400" fill="#f8fafc" rx="10" />
      
      {/* Divider */}
      <line x1="400" y1="50" x2="400" y2="350" stroke="#e2e8f0" strokeWidth="2" />
      
      {/* PoW Side */}
      <g transform="translate(50, 50)">
        <text x="120" y="30" className="text-xl font-bold" fill="#1e40af" textAnchor="middle">
          Proof of Work (PoW)
        </text>
        
        {/* Mining Computer Icon */}
        <rect x="70" y="60" width="100" height="80" fill="#bfdbfe" rx="5" />
        <rect x="85" y="75" width="70" height="40" fill="#1e40af" rx="2" />
        <rect x="95" y="125" width="50" height="5" fill="#1e40af" />
        
        {/* Mining Process Arrows */}
        <path d="M120,160 L120,200 L120,240" fill="none" stroke="#1e40af" strokeWidth="2" />
        
        {/* Energy Usage */}
        <g transform="translate(60, 180)">
          <path d="M30,0 L45,30 L15,30 Z" fill="#eab308" />
          <path d="M60,0 L75,30 L45,30 Z" fill="#eab308" />
          <path d="M90,0 L105,30 L75,30 Z" fill="#eab308" />
        </g>
        
        {/* Labels */}
        <text x="120" y="280" fill="#475569" textAnchor="middle" fontSize="14">
          High Energy Usage
        </text>
      </g>
      
      {/* PoS Side */}
      <g transform="translate(450, 50)">
        <text x="120" y="30" className="text-xl font-bold" fill="#1e40af" textAnchor="middle">
          Proof of Stake (PoS)
        </text>
        
        {/* Staking Wallet Icon */}
        <rect x="70" y="60" width="100" height="80" fill="#bbf7d0" rx="5" />
        <path d="M90,80 L150,80 L150,120 L90,120 Z" fill="#15803d" />
        <text x="120" y="105" fill="white" textAnchor="middle" fontSize="14">
          ETH
        </text>
        
        {/* Staking Process Arrows */}
        <path d="M120,160 L120,200 L120,240" fill="none" stroke="#15803d" strokeWidth="2" />
        
        {/* Energy Efficiency */}
        <g transform="translate(90, 180)">
          <path d="M30,0 L45,30 L15,30 Z" fill="#15803d" />
        </g>
        
        {/* Labels */}
        <text x="120" y="280" fill="#475569" textAnchor="middle" fontSize="14">
          Energy Efficient
        </text>
      </g>
      
      {/* Comparison Labels */}
      <g transform="translate(0, 350)">
        <text x="200" y="20" fill="#475569" textAnchor="middle" fontSize="12">
          Secures network through computational power
        </text>
        <text x="600" y="20" fill="#475569" textAnchor="middle" fontSize="12">
          Secures network through staked ETH
        </text>
      </g>
    </svg>
  );
};

export default PosVsPowDiagram;
