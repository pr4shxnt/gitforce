'use client'

import { useState } from 'react';

interface ImageUploadProps {
    onFileSelect: (file: File | null) => void;
    currentImage?: string;
    label?: string;
}

export default function ImageUpload({ onFileSelect, currentImage, label = 'Upload Image' }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Pass file to parent
        onFileSelect(file);
    };

    const handleRemove = () => {
        setPreview(currentImage || null);
        onFileSelect(null);
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-white">{label}</label>
            
            {preview && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-white/5 border border-white/20 group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    {preview !== currentImage && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            <div className="relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`image-upload-${label}`}
                />
                <label
                    htmlFor={`image-upload-${label}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white cursor-pointer hover:bg-white/20 transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>{preview ? 'Change Image' : 'Choose Image'}</span>
                </label>
            </div>

            <p className="text-xs text-purple-200/60">
                Supported: JPG, PNG, GIF, WEBP (Max 5MB) • Upload happens on form submit
            </p>
        </div>
    );
}
