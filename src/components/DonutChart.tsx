import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DonutChartProps {
  data: {
    statut: string;
    nombre: number;
    couleur: string;
  }[];
  title: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const total = data.reduce((acc, item) => acc + item.nombre, 0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    
    // Calculate center and radius
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * 0.6;

    let startAngle = -0.5 * Math.PI; // Start at top (12 o'clock position)

    // Draw segments
    data.forEach((item) => {
      const portion = item.nombre / total;
      const endAngle = startAngle + portion * 2 * Math.PI;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.couleur;
      ctx.fill();

      // Draw inner circle (to create donut)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();

      startAngle = endAngle;
    });

    // Draw center text
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY);
    
    ctx.fillStyle = '#666';
    ctx.font = '14px Arial';
    ctx.fillText('Total', centerX, centerY + 20);

  }, [data, total]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 h-full"
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} className="w-48 h-48" />
        <div className="grid grid-cols-2 gap-3 mt-4 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.couleur }}
              ></span>
              <div className="text-sm">
                <span className="font-medium">{item.statut}</span>
                <span className="text-gray-500 ml-1">({item.nombre})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DonutChart;
