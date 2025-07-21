"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  disabled?: boolean
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, max = 100, min = 0, step = 1, disabled = false }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      onValueChange([newValue])
    }

    const percentage = ((value[0] - min) / (max - min)) * 100

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div className="absolute h-2 bg-purple-600 rounded-full" style={{ width: `${percentage}%` }} />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div
            className="absolute w-5 h-5 bg-white border-2 border-purple-600 rounded-full shadow-md transform -translate-y-1/2 top-1/2"
            style={{ left: `calc(${percentage}% - 10px)` }}
          />
        </div>
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
