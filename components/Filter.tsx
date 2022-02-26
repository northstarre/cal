import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function Filter({ filterName, filterOptions, onChange }) {
  let filterList = "";
  filterOptions.forEach((option: string) => {
    filterList += '<li><a href="#">' + option + "</a></li>";
  });

  return (
    <>
      <div>
        <ul className="nav nav-pills nav-stacked">
          <li className="active">
            <a href="#">Filter</a>
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown">
              {filterName}
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">{filterList}</ul>
          </li>
        </ul>
      </div>
    </>
  );
}
