import React from "react";

function Documentation({ links }) {
  return (
    <div>
      <h2 className="font-semibold text-xl text-white text-center my-1">Documentation</h2>
      <ul className="list-none">
        {links.map((link, index) => (
          <li className="mb-2 ml-4 underline text-white text-md text-center" key={index}>
            <a className="text-wrap" href={link}>{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documentation;
