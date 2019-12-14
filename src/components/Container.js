import React, { useState } from "react";
import { getId, getPub } from "nicks-gun-utils";

export const Container = ({
    id,
    container,
    onSetLeftUrl,
    onSetRightUrl,
    setContainerName
}) => {
    const pub = getPub(id);
    const [newName, setNewName] = useState("");
    const [newLeft, setLeftUrl] = useState("");
    const [newRight, setRightUrl] = useState("");

    const name =
        container.name ||
        id.replace(`~${pub}.`, "").replace(`~${pub}`, "") ||
        "Container";

        

    let leftJsx = container && container.left?
        (
            <iframe src={container.left} frameBorder="0"/>
        ):
        (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSetLeftUrl(newLeft);
                }}
            >
                <input
                    autoFocus
                    value={newLeft}
                    onChange={e => setLeftUrl(e.target.value)}
                    placeholder="set tool url"
                />
            </form>
        )
    let rightJsx = container && container.right?
        (
            <iframe src={container.right} frameBorder="0"/>
        ):
        (
            <form
                onSubmit={e => {
                e.preventDefault();
                onSetRightUrl(newRight);
                }}
            >
                <input
                    autoFocus
                    value={newRight}
                    onChange={e => setRightUrl(e.target.value)}
                    placeholder="set tool url"
                />
            </form>
        )

    return (
        <div className="container">
            <div className="left-container">
                {leftJsx}
            </div>
            <div className="right-container">
                {rightJsx}
            </div>
        </div>
    )
}