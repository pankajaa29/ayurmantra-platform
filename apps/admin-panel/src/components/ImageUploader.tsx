'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ImageUploader({ value, onChange, className }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Convert to base64 for now (in production, upload to S3/CDN)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onChange(base64);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Featured"
            className="w-full h-48 object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[#E8E2D5] rounded-xl p-6 text-center hover:border-[#2D5A3D] transition-colors cursor-pointer"
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-[#2D5A3D] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload image</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF up to 5MB</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
