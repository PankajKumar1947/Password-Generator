import { useCallback, useRef, useState} from 'react'

function App() {
  const [length,setLength]=useState(5);
  const [numberAllowed,setNumberAllowed]=useState(true);
  const [symbolAllowed, setSymbolAllowed]=useState(false);
  const [uppercaseAllowed,setUppercaseAllowed]=useState(false);
  const [lowercaseAllowed,setLowercaseAllowed]=useState(false);
  const [password,setPassword]=useState(null);
  const [copy,setCopy]=useState("Copy");

  //creating password
  const passwordGenerator=useCallback(()=>{
    setCopy("Copy");
    let pass="";
    let str="";
    if(uppercaseAllowed)
      str+="ABCDEFGHIJKLMNOPQRSTUVWXYX";
    if(lowercaseAllowed)
      str+="abcdefghijklmnopqrstuvwxyz";
    if(symbolAllowed)
      str+="`~!@#$%^&*()_+=-[]{}';:?.,><";
    if(numberAllowed)
      str+="0123456789";

    for(let i=1;i<=length;i++){
      let randomIndex=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(randomIndex);
    }

    setPassword(pass);

  },[length,numberAllowed,uppercaseAllowed,lowercaseAllowed,symbolAllowed,setPassword])

  
  const passwordRef=useRef(null);
  //copy password
 const copyPassowrdToClipboard=useCallback(()=>{
  passwordRef.current?.select();//slect
  passwordRef.current?.setSelectionRange(0,20)//slect only 20 values
  //copy to clipboard
  window.navigator.clipboard.writeText(password);
  setCopy("Copied");
  
 },[password])

  return (
    <>
      <div className='max-w-[450px] mx-auto  bg-blue-200 text-xl  pb-10 mt-8 rounded-md'>
        <h1 className='text-3xl text-center underline font-bold mt-5'>Password Generator</h1>
        <div className='border-2 rounded-md border-black m-5 p-3 leading-9'>
          <div className='w-full relative'>
            <input type="text"
            readOnly 
            className='w-full py-1 pl-3 rounded-xl'
            placeholder='Password'
            value={password}
            ref={passwordRef}
            />
            <button 
            className='absolute right-0 py-1 px-3 rounded-r-xl bg-black text-white'
            onClick={copyPassowrdToClipboard}
            >{copy}</button>
          </div>

          {/* length slider */}
          <div className='flex gap-5 mt-4'>
            <label htmlFor="passLen">Password Length : <span>{length}</span></label>
            <input type="range" 
            min={0}
            max={10}
            value={length}
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            id='passLen'
            />
          </div>
          <div className='flex items-center justify-between'>
            <label htmlFor="num">Include Number : </label>
            <input type="checkbox"
            id='num'
            className="
              appearance-none w-5 h-5 border-2 border-black rounded-full bg-white
              mt-1 
              checked:bg-green-600 "
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
            defaultChecked={numberAllowed}
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor="sym">Inclue Symbols : </label>
            <input type="checkbox"
            id='sym'
            className="
              appearance-none w-5 h-5 border-2 border-black rounded-full bg-white
              mt-1 checked:bg-green-600 "
            onChange={()=>{
              setSymbolAllowed((prev)=>!prev);
            }}
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor="up">Inclue Uppercase Letter : </label>
            <input type="checkbox"
            id='up'
            className="
              appearance-none w-5 h-5 border-2 border-black rounded-full bg-white
              mt-1 
              checked:bg-green-600 "
            onChange={()=>{
              setUppercaseAllowed((prev)=>!prev);
            }}
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor="lc">Inclue Lowercase Letter : </label>
            <input type="checkbox"
            id='lc'
            className="
              appearance-none w-5 h-5 border-2 border-black rounded-full bg-white
              mt-1 checked:bg-green-600 "
            onChange={()=>{
              setLowercaseAllowed((prev)=>!prev);
            }}
            />
          </div>

          <button className='w-full bg-yellow-400 mt-5 rounded-md hover:bg-green-500'
          onClick={passwordGenerator}
          >Generate Password</button>
          </div>

              
        
      </div>
    </>
  )
}

export default App
