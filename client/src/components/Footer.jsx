import React from "react";

function Footer() {
  return (
    <div className="flex justify-center items-center h-[169px] bg-black">
      <div className="flex w-[492px]">
        <section className="flex flex-1 flex-col text-[#4F8EEB] h-[116px]">
          <h4 className="text-[16px] font-bold italic mb-2">Company</h4>
          <ul className="flex flex-col text-[14px]">
            <li className="mb-2">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#">Copyright</a>
            </li>
            <li className="mb-2">
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </section>
        <section className="flex flex-1 flex-col text-[#4F8EEB] h-[116px]">
          <h4 className="text-[16px] font-bold italic mb-2">Contact</h4>
          <ul className="flex flex-col text-[14px]">
            <li className="mb-2">
              <a href="#">Email</a>
            </li>
            <li className="mb-2">
              <a href="#">Phone Number</a>
            </li>
          </ul>
        </section>
        <section className="flex flex-1 flex-col text-[#4F8EEB] h-[116px]">
          <h4 className="text-[16px] font-bold italic mb-2">Socials</h4>
          <ul className="flex flex-col text-[14px]">
            <li className="mb-2">
              <a href="#">LinkedIn</a>
            </li>
            <li className="mb-2">
              <a href="#">Twitter</a>
            </li>
            <li className="mb-2">
              <a href="#">GitHub</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Footer;
