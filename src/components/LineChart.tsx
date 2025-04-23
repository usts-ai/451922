import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  mois: string;
  nombre?: number;
  jours?: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  color: string;
  yLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title, color, yLabel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      // Ajuster la taille du canvas au conteneur
      const { width } = container.getBoundingClientRect();
      
      // Définir une hauteur propositionnelle à la largeur
      const height = Math.min(width * 0.5, 250);
      
      canvas.width = width;
      canvas.height = height;
      
      // Redessiner le graphique
      drawChart(canvas, width, height);
    };

    // Appeler immédiatement pour le premier rendu
    resizeCanvas();
    
    // Ajouter un listener pour redimensionner le graphique si la fenêtre change
    window.addEventListener('resize', resizeCanvas);
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [data, color, yLabel, title]);
  
  const drawChart = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculer le padding en fonction de la taille
    const padding = Math.max(30, width * 0.06);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get data values (either nombre or jours)
    const values = data.map(item => 'nombre' in item ? item.nombre || 0 : item.jours || 0);
    
    // Find min and max values
    const maxValue = Math.max(...values) * 1.2;
    const minValue = 0;
    
    // Calculate scaling factors
    const xScale = (width - 2 * padding) / (data.length - 1);
    const yScale = (height - 2 * padding) / (maxValue - minValue);
    
    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    const numYLabels = 5;
    for (let i = 0; i <= numYLabels; i++) {
      const value = minValue + (maxValue - minValue) * (i / numYLabels);
      const y = height - padding - value * yScale;
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Draw Y-axis labels
      const fontSize = Math.max(8, Math.min(12, width * 0.025));
      ctx.fillStyle = '#64748b';
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'right';
      ctx.fillText(value.toFixed(1), padding - 10, y + 4);
    }
    
    // Vertical grid lines and X-axis labels
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * xScale;
      
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      // X-axis labels
      const fontSize = Math.max(8, Math.min(12, width * 0.025));
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.font = `${fontSize}px Arial`;
      ctx.fillText(data[i].mois, x, height - padding + 15);
    }
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    
    // X-axis
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    
    ctx.stroke();
    
    // Create points array for line and gradient
    const points: [number, number][] = [];
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * xScale;
      const y = height - padding - (values[i] - minValue) * yScale;
      points.push([x, y]);
    }
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, `${color}33`); // Semi-transparent color
    gradient.addColorStop(1, `${color}00`); // Fully transparent
    
    // Draw gradient area
    ctx.beginPath();
    ctx.moveTo(points[0][0], height - padding);
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.lineTo(points[points.length - 1][0], height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Draw points
    const pointRadius = Math.max(3, Math.min(6, width * 0.012));
    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Draw inner circle
      ctx.beginPath();
      ctx.arc(x, y, pointRadius * 0.5, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    
    // Add y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    const labelFontSize = Math.max(10, Math.min(14, width * 0.03));
    ctx.font = `bold ${labelFontSize}px Arial`;
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {title && <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>}
      <div className="w-full h-full" ref={containerRef}>
        <canvas ref={canvasRef} className="w-full h-auto" style={{ display: 'block' }} />
      </div>
    </motion.div>
  );
};

export default LineChart;
