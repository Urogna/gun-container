import React, { useState } from "react";
import { getId, getPub } from "nicks-gun-utils";

export const Container = ({
    id,
    container,
    onSetFirstUrl,
    onSetSecondUrl,
    onSetSwitch,
    setContainerName
}) => {
    const pub = getPub(id);
    const [newName, setNewName] = useState("");
    const [newFirst, setFirstUrl] = useState("");
    const [newSecond, setSecondUrl] = useState("");
    const [hoverUrl, setHoverUrl] = useState();    

    let firstJsx = container && container.first?
        (
            <iframe src={container.first} frameBorder="0"/>
        ):
        (
            <></>
        )
    let secondJsx = container && container.second?
        (
            <iframe src={container.second} frameBorder="0"/>
        ):
        (
            <></>
        )

    return (
        <div className={container.switch? "horizontal" : "vertical"}>
            <div 
                className="content"
                onMouseEnter={() => {
                    setHoverUrl(container.first)
                }}>
                {firstJsx}
                {hoverUrl === container.first? (
                    <div className="bottom-bar">
                        <form onSubmit={e => {
                            e.preventDefault();
                            onSetFirstUrl(newFirst)
                        }}>
                            <input
                                value={newFirst? newFirst : container.first}
                                onChange={e => setFirstUrl(e.target.value)}>
                            </input>
                        </form>
                        <Switch set={onSetSwitch} s={container.switch}/>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div 
                className="content"
                onMouseEnter={() => {
                    setHoverUrl(container.second)
                }}>
                {secondJsx}
                {hoverUrl === container.second? (
                    <div className="bottom-bar">
                        <form onSubmit={e => {
                            e.preventDefault();
                            onSetSecondUrl(newSecond)
                        }}>
                            <input
                                value={newSecond? newSecond : container.second}
                                onChange={e => setSecondUrl(e.target.value)}>
                            </input>
                        </form>
                        <Switch set={onSetSwitch} s={container.switch}/>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

const Switch = ({set, s}) => (
    <button
        className="switch"
        onClick={() => set(!s)}>
        s
    </button>
)