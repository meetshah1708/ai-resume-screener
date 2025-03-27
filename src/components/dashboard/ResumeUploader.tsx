import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
  onUpload: (files: File[]) => void;
  uploadedFiles: File[];
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUpload, uploadedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const validFiles: File[] = [];
      
      if (e.dataTransfer.files) {
        Array.from(e.dataTransfer.files).forEach(file => {
          if (file.type === "application/pdf" || 
              file.type === "application/msword" ||
              file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            validFiles.push(file);
          }
        });
      }

      if (validFiles.length > 0) {
        onUpload(validFiles);
      }
    },
    [onUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const validFiles: File[] = [];
        
        Array.from(e.target.files).forEach(file => {
          if (file.type === "application/pdf" || 
              file.type === "application/msword" ||
              file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            validFiles.push(file);
          }
        });

        if (validFiles.length > 0) {
          onUpload(validFiles);
        }
      }
    },
    [onUpload]
  );

  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    onUpload(updatedFiles);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload Resumes</CardTitle>
        <CardDescription>
          Drag and drop resume files or click to browse (.pdf, .doc, .docx)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-border bg-secondary/50",
            uploadedFiles.length > 0 && "h-32"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("resume-input")?.click()}
        >
          <input
            id="resume-input"
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-center">
            <div className="mb-2 h-10 w-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              {isDragging
                ? "Drop files here"
                : "Drag files here or click to browse"}
            </p>
          </div>
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
            <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg animate-fade-in-right"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="h-7 w-7 rounded-full hover:bg-white transition-colors flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, DOC, DOCX
        </p>
        {uploadedFiles.length > 0 && (
          <button 
            onClick={() => onUpload([])}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeUploader;
