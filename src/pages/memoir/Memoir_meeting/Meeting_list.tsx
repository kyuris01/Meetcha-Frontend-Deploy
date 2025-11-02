import React, { useState, useEffect, useRef } from "react";

import "./Memoir_meeting.scss";

import Meeting_list_content from "./Meeting_list_content";

const Meeting_list = ({ memoirLists }) => {
  //어차피 사용자로부터 입력을 받는다.
  const [showInput, setShowInput] = useState<boolean>(false);
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [filteredList, setFilteredList] = useState(memoirLists);

  useEffect(() => {
    setFilteredList(memoirLists);
  }, [memoirLists]);
  const inputRef = useRef(null);

  const handleClick = () => {
    setShowInput((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setMeetingTitle(e.target.value);
  };

  const handleFilter = () => {
    const filtered = memoirLists.filter((item) =>
      item.meeting_name.toLowerCase().includes(meetingTitle.trim().toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showInput && inputRef.current && !inputRef.current.contains(e.target)) {
        setShowInput(false);
        setMeetingTitle("");
        setFilteredList(memoirLists);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput, memoirLists]);

  return (
    <div className="meetingList_container">
      <div className="list_header">
        <p>미팅 회고 목록</p>
        <button className={showInput ? "disappear" : "appear"} onClick={handleClick}></button>
        {showInput && (
          <div className="filter_input_wrapper" ref={inputRef}>
            <input
              type="text"
              className="filter_input"
              value={meetingTitle}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="예: KUIT 스터디"
            />
            <button onClick={handleFilter}>확인</button>
          </div>
        )}
      </div>

      <Meeting_list_content meetingLists={filteredList} />
    </div>
  );
};

export default Meeting_list;
