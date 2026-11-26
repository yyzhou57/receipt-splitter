import { useState } from 'react'
function App() {
  const [file, setFile] = useState<File | null>(null) 



  const handleUpload = async () => {
    if(!file){return}

    const formData = new FormData()
    formData.append('receipt', file)

    const res = await fetch('http://localhost:3000/receipts', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    console.log(data)
  }
 
  return (
    <div>
      <h1>Receipt Splitter</h1>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)}/> {/* Picking the image */}
      <button disabled={!file} onClick={handleUpload}>Upload</button> {/* Upload button*/}
    </div>
  )
}

export default App
