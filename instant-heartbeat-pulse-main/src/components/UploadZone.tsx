import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * UploadZone is a UI component for selecting ECG data files.
 * It supports drag-and-drop and file input selection.
 * Basic file type validation is applied before processing.
 */

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

const UploadZone = ({ onFileSelect, isLoading = false }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const isValidFile = (file: File) => {
    const validExtensions = [".csv", ".dat"];
    return validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const processFile = (file: File | undefined) => {
    if (file && isValidFile(file)) {
      onFileSelect(file);
    } else if (file) {
      alert("Invalid format! Please upload a .CSV or .DAT file.");
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        processFile(e.dataTransfer.files[0]);
      }}
      className={cn(
        "relative group border-2 border-dashed rounded-2xl p-12 transition-all duration-300",
        "flex flex-col items-center justify-center text-center cursor-pointer",
        isDragging
          ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
          : "border-slate-300 bg-slate-50/30",
        isLoading && "opacity-60 pointer-events-none grayscale"
      )}
    >
      <input
        type="file"
        accept=".csv,.dat"
        onChange={(e) => processFile(e.target.files?.[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      />

      <div className="z-10 flex flex-col items-center gap-5">
        <div
          className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 shadow-xl",
            isLoading
              ? "bg-slate-200 animate-pulse"
              : "bg-blue-600 group-hover:rotate-12"
          )}
        >
          {isLoading ? (
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-10 h-10 text-white" />
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {isLoading ? "Processing Signal..." : "Drop ECG Records Here"}
          </h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Upload ECG data files for analysis
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-400 text-xs font-semibold">
          <FileText className="w-4 h-4 text-blue-500" />
          <span>Supports: MIT-BIH (.dat) & CSV</span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
