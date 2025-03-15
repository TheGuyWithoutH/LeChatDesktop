import React from "react";

export const SearchBar = ({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={onSubmit} method="post">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="a"
        style={{
          height: 20,
          margin: "0 10px",
        }}
        viewBox="0 0 212.121 151.515"
        version="1.1"
      >
        <defs id="defs10"></defs>
        <rect
          x="30.303001"
          y="0"
          width="30.302999"
          height="30.302999"
          fill="#ffd700"
          stroke-width="0"
          id="rect1"
        ></rect>
        <rect
          x="151.515"
          y="0"
          width="30.302999"
          height="30.302999"
          fill="#ffd700"
          stroke-width="0"
          id="rect2"
        ></rect>
        <rect
          x="30.303001"
          y="30.303001"
          width="60.605999"
          height="30.302999"
          fill="#ffaf00"
          stroke-width="0"
          id="rect3"
        ></rect>
        <rect
          x="121.21201"
          y="30.303001"
          width="60.605999"
          height="30.302999"
          fill="#ffaf00"
          stroke-width="0"
          id="rect4"
        ></rect>
        <rect
          x="30.303001"
          y="60.606003"
          width="151.515"
          height="30.302999"
          fill="#ff8205"
          stroke-width="0"
          id="rect5"
        ></rect>
        <rect
          x="30.303001"
          y="90.908997"
          width="30.302999"
          height="30.302999"
          fill="#fa500f"
          stroke-width="0"
          id="rect6"
        ></rect>
        <rect
          x="90.908997"
          y="90.908997"
          width="30.302999"
          height="30.302999"
          fill="#fa500f"
          stroke-width="0"
          id="rect7"
        ></rect>
        <rect
          x="151.515"
          y="90.908997"
          width="30.302999"
          height="30.302999"
          fill="#fa500f"
          stroke-width="0"
          id="rect8"
        ></rect>
        <rect
          x="0"
          y="121.21201"
          width="90.908997"
          height="30.302999"
          fill="#e10500"
          stroke-width="0"
          id="rect9"
        ></rect>
        <rect
          x="121.21201"
          y="121.21201"
          width="90.908997"
          height="30.302999"
          fill="#e10500"
          stroke-width="0"
          id="rect10"
        ></rect>
      </svg>
      <input
        autoFocus
        type="text"
        name="message"
        autoComplete="off"
        placeholder="Demandez au Chat ou @mentionnez un agent"
        style={{
          fontSize: "1em",
        }}
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
          height={"50%"}
          className="search"
        >
          <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
        </svg>
      </button>
    </form>
  );
};
