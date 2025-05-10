"use client";

import {
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  Star,
  Target,
} from "lucide-react";
import { useEffect, useRef } from "react";

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = elementsRef.current.filter(Boolean) as HTMLDivElement[];

    // Initial positions
    elements.forEach((el) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;

      // Store original position for animation
      el.dataset.originalX = x.toString();
      el.dataset.originalY = y.toString();

      // Random rotation
      el.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    });

    // Subtle floating animation
    const animate = () => {
      elements.forEach((el) => {
        const originalX = Number.parseFloat(el.dataset.originalX || "0");
        const originalY = Number.parseFloat(el.dataset.originalY || "0");

        // Small random movement around original position
        const offsetX =
          Math.sin(
            Date.now() / 2000 + Number.parseInt(el.dataset.index || "0")
          ) * 5;
        const offsetY =
          Math.cos(
            Date.now() / 2500 + Number.parseInt(el.dataset.index || "0")
          ) * 5;

        el.style.left = `${originalX + offsetX}%`;
        el.style.top = `${originalY + offsetY}%`;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const icons = [
    <CheckCircle key="check" size={24} className="text-green-700" />,
    <Award key="award" size={24} className="text-amber-700" />,
    <Target key="target" size={24} className="text-blue-700" />,
    <Clock key="clock" size={24} className="text-purple-700" />,
    <BarChart3 key="chart" size={24} className="text-cyan-700" />,
    <FileText key="file" size={24} className="text-rose-700" />,
    <Star key="star" size={24} className="text-yellow-700" />,
  ];
  // Double the array for more floating elements
  const floatingIcons = [...icons, ...icons];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {floatingIcons.map((icon, index) => (
        <div
          key={index}
          ref={(el) => {
            elementsRef.current[index] = el;
            if (el) el.dataset.index = index.toString();
          }}
          className="absolute opacity-35"
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
