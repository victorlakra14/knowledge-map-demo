import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SelectGradeModal } from '../SelectGradeModal/SelectGradeModal';
import { Button } from '@mui/material';

export const BottomBar = ({mainGrade, setMainGrade, addNewNode}) => {

    const [barOpen, setBarOpen] = useState(false);

    let barCompo;
    if(barOpen){
        barCompo = <div className="flex flex-col items-center gap-3">
            <div onClick={() => setBarOpen(!barOpen)} className="bottom-bar w-[80px] h-[20px] flex items-center justify-center hover:drop-shadow-lg cursor-pointer" >
                {/* <div onClick={() => setBarOpen(!barOpen)} className={`bottom-bar w-[50px] h-[7px] rounded bg-slate-400 ${activateClick ? 'hover:bg-slate-600 hover:drop-shadow-lg cursor-pointer' : ''} `} /> */}
                <ExpandMoreIcon className="text-black " fontSize='large'/>
            </div>
            <div className="w-[50vw] h-[90px] rounded bg-white border border-black drop-shadow-lg">
                <div className="flex items-center justify-center h-full">
                    <Button onClick={addNewNode}>Add New Node</Button>
                    <SelectGradeModal mainGrade={mainGrade} setMainGrade={setMainGrade}/>
                </div>
            </div>
        </div>
    }else{
        barCompo = <>
            <div onClick={() => setBarOpen(!barOpen)} className="bottom-bar w-[80px] h-[20px] flex items-center justify-center hover:drop-shadow-lg cursor-pointer" >
                {/* <div onClick={() => setBarOpen(!barOpen)} className={`bottom-bar w-[50px] h-[7px] rounded bg-slate-400 ${activateClick ? 'hover:bg-slate-600 hover:drop-shadow-lg cursor-pointer' : ''} `} /> */}
                <div onClick={() => setBarOpen(!barOpen)} className="bottom-bar w-[50px] h-[7px] rounded bg-slate-400 hover:bg-slate-600 hover:drop-shadow-lg cursor-pointer" />
            </div>
            
        </>
    }

    

  return (
    <>
        {barCompo}
    </>
  )
}
