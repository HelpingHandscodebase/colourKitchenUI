import { useState, type ChangeEvent, type FormEvent } from 'react'
import axios from 'axios'

import '../styles/PdfUpload.css'

interface PdfUploadProps {
  onUploadSuccess?: (url: string) => void
}

export function PdfUpload({ onUploadSuccess }: PdfUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewerUrl, setViewerUrl] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      alert('Select a file!')
      return
    }

    setUploading(true)
    setError(null)

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'PDFuploader')

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/defjdv5sk/auto/upload',
        data
      )

      setUploadUrl(res.data.secure_url)
      onUploadSuccess?.(res.data.secure_url)

      // Use secure_url for viewing
      setViewerUrl(res.data.secure_url)

      setFile(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      console.error('Upload error:', err)
      const message =
        axios.isAxiosError(err) && err.response?.status === 401
          ? 'Upload failed (401). The preset may still require authentication. Ensure "PDFuploader" is unsigned or upload via server.'
          : err instanceof Error
          ? err.message
          : 'Upload error occurred'
      setError(message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="pdf-upload-container">
      <form onSubmit={handleSubmit} className="pdf-upload-form">
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="file-input"
            id="pdf-input"
          />
          <label className="file-label" htmlFor="pdf-input">
            {file ? file.name : 'Choose PDF file'}
          </label>
        </div>

        <button type="submit" disabled={!file || uploading} className="upload-btn">
          {uploading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {viewerUrl && (
        <div className="pdf-viewer" style={{ marginTop: 16 }}>
          <p>Preview:</p>
          <iframe
            src={viewerUrl}
            title="PDF preview"
            style={{ width: '100%', height: 600, border: '1px solid #ddd' }}
          />
          <div style={{ marginTop: 8 }}>
            <a href={uploadUrl ?? viewerUrl} target="_blank" rel="noopener noreferrer">
              Open / Download PDF
            </a>
          </div>
        </div>
      )}

      {!viewerUrl && uploadUrl && (
        <div className="success-message">
          <p>PDF uploaded successfully!</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            View uploaded file
          </a>
        </div>
      )}
    </div>
  )
}
