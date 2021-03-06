import React, { useState } from "react";
import useGetApi from "../customHooks/useGetApi";
import PageError from "../components/pageError";
import NotFound from "../components/notFound";
import SearchForm from "../components/searchForm";

import preloader from "../../public/assets/loader.svg";

const Label = () => {
  const [response, loader, error] = useGetApi({
    spreadsheetId: "1GriODdvxdaGI_Ujb40E_7gvSL8PqFsQooOl1h7jxUkg",
    ranges: ["Label!A1:E1", "Label!A2:E30"],
  });

  const [query, setQuery] = useState("");

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  const filterByX = response.dataB.filter((row) => {
    return `${row[4]}`.toLowerCase().includes("x");
  });

  const filterByQuery = filterByX.filter((row) => {
    return `${row[0]}`.toLowerCase().includes(query.toLowerCase());
  });

  if (error) {
    return <PageError />;
  }

  return (
    <div className="Projects PageView">
      <h1 className="Projects__title">Label JIRA</h1>
      <section className="Table StateTable">
        <div className="TableOptions">
          <SearchForm
            title="Buscar"
            valueQuery={query}
            handleValueSearch={handleQuery}
          />
        </div>

        {loader && <img className="preloaderIcon" src={preloader} width="40" />}

        {filterByQuery.length === 0 ? (
          <NotFound />
        ) : (
          <div className="TableDataWrap">
            <table className="TableData">
              <thead className="TableDataHead">
                {response.dataH.map((el, index) => (
                  <tr className="TableDataHead__row" key={index}>
                    <th className="TableDataHead__col">{el[0]}</th>
                    <th className="TableDataHead__col">{el[1]}</th>
                    <th className="TableDataHead__col">{el[2]}</th>
                    <th
                      style={{ textAlign: "center" }}
                      className="TableDataHead__col"
                    >
                      {el[3]}
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody className="TableDataBody">
                {filterByQuery.map((el, index) => (
                  <tr className="TableDataBody__row" key={index}>
                    <td className="TableDataBody__col">{el[0]}</td>
                    <td className="TableDataBody__col">{el[1]}</td>
                    <td className="TableDataBody__col">{el[2]}</td>
                    <td
                      style={{ textAlign: "center" }}
                      className="TableDataBody__col"
                    >
                      {el[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Label;
