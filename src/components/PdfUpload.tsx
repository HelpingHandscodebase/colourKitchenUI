import { useState, type ChangeEvent, type FormEvent } from 'react'
import axios from 'axios'
import '../styles/PdfUpload.css'

interface PdfUploadProps {
  onUploadSuccess?: (url: string) => void
}

/**
 * A React component to handle unsigned PDF uploads to Cloudinary and display a preview.
 */
export function PdfUpload({ onUploadSuccess }: PdfUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [viewerUrl, setViewerUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // --- Configuration ---
  // Ensure 'defjdv5sk' is your correct Cloud Name
  const CLOUD_NAME = 'defjdv5sk' 
  // Ensure 'PDFuploader' is the correct name of your Unsigned Upload Preset
  const UPLOAD_PRESET = 'PDFuploader' 
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`

  // --- Handlers ---

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setViewerUrl(null) // Reset viewer on new file selection

    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('❌ Please select a PDF file (.pdf extension).')
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setUploading(true)
    setError(null)

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', UPLOAD_PRESET)
    
    // Explicitly set resource_type to 'raw'. Cloudinary might still store it as 'image', 
    // but we let the preset and the API response determine the final working URL.
    data.append('resource_type', 'raw') 

    try {
      const res = await axios.post(UPLOAD_URL, data)
      const url: string = res.data.secure_url
      
      // *** THE FIX ***
      // We rely on the URL exactly as Cloudinary returns it (res.data.secure_url), 
      // which uses the correct resource type ('image' or 'raw') for the fetched asset.
      
      setViewerUrl(url)
      onUploadSuccess?.(url)

      // Clear the input and file state
      setFile(null)
      ;(e.target as HTMLFormElement).reset()

    } catch (err) {
      console.error('Cloudinary Upload Error:', err)
      let message = 'Upload failed. Please check your network connection.'

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          // This highly specific error message directs the user to fix the Cloudinary configuration.
          message = `❌ Upload failed (Status ${err.response.status}). Check your **Cloudinary Settings**! The preset **${UPLOAD_PRESET}** must have **Access mode: Public** and **Mode: Unsigned**.`;
        } else if (err.response?.status === 400 && err.response.data?.error?.message) {
             message = `❌ Upload failed: ${err.response.data.error.message}.`;
        } else if (err.response?.data?.error?.message) {
             message = `Upload failed: ${err.response.data.error.message}`;
        }
      } else if (err instanceof Error) {
        message = `Upload error: ${err.message}`;
      }
      
      setError(message)
    } finally {
      setUploading(false)
    }
  }

  // --- Render ---

  return (
    <div className="pdf-upload-container">
      <h2>PDF Uploader & Viewer 📄</h2>
      <form onSubmit={handleSubmit} className="pdf-upload-form">
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="file-input"
            id="pdf-input"
          />
          <label className="file-label" htmlFor="pdf-input">
            {file ? `Selected: ${file.name}` : 'Click here to choose PDF'}
          </label>
        </div>

        <button 
          type="submit" 
          disabled={!file || uploading || !!error} 
          className={`upload-btn ${uploading ? 'uploading' : ''}`}
        >
          {uploading ? 'Uploading...' : file ? 'Upload' : 'Select File'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {viewerUrl && (
        <div className="pdf-viewer-section">
          <h3>✅ Upload Complete!</h3>
          <p>The PDF should display below. The URL used is: <code>{viewerUrl}</code></p>
          
          <div className="pdf-actions">
            <a href={viewerUrl} target="_blank" rel="noopener noreferrer">
              Open / Download PDF in new tab
            </a>
          </div>

          <iframe
            src={viewerUrl}
            title={`Preview of ${viewerUrl.substring(viewerUrl.lastIndexOf('/') + 1)}`}
            style={{ width: '100%', height: 600, border: '1px solid #ddd' }}
          />
        </div>
      )}
    </div>
  )
}