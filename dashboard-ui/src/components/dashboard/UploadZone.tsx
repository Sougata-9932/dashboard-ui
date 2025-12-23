import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadZoneProps {
    onUploadComplete?: () => void;
}

interface UploadedFile {
    name: string;
    size: string;
    type: string;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Mock file processing
        const file = acceptedFiles[0];
        if (file) {
            setUploadedFile({
                name: file.name,
                size: (file.size / 1024).toFixed(2) + ' KB',
                type: file.type
            });

            // Simulate upload progress
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        if (onUploadComplete) setTimeout(onUploadComplete, 800);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 100);
        }
    }, [onUploadComplete]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`w-full max-w-2xl mx-auto h-64 border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col items-center justify-center
                ${isDragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'}
            `}
        >
            <input {...getInputProps()} />

            {uploadedFile ? (
                <div className="z-10 text-center animate-fadeIn">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-500 shadow-sm border border-green-100">
                        {uploadProgress < 100 ? (
                            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <CheckCircle2 size={32} />
                        )}
                    </div>
                    <h3 className="text-slate-800 font-bold mb-1">{uploadedFile.name}</h3>
                    <p className="text-slate-500 text-sm">{uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Upload Complete'}</p>
                </div>
            ) : (
                <div className="z-10 text-center px-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                        <UploadCloud size={32} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {isDragActive ? "Drop file here" : "Upload Financial Report"}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Drag & drop your quarterly report (PDF, CSV) to begin automated analysis.
                    </p>
                </div>
            )}

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
        </div>
    );
}
