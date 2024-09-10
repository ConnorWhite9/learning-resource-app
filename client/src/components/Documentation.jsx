import React from "react";

function Documentation({ links }) {
  return (
    <div>
      <h2 className="font-semibold text-2xl ml-4 my-4">Documentation</h2>
      <ul className="list-none">
        {links.map((link, index) => (
          <li className="mb-2 ml-4 underline" key={index}>
            <a href={link}>{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documentation;
