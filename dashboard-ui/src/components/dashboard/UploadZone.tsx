import { UploadCloud, File, X } from 'lucide-react';
import { useState, useCallback } from 'react';

interface UploadedFile {
    name: string;
    size: number;
    type: string;
}

export function UploadZone() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFile({
                name: file.name,
                size: file.size,
                type: file.type
            });
        }
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFile({
                name: file.name,
                size: file.size,
                type: file.type
            });
        }
    }, []);

    const handleRemoveFile = useCallback(() => {
        setUploadedFile(null);
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="h-full relative">
            <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
            />

            {!uploadedFile ? (
                <label
                    htmlFor="file-upload"
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`h-full flex flex-col justify-center items-center border-2 border-dashed rounded-3xl transition-all cursor-pointer group p-8 min-h-[300px] ${isDragging
                            ? 'border-slate-900 bg-slate-100'
                            : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                        }`}
                >
                    <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 transition-all duration-300 ${isDragging ? 'scale-110 rotate-12' : 'group-hover:scale-110'
                        }`}>
                        <UploadCloud className={`transition-colors ${isDragging ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                            }`} size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">
                        {isDragging ? 'Drop your file here' : 'Drop your file here'}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">or click to upload</p>
                    <p className="text-slate-300 text-xs mt-2">PDF, DOC, TXT, CSV, XLSX</p>
                </label>
            ) : (
                <div className="h-full flex flex-col justify-center items-center border-2 border-slate-200 rounded-3xl bg-white p-8 min-h-[300px]">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 animate-bounce">
                        <File className="text-slate-600" size={40} />
                    </div>
                    <p className="text-slate-800 font-semibold text-lg">{uploadedFile.name}</p>
                    <p className="text-slate-500 text-sm mt-1">{formatFileSize(uploadedFile.size)}</p>
                    <p className="text-slate-400 text-xs mt-1">{uploadedFile.type || 'Unknown type'}</p>

                    <button
                        onClick={handleRemoveFile}
                        className="mt-6 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
                    >
                        <X size={16} />
                        Remove File
                    </button>
                </div>
            )}
        </div>
    );
}
