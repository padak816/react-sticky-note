import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import ContentEditable from "react-contenteditable";
const Wrapper = styled.div`
  position: absolute;
  background-color: lightyellow;
  border: 1px solid #eee;
  resize: both;
  overflow: auto;
  width: 250px;
  height: 250px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 20px;
  background-color: #f9f978;
  border-bottom: 1px solid #eee;
  padding: 4px;
  cursor: move;
`;
const Button = styled.div`
  width: 15px;
  height: 15px;
  top: 0;
  right: 0;
  background-color: white;
  cursor: pointer;
  text-align: center;
  line-height: 0.7;
`;
const Content = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 10px;
`;

const Memo = () => {
  const [title, setTitle] = useState("");
  const textRef = useRef("");
  const wrapRef = useRef(null);
  const headerRef = useRef(null);
  const inputRef = useRef(null);
  const positionRef = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    textRef.current = e.target.value;
  };

  const handleBlur = useCallback(() => {
    let text =
      textRef.current.split("<div>")[0].length < 15
        ? textRef.current.split("<div>")[0]
        : textRef.current.split("<div>")[0].substring(0, 15);
    setTitle(text);
  }, [setTitle]);

  const onMove = useCallback((e) => {
    e.preventDefault();
    positionRef.current.lastX = positionRef.current.startX - e.clientX;
    positionRef.current.lastY = positionRef.current.startY - e.clientY;
    positionRef.current.startX = e.clientX;
    positionRef.current.startY = e.clientY;
    wrapRef.current.style.top = `${
      wrapRef.current.offsetTop - positionRef.current.lastY
    }px`;
    wrapRef.current.style.left = `${
      wrapRef.current.offsetLeft - positionRef.current.lastX
    }px`;
  }, []);

  const removeEvent = useCallback(() => {
    document.removeEventListener("mouseup", removeEvent);
    document.removeEventListener("mousemove", onMove);
  }, []);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    positionRef.current.startX = e.clientX;
    positionRef.current.startY = e.clientY;
    document.addEventListener("mouseup", removeEvent);
    document.addEventListener("mousemove", onMove);
  }, []);

  return (
    <Wrapper
      ref={wrapRef}
      onClick={() => {
        handleClick();
      }}
    >
      <Header
        ref={headerRef}
        onMouseDown={onMouseDown}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div>{title}</div>
        <Button>x</Button>
      </Header>
      <Content>
        <ContentEditable
          html={textRef.current}
          innerRef={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={false}
          style={{ border: "none" }}
        />
      </Content>
    </Wrapper>
  );
};
export default Memo;
