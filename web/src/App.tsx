import { useState } from 'react'
function App() {
  const [file, setFile] = useState<File | null>(null) 
 
  return (
    <div>
      <h1>Receipt Splitter</h1>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)}/> {/* Picking the image */}
      <button disabled={!file} onClick={()=> console.log(file)}>Upload</button> {/* Upload button*/}
    </div>
  )
}

export default App
