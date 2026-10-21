import { useState } from "react";
import data from "./data";

function Accordion() {
  const [selected, setSelected] = useState("");
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState<string[]>([]);

  function handleSingleSelection(id: string) {
    setSelected(id === selected ? "" : id);
  }

  function handleMultiSelection(id: string) {
    const copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(id);

    if (findIndexOfCurrentId === -1) copyMultiple.push(id);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center gap-5">
      <button
        className="px-2.5 py-5 bg-[#a406cc] text-white text-lg rounded-md cursor-pointer"
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        Enable Multi Selection
      </button>
      <div className="w-175">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="bg-[#a406cc] mb-2.5 px-2.5 py-5 rounded-md">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(item.id)
                    : () => handleSingleSelection(item.id)
                }
                className="text-white flex justify-between items-center cursor-pointer"
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(item.id) !== -1 && (
                    <div className="text-white h-auto mt-2">{item.answer}</div>
                  )
                : selected === item.id && (
                    <div className="text-white h-auto mt-2">{item.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
