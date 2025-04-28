import React, { useId } from "react";
import { set } from "react-hook-form";

const FeedbackForm = React.forwardRef(
  ({ label,content,setcontent, type = "textarea", placeholder }, ref) => {
    const { id } = useId();

    return (
      <div>
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          rows="10"
          value={content}
          className="w-full border rounded p-2 resize-none bg-white text-xl"
          placeholder={placeholder}
          ref={ref}
          id={id}
          onChange={(e)=>setcontent(e.target.value)}
        />
      </div>
    );
  }
);

export default FeedbackForm;
