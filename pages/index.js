import { useState } from "react";
import Head from "next/head";
import { Header } from "../components/header";

export default function Home() {
  const [names, setNames] = useState([""]);
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [finalTeams, setFinalTeams] = useState([]);

  const setName = (name, position) => {
    let tmpNames = [...names];
    tmpNames[position] = name;

    if (tmpNames.filter((name) => name === "").length === 0) tmpNames = [...tmpNames, ""];

    setNames(tmpNames);
  };

  const shuffle = (arr) => {
    arr.sort(() => Math.random() - 0.5);
  };

  const generateTeams = () => {
    const tmpNames = [...names].filter((name) => name !== "");
    shuffle(tmpNames);
    console.log(tmpNames);
    const teamSize = (tmpNames.length / numberOfTeams) | 0;
    const numberOfTeamsWithOverflow = tmpNames.length % numberOfTeams;
    let overflowTeamCounter = 0;
    let output = [];
    let flag = false;
    let absolutePos = 0;

    for (let currentTeamIndex = 0; currentTeamIndex < numberOfTeams; currentTeamIndex++) {
      
      if (overflowTeamCounter < numberOfTeamsWithOverflow) {
        output.push(tmpNames.slice(absolutePos, absolutePos + teamSize + 1));
        flag = true;
        overflowTeamCounter++;
        absolutePos += teamSize + 1;
      } else {
        output.push(tmpNames.slice(absolutePos, absolutePos + teamSize));
        absolutePos += teamSize;
      }
    }
    setFinalTeams(output);
  };

  return (
    <div>
      <Head>
        <title>Random Team Generator</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main className="antialiased max-w-4xl mx-auto">
        <div className="p-8 space-y-6">
          <Header />
          <div className="divide-y">
            <div className="py-8 grid grid-cols-10 gap-x-4">
              <div className="col-span-8 md:col-span-5 pr-16 space-y-3">
                {names &&
                  names.map((name, i) => (
                    <input
                      type="text"
                      className="w-full py-3 px-3 text-sm font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:bg-gray-800 transition ease-in duration-150"
                      placeholder={names.length === 1 ? "Member Name" : ""}
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value, i)}
                    />
                  ))}
              </div>
            </div>
            <div className="py-8 space-y-1 md:w-64">
              <label className="text-gray-900">Numer of Teams</label>
              <select
                value={numberOfTeams}
                onChange={(e) => setNumberOfTeams(e.target.value)}
                className="w-full py-3 px-3 appearance-none text-sm font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:bg-gray-800 transition ease-in duration-150"
              >
                {[...new Array(4)].map((elem, i) => {
                  return (
                    <option key={i} value={i + 2}>
                      {i + 2}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="py-8 space-y-1 group">
              <button
                onClick={generateTeams}
                className="inline-flex hover:text-gray-700 cursor-pointer items-center text-gray-900 underline"
              >
                Generate Teams
                <svg
                  className="ml-2 transform w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {finalTeams &&
              finalTeams.map((team, i) => (
                <div key={"team" + i}>
                  <h3 className="font-medium text-gray-900 leading-5">{"Team " + (i + 1)}</h3>
                  <ul className="">
                    {team.map((name, i) => (
                      <li key={name + i}>{name}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
