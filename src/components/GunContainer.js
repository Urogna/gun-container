import { Container } from "./Container";
import React, { useState, useEffect } from "react";
import { getPub, useGun, getSet, getId } from "nicks-gun-utils";

const Gun = require("gun/gun");
require("gun/sea");
require("gun/lib/radix");
require("gun/lib/radisk");
require("gun/lib/store");
require("gun/lib/rindexed");

export const GunContainer = ({ id, priv, epriv }) => {
  const [gun, setGun] = useState(null);
  const pub = getPub(id);
  const pair = pub && priv && { pub, priv, epriv };
  const [data, onData, put] = useGun(Gun, gun, useState, pair);

  useEffect(() => {
    const gun = Gun({
      localStorage: false,
      peers: ["https://gunjs.herokuapp.com/gun", "http://nmr.io:8765/gun"]
    });
    gun.get(id).on(onData);
    gun
      .get(`${id}.atoms`)
      .on(onData)
      .map()
      .on(onData);
    setGun(gun);
  }, []);

  if (!gun) {
    return <div>Loading...</div>;
  }

  const container = {
    ...data[id]
  };

    return (
        <Container
            id={id}
            container={container}
            setContainerName={name => put([id, "name", name])}
            onSetLeftUrl={left => put([id, "left", left])}
            onSetRightUrl={right => put([id, "right", right])}
        />
    );
};
